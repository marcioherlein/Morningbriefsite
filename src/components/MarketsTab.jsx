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

      <Alert type="green" icon="🟢">
        <strong className="text-gray-900">Record Close Apr 16:</strong> S&P 500 at 7,022 and Nasdaq at 24,890 both closed at all-time highs. Mag7 +18% from Mar 30 low. TSMC Q1 beat: +35% revenue, +58% earnings, guided full-year +30%. Markets pricing in Iran deal despite active naval blockade. Key risk: ceasefire expires ~April 22 and second-round talks have no confirmed date.
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

      <WideCard title="Portfolio Signals — April 17">
        <SignalRow ticker="NVDA / TSM" move="+8–22% YTD" moveStyle="up">
          TSM Q1: revenue +35%, earnings +58%, full-year guidance +30%. NVDA Ising (quantum AI) launched
          Apr 14. Both recovering from war lows. NVDA May 20 earnings is the next major catalyst.
        </SignalRow>
        <SignalRow ticker="SPY / QQQ" move="ATH" moveStyle="up">
          S&P 500 and Nasdaq at new all-time records. Mag7 +18% from March 30 low. Maintain positions —
          ceasefire expiry April 22 is the near-term risk. Hold, don't add at record highs.
        </SignalRow>
        <SignalRow ticker="NU / STNE / PAGS" move="+22–28% YTD" moveStyle="up">
          Brazil fintech cluster performing strongly on EM risk-on + BRL stability. NU guided +30%
          revenue growth 2026. Selic at 15% = strong net interest margins.
        </SignalRow>
        <SignalRow ticker="VIST / YPFD" move="−2 to −6% MTD" moveStyle="down">
          Energy trimmed correctly post-ceasefire. Brent fell from $119 peak to $96. Keep remaining
          25–30% stub as hedge — ceasefire could still collapse by April 22.
        </SignalRow>
        <SignalRow ticker="GGAL / GD38" move="+11% YTD (bonds)" moveStyle="up">
          Country risk compressing from 633 → 560. GGAL still −15% below analyst target of $66–72.
          Add if country risk breaks 530 bps.
        </SignalRow>
        <SignalRow ticker="BABA / JD" move="+38 / +27% YTD" moveStyle="up">
          China tech cluster outperforming on EM rotation and AI spending confirmation. Small
          positions — continue to hold.
        </SignalRow>
      </WideCard>
    </div>
  );
}
