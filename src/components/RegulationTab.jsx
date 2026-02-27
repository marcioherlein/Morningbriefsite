import { HeroCard, Pill, DeadlineBadge } from "./UI";

function RegItem({ urgency, framework, deadline, deadlineColor = "amber", title, children, sources, badges = [] }) {
  const urgencyStyles = {
    "Urgent":    "bg-red-50 text-red-600",
    "Active":    "bg-amber-50 text-amber-700",
    "Enforcement Active": "bg-red-50 text-red-600",
    "In Force — Audits Active": "bg-red-50 text-red-600",
    "Monitoring": "bg-blue-50 text-blue-700",
    "Overdue — Watch": "bg-amber-50 text-amber-700",
    "Operational": "bg-amber-50 text-amber-700",
    "Active — National rollout": "bg-amber-50 text-amber-700",
  };
  return (
    <div className="reg-item">
      <div className="flex flex-wrap items-start gap-2 px-5 py-4 bg-gray-50 border-b border-gray-100">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${urgencyStyles[urgency] || "bg-gray-100 text-gray-600"}`}>
          {urgency}
        </span>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700">{framework}</span>
        {deadline && <DeadlineBadge color={deadlineColor}>⏰ {deadline}</DeadlineBadge>}
        <div className="text-sm font-semibold text-gray-900 w-full mt-1">{title}</div>
      </div>
      <div className="px-5 py-4 text-[13px] text-gray-600 leading-relaxed space-y-3">{children}</div>
      <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] text-gray-400">{sources}</span>
        <div className="flex flex-wrap gap-1.5">{badges}</div>
      </div>
    </div>
  );
}

export default function RegulationTab() {
  return (
    <div className="space-y-4 fade-up">
      <HeroCard gradient="gradient-amber" icon="⚠️" title="Regulatory Watchdog — EU & US">
        Nine active or approaching regulatory obligations tracked across EU AI Act, Cyber Resilience Act,
        NIS2, Data Act, DORA, GDPR, Digital Networks Act, Cloud & AI Development Act, and US Export Controls.
        The most urgent is the EU AI Act HRAI compliance deadline on August 2, 2026 (157 days) — with the
        Commission having already missed its own guidance deadline. No blanket extension is currently law.
      </HeroCard>

      <RegItem urgency="Urgent" framework="EU AI Act"
        deadline="Aug 2, 2026 — 157 days" deadlineColor="red"
        title="HRAI Compliance Deadline: 2 August 2026. Commission Missed Feb 2 Guidance Deadline. No Extension is Law."
        sources="IAPP Feb 2026 · AI2Work Feb 17 2026 · Bird & Bird Dec 2025"
        badges={[<DeadlineBadge color="red">HRAI: Aug 2 2026</DeadlineBadge>]}>
        <p><strong className="text-gray-900">Status (27 Feb 2026):</strong> The Commission missed its own Feb 2, 2026 deadline to publish Article 6 guidance on high-risk AI classification. CEN/CENELEC technical standards (originally due Sep 2025) now expected end-2026. The August 2026 HRAI deadline remains <strong className="text-gray-900">legally binding</strong> — industry lobbying for a blanket delay has been rejected by the Commission.</p>
        <p><strong className="text-gray-900">Digital Omnibus proposal</strong> (Nov 2025) would extend enforcement to Dec 2, 2027 for Annex III systems and Aug 2, 2028 for Annex I — but this is in trilogue negotiations (EP + Council) and is NOT yet law. <strong className="text-gray-900">Plan for August 2026, not the extension date.</strong></p>
        <p><strong className="text-gray-900">Penalties:</strong> Up to €35M or 7% global turnover for prohibited practices; €15M or 3% for HRAI non-compliance. Extra-territorial: applies to any AI system used in EU or affecting EU residents.</p>
        <p><strong className="text-gray-900">SAP ERM relevance:</strong> Joule embedded in finance, HR, and creditworthiness decisioning likely qualifies as Annex III high-risk. CE marking, conformity assessment, EU database registration, and post-market monitoring framework must be complete by Aug 2026.</p>
      </RegItem>

      <RegItem urgency="Active" framework="Cyber Resilience Act"
        title="CRA Phase 1: Vulnerability & Incident Reporting Live September 11, 2026. CABs Operational June 11."
        sources="Hogan Lovells 2026 · Stephenson Harwood Jan 2026"
        badges={[
          <DeadlineBadge color="teal">CABs: Jun 11 2026</DeadlineBadge>,
          <DeadlineBadge color="amber">Reporting: Sep 11 2026</DeadlineBadge>
        ]}>
        <p><strong className="text-gray-900">Status:</strong> CRA entered into force Dec 10, 2024. First conformity assessment bodies (CABs) operational from <strong className="text-gray-900">June 11, 2026</strong> (3.5 months). Mandatory vulnerability reporting live from <strong className="text-gray-900">September 11, 2026</strong>. Manufacturers must report: actively exploited vulnerabilities (24h early warning, 72h full notification, 14-day final report).</p>
        <p><strong className="text-gray-900">Jan 2026 cybersecurity package:</strong> Commission proposed revised Cybersecurity Act (CSA2) and targeted NIS2 amendments on Jan 20. Key improvement: a <strong className="text-gray-900">single-entry incident reporting point</strong> via ENISA satisfying GDPR, NIS2, DORA, CER, and CRA simultaneously.</p>
        <p><strong className="text-gray-900">SBOMs required:</strong> Comprehensive software bill of materials for all digital products. Full obligations: <strong className="text-gray-900">December 11, 2027</strong>.</p>
      </RegItem>

      <RegItem urgency="Active — National rollout" framework="NIS2"
        deadline="DE Registration ~Apr 2026" deadlineColor="red"
        title="NIS2 + Jan 2026 Amendment Proposal. Germany Registration Deadline ~April 2026. Personal Management Liability."
        sources="Morrison Foerster Feb 2026 · Global Policy Watch Jan 2026"
        badges={[<DeadlineBadge color="red">DE Registration: ~Apr 2026</DeadlineBadge>]}>
        <p><strong className="text-gray-900">Germany (Jan 2026):</strong> NIS2 Implementation Act entered into force with delayed transposition. Companies must <strong className="text-gray-900">register with BSI within 3 months</strong> — deadline approximately April 2026. Fines up to €10M or 2% of global turnover. <strong className="text-gray-900">Management bodies personally liable</strong> for cybersecurity risk management failures.</p>
        <p><strong className="text-gray-900">EU-level NIS2 amendment (Jan 20, 2026):</strong> Proposed changes include streamlined ransomware reporting and "small mid-cap" category (≤750 employees / ≤€150M turnover) with lower compliance burden.</p>
        <p><strong className="text-gray-900">SAP relevance:</strong> SAP is an ICT third-party provider to essential/important entities — triggering both direct NIS2 obligations and downstream customer audit pressure. German registration deadline is the most proximate action item.</p>
      </RegItem>

      <RegItem urgency="Active" framework="EU Data Act"
        title="Cloud Switching Obligations In Force Since Sep 2025. Product Design Requirements Sep 12, 2026."
        sources="Latham & Watkins · EU Commission Data Act"
        badges={[<DeadlineBadge color="amber">Product Design: Sep 12 2026</DeadlineBadge>]}>
        <p>Key Data Act obligations effective September 12, 2025 — cloud providers must already enable customer switching without prohibitive costs or technical lock-in. <strong className="text-gray-900">Product design requirements</strong> for new connected products apply from September 12, 2026.</p>
        <p>For SAP cloud: data portability interfaces, interoperability documentation, and switching facilitation must be in place now. <strong className="text-gray-900">EU e-Evidence Package</strong> applies from <strong className="text-gray-900">August 17, 2026</strong>.</p>
      </RegItem>

      <RegItem urgency="In Force — Audits Active" framework="DORA"
        title="DORA Fully Enforceable Since Jan 2026. SAP as CTPP. Financial Sector Audits Underway."
        sources="IOMETE Jan 2026"
        badges={[<DeadlineBadge color="red">Enforcement: Live Jan 2026</DeadlineBadge>]}>
        <p>DORA entered full enforcement January 2026. Financial institutions are being audited for ICT operational resilience. SAP is an ICT third-party provider triggering CTPP obligations. Customer pressure on DORA documentation and TLPT evidence will intensify Q1–Q2 2026. Digital Omnibus proposes single incident reporting point consolidating DORA + NIS2 + GDPR reporting.</p>
      </RegItem>

      <RegItem urgency="Enforcement Active" framework="GDPR"
        title="EDPB 2026 Coordinated Enforcement: Transparency Arts. 12–14. Joint Opinion on Digital Omnibus Feb 11."
        sources="Global Policy Watch Feb 2026 · EDPB.europa.eu"
        badges={[<DeadlineBadge color="red">Enforcement: Active Now</DeadlineBadge>]}>
        <p><strong className="text-gray-900">EDPB 2026 enforcement topic:</strong> Transparency obligations under Articles 12–14. Supervisory authorities auditing whether data subjects are properly informed. <strong className="text-gray-900">Third-country transfers must explicitly name each destination country and legal basis.</strong></p>
        <p><strong className="text-gray-900">Feb 11 Joint Opinion (EDPB + EDPS):</strong> Welcomed Digital Omnibus GDPR simplification proposals but demanded precise definitions and strong safeguards.</p>
      </RegItem>

      <RegItem urgency="Monitoring" framework="Digital Networks Act"
        title="DNA Proposed Jan 21 2026 — Merges EECC, BEREC, Open Internet Regulation. Network Security Rules Included."
        sources="CMS Feb 2026"
        badges={[<DeadlineBadge color="blue">Trilogue: 2026–2027</DeadlineBadge>]}>
        <p>Commission published Digital Networks Act proposal January 21, 2026. Would merge 4 existing acts into single directly applicable framework including <strong className="text-gray-900">enhanced network security and resilience measures</strong>. Final adoption expected 2027–2028. No immediate compliance obligations.</p>
      </RegItem>

      <RegItem urgency="Overdue — Watch" framework="Cloud & AI Dev Act"
        title="EU Cloud & AI Development Act: Proposal Overdue from Q1 2026. Data Center Standards + Cloud Sovereignty Rules."
        sources="EU Cloud AI Act Tracker · IIEA 2026"
        badges={[<DeadlineBadge color="amber">Proposal: Overdue Q1 2026</DeadlineBadge>]}>
        <p>Commission Work Programme 2026 targeted Q1 2026 for this proposal. As of Feb 27 — overdue, no proposal published. EVP Henna Virkkunen (Tech Sovereignty) is sponsoring Commissioner. When enacted, could mandate European-hosted cloud options for regulated sectors. Directly intersects with SAP's sovereign cloud strategy and Delos Cloud positioning.</p>
      </RegItem>

      <RegItem urgency="Operational" framework="US Export Controls"
        title="OFAC New VSD Portal Live Feb 6. BIS 50% Rule Deferred to Nov 2026. China AI Chip Controls Under Review."
        sources="Export Compliance Solutions Feb 25 2026"
        badges={[<DeadlineBadge color="amber">BIS 50%: Nov 10 2026</DeadlineBadge>]}>
        <p><strong className="text-gray-900">OFAC VSD Portal (Feb 6, 2026):</strong> New Voluntary Self-Disclosure portal launched. Update internal SOPs with new portal URL and disclosure procedures immediately.</p>
        <p><strong className="text-gray-900">BIS updates:</strong> Cambodia removed from Country Group D:5 (Feb 4). <strong className="text-gray-900">BIS 50% Rule deferred to November 10, 2026.</strong> AI chip export controls under ongoing review — tightening likely given US-China trade trajectory.</p>
        <p><strong className="text-gray-900">US-China tariffs:</strong> SCOTUS struck IEEPA-based tariffs Feb 20. Trump signed new 10% global tariff EO same day. USTR Greer signaling 35–50% China tariffs. Affects BABA, JD CEDEAR positions and SAP China operations.</p>
      </RegItem>
    </div>
  );
}
