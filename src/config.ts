import type { SprintConfig } from "./types"
import { readJSON, QUEST_DIR } from "./utils/fs"

const SIBYL_CONFIG = `${process.env.HOME}/.sibyl/config.json`

export const loadSprint = async (): Promise<SprintConfig> => {
  const sprint = await readJSON<SprintConfig>(`${QUEST_DIR}/sprint.json`)
  if (!sprint) throw new Error("No sprint.json found. Run: quest new-sprint")
  return sprint
}

export const loadSibylConfig = async () => {
  return readJSON<{ scanRoot: string; github: { owner: string } }>(SIBYL_CONFIG)
}
