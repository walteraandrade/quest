import type { GameState } from "../types"
import { readJSON, QUEST_DIR } from "../utils/fs"
import { loadSprint } from "../config"
import { daysRemaining } from "../utils/date"

export const statusCommand = async () => {
  const state = await readJSON<GameState>(`${QUEST_DIR}/state.json`)
  if (!state) {
    console.log("  no state found. run: quest sync")
    return
  }

  const sprint = await loadSprint()
  const remaining = daysRemaining(sprint.endDate)

  console.log(`  ${sprint.name} (${sprint.id})`)
  console.log(`  ${remaining} days remaining`)
  console.log()
  console.log(`  lvl ${state.level} | ${state.totalXP} XP | ${state.xpInCurrentLevel}/${state.xpForNextLevel} to next`)
  console.log(`  streak: ${state.streak.current}d | longest: ${state.streak.longest}d`)
  console.log(`  tasks: ${state.summary.completedTasks} | PRs: ${state.summary.totalPRsMerged} | reviews: ${state.summary.totalReviews}`)
  console.log(`  active days: ${state.summary.daysActive}`)
  console.log()

  const unlocked = state.achievements.filter(a => a.unlockedAt)
  const locked = state.achievements.filter(a => !a.unlockedAt)
  if (unlocked.length > 0) console.log(`  ${unlocked.map(a => `${a.icon} ${a.name}`).join("  ")}`)
  if (locked.length > 0) console.log(`  locked: ${locked.map(a => a.name).join(", ")}`)

  console.log(`\n  synced: ${new Date(state.syncedAt).toLocaleString()}`)
}
