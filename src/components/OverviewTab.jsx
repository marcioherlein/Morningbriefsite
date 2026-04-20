import { HeroCard, Card, WideCard } from "./UI";

export default function OverviewTab({ data }) {
  const p = data?.portfolio;
  const totalUsd = p ? Math.round(p.total_usd_mep).toLocaleString("es-AR") : "—";
  const totalArs = p ? Math.round(p.total_ars / 1e6).toFixed(1) : "—";

  return (
    <div className="space-y-6 fade-up">
      <HeroCard gradient="gradient-red" icon="🚨" title="War Day 51 — US Seizes Iranian Ship · Hormuz Re-Closed · Ceasefire Expires Wednesday">
        Major escalation over the weekend. <strong>US Navy seized MV Touska</strong> (Iranian cargo ship, ~900ft) in Gulf of Oman
        Sunday after it tried to breach the blockade. Iran vowed retaliation, re-closed Hormuz, and said{" "}
        <strong>"no plans for talks."</strong> Brent surged back to ~$97 (+6% Sunday) after Friday's 9% crash when Iran
        briefly declared Hormuz open. <strong>Ceasefire expires Wednesday April 22.</strong> Vance/Witkoff/Kushner
        are heading to Islamabad today — Iran has not confirmed attendance. S&P futures down ~1%. VIX
        re-elevated.
      </HeroCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Markets — Futures Down ~1% on Escalation" icon="📈" pill="Risk-Off" pillStyle="pill-down">
          S&P 500 futures −1%, Nasdaq −0.8%, Dow −1% pre-market. The ATH close at 7,022 (Apr 16) is now under
          pressure. Brent surged back to <strong className="text-gray-900">~$97</strong> after Friday's 9% plunge on
          Hormuz "open" signal — that signal reversed within 24 hours. Zero tankers through Hormuz Sunday.
          VIX re-elevated. This is exactly the scenario warned about: ceasefire collapse, Brent back toward
          $100. Dow closed at record 49,447 on Friday — that's the high-water mark at risk.
        </Card>

        <Card title="Portfolio Snapshot" icon="💼" pill={`~${totalArs}M ARS`} pillStyle="pill-blue">
          Portfolio ~{totalArs}M ARS / ~${totalUsd} USD MEP. Today's escalation hurts tech (SPY, QQQ, NVDA down
          on futures) and is mixed for energy — VIST, YPFD, PBR may recover on Brent spike. The 30% you trimmed
          from VIST/YPFD was the right call. Watch if remaining energy stub becomes a hedge today. Argentina
          bonds (GD38) vulnerable if risk-off spreads to EM.
        </Card>

        <Card title="⚠️ Regulatory: 104 Days to Aug 2" icon="⚖️" pill="104 Days Left" pillStyle="pill-red">
          <strong className="text-gray-900">EU AI Act HRAI: 104 days</strong> to August 2. With Gulf clients now
          in flux again (procurement likely re-freezing on escalation), Joule pipeline timeline shifts.
          This makes the classification decision <em>more</em> urgent, not less. If Gulf deals slip to
          Q4, non-compliance in Aug costs you both the legal risk AND the deal momentum.
          <strong className="text-gray-900"> CRA CABs: 52 days</strong> to June 11.
        </Card>

        <Card title="🚨 CRITICAL — Ceasefire Expires Wednesday" icon="🌐" pill="2 Days Left" pillStyle="pill-red">
          US seized MV Touska (Sun) → Iran re-closed Hormuz (Sat/Sun) → Brent +6% → Iran FM: "no talks."
          Vance team traveling to Islamabad TODAY. Iran has <strong className="text-gray-900">not confirmed</strong>{" "}
          attendance. Trump threatened to destroy all Iranian power plants and bridges. If ceasefire collapses
          Wednesday, oil re-targets $110+, S&P gives back the ATH gains. This is the highest-stakes 48 hours
          since Operation Epic Fury began Feb 28.
        </Card>
      </div>

      <WideCard title="Today's Key Actions — April 20 🚨">
        <ul className="space-y-3">
          {[
            {
              text: <>
                <strong className="text-gray-900">🚨 CEASEFIRE EXPIRES WEDNESDAY — Watch Islamabad all day.</strong>{" "}
                Vance/Witkoff/Kushner are in Islamabad today. Iran's FM said "no plans for talks" this morning but
                Iranian sources told CNN a team is arriving Tuesday. Three scenarios: (1) Iran attends → ceasefire
                extension likely → oil back to $85–90, markets recover; (2) No talks but no attacks → limbo,
                oil stays $95–100; (3) Ceasefire collapses → airstrikes resume → oil $110+, S&P corrects 5–8%.
                Assign probability: 40/35/25. Scenario 3 is real.
              </>,
            },
            {
              text: <>
                <strong className="text-gray-900">Energy stub (VIST, YPFD, PBR) — hold the hedge today.</strong>{" "}
                Brent back to ~$97. The energy you trimmed at $96–102 was correct. The 25–30% stub you kept
                is your portfolio's natural hedge for Scenario 3. Don't add here — but don't exit either.
                If ceasefire extends and oil falls to $85, trim further. If it collapses, hold.
              </>,
            },
            {
              text: <>
                <strong className="text-gray-900">Tech/Mag7 positions — brace for futures gap-down open.</strong>{" "}
                S&P futures −1% pre-market. SPY, QQQ, NVDA, TSM will all open lower. This is not the
                moment to add to tech — wait for ceasefire clarity. If Islamabad talks succeed by Thursday,
                that becomes the entry. NVDA May 20 earnings thesis intact regardless of Iran.
              </>,
            },
            {
              text: <>
                <strong className="text-gray-900">SAP Gulf pipeline — pause new outreach today.</strong>{" "}
                Aramco/QatarEnergy/ADNOC procurement windows re-freeze if ceasefire collapses. Don't send
                new proposals into this uncertainty. Prep them now so you can deploy within 24 hours of
                any positive Islamabad signal. The post-war capex thesis is intact — just timing-dependent.
              </>,
            },
            {
              text: <>
                <strong className="text-gray-900">EU AI Act: 104 days. CRA CABs: 52 days.</strong>{" "}
                Geopolitical volatility doesn't pause regulatory clocks. Legal strategy decision on Joule
                classification this week regardless of war outcome. CRA CAB selection — initiate if not started.
                NIS2 Germany BSI — confirm registration status.
              </>,
            },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex-shrink-0 mt-[7px]" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </WideCard>
    </div>
  );
}
