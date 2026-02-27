#!/usr/bin/env python3
"""
Morning Briefing Data Updater
Run at 7am and 6pm ART to refresh portfolio data.

Setup:
    pip install yfinance pytz pandas

Usage:
    python3 scripts/update_data.py
    
Then commit and push:
    git add public/data.json
    git commit -m "data: $(date +%Y-%m-%d\ %H:%M)"
    git push
"""

import json
import sys
from datetime import datetime, timedelta

try:
    import yfinance as yf
    import pytz
    import pandas as pd
except ImportError:
    print("ERROR: Missing dependencies. Run: pip install yfinance pytz pandas")
    sys.exit(1)

# =====================================================================
# PORTFOLIO DEFINITION
# ratio = CEDEAR ratio (1 CEDEAR = 1/ratio US share)
# When .BA price unavailable, uses: US_price * usd_mep / ratio
# =====================================================================
PORTFOLIO = [
    # --- CEDEARs (US market) ---
    {"name": "SPY",    "ticker_ba": "SPY.BA",   "ticker_us": "SPY",   "qty": 317,       "ratio": 10,  "cat": "CEDEAR_US"},
    {"name": "QQQ",    "ticker_ba": "QQQ.BA",   "ticker_us": "QQQ",   "qty": 183,       "ratio": 10,  "cat": "CEDEAR_US"},
    {"name": "DIA",    "ticker_ba": "DIA.BA",   "ticker_us": "DIA",   "qty": 113,       "ratio": 10,  "cat": "CEDEAR_US"},
    {"name": "NVDA",   "ticker_ba": "NVDA.BA",  "ticker_us": "NVDA",  "qty": 180,       "ratio": 10,  "cat": "CEDEAR_US"},
    {"name": "TSLA",   "ticker_ba": "TSLA.BA",  "ticker_us": "TSLA",  "qty": 17,        "ratio": 1,   "cat": "CEDEAR_US"},
    {"name": "META",   "ticker_ba": "META.BA",  "ticker_us": "META",  "qty": 18,        "ratio": 1,   "cat": "CEDEAR_US"},
    {"name": "AMZN",   "ticker_ba": "AMZN.BA",  "ticker_us": "AMZN",  "qty": 250,       "ratio": 10,  "cat": "CEDEAR_US"},
    {"name": "AAPL",   "ticker_ba": "AAPL.BA",  "ticker_us": "AAPL",  "qty": 20,        "ratio": 1,   "cat": "CEDEAR_US"},
    {"name": "TSM",    "ticker_ba": "TSM.BA",   "ticker_us": "TSM",   "qty": 105,       "ratio": 2,   "cat": "CEDEAR_US"},
    {"name": "VIST",   "ticker_ba": "VIST.BA",  "ticker_us": "VIST",  "qty": 135,       "ratio": 1,   "cat": "CEDEAR_US"},
    {"name": "SHOP",   "ticker_ba": "SHOP.BA",  "ticker_us": "SHOP",  "qty": 231,       "ratio": 5,   "cat": "CEDEAR_US"},
    {"name": "BABA",   "ticker_ba": "BABA.BA",  "ticker_us": "BABA",  "qty": 16,        "ratio": 1,   "cat": "CEDEAR_US"},
    {"name": "INFY",   "ticker_ba": "INFY.BA",  "ticker_us": "INFY",  "qty": 3,         "ratio": 1,   "cat": "CEDEAR_US"},
    {"name": "ARKK",   "ticker_ba": "ARKK.BA",  "ticker_us": "ARKK",  "qty": 43,        "ratio": 1,   "cat": "CEDEAR_US"},
    {"name": "CAAP",   "ticker_ba": "CAAP.BA",  "ticker_us": "CAAP",  "qty": 3,         "ratio": 1,   "cat": "CEDEAR_US"},
    {"name": "JD",     "ticker_ba": "JD.BA",    "ticker_us": "JD",    "qty": 31,        "ratio": 1,   "cat": "CEDEAR_US"},
    # --- CEDEARs (Brazil/Other) ---
    {"name": "PBR",    "ticker_ba": "PBR.BA",   "ticker_us": "PBR",   "qty": 32,        "ratio": 3,   "cat": "CEDEAR_BR"},
    {"name": "EWZ",    "ticker_ba": "EWZ.BA",   "ticker_us": "EWZ",   "qty": 29,        "ratio": 3,   "cat": "CEDEAR_BR"},
    {"name": "VALE",   "ticker_ba": "VALE.BA",  "ticker_us": "VALE",  "qty": 389,       "ratio": 5,   "cat": "CEDEAR_BR"},
    {"name": "BBD",    "ticker_ba": "BBD.BA",   "ticker_us": "BBD",   "qty": 624,       "ratio": 5,   "cat": "CEDEAR_BR"},
    {"name": "STNE",   "ticker_ba": "STNE.BA",  "ticker_us": "STNE",  "qty": 357,       "ratio": 3,   "cat": "CEDEAR_BR"},
    {"name": "PAGS",   "ticker_ba": "PAGS.BA",  "ticker_us": "PAGS",  "qty": 1419,      "ratio": 5,   "cat": "CEDEAR_BR"},
    {"name": "NU",     "ticker_ba": "NU.BA",    "ticker_us": "NU",    "qty": 799,       "ratio": 5,   "cat": "CEDEAR_BR"},
    {"name": "LAR",    "ticker_ba": "LAR.BA",   "ticker_us": "LAC",   "qty": 92,        "ratio": 1,   "cat": "CEDEAR_BR"},
    # --- Argentine Equities ---
    {"name": "YPFD",   "ticker_ba": "YPFD.BA",  "ticker_us": None,    "qty": 55,        "ratio": 1,   "cat": "AR_EQUITY"},
    {"name": "PAMP",   "ticker_ba": "PAMP.BA",  "ticker_us": None,    "qty": 724,       "ratio": 1,   "cat": "AR_EQUITY"},
    {"name": "TGSU2",  "ticker_ba": "TGSU2.BA", "ticker_us": None,    "qty": 296,       "ratio": 1,   "cat": "AR_EQUITY"},
    {"name": "EDN",    "ticker_ba": "EDN.BA",   "ticker_us": None,    "qty": 893,       "ratio": 1,   "cat": "AR_EQUITY"},
    {"name": "METR",   "ticker_ba": "METR.BA",  "ticker_us": None,    "qty": 1032,      "ratio": 1,   "cat": "AR_EQUITY"},
    {"name": "CEPU",   "ticker_ba": "CEPU.BA",  "ticker_us": None,    "qty": 530,       "ratio": 1,   "cat": "AR_EQUITY"},
    {"name": "LOMA",   "ticker_ba": "LOMA.BA",  "ticker_us": None,    "qty": 315,       "ratio": 1,   "cat": "AR_EQUITY"},
    {"name": "TXAR",   "ticker_ba": "TXAR.BA",  "ticker_us": None,    "qty": 434,       "ratio": 1,   "cat": "AR_EQUITY"},
    {"name": "AUSO",   "ticker_ba": "AUSO.BA",  "ticker_us": None,    "qty": 239,       "ratio": 1,   "cat": "AR_EQUITY"},
    {"name": "CELU",   "ticker_ba": "CELU.BA",  "ticker_us": None,    "qty": 248,       "ratio": 1,   "cat": "AR_EQUITY"},
    {"name": "IRSA",   "ticker_ba": "IRSA.BA",  "ticker_us": None,    "qty": 1,         "ratio": 1,   "cat": "AR_EQUITY"},
    {"name": "ECOG",   "ticker_ba": "ECOG.BA",  "ticker_us": None,    "qty": 28,        "ratio": 1,   "cat": "AR_EQUITY"},
    # --- Argentine Sovereign Bonds ---
    {"name": "GD30",   "ticker_ba": "GD30.BA",  "ticker_us": None,    "qty": 7,         "ratio": 1,   "cat": "AR_BOND"},
    {"name": "GD35",   "ticker_ba": "GD35.BA",  "ticker_us": None,    "qty": 10,        "ratio": 1,   "cat": "AR_BOND"},
    {"name": "GD38",   "ticker_ba": "GD38.BA",  "ticker_us": None,    "qty": 35,        "ratio": 1,   "cat": "AR_BOND"},
    {"name": "BPOD7",  "ticker_ba": "BPOD7.BA", "ticker_us": None,    "qty": 4,         "ratio": 1,   "cat": "AR_BOND"},
    {"name": "BPOC7",  "ticker_ba": "BPOC7.BA", "ticker_us": None,    "qty": 4,         "ratio": 1,   "cat": "AR_BOND"},
    {"name": "PARP",   "ticker_ba": "PARP.BA",  "ticker_us": None,    "qty": 1960,      "ratio": 1,   "cat": "AR_BOND"},
    {"name": "BA37D",  "ticker_ba": "BA37D.BA", "ticker_us": None,    "qty": 247,       "ratio": 1,   "cat": "AR_BOND"},
    # --- Corporate Bonds (ONs) - no Yahoo ticker, use last known price from CSV ---
    {"name": "MRCAO",  "ticker_ba": None,       "ticker_us": None,    "qty": 649,       "ratio": 1,   "cat": "AR_ON",  "manual_price_ars": 24500},
    {"name": "LECBO",  "ticker_ba": None,       "ticker_us": None,    "qty": 995,       "ratio": 1,   "cat": "AR_ON",  "manual_price_ars": 32900},
    {"name": "LIC6O",  "ticker_ba": None,       "ticker_us": None,    "qty": 995,       "ratio": 1,   "cat": "AR_ON",  "manual_price_ars": 93410},
    # --- FCI / Money Market (NAV updates daily, manual) ---
    {"name": "COCOSPPA","ticker_ba": None,      "ticker_us": None,    "qty": 516494.49, "ratio": 1,   "cat": "FCI",    "manual_price_ars": 1280.31},
    # --- Letra Tesoro (discounted, manual) ---
    {"name": "S16M6",  "ticker_ba": None,       "ticker_us": None,    "qty": 5057984,   "ratio": 1,   "cat": "AR_LETES","manual_price_ars": 102.95},
]

# Reference dates for gains
DATE_YTD_START = "2025-12-31"
DATE_MTD_START = "2026-01-31"

# COMAFI CEDEAR ratios note:
# Ratios embedded in PORTFOLIO above. Check https://www.comafi.com.ar/2028-CEDEAR.note.aspx periodically.


def fetch_prices_batch(tickers, period="5d"):
    """Download a batch of tickers. Returns {ticker: {price, prev_close, pct_change}}"""
    if not tickers:
        return {}
    results = {}
    try:
        raw = yf.download(tickers if len(tickers) > 1 else tickers[0],
                          period=period, auto_adjust=True, progress=False, threads=True)
        closes = raw["Close"] if len(tickers) > 1 else raw["Close"].rename(tickers[0])
        if isinstance(closes, pd.Series):
            closes = closes.to_frame()
        for t in tickers:
            col = closes.get(t)
            if col is None:
                continue
            col = col.dropna()
            if len(col) >= 2:
                results[t] = {
                    "price": round(float(col.iloc[-1]), 4),
                    "prev_close": round(float(col.iloc[-2]), 4),
                    "pct_change": round((float(col.iloc[-1]) / float(col.iloc[-2]) - 1) * 100, 2),
                }
            elif len(col) == 1:
                results[t] = {"price": round(float(col.iloc[0]), 4), "prev_close": None, "pct_change": None}
    except Exception as e:
        print(f"  WARNING batch fetch: {e}", file=sys.stderr)
    return results


def fetch_price_at_date(ticker, date_str):
    """Fetch closing price on or after date_str. Returns float or None."""
    try:
        d_start = datetime.strptime(date_str, "%Y-%m-%d")
        d_end = d_start + timedelta(days=7)
        data = yf.download(ticker, start=date_str, end=d_end.strftime("%Y-%m-%d"),
                           auto_adjust=True, progress=False)
        if not data.empty:
            return round(float(data["Close"].iloc[0]), 4)
    except Exception as e:
        print(f"  WARNING hist {ticker} {date_str}: {e}", file=sys.stderr)
    return None


def main():
    ART = pytz.timezone("America/Argentina/Buenos_Aires")
    now_art = datetime.now(ART)
    print(f"=== Briefing Data Updater — {now_art.strftime('%Y-%m-%d %H:%M ART')} ===\n")

    # ── 1. Current prices ──────────────────────────────────────────
    ba_tickers = list({p["ticker_ba"] for p in PORTFOLIO if p.get("ticker_ba")})
    us_tickers = list({p["ticker_us"] for p in PORTFOLIO if p.get("ticker_us")})

    # Add MEP bonds
    mep_ba = ["GD30.BA", "GD30D.BA"]
    for t in mep_ba:
        if t not in ba_tickers:
            ba_tickers.append(t)

    print(f"Fetching current prices: {len(ba_tickers)} .BA + {len(us_tickers)} US...")
    ba_px  = fetch_prices_batch(ba_tickers, "5d")
    us_px  = fetch_prices_batch(us_tickers, "5d")
    print(f"  Received: {len(ba_px)} .BA, {len(us_px)} US\n")

    # ── 2. USD MEP ─────────────────────────────────────────────────
    gd30_ars = ba_px.get("GD30.BA",  {}).get("price")
    gd30_usd = ba_px.get("GD30D.BA", {}).get("price")
    usd_mep  = round(gd30_ars / gd30_usd, 2) if (gd30_ars and gd30_usd and gd30_usd > 0) else None

    if usd_mep:
        print(f"USD MEP = {usd_mep} (GD30 ARS={gd30_ars}, GD30D={gd30_usd})")
    else:
        usd_mep = 1100.0
        print(f"WARNING: MEP calc failed → using fallback {usd_mep}")
    print()

    # ── 3. Historical reference prices ────────────────────────────
    print("Fetching YTD/MTD reference prices...")
    ytd_ref, mtd_ref = {}, {}

    for p in PORTFOLIO:
        name = p["name"]
        ticker_ba = p.get("ticker_ba")
        ticker_us = p.get("ticker_us")
        ratio     = p["ratio"]

        if not ticker_ba and not ticker_us:
            continue  # manual-only holding

        primary = ticker_ba or ticker_us

        # YTD
        hp = fetch_price_at_date(primary, DATE_YTD_START)
        if hp is None and ticker_us:
            us_hp = fetch_price_at_date(ticker_us, DATE_YTD_START)
            if us_hp:
                hp = (us_hp * usd_mep) / ratio
                print(f"  {name} YTD: US fallback {ticker_us}={us_hp:.2f} USD → {hp:.2f} ARS")
        ytd_ref[name] = hp

        # MTD
        hp2 = fetch_price_at_date(primary, DATE_MTD_START)
        if hp2 is None and ticker_us:
            us_hp2 = fetch_price_at_date(ticker_us, DATE_MTD_START)
            if us_hp2:
                hp2 = (us_hp2 * usd_mep) / ratio
        mtd_ref[name] = hp2

    print()

    # ── 4. Build holdings ─────────────────────────────────────────
    holdings = []
    total_ars = 0.0
    total_daily_gain = 0.0
    total_ytd_gain = 0.0
    total_mtd_gain = 0.0

    for p in PORTFOLIO:
        name      = p["name"]
        cat       = p["cat"]
        qty       = p["qty"]
        ratio     = p["ratio"]
        ticker_ba = p.get("ticker_ba")
        ticker_us = p.get("ticker_us")

        # Current price (ARS)
        cur_data        = ba_px.get(ticker_ba, {}) if ticker_ba else {}
        price_ars       = cur_data.get("price")
        prev_close_ars  = cur_data.get("prev_close")

        # Fallback: US price × MEP / ratio
        if not price_ars and ticker_us:
            ud = us_px.get(ticker_us, {})
            if ud.get("price"):
                price_ars = (ud["price"] * usd_mep) / ratio
                prev_close_ars = ((ud["prev_close"] * usd_mep) / ratio) if ud.get("prev_close") else None

        # Manual price (ONs, FCI, Letes)
        if not price_ars and p.get("manual_price_ars"):
            price_ars = p["manual_price_ars"]

        if not price_ars:
            print(f"  SKIP {name}: no price")
            continue

        value_ars = price_ars * qty
        value_usd = value_ars / usd_mep
        total_ars += value_ars

        def gain(ref_price):
            if ref_price and ref_price > 0:
                pct = round((price_ars / ref_price - 1) * 100, 2)
                abs_ars = round((price_ars - ref_price) * qty, 2)
                return pct, abs_ars
            return None, None

        daily_pct, daily_ars = gain(prev_close_ars)
        ytd_pct,   ytd_ars   = gain(ytd_ref.get(name))
        mtd_pct,   mtd_ars   = gain(mtd_ref.get(name))

        if daily_ars: total_daily_gain += daily_ars
        if ytd_ars:   total_ytd_gain   += ytd_ars
        if mtd_ars:   total_mtd_gain   += mtd_ars

        holdings.append({
            "name": name, "cat": cat, "qty": qty,
            "price_ars":  round(price_ars, 2),
            "value_ars":  round(value_ars, 2),
            "value_usd":  round(value_usd, 2),
            "daily_gain_pct": daily_pct, "daily_gain_ars": daily_ars,
            "ytd_gain_pct":   ytd_pct,   "ytd_gain_ars":   ytd_ars,
            "mtd_gain_pct":   mtd_pct,   "mtd_gain_ars":   mtd_ars,
        })

    holdings.sort(key=lambda x: x["value_ars"], reverse=True)

    # Portfolio-level gain %
    def port_pct(gain_ars):
        base = total_ars - gain_ars
        return round(gain_ars / base * 100, 2) if base > 0 else 0

    # ── 5. Market indices ─────────────────────────────────────────
    idx = fetch_prices_batch(["^GSPC", "^IXIC", "^DJI", "^MERV", "USDBRL=X"], "5d")

    # ── 6. Write JSON ─────────────────────────────────────────────
    output = {
        "meta": {
            "updated_at":  now_art.strftime("%Y-%m-%d %H:%M:%S ART"),
            "updated_iso": now_art.isoformat(),
            "session":     "morning" if now_art.hour < 12 else "closing",
        },
        "fx": {
            "usd_mep":   usd_mep,
            "gd30_ars":  gd30_ars,
            "gd30_usd":  gd30_usd,
        },
        "portfolio": {
            "total_ars":       round(total_ars, 2),
            "total_usd_mep":   round(total_ars / usd_mep, 2),
            "daily_gain_ars":  round(total_daily_gain, 2),
            "daily_gain_pct":  port_pct(total_daily_gain),
            "ytd_gain_ars":    round(total_ytd_gain, 2),
            "ytd_gain_pct":    port_pct(total_ytd_gain),
            "mtd_gain_ars":    round(total_mtd_gain, 2),
            "mtd_gain_pct":    port_pct(total_mtd_gain),
            "holdings":        holdings,
        },
        "markets": {
            "sp500":    idx.get("^GSPC", {}),
            "nasdaq":   idx.get("^IXIC", {}),
            "dow":      idx.get("^DJI",  {}),
            "merval":   idx.get("^MERV", {}),
            "usdbrl":   idx.get("USDBRL=X", {}),
        },
    }

    with open("public/data.json", "w") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    total_usd = total_ars / usd_mep
    print(f"✅  public/data.json written")
    print(f"    Portfolio ARS:   ${total_ars:>15,.0f}")
    print(f"    Portfolio USD:   ${total_usd:>15,.0f}  (MEP {usd_mep})")
    print(f"    Daily gain:      {output['portfolio']['daily_gain_pct']:+.2f}%  (${total_daily_gain:,.0f} ARS)")
    print(f"    YTD gain:        {output['portfolio']['ytd_gain_pct']:+.2f}%  (${total_ytd_gain:,.0f} ARS)")
    print(f"    MTD gain:        {output['portfolio']['mtd_gain_pct']:+.2f}%  (${total_mtd_gain:,.0f} ARS)")
    print(f"    Holdings:        {len(holdings)} / {len(PORTFOLIO)}")
    print()
    print("Next step:")
    print("  git add public/data.json")
    print(f"  git commit -m 'data: {now_art.strftime(\"%Y-%m-%d %H:%M\")}'")
    print("  git push")


if __name__ == "__main__":
    main()
