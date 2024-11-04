interface SummaryProps {
  summary:{
    completed: number
    total: number
    goalsPerDay: Record<string, {
      id: string
      title: string
      completedAt: string
    }>
  }
}

export type {
  SummaryProps
}