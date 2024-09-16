import { client, db } from "."
import { goalCompletions, goals } from "./schema"
import dayjs from 'dayjs'

async function seed(){
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db.insert(goals).values([
    {
      title: 'Treinar',
      desiredWeeklyFrequency: 4
    },
    {
      title: 'Tomar 3L de água',
      desiredWeeklyFrequency: 7
    }
  ]).returning()
  //.returning() faz com que os dados sejam retornados e nos permite armazenar em uma const


  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    {
      goalId: result[0].id,
      createdAt: startOfWeek.toDate()
    },
    {
      goalId: result[1].id,
      createdAt: startOfWeek.add(1, 'day').toDate()
    }
  ])
}

seed().finally(() => {
  client.end()
})