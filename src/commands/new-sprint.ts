import type { SprintConfig } from "../types"
import { ensureQuestDir, writeJSON, QUEST_DIR } from "../utils/fs"
import { loadSibylConfig } from "../config"

const parseArgs = (args: string[]): Record<string, string> => {
  const result: Record<string, string> = {}
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--") && i + 1 < args.length) {
      result[args[i].slice(2)] = args[i + 1]
      i++
    }
  }
  return result
}

export const newSprintCommand = async (args: string[]) => {
  await ensureQuestDir()
  const parsed = parseArgs(args)

  if (!parsed.id || !parsed.name || !parsed.start || !parsed.end) {
    console.log("  usage: quest new-sprint --id S1 --name \"Sprint 1\" --start 2026-03-10 --end 2026-03-21")
    console.log("  optional: --repos api,app --owner smarthow --user walteraandrade")
    return
  }

  const sibylConfig = await loadSibylConfig()

  const repos = parsed.repos
    ? parsed.repos.split(",")
    : sibylConfig
      ? await discoverRepos(sibylConfig.scanRoot)
      : []

  const sprint: SprintConfig = {
    id: parsed.id,
    name: parsed.name,
    startDate: parsed.start,
    endDate: parsed.end,
    repos,
    githubOwner: parsed.owner ?? sibylConfig?.github.owner ?? "",
    githubUser: parsed.user ?? "walteraandrade",
  }

  await writeJSON(`${QUEST_DIR}/sprint.json`, sprint)
  console.log(`  created sprint: ${sprint.id} — ${sprint.name}`)
  console.log(`  range: ${sprint.startDate} → ${sprint.endDate}`)
  console.log(`  repos: ${sprint.repos.join(", ")}`)
}

const discoverRepos = async (scanRoot: string): Promise<string[]> => {
  const { readdir } = await import("fs/promises")
  try {
    const entries = await readdir(scanRoot, { withFileTypes: true })
    return entries
      .filter(e => e.isDirectory() && !e.name.startsWith("."))
      .map(e => e.name)
  } catch {
    return []
  }
}
