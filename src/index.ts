#!/usr/bin/env bun

import { syncCommand } from "./commands/sync"
import { dashboardCommand } from "./commands/dashboard"
import { statusCommand } from "./commands/status"
import { newSprintCommand } from "./commands/new-sprint"
import { endSprintCommand } from "./commands/end-sprint"

const [cmd, ...args] = process.argv.slice(2)

const commands: Record<string, () => Promise<void>> = {
  sync: syncCommand,
  dashboard: dashboardCommand,
  status: statusCommand,
  "new-sprint": () => newSprintCommand(args),
  "end-sprint": endSprintCommand,
}

const run = commands[cmd]

if (!run) {
  console.log("quest — sprint gamification CLI")
  console.log()
  console.log("  quest sync          sync data, compute XP/levels")
  console.log("  quest dashboard     sync + open HTML dashboard")
  console.log("  quest status        print terminal summary")
  console.log("  quest new-sprint    create new sprint config")
  console.log("  quest end-sprint    archive sprint to history")
  process.exit(0)
}

run().catch(e => {
  console.error(`  error: ${e.message}`)
  process.exit(1)
})
