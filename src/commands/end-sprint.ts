import type { GameState } from "../types"
import { readJSON, writeJSON, QUEST_DIR } from "../utils/fs"
import { loadSprint } from "../config"
import { unlink } from "fs/promises"

export const endSprintCommand = async () => {
  const state = await readJSON<GameState>(`${QUEST_DIR}/state.json`)
  if (!state) {
    console.log("  no active state to archive")
    return
  }

  const sprint = await loadSprint()
  await writeJSON(`${QUEST_DIR}/history/${sprint.id}.json`, state)
  await unlink(`${QUEST_DIR}/state.json`).catch(() => {})
  await unlink(`${QUEST_DIR}/sprint.json`).catch(() => {})

  console.log(`  archived ${sprint.id} → history/${sprint.id}.json`)
  console.log(`  final: lvl ${state.level} | ${state.totalXP} XP | ${state.summary.daysActive} active days`)
}
