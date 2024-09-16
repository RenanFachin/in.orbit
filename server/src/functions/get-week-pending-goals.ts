import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";

dayjs.extend(weekOfYear)

export async function getWeekPendingGoals(){
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  // pegando todas as metas criadas até a semana atual
  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    // seleciona todos os registros da tabela goals cujo campo createdAt é anterior ou igual ao último dia da semana (lastDayOfWeek).
    db.select({
      id: goals.id,
      title: goals.title,
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      createdAt: goals.createdAt
    }).from(goals).where(lte(goals.createdAt, lastDayOfWeek))
  )

  const goalCompletionCounts = db.$with('goal_completion_counts').as(
    // calcular a quantidade de vezes que cada meta (goal) foi concluída.
    db.select({
      goalId: goalCompletions.goalId,
      completionCount: count(goalCompletions.id).as('completionCount') // é precido sar um "alias",
    })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
    )
      .groupBy(goalCompletions.goalId)
  )

  // Utilizando a CTE
  const pendingGoals = await db
    .with(goalsCreatedUpToWeek, goalCompletionCounts)
    .select({
      // Dados da primeira CTE
      id: goalsCreatedUpToWeek.id,
      title: goalsCreatedUpToWeek.title,
      desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
      // Dados da segunda CTE
      completionCount: sql`
        COALESCE(${goalCompletionCounts.completionCount}, 0)
      `.mapWith(Number) // O coalesce retorna como string, transformar para number
    })
    .from(goalsCreatedUpToWeek)
    .leftJoin(goalCompletionCounts, eq(goalCompletionCounts.goalId, goalsCreatedUpToWeek.id))

  return pendingGoals
}