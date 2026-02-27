import { HeroCard, WideCard } from "./UI";

function SapItem({ color = "", title, children }) {
  return (
    <div className={`sap-item ${color}`}>
      <div className="text-sm font-semibold text-gray-900 mb-2">{title}</div>
      <div className="text-[13px] text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
}

export default function SapTab() {
  return (
    <div className="space-y-6 fade-up">
      <HeroCard gradient="gradient-blue" icon="🔷" title="SAP & Industry Intelligence">
        SAP Q4/FY2025 reported January 29: Cloud strong but Current Cloud Backlog missed badly (16% vs 26%
        expected) — shares fell 14% on the day, the largest single-day drop since October 2020. Root cause:
        large sovereign cloud deals with government termination-for-convenience clauses excluded from backlog
        by accounting definition. CFO explicitly named sovereignty demand as a deal cycle lengthener. This is
        your core ERM risk context for 2026.
      </HeroCard>

      <WideCard title="SAP Key Developments">
        <SapItem color="red" title="Q4 / FY2025 Results — CCB Miss. Shares −14% on Earnings Day.">
          Cloud revenue FY2025 +23–26% cc. Cloud ERP Suite +28–32% cc. Total Cloud Backlog record €77B (+30% cc).
          <strong className="text-gray-900"> Miss:</strong> Current Cloud Backlog grew only 16% vs analyst consensus
          of 26%. SAP guided CCB to "slightly decelerate" in 2026. CEO Klein:{" "}
          <em>"2026 will be the year AI delivers enterprise-scale ROI."</em> Joule AI included in 2/3 of Q4 cloud
          order entries. €10B buyback active from Feb 2026.{" "}
          <strong className="text-gray-900">FY2026 guidance:</strong> Cloud €25.8–26.2B, Op profit €11.9–12.3B,
          FCF ~€10B.
        </SapItem>

        <SapItem color="amber" title="Sovereignty Demand = Deal Delays. CFO Named It on Earnings Call. Delos Is Highest-Risk Active Project.">
          CFO Asam: <em>"In some countries, in some industries, customers have more questions around sovereignty,
          and that reflects in longer negotiation cycles."</em> SAP now offers full-stack sovereign cloud: own DCs,
          European trusted infra, or fully managed on-site. Delos Cloud (German federal government) is the live
          project with highest exposure. EU Cloud & AI Development Act proposal is overdue and will increase pressure
          further when published. This is directly relevant to ERM risk quantification and deal probability modeling
          for the current pipeline.
        </SapItem>

        <SapItem color="amber" title="AI Disruption Narrative Pressuring SaaS Sector (IGV −10% Feb). Joule Adoption Rate & ROI Scrutiny Intensifying.">
          IGV software ETF down 10%+ in February on AI moat durability concerns. Salesforce, Snowflake, Palo Alto
          all sold despite solid earnings. NVDA CEO Jensen Huang defended enterprise software value in post-earnings
          commentary. <strong className="text-gray-900">No direct SAP revenue impact today</strong>, but the narrative
          feeds customer deal risk discussions and analyst scrutiny on cloud backlog — the exact metric SAP already
          missed. Risk for ERM: customer CFO pushback on AI-feature pricing during renewals and upsell negotiations.
        </SapItem>

        <SapItem title="EU AI Act — Joule High-Risk Classification Decision Must Be Made Before August 2026.">
          Joule embedded in finance (cash flow prediction, FP&A), HR (workforce planning, talent scoring), and
          creditworthiness decisioning contexts. These functions map to Annex III high-risk categories: employment
          (Art. 26), credit scoring (Art. 26), and potentially critical infrastructure management. Commission missed
          Article 6 classification guidance deadline on Feb 2.{" "}
          <strong className="text-gray-900">Do not wait for guidance</strong> — conduct your own classification
          assessment now. Conformity assessment, CE marking, EU database registration, and post-market monitoring
          framework all required by Aug 2, 2026.
        </SapItem>

        <SapItem color="green" title="Brazil ERP Market — BRL Strength Positive for SAP LATAM Revenue Recognition.">
          BRL at 5.14 — strongest since May 2024. SAP reports LATAM revenues in EUR/USD — BRL appreciation increases
          translated value of Brazil bookings. Ibovespa near ATH signals strong business confidence among Brazilian
          enterprise customers. Selic at 15% creates fiscal pressure on enterprise IT budgets but strong macro
          supports SAP's mid-market expansion narrative.{" "}
          <strong className="text-gray-900">Align: Brazil cloud deal pipeline visibility with Q1 guidance cadence.</strong>
        </SapItem>
      </WideCard>
    </div>
  );
}
