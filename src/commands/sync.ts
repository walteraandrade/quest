import { loadSprint } from "../config"
import { runSync } from "../sync"
import { ensureQuestDir, writeJSON, QUEST_DIR } from "../utils/fs"

export const syncCommand = async () => {
  await ensureQuestDir()
  const sprint = await loadSprint()
  const state = await runSync(sprint)
  await writeJSON(`${QUEST_DIR}/state.json`, state)

  console.log()
  console.log(`  lvl ${state.level} | ${state.totalXP} XP | ${state.xpInCurrentLevel}/${state.xpForNextLevel} to next`)
  console.log(`  streak: ${state.streak.current}d | longest: ${state.streak.longest}d`)
  console.log(`  tasks: ${state.summary.completedTasks} | PRs: ${state.summary.totalPRsMerged} | reviews: ${state.summary.totalReviews}`)

  const unlocked = state.achievements.filter(a => a.unlockedAt)
  if (unlocked.length > 0) {
    console.log(`  achievements: ${unlocked.map(a => `${a.icon} ${a.name}`).join(", ")}`)
  }
}
