import { SummaryProps } from "../@types/summary"

export async function getSummary(): Promise<SummaryProps>{
  const response = await fetch('http://localhost:3333/summary')
  const data = await response.json()

  return data
}