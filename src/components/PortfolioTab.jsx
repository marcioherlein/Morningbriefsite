import { useState, useMemo } from "react";

const CAT_LABELS = {
  CEDEAR_US: "CEDEAR US",
  CEDEAR_BR: "CEDEAR Brasil",
  AR_EQUITY: "Acciones AR",
  AR_BOND:   "Bonos AR",
  AR_ON:     "ONs",
  FCI:       "FCI",
  AR_LETES:  "Letras",
};

const CAT_COLORS = {
  CEDEAR_US: "#3B82F6",
  CEDEAR_BR: "#10B981",
  AR_EQUITY: "#8B5CF6",
  AR_BOND:   "#F59E0B",
  AR_ON:     "#EF4444",
  FCI:       "#6B7280",
  AR_LETES:  "#EC4899",
};

function fmt(n, digits = 0) {
  if (n == null) return "—";
  return n.toLocaleString("es-AR", { maximumFractionDigits: digits });
}

function pctStr(n) {
  if (n == null) return "—";
  return `${n > 0 ? "+" : ""}${n.toFixed(2)}%`;
}

function clr(n) {
  if (n == null) return "text-gray-400";
  return n > 0 ? "text-green-600" : n < 0 ? "text-red-500" : "text-gray-600";
}

// ── Mini bar chart component ─────────────────────────────────────────
function AllocationChart({ holdings, totalArs }) {
  const cats = useMemo(() => {
    const map = {};
    for (const h of holdings) {
      map[h.cat] = (map[h.cat] || 0) + h.value_ars;
    }
    return Object.entries(map)
      .map(([cat, val]) => ({ cat, val, pct: (val / totalArs) * 100 }))
      .sort((a, b) => b.val - a.val);
  }, [holdings, totalArs]);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">Allocation by Category</h3>
      {/* Stacked bar */}
      <div className="flex rounded-full overflow-hidden h-6 mb-4">
        {cats.map(({ cat, pct }) => (
          <div
            key={cat}
            style={{ width: `${pct}%`, backgroundColor: CAT_COLORS[cat] || "#ccc" }}
            title={`${CAT_LABELS[cat] || cat}: ${pct.toFixed(1)}%`}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {cats.map(({ cat, val, pct }) => (
          <div key={cat} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ backgroundColor: CAT_COLORS[cat] || "#ccc" }}
            />
            <div className="min-w-0">
              <span className="text-xs text-gray-600 truncate block">
                {CAT_LABELS[cat] || cat}
              </span>
              <span className="text-xs font-medium text-gray-900">
                {pct.toFixed(1)}% · ${fmt(val / 1e6, 1)}M
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Top movers ───────────────────────────────────────────────────────
function TopMovers({ holdings, period }) {
  const key = `${period}_gain_pct`;
  const sorted = holdings
    .filter((h) => h[key] != null)
    .sort((a, b) => b[key] - a[key]);
  const top = sorted.slice(0, 5);
  const bot = sorted.slice(-5).reverse();

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-green-50 rounded-2xl p-4">
        <p className="text-xs font-semibold text-green-700 mb-3">↑ Top Gainers</p>
        {top.map((h) => (
          <div key={h.name} className="flex justify-between items-center py-1">
            <span className="text-sm font-medium text-gray-900">{h.name}</span>
            <span className="text-sm font-bold text-green-600">{pctStr(h[key])}</span>
          </div>
        ))}
      </div>
      <div className="bg-red-50 rounded-2xl p-4">
        <p className="text-xs font-semibold text-red-600 mb-3">↓ Top Losers</p>
        {bot.map((h) => (
          <div key={h.name} className="flex justify-between items-center py-1">
            <span className="text-sm font-medium text-gray-900">{h.name}</span>
            <span className="text-sm font-bold text-red-500">{pctStr(h[key])}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Holdings table ───────────────────────────────────────────────────
function HoldingsTable({ holdings, usdMep }) {
  const [sortBy, setSortBy] = useState("value_ars");
  const [filterCat, setFilterCat] = useState("all");

  const cats = useMemo(() => ["all", ...new Set(holdings.map((h) => h.cat))], [holdings]);

  const sorted = useMemo(() => {
    let rows = filterCat === "all" ? holdings : holdings.filter((h) => h.cat === filterCat);
    return [...rows].sort((a, b) => {
      if (sortBy === "ytd_gain_pct" || sortBy === "mtd_gain_pct" || sortBy === "daily_gain_pct") {
        return (b[sortBy] ?? -999) - (a[sortBy] ?? -999);
      }
      return (b[sortBy] || 0) - (a[sortBy] || 0);
    });
  }, [holdings, sortBy, filterCat]);

  const cols = [
    { key: "value_ars", label: "Value" },
    { key: "daily_gain_pct", label: "Day" },
    { key: "mtd_gain_pct", label: "MTD" },
    { key: "ytd_gain_pct", label: "YTD" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Controls */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3 overflow-x-auto">
        <div className="flex gap-1">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              className={`px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                filterCat === c ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c === "all" ? "All" : CAT_LABELS[c] || c}
            </button>
          ))}
        </div>
        <div className="flex gap-1 ml-auto">
          {cols.map((col) => (
            <button
              key={col.key}
              onClick={() => setSortBy(col.key)}
              className={`px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                sortBy === col.key ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="divide-y divide-gray-50">
        {sorted.map((h) => (
          <div key={h.name} className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
            {/* Name + category */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 text-sm">{h.name}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: CAT_COLORS[h.cat] || "#ccc" }}
                />
              </div>
              <p className="text-xs text-gray-400">{fmt(h.qty)} u · ${fmt(h.price_ars)} ARS</p>
            </div>

            {/* Value */}
            <div className="text-right mr-4 hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">${fmt(h.value_usd)} USD</p>
              <p className="text-xs text-gray-400">${fmt(h.value_ars)} ARS</p>
            </div>

            {/* Gains */}
            <div className="grid grid-cols-3 gap-3 text-right text-xs">
              <div>
                <p className="text-gray-400">Day</p>
                <p className={`font-semibold ${clr(h.daily_gain_pct)}`}>{pctStr(h.daily_gain_pct)}</p>
              </div>
              <div>
                <p className="text-gray-400">MTD</p>
                <p className={`font-semibold ${clr(h.mtd_gain_pct)}`}>{pctStr(h.mtd_gain_pct)}</p>
              </div>
              <div>
                <p className="text-gray-400">YTD</p>
                <p className={`font-semibold ${clr(h.ytd_gain_pct)}`}>{pctStr(h.ytd_gain_pct)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────
export default function PortfolioTab({ portfolio, fx }) {
  const [gainPeriod, setGainPeriod] = useState("ytd");
  const p = portfolio;
  const usdMep = fx?.usd_mep || 1100;

  const periods = [
    { key: "daily", label: "Today",  pct: p.daily_gain_pct, ars: p.daily_gain_ars },
    { key: "mtd",   label: "MTD",    pct: p.mtd_gain_pct,   ars: p.mtd_gain_ars },
    { key: "ytd",   label: "YTD",    pct: p.ytd_gain_pct,   ars: p.ytd_gain_ars },
  ];

  return (
    <div className="space-y-5">
      {/* ── Hero card ── */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Portfolio · USD MEP</p>
            <p className="text-4xl font-bold mt-1 tracking-tight">
              ${fmt(p.total_usd_mep)}
            </p>
            <p className="text-blue-200 text-sm mt-0.5">ARS {fmt(p.total_ars)}</p>
          </div>
          <div className="bg-white/20 rounded-xl px-3 py-1.5 text-right">
            <p className="text-xs text-blue-100">MEP</p>
            <p className="text-sm font-bold">${fmt(usdMep)}</p>
          </div>
        </div>

        {/* Gain tiles */}
        <div className="grid grid-cols-3 gap-3">
          {periods.map((g) => (
            <button
              key={g.key}
              onClick={() => setGainPeriod(g.key)}
              className={`rounded-2xl p-3 text-left transition-all ${
                gainPeriod === g.key ? "bg-white/25 ring-2 ring-white/40" : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <p className="text-blue-100 text-xs font-medium">{g.label}</p>
              <p className={`text-xl font-bold mt-0.5 ${g.pct >= 0 ? "text-green-300" : "text-red-300"}`}>
                {pctStr(g.pct)}
              </p>
              <p className="text-blue-100 text-xs">
                {g.ars >= 0 ? "+" : ""}${fmt(g.ars)}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Allocation chart ── */}
      <AllocationChart holdings={p.holdings} totalArs={p.total_ars} />

      {/* ── Top movers ── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Top Movers</h3>
          <div className="flex gap-1">
            {["daily", "mtd", "ytd"].map((k) => (
              <button
                key={k}
                onClick={() => setGainPeriod(k)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  gainPeriod === k ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {k === "daily" ? "Today" : k.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <TopMovers holdings={p.holdings} period={gainPeriod} />
      </div>

      {/* ── Holdings table ── */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 px-1">All Holdings</h3>
        <HoldingsTable holdings={p.holdings} usdMep={usdMep} />
      </div>
    </div>
  );
}
