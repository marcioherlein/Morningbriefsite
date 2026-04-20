import { HeroCard, Card, TintBox, TintRow } from "./UI";

export default function CountryTab() {
  return (
    <div className="space-y-6 fade-up">
      <HeroCard gradient="gradient-indigo" icon="🌐" title="Geopolitics — War Day 51 · CRITICAL ESCALATION — Ceasefire Expires Wed">
        MAXIMUM TENSION. US seized Iranian cargo ship MV Touska (Sun). Iran re-closed Hormuz. Tehran: "no plans for talks." Ceasefire expires WEDNESDAY. Vance heading to Islamabad but Iran unconfirmed. Brent +6% to ~$97.
        S&P 500 and Nasdaq hit all-time records on Apr 16 anyway, pricing in eventual resolution. Macron/Starmer
        Hormuz coalition summit happening today (40 nations, strictly defensive mission). Argentina recovering:
        country risk ~560 from 633 peak, April agro harvest supporting BCRA reserves. Brazil with BRL strength, Ibovespa near ATH, and Selic carry
        driving your fintech cluster higher; and Argentina with a reserve accumulation story that is diverging from
        a rising country risk premium. Oil above $71 supports VIST and PBR. US-Iran nuclear talks in Geneva today.
      </HeroCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="United States" icon="🇺🇸" pill="Risk-Off" pillStyle="pill-down">
          PPI inflation shock (Jan +0.5% MoM vs +0.3% exp.) hits Fri 27 open. SCOTUS struck IEEPA tariffs
          Feb 20; Trump signed new 10% global EO same day. USTR signaling 35–50% China tariffs via alternate
          legal authority. State of the Union Feb 24 defended tariff agenda. All three benchmarks in red for
          February. Fed March cut: ~0% probability.{" "}
          <strong className="text-gray-900">Direct impact:</strong> SPY, QQQ, DIA, NVDA, META, AMZN, AAPL CEDEARs.
        </Card>

        <Card title="Brazil" icon="🇧🇷" pill="Strongest macro" pillStyle="pill-up">
          BRL at 5.14 — strongest since May 2024. R$33B+ foreign inflows YTD. Selic 15% carry trade intact.
          SCOTUS ruling limits Brazil tariff exposure to 15% (Section 122 vs IEEPA). Ibovespa near ATH at
          191K — 7th consecutive monthly gain. BCB Governor Galípolo acknowledged China's disinflationary
          export effect.{" "}
          <strong className="text-gray-900">Positive for:</strong> NU, STNE, PAGS, BBD, PBR, VALE, EWZ, VIST.
        </Card>

        <Card title="Argentina" icon="🇦🇷" pill="Divergence" pillStyle="pill-amber">
          BCRA reserves at $46.9B — highest since Oct 2019. 37 buying sessions. +$2.64B YTD. ARS officially
          appreciating (−4.9% MTD nominal). Yet country risk approaching 600 bps — political risk repricing
          ahead of June bond coupon payments. Band ceiling $1,595 provides ARS floor; CCL spread ~4.4%.{" "}
          <em className="not-italic text-gray-500">Adcap: "If BCRA buying continues, spreads re-compress."</em>{" "}
          <strong className="text-gray-900">Direct impact:</strong> YPFD, PAMP, TGSU2, METR, EDN, CEPU, LOMA, AUSO.
        </Card>

        <Card title="Oil & Commodities" icon="🛢️" pill="Brent $71+" pillStyle="pill-up">
          US-Iran nuclear talks in Geneva today (Feb 27). Brent above $71 — risk premium holding. Supports
          VIST, PBR positions. VALE exposed to China iron ore demand; BCB Governor comment on China
          disinflationary exports is worth monitoring for steel/iron price implications.
        </Card>

        <Card title="China" icon="🇨🇳" pill="Tariff risk" pillStyle="pill-down">
          US tariff legal war has landed on China hardest. USTR Greer signaling 35–50% tariffs via new legal
          vehicle after SCOTUS IEEPA ruling. Chinese disinflationary exports noted by BCB. BABA and JD CEDEARs
          carry direct tariff risk. SAP China operations face regulatory headwinds from both sides — US export
          controls on AI chips and EU Data Act third-country transfer rules.
        </Card>

        <Card title="European Union" icon="🇪🇺" pill="Regulatory wave" pillStyle="pill-amber">
          Six active EU regulatory obligations tracked (AI Act, CRA, NIS2, Data Act, DORA, GDPR). Digital
          Omnibus in trilogue. Cloud & AI Development Act overdue. Digital Networks Act proposed Jan 21.
          Sovereignty demand explicitly named by SAP CFO as deal cycle drag. EU postponed trade deal
          ratification. ECB expected to maintain current policy in March meeting.
        </Card>
      </div>

      <TintBox title="Geographic Exposure Breakdown (by CEDEAR ARS value)">
        <TintRow label="🇺🇸 US (SPY, QQQ, DIA, NVDA, META, TSLA, AAPL, AMZN, ARKK, CAAP, SHOP, INFY)" value="~33M ARS · 44%" />
        <TintRow label="🇧🇷 Brazil (NU, PAGS, STNE, BBD, PBR, VALE, EWZ)" value="~29M ARS · 38%" />
        <TintRow label="🌏 Asia / Taiwan (TSM, BABA, JD)" value="~7.4M ARS · 10%" />
        <TintRow label="🇦🇷 Argentina (VIST, LAR + local equities)" value="~20M ARS · 27%" />
      </TintBox>
    </div>
  );
}
