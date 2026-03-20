export type SprintConfig = {
  id: string
  name: string
  startDate: string
  endDate: string
  repos: string[]
  githubOwner: string
  githubUser: string
}

export type GameState = {
  sprintId: string
  syncedAt: string
  totalXP: number
  level: number
  xpForNextLevel: number
  xpInCurrentLevel: number
  days: DayEntry[]
  achievements: Achievement[]
  streak: StreakInfo
  summary: SprintSummary
}

export type DayEntry = {
  date: string
  tasksXP: number
  prsXP: number
  reviewsXP: number
  streakMultiplier: number
  rawXP: number
  totalXP: number
  tasks: TaskXP[]
  prs: PRXP[]
  reviews: ReviewXP[]
}

export type TaskXP = {
  id: number
  title: string
  repo: string
  priority: number
  xp: number
}

export type PRXP = {
  repo: string
  number: number
  title: string
  mergedAt: string
  xp: number
}

export type ReviewXP = {
  repo: string
  number: number
  title: string
  reviewedAt: string
  xp: number
}

export type Achievement = {
  id: string
  name: string
  description: string
  unlockedAt: string | null
  icon: string
}

export type StreakInfo = {
  current: number
  longest: number
  productiveDays: string[]
}

export type SprintSummary = {
  totalTasks: number
  completedTasks: number
  totalPRsMerged: number
  totalReviews: number
  daysActive: number
}

export type SibylSession = {
  date: string
  totalTasks: number
  tasks: SibylTask[]
}

export type SibylTask = {
  id: number
  title: string
  repo: string
  status: string
  completedAt?: string
  priority: number
}
