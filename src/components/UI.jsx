// ── Hero Card ──────────────────────────────────────────────────────
export function HeroCard({ gradient = "gradient-blue", icon, title, children }) {
  return (
    <div className={`${gradient} rounded-3xl p-8 text-white shadow-lg mb-6 flex gap-4 items-start`}>
      <div className="text-3xl pt-1 flex-shrink-0">{icon}</div>
      <div>
        <h2 className="text-2xl font-semibold mb-3 tracking-tight">{title}</h2>
        <p className="text-[15px] leading-relaxed opacity-90">{children}</p>
      </div>
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────
export function Card({ title, icon, pill, pillStyle = "pill-neutral", children }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-lg flex-shrink-0">
            {icon}
          </div>
          <span className="text-[15px] font-semibold text-gray-900">{title}</span>
        </div>
        {pill && <span className={`pill ${pillStyle}`}>{pill}</span>}
      </div>
      <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
}

// ── Wide Card ──────────────────────────────────────────────────────
export function WideCard({ title, label, children }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/[0.06] mb-6">
      {title && <div className="text-base font-semibold text-gray-900 mb-4 tracking-tight">{title}</div>}
      {label && <div className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-3 pb-2.5 border-b border-gray-100">{label}</div>}
      {children}
    </div>
  );
}

// ── Pill ───────────────────────────────────────────────────────────
export function Pill({ children, style = "neutral" }) {
  const styles = {
    up:      "bg-green-50 text-green-700",
    down:    "bg-red-50 text-red-600",
    neutral: "bg-gray-100 text-gray-600",
    amber:   "bg-amber-50 text-amber-700",
    blue:    "bg-blue-50 text-blue-700",
    red:     "bg-red-50 text-red-600",
  };
  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${styles[style] || styles.neutral}`}>
      {children}
    </span>
  );
}

// ── Alert ──────────────────────────────────────────────────────────
export function Alert({ type = "amber", icon, children }) {
  const styles = {
    red:   "bg-red-50 border border-red-200",
    amber: "bg-amber-50 border border-amber-200",
    green: "bg-green-50 border border-green-200",
    blue:  "bg-blue-50 border border-blue-200",
  };
  return (
    <div className={`flex gap-3 p-4 rounded-xl mb-4 items-start ${styles[type]}`}>
      <span className="text-sm pt-0.5 flex-shrink-0">{icon}</span>
      <div className="text-[13px] leading-relaxed text-gray-700">{children}</div>
    </div>
  );
}

// ── Ticker Card ────────────────────────────────────────────────────
export function TickerCard({ label, value, change, note, color = "c-blue" }) {
  const isUp = change && change.startsWith("▲") || change && change.startsWith("+");
  const isDown = change && change.startsWith("▼") || change && change.startsWith("−");
  return (
    <div className={`ticker-card ${color}`}>
      <div className="text-[11px] font-medium text-gray-400 tracking-widest uppercase mb-2">{label}</div>
      <div className="text-2xl font-bold tracking-tight text-gray-900 leading-none">{value}</div>
      <div className={`text-xs font-medium mt-1.5 ${isUp ? "text-green-600" : isDown ? "text-red-600" : "text-gray-500"}`}>{change}</div>
      {note && <div className="text-[11px] text-gray-400 mt-1 leading-tight">{note}</div>}
    </div>
  );
}

// ── Section Label ──────────────────────────────────────────────────
export function SectionLabel({ children }) {
  return (
    <div className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-3 pb-2.5 border-b border-gray-100">
      {children}
    </div>
  );
}

// ── Tint Box ───────────────────────────────────────────────────────
export function TintBox({ title, children }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 mb-6">
      <div className="text-base font-semibold text-gray-900 mb-4">{title}</div>
      {children}
    </div>
  );
}
export function TintRow({ label, value }) {
  return (
    <div className="flex justify-between items-center bg-white rounded-lg px-4 py-3 mb-2 last:mb-0">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      <span className="text-sm text-gray-500">{value}</span>
    </div>
  );
}

// ── Deadline Badge ─────────────────────────────────────────────────
export function DeadlineBadge({ children, color = "amber" }) {
  const styles = {
    red:   "bg-red-50 text-red-600 border border-red-200",
    amber: "bg-amber-50 text-amber-700 border border-amber-200",
    blue:  "bg-blue-50 text-blue-700 border border-blue-200",
    green: "bg-green-50 text-green-700 border border-green-200",
    teal:  "bg-teal-50 text-teal-700 border border-teal-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${styles[color]}`}>
      {children}
    </span>
  );
}
