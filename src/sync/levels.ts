export const computeLevel = (totalXP: number) => {
  let level = 0
  let accumulated = 0

  while (true) {
    const threshold = Math.round(100 * Math.pow(1.4, level))
    if (accumulated + threshold > totalXP) {
      return {
        level,
        xpForNextLevel: threshold,
        xpInCurrentLevel: totalXP - accumulated,
      }
    }
    accumulated += threshold
    level++
  }
}
