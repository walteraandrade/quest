import { loadSprint } from "../config"
import { runSync } from "../sync"
import { ensureQuestDir, writeJSON, writeText, QUEST_DIR } from "../utils/fs"
import { generateDashboard } from "../dashboard"

export const dashboardCommand = async () => {
  await ensureQuestDir()
  const sprint = await loadSprint()
  const state = await runSync(sprint)
  await writeJSON(`${QUEST_DIR}/state.json`, state)

  const html = generateDashboard(state, sprint)
  const path = `${QUEST_DIR}/dashboard.html`
  await writeText(path, html)

  console.log(`  dashboard → ${path}`)
  Bun.spawn(["xdg-open", path], { stdout: "ignore", stderr: "ignore" })
}
