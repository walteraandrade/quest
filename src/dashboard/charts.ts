import type { GameState } from "../types"

const CELL = 14
const GAP = 3
const COLORS = {
  empty: "#1e222c",
  low: "#1a2540",
  mid: "#2a4080",
  high: "#5b9cf6",
  max: "#a78bfa",
}

const intensityColor = (xp: number, maxXP: number) => {
  if (xp === 0) return COLORS.empty
  const ratio = xp / maxXP
  if (ratio < 0.25) return COLORS.low
  if (ratio < 0.5) return COLORS.mid
  if (ratio < 0.75) return COLORS.high
  return COLORS.max
}

export const streakCalendar = (state: GameState) => {
  const days = state.days
  const maxXP = Math.max(...days.map(d => d.totalXP), 1)
  const cols = days.length
  const width = cols * (CELL + GAP) + 60
  const height = CELL + 60

  const cells = days.map((d, i) => {
    const x = 30 + i * (CELL + GAP)
    const color = intensityColor(d.totalXP, maxXP)
    const label = d.date.slice(5)
    return `<g>
      <rect x="${x}" y="20" width="${CELL}" height="${CELL}" rx="3" fill="${color}">
        <title>${d.date}: ${d.totalXP} XP</title>
      </rect>
      <text x="${x + CELL / 2}" y="${50}" text-anchor="middle" font-size="8" fill="#555a6e" font-family="'JetBrains Mono', monospace">${i % 2 === 0 ? label : ""}</text>
    </g>`
  }).join("")

  return `
    <div class="section">
      <div class="section-header">
        <span class="section-num">02</span>
        <span class="section-title">Streak Calendar</span>
        <span class="section-line"></span>
      </div>
      <div class="chart-wrapper">
        <div class="legend">
          <div class="legend-item"><div class="legend-dot" style="background:${COLORS.empty}"></div>No activity</div>
          <div class="legend-item"><div class="legend-dot" style="background:${COLORS.mid}"></div>Active</div>
          <div class="legend-item"><div class="legend-dot" style="background:${COLORS.max}"></div>Peak</div>
        </div>
        <svg width="100%" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          ${cells}
        </svg>
      </div>
    </div>`
}

export const dailyXPChart = (state: GameState) => {
  const days = state.days
  const maxXP = Math.max(...days.map(d => d.totalXP), 1)
  const barW = 28
  const gap = 8
  const chartH = 160
  const width = days.length * (barW + gap) + 60
  const height = chartH + 60

  const bars = days.map((d, i) => {
    const x = 30 + i * (barW + gap)
    const scale = (v: number) => (v / maxXP) * chartH

    const tasksH = scale(d.tasksXP)
    const prsH = scale(d.prsXP)
    const reviewsH = scale(d.reviewsXP)

    const tasksY = chartH - tasksH
    const prsY = tasksY - prsH
    const reviewsY = prsY - reviewsH

    const label = d.date.slice(5)
    return `<g>
      <rect x="${x}" y="${tasksY}" width="${barW}" height="${tasksH}" rx="2" fill="#5b9cf6" opacity="0.9"><title>Tasks: ${d.tasksXP} XP</title></rect>
      <rect x="${x}" y="${prsY}" width="${barW}" height="${prsH}" rx="2" fill="#a78bfa" opacity="0.9"><title>PRs: ${d.prsXP} XP</title></rect>
      <rect x="${x}" y="${reviewsY}" width="${barW}" height="${reviewsH}" rx="2" fill="#4ade80" opacity="0.9"><title>Reviews: ${d.reviewsXP} XP</title></rect>
      <text x="${x + barW / 2}" y="${chartH + 18}" text-anchor="middle" font-size="9" fill="#555a6e" font-family="'JetBrains Mono', monospace">${label}</text>
      <text x="${x + barW / 2}" y="${chartH + 32}" text-anchor="middle" font-size="8" fill="#8b90a0" font-family="'JetBrains Mono', monospace">${d.totalXP}</text>
    </g>`
  }).join("")

  return `
    <div class="section">
      <div class="section-header">
        <span class="section-num">03</span>
        <span class="section-title">Daily XP Breakdown</span>
        <span class="section-line"></span>
      </div>
      <div class="chart-wrapper">
        <div class="legend">
          <div class="legend-item"><div class="legend-dot" style="background:#5b9cf6"></div>Tasks</div>
          <div class="legend-item"><div class="legend-dot" style="background:#a78bfa"></div>PRs</div>
          <div class="legend-item"><div class="legend-dot" style="background:#4ade80"></div>Reviews</div>
        </div>
        <svg width="100%" viewBox="0 0 ${width} ${height + 10}" xmlns="http://www.w3.org/2000/svg">
          ${bars}
        </svg>
      </div>
    </div>`
}
