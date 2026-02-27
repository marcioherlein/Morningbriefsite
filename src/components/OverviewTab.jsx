import { HeroCard, Card, WideCard } from "./UI";

export default function OverviewTab({ data }) {
  const p = data?.portfolio;
  const totalUsd = p ? Math.round(p.total_usd_mep).toLocaleString("es-AR") : "—";
  const totalArs = p ? Math.round(p.total_ars / 1e6).toFixed(1) : "—";

  return (
    <div className="space-y-6 fade-up">
      <HeroCard gradient="gradient-blue" icon="✨" title="Good Morning — Here's Your Daily Brief">
        US equity futures are sharply lower this morning following a PPI inflation shock: January PPI came
        in at +0.5% MoM vs +0.3% expected, with core PPI at +0.8% vs +0.3%. All three US benchmarks are
        in the red for February. On the positive side, your Brazil-exposed positions are benefiting from
        the BRL at a 21-month high, and your Argentine utility and energy holdings remain solid amid record
        BCRA reserve accumulation. Nine EU regulatory deadlines are active or approaching within 6 months
        — requiring action today.
      </HeroCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Market Sentiment" icon="📈" pill="Risk-Off" pillStyle="pill-down">
          US futures gap-down Friday morning: S&P −0.6%, Nasdaq −0.7%, Dow −1.1%. Catalyst is the Jan PPI
          inflation surprise. VIX above 21 — elevated anxiety. Fed March cut probability now ~0%. Your SPY
          and QQQ CEDEARs are the largest exposure to this selloff at combined ~24.5M ARS. Brazil
          (Ibovespa near ATH at 191K) and Argentina (Merval flat for February) are holding.
        </Card>

        <Card title="Portfolio Snapshot" icon="💼" pill={`~${totalArs}M ARS`} pillStyle="pill-blue">
          Total portfolio value approximately {totalArs}M ARS / ${totalUsd} USD MEP. Largest CEDEAR positions:
          SPY (16.2M), NU (9.8M), QQQ (8.3M), PAGS (7.5M), TSM (6.7M). Brazil fintech/banking cluster
          (NU, STNE, PAGS, BBD, EWZ) benefiting from BRL strength. NVDA down ~8% over 2 sessions
          post-earnings. S16M6 letes mature March 16 — rollover decision needed within 2 weeks.
        </Card>

        <Card title="Regulatory Alert" icon="⚖️" pill="6 Active" pillStyle="pill-amber">
          EU AI Act HRAI compliance deadline is <strong className="text-gray-900">August 2, 2026</strong> — 157 days.
          Commission missed its own Feb 2 guidance deadline. CRA vulnerability reporting goes live{" "}
          <strong className="text-gray-900">September 11, 2026</strong>. Germany NIS2 registration deadline is{" "}
          <strong className="text-gray-900">~April 2026</strong> (3 months). DORA is in active enforcement.
          GDPR coordinated enforcement on transparency obligations is running now. No blanket extensions
          are law yet.
        </Card>

        <Card title="Geopolitical Update" icon="🌐" pill="Flux" pillStyle="pill-amber">
          SCOTUS struck IEEPA tariffs Feb 20; Trump signed new 10% global tariff EO same day under
          alternate authority. USTR Greer signaling 35–50% China tariffs via yet another legal vehicle.
          Affects BABA and JD CEDEARs. BRL at strongest since May 2024 (5.14) on R$33B+ foreign inflows
          and 15% Selic carry. Argentine country risk approaching 600 bps despite record $46.9B BCRA
          reserves.
        </Card>
      </div>

      <WideCard title="Today's Key Actions">
        <ul className="space-y-3">
          {[
            {
              text: <>
                <strong className="text-gray-900">S16M6 Letes (5.2M ARS)</strong> mature March 16 — decide
                rollover destination vs ARS/USD conversion. CCL spread at 4.4% narrows ARS carry advantage.
              </>,
            },
            {
              text: <>
                <strong className="text-gray-900">Germany NIS2 registration</strong> deadline ~April 2026:
                confirm SAP BSI registration process is underway. 3 months remaining.
              </>,
            },
            {
              text: <>
                <strong className="text-gray-900">EU AI Act Aug 2 deadline</strong>: confirm Joule AI
                high-risk classification assessment is complete. Commission missed Article 6 guidance —
                do not wait for it.
              </>,
            },
            {
              text: <>
                <strong className="text-gray-900">NVDA CEDEAR (180 shares, 2.2M ARS)</strong>: down ~8%
                post-earnings. Decide whether to add on dip or reduce tech concentration given
                QQQ/SPY/ARKK overlap.
              </>,
            },
            {
              text: <>
                <strong className="text-gray-900">CRA CAB notification</strong> deadline June 11, 2026 — 3.5
                months. Initiate CAB selection process if not started.
              </>,
            },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0 mt-[7px]" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </WideCard>
    </div>
  );
}
