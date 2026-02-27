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
      <HeroCard gradient="gradient-amber" icon="⚡" title="Markets — Risk-Off Friday Morning">
        January PPI +0.5% MoM vs +0.3% expected. Core PPI +0.8% vs +0.3%. US futures gapped down at open.
        All three benchmarks (S&P, Nasdaq, Dow) are in the red for February. VIX above 21. Brazil is a
        bright spot: Ibovespa near ATH at 191K and BRL at strongest since May 2024. Argentina has record
        BCRA reserves but country risk approaching 600 bps.
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

      <Alert type="red" icon="🔴">
        <strong className="text-gray-900">PPI Inflation Shock (Fri 27 Feb):</strong> January PPI +0.5% MoM vs +0.3% consensus. Core PPI +0.8% vs +0.3%. Highest core reading since mid-2024. Fed March cut probability has collapsed to ~0%. Futures gap-down opened: S&P −0.6%, Nasdaq −0.7%, Dow −1.1%. This directly pressures SPY, QQQ, DIA CEDEARs — your three largest ETF positions.
      </Alert>

      <SectionLabel>Argentina</SectionLabel>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <TickerCard label="Merval" color="c-blue"
          value={markets.merval?.price ? fmt(markets.merval.price) : "2,760K"}
          change={markets.merval?.pct_change ? pctStr(markets.merval.pct_change) : "▲ +0.3% ARS Thu"}
          note="Flat for February overall" />
        <TickerCard label="Country Risk EMBI" color="c-amber"
          value="554 bps" change="▲ +9 vs 25 Feb"
          note="Approaching 600 — repricing" />
        <TickerCard label="USD/ARS Oficial" color="c-blue"
          value="~1,380" change="▼ MTD −4.9%"
          note="16% below band ceiling $1,595" />
        <TickerCard label="BCRA Reservas" color="c-teal"
          value="$46.9B" change="▲ +$2.64B YTD"
          note="Highest since Oct 2019 · 37 buying sessions" />
      </div>

      <Alert type="amber" icon="⚡">
        <strong className="text-gray-900">Divergence:</strong> Country risk rising toward 600 bps even as reserves hit 6-year high. Bond prices declining (GD38 −0.5%) despite BCRA strength — political risk being priced ahead of June coupon cycle. CCL ~1,440 · spread vs oficial ~4.4%.{" "}
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

      <WideCard title="Portfolio Signals Today">
        <SignalRow ticker="NVDA" move="~−8%" moveStyle="down">
          Beat Q4 ($68.1B sales) but market sold the news — hyperscaler capex sustainability questioned.
          Broadcom, Oracle, MSFT each −2.5%. Down ~8% over 2 sessions.
        </SignalRow>
        <SignalRow ticker="SPY / QQQ / DIA" move="Gap-Down" moveStyle="down">
          PPI shock directly pressures these three ETF positions (~28.5M ARS combined). US futures
          gap-down. Consider this your largest single risk factor today.
        </SignalRow>
        <SignalRow ticker="NU / STNE / PAGS / BBD" move="BRL +" moveStyle="up">
          Brazil fintech cluster (~23M ARS) benefits from BRL at 21-month high and 15% Selic carry.
          Ibovespa commodity weighting insulates from Nasdaq AI selloff.
        </SignalRow>
        <SignalRow ticker="YPFD / VIST" move="Mixed" moveStyle="flat">
          YPF ADR +0.3% at $36.54 Thu. Q4 net loss $799M FY2025 published. Brent above $71 provides
          support. VIST monitor amid energy sector volatility.
        </SignalRow>
        <SignalRow ticker="BABA / JD" move="Tariff risk" moveStyle="down">
          US-China tariff trajectory in legal flux. USTR Greer signaling 35–50% China tariffs via new
          legal authority. Both names carry elevated tariff risk.
        </SignalRow>
        <SignalRow ticker="S16M6 Letes" move="Action needed" moveStyle="flat">
          Mature March 16. CCL spread ~4.4% narrows ARS carry advantage. Decide: rollover into new
          letes, FCI, or USD conversion. Window is 2 weeks.
        </SignalRow>
      </WideCard>
    </div>
  );
}
