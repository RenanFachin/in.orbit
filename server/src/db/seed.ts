import { client, db } from "."
import { goalCompletions, goals } from "./schema"

async function seed(){
  await db.delete(goalCompletions)
  await db.delete(goals)

  await db.insert(goals).values([
    {
      title: 'Treinar',
      desiredWeeklyFrequency: 4
    },
    {
      title: 'Tomar 3L de água',
      desiredWeeklyFrequency: 7
    }
  ])
}

seed().finally(() => {
  client.end()
})