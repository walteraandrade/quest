import type { SprintConfig, DayEntry, TaskXP, PRXP, ReviewXP } from "../types"
import { dateRange } from "../utils/date"

export const buildDays = (
  sprint: SprintConfig,
  tasksByDate: Map<string, TaskXP[]>,
  prsByDate: Map<string, PRXP[]>,
  reviewsByDate: Map<string, ReviewXP[]>,
): DayEntry[] => {
  const dates = dateRange(sprint.startDate, sprint.endDate)

  return dates.map(date => {
    const tasks = tasksByDate.get(date) ?? []
    const prs = prsByDate.get(date) ?? []
    const reviews = reviewsByDate.get(date) ?? []

    const tasksXP = tasks.reduce((s, t) => s + t.xp, 0)
    const prsXP = prs.reduce((s, p) => s + p.xp, 0)
    const reviewsXP = reviews.reduce((s, r) => s + r.xp, 0)
    const rawXP = tasksXP + prsXP + reviewsXP

    return {
      date, tasksXP, prsXP, reviewsXP,
      streakMultiplier: 1.0,
      rawXP,
      totalXP: rawXP,
      tasks, prs, reviews,
    }
  })
}
