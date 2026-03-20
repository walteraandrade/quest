import type { GameState, SprintConfig } from "../types"
import { htmlShell } from "./template"
import { headerComponent, xpBarComponent, statsGrid, achievementsSection } from "./components"
import { streakCalendar, dailyXPChart } from "./charts"

export const generateDashboard = (state: GameState, sprint: SprintConfig): string => {
  const body = [
    headerComponent(state, sprint),
    xpBarComponent(state),
    statsGrid(state),
    achievementsSection(state),
    streakCalendar(state),
    dailyXPChart(state),
  ].join("\n")

  const dataScript = `const QUEST_DATA = ${JSON.stringify(state)};`

  return htmlShell(`Quest — ${sprint.name}`, body, dataScript)
}
