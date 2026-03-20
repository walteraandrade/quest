import type { SprintConfig, GameState, SprintSummary } from "../types"
import { collectSessions } from "./sibyl"
import { fetchMergedPRs, fetchReviews } from "./github"
import { buildDays } from "./xp"
import { computeStreak } from "./streak"
import { computeLevel } from "./levels"
import { checkAchievements } from "./achievements"
import { readJSON, QUEST_DIR } from "../utils/fs"

export const runSync = async (sprint: SprintConfig): Promise<GameState> => {
  console.log(`  syncing ${sprint.id}: ${sprint.name}`)

  const [tasksByDate, prsByDate, reviewsByDate] = await Promise.all([
    collectSessions(sprint),
    fetchMergedPRs(sprint),
    fetchReviews(sprint),
  ])

  console.log(`  sibyl: ${[...tasksByDate.values()].flat().length} tasks`)
  console.log(`  github: ${[...prsByDate.values()].flat().length} PRs, ${[...reviewsByDate.values()].flat().length} reviews`)

  const days = buildDays(sprint, tasksByDate, prsByDate, reviewsByDate)
  const streak = computeStreak(days)
  const totalXP = days.reduce((s, d) => s + d.totalXP, 0)
  const { level, xpForNextLevel, xpInCurrentLevel } = computeLevel(totalXP)

  const completedTasks = [...tasksByDate.values()].flat()

  const summary: SprintSummary = {
    totalTasks: completedTasks.length,
    completedTasks: completedTasks.length,
    totalPRsMerged: days.reduce((s, d) => s + d.prs.length, 0),
    totalReviews: days.reduce((s, d) => s + d.reviews.length, 0),
    daysActive: days.filter(d => d.rawXP > 0).length,
  }

  const existing = await readJSON<GameState>(`${QUEST_DIR}/state.json`)

  const achievements = checkAchievements(days, summary, streak, existing?.achievements)

  return {
    sprintId: sprint.id,
    syncedAt: new Date().toISOString(),
    totalXP, level, xpForNextLevel, xpInCurrentLevel,
    days, achievements, streak, summary,
  }
}
