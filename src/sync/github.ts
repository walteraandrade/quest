import type { SprintConfig, PRXP, ReviewXP } from "../types"
import { ghJSON } from "../utils/gh"

type GHPr = {
  number: number
  title: string
  mergedAt: string
  author: { login: string }
}

export const fetchMergedPRs = async (sprint: SprintConfig): Promise<Map<string, PRXP[]>> => {
  const result = new Map<string, PRXP[]>()

  for (const repo of sprint.repos) {
    const fullRepo = `${sprint.githubOwner}/${repo}`
    try {
      const prs = await ghJSON<GHPr[]>([
        "pr", "list",
        "--repo", fullRepo,
        "--author", sprint.githubUser,
        "--state", "merged",
        "--limit", "100",
        "--json", "number,title,mergedAt,author",
      ])

      for (const pr of prs) {
        const date = pr.mergedAt.slice(0, 10)
        if (date < sprint.startDate || date > sprint.endDate) continue
        const entry: PRXP = {
          repo, number: pr.number, title: pr.title,
          mergedAt: pr.mergedAt, xp: 25,
        }
        const existing = result.get(date) ?? []
        existing.push(entry)
        result.set(date, existing)
      }
    } catch (e) {
      console.error(`  warn: failed fetching PRs for ${fullRepo}: ${e}`)
    }
  }

  return result
}

export const fetchReviews = async (sprint: SprintConfig): Promise<Map<string, ReviewXP[]>> => {
  const result = new Map<string, ReviewXP[]>()

  for (const repo of sprint.repos) {
    const fullRepo = `${sprint.githubOwner}/${repo}`
    try {
      const prs = await ghJSON<GHPr[]>([
        "pr", "list",
        "--repo", fullRepo,
        "--state", "merged",
        "--search", `reviewed-by:${sprint.githubUser}`,
        "--limit", "100",
        "--json", "number,title,mergedAt,author",
      ])

      for (const pr of prs) {
        if (pr.author.login === sprint.githubUser) continue
        const date = pr.mergedAt.slice(0, 10)
        if (date < sprint.startDate || date > sprint.endDate) continue
        const entry: ReviewXP = {
          repo, number: pr.number, title: pr.title,
          reviewedAt: pr.mergedAt, xp: 15,
        }
        const existing = result.get(date) ?? []
        existing.push(entry)
        result.set(date, existing)
      }
    } catch (e) {
      console.error(`  warn: failed fetching reviews for ${fullRepo}: ${e}`)
    }
  }

  return result
}
