import type { SprintConfig, SibylSession, TaskXP } from "../types"
import { dateRange } from "../utils/date"
import { readJSON } from "../utils/fs"

const SIBYL_DIR = `${process.env.HOME}/.sibyl`

export const collectSessions = async (sprint: SprintConfig): Promise<Map<string, TaskXP[]>> => {
  const dates = dateRange(sprint.startDate, sprint.endDate)
  const result = new Map<string, TaskXP[]>()

  for (const date of dates) {
    const session = await readJSON<SibylSession>(`${SIBYL_DIR}/${date}/session.json`)
    if (!session) continue

    const completed = session.tasks
      .filter(t => t.status === "completed")
      .map(t => {
        const priority = t.priority ?? 5
        return {
          id: t.id,
          title: t.title,
          repo: t.repo ?? "unknown",
          priority,
          xp: priority * 15,
        }
      })

    if (completed.length > 0) result.set(date, completed)
  }

  return result
}
