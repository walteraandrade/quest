import type { Achievement, DayEntry, SprintSummary, StreakInfo } from "../types"

type AchievementDef = {
  id: string
  name: string
  description: string
  icon: string
  check: (days: DayEntry[], summary: SprintSummary, streak: StreakInfo) => string | null
}

const definitions: AchievementDef[] = [
  {
    id: "streak-lord", name: "Streak Lord",
    description: "5 consecutive productive days", icon: "\u{1F525}",
    check: (_, __, streak) => {
      if (streak.longest >= 5 && streak.productiveDays.length >= 5)
        return streak.productiveDays[4]
      return null
    },
  },
  {
    id: "pr-machine", name: "PR Machine",
    description: "5 PRs merged in one day", icon: "\u{26A1}",
    check: (days) => {
      const day = days.find(d => d.prs.length >= 5)
      return day?.date ?? null
    },
  },
  {
    id: "sprint-closer", name: "Sprint Closer",
    description: "All sprint tasks completed", icon: "\u{1F3C6}",
    check: (_, summary) => {
      if (summary.totalTasks > 0 && summary.completedTasks >= summary.totalTasks)
        return new Date().toISOString()
      return null
    },
  },
  {
    id: "pro-reviewer", name: "Pro Reviewer",
    description: "5+ reviews in one day", icon: "\u{1F441}",
    check: (days) => {
      const day = days.find(d => d.reviews.length >= 5)
      return day?.date ?? null
    },
  },
]

export const checkAchievements = (
  days: DayEntry[],
  summary: SprintSummary,
  streak: StreakInfo,
  existing: Achievement[] = [],
): Achievement[] =>
  definitions.map(def => {
    const prev = existing.find(a => a.id === def.id)
    const unlockedAt = prev?.unlockedAt ?? def.check(days, summary, streak)
    return {
      id: def.id, name: def.name,
      description: def.description, icon: def.icon,
      unlockedAt,
    }
  })
