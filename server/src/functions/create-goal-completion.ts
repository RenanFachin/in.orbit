import { count, and, gte, lte, eq, sql } from "drizzle-orm"
import { db } from "../db"
import { goalCompletions, goals } from "../db/schema"
import dayjs from "dayjs"

interface CreateGoalCompletionRequest {
  goalId: string
}

export async function createGoalCompletion({goalId}: CreateGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()
  
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
          lte(goalCompletions.createdAt, lastDayOfWeek),
          eq(goalCompletions.goalId, goalId)
        )
    )
      .groupBy(goalCompletions.goalId)
  )

  const result = await db.with(goalCompletionCounts).select({
    desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount: sql`
        COALESCE(${goalCompletionCounts.completionCount}, 0)
      `.mapWith(Number)
  }).from(goals).leftJoin(goalCompletionCounts, eq(goalCompletionCounts.goalId, goals.id)).where(eq(goals.id, goalId)).limit(1)

  // todo select retorna um array
  const {completionCount, desiredWeeklyFrequency} = result[0]

  // verificando se o usuário já completou esta meta
  if(completionCount >= desiredWeeklyFrequency){
    throw new Error('Goal already completed this week.')
  }

  const insertResult = await db.insert(goalCompletions).values({
    goalId
  }).returning()


  const goalCompletion = insertResult[0]

  return {
    goalCompletion
  }
}