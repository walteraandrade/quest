import type { DayEntry, StreakInfo } from "../types"

const PRODUCTIVE_THRESHOLD = 60

export const computeStreak = (days: DayEntry[]): StreakInfo => {
  const today = new Date().toISOString().slice(0, 10)
  const productiveDays: string[] = []
  let current = 0
  let longest = 0
  let runningStreak = 0

  for (const day of days) {
    if (day.date > today) break
    const isProductive = day.rawXP >= PRODUCTIVE_THRESHOLD
    if (isProductive) {
      productiveDays.push(day.date)
      runningStreak++
      if (runningStreak >= 3) {
        day.streakMultiplier = 1.5
        day.totalXP = Math.round(day.rawXP * 1.5)
      }
    } else {
      runningStreak = 0
    }
    longest = Math.max(longest, runningStreak)
  }

  current = runningStreak
  return { current, longest, productiveDays }
}
