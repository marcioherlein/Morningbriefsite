import { HeroCard, WideCard, Alert, TickerCard, SectionLabel } from "./UI";

function SignalRow({ ticker, children, move, moveStyle = "flat" }) {
  const clr = moveStyle === "up" ? "text-green-600" : moveStyle === "down" ? "text-red-500" : "text-gray-500";
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className="text-xs font-bold text-gray-900 min-w-[80px] pt-0.5">{ticker}</div>
      <div className="flex-1 text-[13px] text-gray-600 leading-relaxed">{children}</div>
      <div className={`text-xs font-semibold min-w-[80px] text-right pt-0.5 ${clr}`}>{move}</div>
    </div>
  );
}

export default function MarketsTab({ data }) {
  const markets = data?.markets || {};
  const fx = data?.fx || {};

  const fmt = (n, d = 0) => n != null ? n.toLocaleString("es-AR", { maximumFractionDigits: d }) : "—";
  const pctStr = (n) => n != null ? `${n > 0 ? "▲ +" : "▼ "}${Math.abs(n).toFixed(2)}%` : "—";
  const pctClr = (n) => n > 0 ? "text-green-600" : n < 0 ? "text-red-600" : "text-gray-500";

  return (
    <div className="space-y-6 fade-up">
      <HeroCard gradient="gradient-green" icon="📈" title="Markets — S&P 500 & Nasdaq at All-Time Highs · War Day 48">
        S&P 500 at <strong>7,022</strong> (record) · Nasdaq at <strong>24,890</strong> (record). +9.8% in 10 sessions —
        fastest rebound since COVID 2020. TSMC Q1: revenue +35%, earnings +58%. AI demand confirmed. Brent ~$96, still
        elevated. VIX below 20. Second round US-Iran talks: no date set but expected soon. Ceasefire expires ~April 22.
        Macron/Starmer Hormuz coalition summit happening today (40 nations).
      </HeroCard>

      <SectionLabel>US Equities</SectionLabel>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <TickerCard
          label="S&P 500" color="c-red"
          value={markets.sp500?.price ? fmt(markets.sp500.price) : "6,909"}
          change={markets.sp500?.pct_change ? pctStr(markets.sp500.pct_change) + " " + fmt(markets.sp500.pct_change, 2) + "%" : "▼ −0.54%"}
          note="Fri open ~−0.6%"
        />
        <TickerCard
          label="Nasdaq 100" color="c-red"
          value={markets.nasdaq?.price ? fmt(markets.nasdaq.price) : "22,878"}
          change={markets.nasdaq?.pct_change ? pctStr(markets.nasdaq.pct_change) : "▼ −1.18%"}
          note="Fri open ~−0.7%"
        />
        <TickerCard
          label="VIX" color="c-amber"
          value="21.1"
          change="▲ Elevated >20"
          note="Fear zone. Watch 25"
        />
        <TickerCard
          label="Dow Jones" color="c-red"
          value={markets.dow?.price ? fmt(markets.dow.price) : "43,239"}
          change={markets.dow?.pct_change ? pctStr(markets.dow.pct_change) : "▼ Fri open ~−1.1%"}
          note="All 3 indices red for Feb"
        />
      </div>

      <Alert type="red" icon="🚨">
        <strong className="text-gray-900">Escalation Weekend (Apr 19–20):</strong> Iran fired on French/British vessels → US seized MV Touska (900ft cargo ship, Gulf of Oman) → Iran re-closed Hormuz → ceasefire expires Wed. S&P futures −1%. Brent +6% to ~$97 reversing Friday's 9% plunge. The "Hormuz open" trade from Friday is now completely reversed. Ceasefire collapse = Brent back to $110+, S&P corrects 5-8% from ATH.
      </Alert>

      <SectionLabel>Argentina</SectionLabel>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <TickerCard label="Merval" color="c-blue"
          value={markets.merval?.price ? fmt(markets.merval.price) : "2,760K"}
          change={markets.merval?.pct_change ? pctStr(markets.merval.pct_change) : "▲ +0.3% ARS Thu"}
          note="Flat for February overall" />
        <TickerCard label="Country Risk EMBI" color="c-amber"
          value="~560 bps" change="▼ From 633 peak"
          note="Compressing on ceasefire + agro season" />
        <TickerCard label="USD/ARS MEP" color="c-blue"
          value="~1,160" change="Stable in band"
          note="Well below band ceiling — BCRA buying" />
        <TickerCard label="BCRA Reservas" color="c-teal"
          value="~$46B" change="▲ April agro harvest"
          note="Soybean liquidation season — peak buying" />
      </div>

      <Alert type="green" icon="⚡">
        <strong className="text-gray-900">Argentina recovery on track:</strong> Country risk compressing from 633 peak toward 560 on ceasefire + April soybean liquidation. GD38 +11.2% YTD. GGAL + BMA re-rating as credit spreads tighten. BCRA buying dollars daily in agro season — historically the best month for AR assets.{" "}
        {fx.usd_mep && <>Dólar MEP <strong className="text-gray-900">~${fmt(fx.usd_mep)}</strong>.</>}
      </Alert>

      <SectionLabel>Brazil</SectionLabel>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <TickerCard label="Ibovespa" color="c-green"
          value="191,247" change="▼ −0.13% Thu"
          note="ATH 192,623 Wed · 7th consecutive monthly gain" />
        <TickerCard label="USD/BRL" color="c-green"
          value={markets.usdbrl?.price ? fmt(markets.usdbrl.price, 4) : "5.1392"}
          change="BRL strongest since May 2024"
          note="Selic 15% · USD −6.87% YTD vs BRL" />
        <TickerCard label="Foreign Inflows" color="c-blue"
          value="R$33B+" change="▲ YTD 2026"
          note="Carry trade driving BRL strength" />
        <TickerCard label="Selic Rate" color="c-amber"
          value="15.0%" change="Unchanged"
          note="BCB watch China disinflationary exports" />
      </div>

      <WideCard title="Portfolio Signals — April 20 🚨">
        <SignalRow ticker="SPY / QQQ / DIA" move="Futures −1%" moveStyle="down">
          Gap-down open expected. ATH was 7,022 (S&P) and Dow 49,447. Do NOT add here — wait for
          ceasefire clarity by Thursday. This is either a buying dip (if Islamabad works) or the
          start of a 5-8% correction (if ceasefire collapses).
        </SignalRow>
        <SignalRow ticker="NVDA / TSM" move="Watch open" moveStyle="down">
          Tech names down in pre-market on risk-off. Structurally intact — TSMC Q1 +35%/+58% still
          the strongest semiconductor print in years. NVDA May 20 catalyst intact. Hold; don't add into
          this uncertainty.
        </SignalRow>
        <SignalRow ticker="VIST / YPFD / PBR" move="Brent +6% hedge" moveStyle="up">
          Your remaining energy stub is doing its job today. Brent back to $97 after Friday's 9% crash.
          The trim you did at $96-102 was correct. Keep the stub as Scenario 3 insurance through Wed.
        </SignalRow>
        <SignalRow ticker="NU / STNE / PAGS" move="EM risk-off watch" moveStyle="flat">
          Brazil fintech at risk if EM sentiment deteriorates on ceasefire collapse. BRL may weaken.
          Monitor closely — if S&P corrects 5%+, Brazil cluster follows with leverage.
        </SignalRow>
        <SignalRow ticker="GD38 / GGAL" move="Risk-off caution" moveStyle="flat">
          Argentina bonds and financials vulnerable to EM risk-off. Country risk may tick back up from
          ~560. GGAL add threshold unchanged: wait for 530 bps, now moving away not toward it.
        </SignalRow>
        <SignalRow ticker="BABA / JD" move="Hold" moveStyle="flat">
          China names provide some diversification. Hold small positions — no action needed today.
        </SignalRow>
      </WideCard>
    </div>
  );
}
