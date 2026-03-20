import type { GameState, SprintConfig } from "../types"
import { daysRemaining, formatDate } from "../utils/date"

export const headerComponent = (state: GameState, sprint: SprintConfig) => {
  const remaining = daysRemaining(sprint.endDate)
  return `
    <header>
      <div>
        <div class="header-title"><span>Quest</span> ${sprint.name}</div>
        <div class="header-sub">${sprint.startDate} → ${sprint.endDate} • ${remaining} days remaining</div>
      </div>
      <div class="header-badges">
        <div class="badge">LVL <strong>${state.level}</strong></div>
        <div class="badge">XP <strong>${state.totalXP}</strong></div>
        <div class="badge">Streak <strong>${state.streak.current}d</strong></div>
      </div>
    </header>`
}

export const xpBarComponent = (state: GameState) => {
  const pct = state.xpForNextLevel > 0
    ? Math.min(100, Math.round((state.xpInCurrentLevel / state.xpForNextLevel) * 100))
    : 100
  return `
    <div class="xp-bar-container">
      <div class="xp-bar-label">
        <span>Level ${state.level} → ${state.level + 1}</span>
        <span>${state.xpInCurrentLevel} / ${state.xpForNextLevel} XP</span>
      </div>
      <div class="xp-bar-track">
        <div class="xp-bar-fill" style="width: ${pct}%"></div>
      </div>
    </div>`
}

export const statsGrid = (state: GameState) => `
    <div class="stats">
      <div class="stat">
        <div class="stat-label">Total XP</div>
        <div class="stat-value">${state.totalXP}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Level</div>
        <div class="stat-value">${state.level}</div>
        <div class="stat-detail">${state.xpInCurrentLevel}/${state.xpForNextLevel} to next</div>
      </div>
      <div class="stat">
        <div class="stat-label">Current Streak</div>
        <div class="stat-value">${state.streak.current}d</div>
        <div class="stat-detail">longest: ${state.streak.longest}d</div>
      </div>
      <div class="stat">
        <div class="stat-label">Tasks Done</div>
        <div class="stat-value">${state.summary.completedTasks}</div>
        <div class="stat-detail">${state.summary.totalPRsMerged} PRs • ${state.summary.totalReviews} reviews</div>
      </div>
    </div>`

export const achievementsSection = (state: GameState) => {
  const cards = state.achievements.map(a => {
    const locked = !a.unlockedAt
    const dateStr = a.unlockedAt ? formatDate(a.unlockedAt.slice(0, 10)) : ""
    return `
      <div class="achievement-card${locked ? " locked" : ""}">
        <div class="achievement-icon">${a.icon}</div>
        <div>
          <div class="achievement-name">${a.name}</div>
          <div class="achievement-desc">${a.description}</div>
          ${dateStr ? `<div class="achievement-date">Unlocked ${dateStr}</div>` : ""}
        </div>
      </div>`
  }).join("")

  return `
    <div class="section">
      <div class="section-header">
        <span class="section-num">01</span>
        <span class="section-title">Achievements</span>
        <span class="section-line"></span>
      </div>
      <div class="achievements-grid">${cards}</div>
    </div>`
}
