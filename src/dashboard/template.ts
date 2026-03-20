export const htmlShell = (title: string, body: string, dataScript: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --bg: #111318;
      --bg-card: #191c24;
      --bg-elevated: #1e222c;
      --border: #2a2e3a;
      --border-accent: #363b4a;
      --text: #e2e4ea;
      --text-2: #8b90a0;
      --text-3: #555a6e;
      --blue: #5b9cf6;
      --blue-dim: #1a2540;
      --purple: #a78bfa;
      --purple-dim: #261e48;
      --green: #4ade80;
      --green-dim: #14332a;
      --orange: #f59e0b;
      --orange-dim: #2d1f08;
      --red: #ef4444;
      --red-dim: #2d1111;
      --yellow: #eab308;
      --font: 'Plus Jakarta Sans', system-ui, sans-serif;
      --mono: 'JetBrains Mono', monospace;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font);
      line-height: 1.6;
      min-height: 100vh;
    }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 28px; }

    header {
      padding: 40px 0 20px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }

    .header-title {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .header-title span { color: var(--blue); }

    .header-sub {
      font-size: 0.8rem;
      color: var(--text-3);
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-top: 4px;
    }

    .header-badges {
      display: flex;
      gap: 10px;
      flex-shrink: 0;
    }

    .badge {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 5px 14px;
      font-family: var(--mono);
      font-size: 0.75rem;
      color: var(--text-2);
    }

    .badge strong { color: var(--text); font-weight: 600; }

    .xp-bar-container {
      padding: 24px 0 0;
    }

    .xp-bar-label {
      display: flex;
      justify-content: space-between;
      font-family: var(--mono);
      font-size: 0.75rem;
      color: var(--text-2);
      margin-bottom: 8px;
    }

    .xp-bar-track {
      background: var(--bg-elevated);
      border-radius: 8px;
      height: 12px;
      overflow: hidden;
      border: 1px solid var(--border);
    }

    .xp-bar-fill {
      height: 100%;
      border-radius: 8px;
      background: linear-gradient(90deg, var(--blue), var(--purple));
      transition: width 0.3s ease;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      padding: 24px 0;
    }

    .stat {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px 20px;
    }

    .stat-label {
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-3);
      margin-bottom: 4px;
    }

    .stat-value {
      font-family: var(--mono);
      font-size: 1.5rem;
      font-weight: 600;
    }

    .stat-detail {
      font-size: 0.75rem;
      color: var(--text-3);
      font-family: var(--mono);
      margin-top: 2px;
    }

    .section { padding: 32px 0; }

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }

    .section-num {
      font-family: var(--mono);
      font-size: 0.65rem;
      font-weight: 600;
      color: var(--text-3);
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 2px 8px;
    }

    .section-title { font-size: 1.1rem; font-weight: 700; }

    .section-line { flex: 1; height: 1px; background: var(--border); }

    .achievements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 12px;
    }

    .achievement-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px 20px;
      display: flex;
      gap: 14px;
      align-items: center;
    }

    .achievement-card.locked { opacity: 0.35; }

    .achievement-icon { font-size: 1.8rem; }

    .achievement-name { font-weight: 600; font-size: 0.9rem; }

    .achievement-desc { font-size: 0.75rem; color: var(--text-2); }

    .achievement-date { font-size: 0.65rem; color: var(--text-3); font-family: var(--mono); }

    .chart-wrapper {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      overflow-x: auto;
    }

    .legend {
      display: flex;
      gap: 20px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      color: var(--text-2);
    }

    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 2px;
    }

    footer {
      padding: 40px 0;
      text-align: center;
      font-size: 0.7rem;
      color: var(--text-3);
      border-top: 1px solid var(--border);
    }

    @media (max-width: 768px) {
      .stats { grid-template-columns: repeat(2, 1fr); }
      .achievements-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="container">
    ${body}
    <footer>Quest — Sprint Gamification • Generated ${new Date().toLocaleString()}</footer>
  </div>
  <script>${dataScript}</script>
</body>
</html>`
