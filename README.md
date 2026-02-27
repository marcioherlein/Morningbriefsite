# Morning Briefing — Portfolio Dashboard

React/Vite app with live portfolio data fed by a local Python script.

## Architecture

```
scripts/update_data.py   ← you run this manually (7am / 6pm ART)
        │
        ▼
public/data.json         ← single source of truth
        │
        ▼ (git push → GitHub Pages / Vercel / Netlify)
React app (reads /data.json at load)
```

---

## Setup

### 1. Python script (data updater)

```bash
pip install yfinance pytz pandas
```

### 2. Node / app

```bash
npm install
npm run dev          # local dev on :5173
npm run build        # dist/ for deployment
```

### 3. Git remote

```bash
git remote add origin https://github.com/marcioherlein/Morningbriefsite.git
git push -u origin main
```

---

## Daily Workflow

### Morning (7am ART, before markets open)

```bash
python3 scripts/update_data.py
git add public/data.json
git commit -m "data: $(date '+%Y-%m-%d %H:%M') pre-market"
git push
```

### Evening (6pm ART, after Merval close)

```bash
python3 scripts/update_data.py
git add public/data.json
git commit -m "data: $(date '+%Y-%m-%d %H:%M') post-close"
git push
```

---

## Portfolio Tab Features

- **Total value** in USD MEP and ARS
- **Daily / MTD / YTD gains** (portfolio level and per holding)
- **Allocation chart** by category (CEDEAR US, CEDEAR BR, Acciones AR, Bonos, ONs, etc.)
- **Top Movers** — best/worst 5 for selected period
- **Holdings table** with filter by category and sort by value / day / MTD / YTD

---

## Data Sources

| Data | Source | Method |
|------|--------|--------|
| CEDEAR prices (.BA) | Yahoo Finance | `yfinance` `.BA` tickers |
| US stock prices | Yahoo Finance | `yfinance` |
| USD MEP | GD30 ratio | `GD30.BA / GD30D.BA` |
| Gains reference | Yahoo Finance historical | Dec 31 2025 (YTD), Jan 31 2026 (MTD) |
| CEDEAR fallback | US price × MEP ÷ ratio | When `.BA` unavailable |
| CEDEAR ratios | COMAFI | Hardcoded in script — update periodically |
| ONs, FCI, Letes | Manual | Hardcoded in script — update as needed |

### Updating COMAFI CEDEAR ratios

Go to [comafi.com.ar/2028-CEDEAR](https://www.comafi.com.ar/2028-CEDEAR.note.aspx)
and update the `ratio` field in the `PORTFOLIO` list in `scripts/update_data.py`.

---

## Deployment (recommended: GitHub Pages)

1. `npm run build` → creates `dist/`
2. Push to `gh-pages` branch or configure GitHub Pages to serve `dist/`
3. Alternatively deploy to Vercel/Netlify: drag `dist/` or connect repo

---

## Updating Holdings

When your positions change, edit the `PORTFOLIO` list in `scripts/update_data.py`.
Each entry has: `name`, `ticker_ba`, `ticker_us`, `qty`, `ratio`, `cat`.

For ONs, FCI, and Letes (no Yahoo ticker): set `manual_price_ars` in the script.
