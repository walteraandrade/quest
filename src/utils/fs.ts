import { readFile, writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"

export const QUEST_DIR = `${process.env.HOME}/.quest`

export const ensureQuestDir = async () => {
  if (!existsSync(QUEST_DIR)) await mkdir(QUEST_DIR, { recursive: true })
  const historyDir = `${QUEST_DIR}/history`
  if (!existsSync(historyDir)) await mkdir(historyDir, { recursive: true })
}

export const readJSON = async <T>(path: string): Promise<T | null> => {
  try {
    return JSON.parse(await readFile(path, "utf-8"))
  } catch {
    return null
  }
}

export const writeJSON = async (path: string, data: unknown) => {
  await writeFile(path, JSON.stringify(data, null, 2))
}

export const writeText = async (path: string, data: string) => {
  await writeFile(path, data)
}
