import { HeroCard, Card, WideCard } from "./UI";

export default function OverviewTab({ data }) {
  const p = data?.portfolio;
  const totalUsd = p ? Math.round(p.total_usd_mep).toLocaleString("es-AR") : "—";
  const totalArs = p ? Math.round(p.total_ars / 1e6).toFixed(1) : "—";

  return (
    <div className="space-y-6 fade-up">
      <HeroCard gradient="gradient-green" icon="🕊️" title="War Day 48 — S&P & Nasdaq at All-Time Highs Despite Active War">
        The market has done something remarkable: <strong>S&P 500 and Nasdaq closed at record highs on April 16</strong>,
        up 9.8% in 10 sessions — the fastest 10-session rebound since the COVID bounce in 2020. Hormuz is still
        blocked, oil is still at $96 Brent, and the ceasefire expires in ~5 days. Markets are pricing in an
        eventual deal. Today's catalysts: <strong>Macron/Starmer Hormuz coalition summit (40 nations, RIGHT NOW)</strong>
        and Trump saying the war is "very close to over." Second round of US-Iran talks has no date set but
        Pakistan is actively mediating.
      </HeroCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Market Regime — ATH Despite War" icon="📈" pill="New All-Time High" pillStyle="pill-up">
          S&P 500 at ~7,022 (+0.5% Thu) — <strong className="text-gray-900">new record</strong>. Nasdaq at ~24,890
          — <strong className="text-gray-900">new record</strong>. The 9.8% 10-session surge was faster than
          post-Liberation Day 2025. Mag7 up ~18% from the March 30 low. TSMC Q1: revenue +35%, earnings +58% —
          AI demand confirmed unstoppable. Trump: Iran war "very close to over." Brent ~$96, still +37% YTD.
          IMF cut 2026 GDP to 3.1%, raised inflation to 4.4%. VIX back below 20.
        </Card>

        <Card title="Portfolio Snapshot" icon="💼" pill={`~${totalArs}M ARS`} pillStyle="pill-blue">
          Portfolio ~{totalArs}M ARS / ~${totalUsd} USD MEP. Tech recovery driving gains: TSM +22.5% YTD,
          NU +22% YTD, NVDA +8.2% YTD (recovering from war lows). Energy positions trimmed correctly — VIST
          −2.1% MTD, YPFD −5.8% MTD as Brent retreats from $119 peak. Brazil fintech cluster (NU, STNE, PAGS)
          strong on EM risk-on. Argentina bonds (GD38 +11.2% YTD) recovering as country risk compresses
          toward 560 bps from 633 peak.
        </Card>

        <Card title="⚠️ Regulatory Urgency" icon="⚖️" pill="107 Days to Aug 2" pillStyle="pill-red">
          <strong className="text-gray-900">EU AI Act HRAI: 107 days</strong> to August 2. Legal strategy
          decision overdue — extension request, pause Joule EU HR/Finance, or accept risk with mitigation.
          Gulf clients resuming = Joule pipeline accelerating = non-compliance in Q3 would be maximally
          painful. <strong className="text-gray-900">CRA CABs: 55 days</strong> to June 11. NIS2 Germany
          BSI — confirm filed.
        </Card>

        <Card title="🌍 Geopolitics — Ceasefire Expires ~Apr 22" icon="🌐" pill="~5 Days Left" pillStyle="pill-amber">
          Islamabad talks (Apr 11–12) failed — nuclear enrichment the sticking point. Trump declared US
          naval blockade of Iranian ports (Apr 13). Iran mines still in Hormuz. <strong className="text-gray-900">
          Today: Macron/Starmer Paris summit</strong> — 40 nations planning "Freedom of Navigation Initiative"
          for post-ceasefire Hormuz reopening (strictly defensive, excludes US). Second round of US-Iran talks:
          no date set but Trump says "looking very good." Ceasefire expires ~April 22.
        </Card>
      </div>

      <WideCard title="Today's Key Actions — April 17">
        <ul className="space-y-3">
          {[
            {
              text: <>
                <strong className="text-gray-900">EU AI Act (107 days) — Legal decision this week.</strong>{" "}
                With Gulf clients re-engaging and Joule pipeline accelerating post-ceasefire, a Q3 enforcement
                action would be maximally damaging. Three options: (1) regulatory extension citing Commission's
                own Feb 2 guidance failure, (2) pause Joule EU HR/Finance deployment, (3) accept non-compliance
                with documented mitigation. Legal leadership must decide now.
              </>,
            },
            {
              text: <>
                <strong className="text-gray-900">Ceasefire ~April 22 expiry — Watch for 2nd round of US-Iran talks.</strong>{" "}
                Trump said Thursday talks are "looking very good." Pakistan is actively mediating. If second
                round announced before April 22, ceasefire extends and oil falls toward $85. If no talks,
                oil spikes back toward $110 and markets correct. Key tripwire: Lebanese ceasefire — Israel
                must halt Lebanon operations for Iran to accept nuclear framework.
              </>,
            },
            {
              text: <>
                <strong className="text-gray-900">Macron/Starmer Hormuz summit happening now.</strong>{" "}
                40 nations planning "strictly defensive" post-ceasefire maritime mission. Mine-clearing,
                naval escorts, insurance framework. US excluded. SAP opportunity: Gulf energy clients
                resuming procurement — energy vertical proposals should be in motion this week.
              </>,
            },
            {
              text: <>
                <strong className="text-gray-900">NVDA + TSM: ATH regime confirmed.</strong>{" "}
                TSMC Q1: +35% revenue, +58% earnings. Full-year guidance: +30% revenue. AI capex
                structurally intact. NVDA Ising quantum AI launched April 14. May 20 NVDA earnings
                is the next major catalyst. Hold and consider adding on any Iran-related dip.
              </>,
            },
            {
              text: <>
                <strong className="text-gray-900">CRA CABs: 55 days (June 11).</strong>{" "}
                Initiate CAB selection if not already started. Waiting further reduces available
                conformity assessment bodies. NIS2 Germany BSI — confirm registration filed.
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
