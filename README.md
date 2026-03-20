# Quest

Sprint gamification CLI that turns your dev work into an RPG. Track GitHub PRs, code reviews, and tasks — earn XP, level up, maintain streaks, and unlock achievements.

Built with [Bun](https://bun.sh) + TypeScript.

## Install

```bash
bun install
bun link
```

## Usage

```bash
# create a sprint
quest new-sprint --id s1 --name "Sprint 1" --start 2026-03-01 --end 2026-03-14

# sync GitHub data & calculate stats
quest sync

# terminal summary
quest status

# open HTML dashboard in browser
quest dashboard

# archive sprint when done
quest end-sprint
```

## Commands

| Command | Description |
|---|---|
| `new-sprint` | Create sprint config (`--id`, `--name`, `--start`, `--end`, optional `--repos`, `--owner`, `--user`) |
| `sync` | Fetch PRs, reviews, tasks from GitHub + Sibyl; compute XP, levels, streaks, achievements |
| `status` | Print level, XP, streaks, tasks, achievements to terminal |
| `dashboard` | Run sync + generate interactive HTML dashboard (auto-opens) |
| `end-sprint` | Archive current sprint to `~/.quest/history/` |

## XP System

| Source | XP |
|---|---|
| Task completed | `priority × 15` |
| PR merged | 25 |
| Code review | 15 |

Tasks are read from [Sibyl](https://github.com/walteraandrade/sibyl) session files (`~/.sibyl/{date}/session.json`).

## Streaks

- A day is **productive** if raw XP ≥ 60
- 3+ consecutive productive days activates a **1.5× XP multiplier**
- Streak resets on unproductive days

## Levels

Exponential curve: level _n_ requires `round(100 × 1.4^n)` XP. Progress tracked per-level.

## Achievements

| Achievement | Condition |
|---|---|
| Streak Lord 🔥 | 5 consecutive productive days |
| PR Machine ⚡ | 5 PRs merged in a single day |
| Sprint Closer 🏆 | Complete all sprint tasks |
| Pro Reviewer 👁 | 5+ reviews in a single day |

## Dashboard

Self-contained HTML with dark theme:
- Level/XP progress bar
- Stats grid (XP, level, streaks, counts)
- Achievement cards (locked/unlocked)
- Streak calendar heatmap
- Daily XP stacked bar chart (tasks/PRs/reviews)

## Data

All state stored in `~/.quest/`:

```
~/.quest/
├── sprint.json          # active sprint config
├── state.json           # current game state
├── dashboard.html       # generated dashboard
└── history/             # archived sprints
    └── {sprintId}.json
```

## Prerequisites

- [Bun](https://bun.sh) runtime
- [GitHub CLI](https://cli.github.com/) (`gh`) authenticated
- [Sibyl](https://github.com/walteraandrade/sibyl) (optional, for task tracking)
