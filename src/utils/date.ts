export const dateRange = (start: string, end: string): string[] => {
  const dates: string[] = []
  const current = new Date(start + "T00:00:00")
  const last = new Date(end + "T00:00:00")
  while (current <= last) {
    dates.push(current.toISOString().slice(0, 10))
    current.setDate(current.getDate() + 1)
  }
  return dates
}

export const today = () => new Date().toISOString().slice(0, 10)

export const daysRemaining = (endDate: string): number => {
  const end = new Date(endDate + "T23:59:59")
  const now = new Date()
  return Math.max(0, Math.ceil((end.getTime() - now.getTime()) / 86400000))
}

export const formatDate = (d: string) => {
  const date = new Date(d + "T00:00:00")
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
