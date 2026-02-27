import { useState, useMemo } from "react";
import { HeroCard, WideCard } from "./UI";

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

const WBAR_STYLES = {
  CEDEAR_US: "wbar-blue",
  CEDEAR_BR: "wbar-teal",
  AR_EQUITY: "wbar-amber",
  AR_BOND:   "wbar-amber",
  AR_ON:     "wbar-red",
  FCI:       "",
  AR_LETES:  "",
};

function fmt(n, d = 0) {
  if (n == null) return "—";
  return n.toLocaleString("es-AR", { maximumFractionDigits: d });
}
function pct(n) {
  if (n == null) return "—";
  return `${n > 0 ? "+" : ""}${n.toFixed(2)}%`;
}
function clr(n) {
  if (n == null) return "text-gray-400";
  return n > 0 ? "text-green-600" : n < 0 ? "text-red-500" : "text-gray-500";
}
function pillStyle(n) {
  if (n == null) return "bg-gray-100 text-gray-500";
  return n > 0 ? "bg-green-50 text-green-700" : n < 0 ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-500";
}

// ── Allocation Chart ───────────────────────────────────────────────
function AllocationChart({ holdings, totalArs }) {
  const cats = useMemo(() => {
    const map = {};
    for (const h of holdings) map[h.cat] = (map[h.cat] || 0) + h.value_ars;
    return Object.entries(map)
      .map(([cat, val]) => ({ cat, val, pct: (val / totalArs) * 100 }))
      .sort((a, b) => b.val - a.val);
  }, [holdings, totalArs]);

  return (
    <WideCard title="Allocation by Category">
      <div className="flex rounded-full overflow-hidden h-5 mb-4">
        {cats.map(({ cat, pct: p }) => (
          <div key={cat} style={{ width: `${p}%`, backgroundColor: CAT_COLORS[cat] || "#ccc" }}
               title={`${CAT_LABELS[cat] || cat}: ${p.toFixed(1)}%`} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {cats.map(({ cat, val, pct: p }) => (
          <div key={cat} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: CAT_COLORS[cat] || "#ccc" }} />
            <div className="min-w-0">
              <span className="text-xs text-gray-500 block truncate">{CAT_LABELS[cat] || cat}</span>
              <span className="text-xs font-semibold text-gray-900">{p.toFixed(1)}% · ${fmt(val / 1e6, 1)}M ARS</span>
            </div>
          </div>
        ))}
      </div>
    </WideCard>
  );
}

// ── Top Movers ─────────────────────────────────────────────────────
function TopMovers({ holdings, period }) {
  const key = `${period}_gain_pct`;
  const sorted = holdings.filter(h => h[key] != null).sort((a, b) => b[key] - a[key]);
  const top = sorted.slice(0, 5);
  const bot = sorted.slice(-5).reverse();
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-green-50 rounded-2xl p-4">
        <p className="text-xs font-semibold text-green-700 mb-3">↑ Top Gainers</p>
        {top.map(h => (
          <div key={h.name} className="flex justify-between items-center py-0.5">
            <span className="text-sm font-medium text-gray-900">{h.name}</span>
            <span className="text-sm font-bold text-green-600">{pct(h[key])}</span>
          </div>
        ))}
      </div>
      <div className="bg-red-50 rounded-2xl p-4">
        <p className="text-xs font-semibold text-red-600 mb-3">↓ Top Losers</p>
        {bot.map(h => (
          <div key={h.name} className="flex justify-between items-center py-0.5">
            <span className="text-sm font-medium text-gray-900">{h.name}</span>
            <span className="text-sm font-bold text-red-500">{pct(h[key])}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Holdings Table ─────────────────────────────────────────────────
function HoldingsTable({ holdings, usdMep, totalArs }) {
  const [filterCat, setFilterCat] = useState("all");
  const [sortBy, setSortBy] = useState("value_ars");

  const cats = useMemo(() => ["all", ...new Set(holdings.map(h => h.cat))], [holdings]);
  const filtered = filterCat === "all" ? holdings : holdings.filter(h => h.cat === filterCat);
  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortBy] ?? -9999, bv = b[sortBy] ?? -9999;
    return bv - av;
  });

  const maxVal = Math.max(...holdings.map(h => h.value_ars));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/[0.06] overflow-hidden">
      {/* Controls */}
      <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-2">
        <div className="flex gap-1 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setFilterCat(c)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                filterCat === c ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {c === "all" ? "All" : CAT_LABELS[c] || c}
            </button>
          ))}
        </div>
        <div className="flex gap-1 ml-auto">
          {[["value_ars","Value"],["daily_gain_pct","Day"],["mtd_gain_pct","MTD"],["ytd_gain_pct","YTD"]].map(([key, label]) => (
            <button key={key} onClick={() => setSortBy(key)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                sortBy === key ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Category</th>
              <th className="r">Qty</th>
              <th className="r">Price ARS</th>
              <th className="r">Total USD</th>
              <th className="r">Total ARS</th>
              <th>Wt</th>
              <th className="r">Day</th>
              <th className="r">MTD</th>
              <th className="r">YTD</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(h => {
              const weight = (h.value_ars / totalArs) * 100;
              const wbarW = (h.value_ars / maxVal) * 100;
              return (
                <tr key={h.name}>
                  <td><span className="text-xs font-bold text-gray-900">{h.name}</span></td>
                  <td><span className="text-xs text-gray-500">{CAT_LABELS[h.cat] || h.cat}</span></td>
                  <td className="t-num">{fmt(h.qty)}</td>
                  <td className="t-num">{fmt(h.price_ars)}</td>
                  <td className="t-num font-semibold text-gray-900">${fmt(h.value_usd)}</td>
                  <td className="t-num font-semibold text-gray-900">{fmt(h.value_ars)}</td>
                  <td>
                    <div className="wbar-wrap">
                      <div className={`wbar ${WBAR_STYLES[h.cat] || "wbar-blue"}`} style={{ width: `${wbarW}%` }} />
                    </div>
                  </td>
                  <td className={`t-num text-xs font-semibold ${clr(h.daily_gain_pct)}`}>{pct(h.daily_gain_pct)}</td>
                  <td className={`t-num text-xs font-semibold ${clr(h.mtd_gain_pct)}`}>{pct(h.mtd_gain_pct)}</td>
                  <td className={`t-num text-xs font-semibold ${clr(h.ytd_gain_pct)}`}>{pct(h.ytd_gain_pct)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="font-bold">Total</td>
              <td className="t-num">${fmt(filtered.reduce((s, h) => s + h.value_usd, 0))}</td>
              <td className="t-num">{fmt(filtered.reduce((s, h) => s + h.value_ars, 0))}</td>
              <td colSpan={4}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────
export default function PortfolioTab({ data }) {
  const [gainPeriod, setGainPeriod] = useState("ytd");
  const p = data?.portfolio;
  const fx = data?.fx;
  const usdMep = fx?.usd_mep || 1100;

  if (!p) return (
    <div className="bg-red-50 rounded-2xl p-6 text-red-700">
      <p className="font-semibold">No portfolio data</p>
      <p className="text-sm mt-1">Run <code className="bg-red-100 px-1 rounded">python3 scripts/update_data.py</code> to generate data.json</p>
    </div>
  );

  const periods = [
    { key: "daily", label: "Today", pct: p.daily_gain_pct, ars: p.daily_gain_ars },
    { key: "mtd",   label: "MTD",   pct: p.mtd_gain_pct,   ars: p.mtd_gain_ars },
    { key: "ytd",   label: "YTD",   pct: p.ytd_gain_pct,   ars: p.ytd_gain_ars },
  ];

  return (
    <div className="space-y-6 fade-up">
      {/* Hero card */}
      <div className="gradient-teal rounded-3xl p-8 text-white shadow-lg">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-teal-100 text-sm font-medium mb-1">Total Portfolio · USD MEP</p>
            <p className="text-4xl font-bold tracking-tight">${fmt(p.total_usd_mep)}</p>
            <p className="text-teal-200 text-sm mt-1">ARS {fmt(p.total_ars)}</p>
          </div>
          <div className="bg-white/20 rounded-xl px-3 py-2 text-right">
            <p className="text-xs text-teal-100">USD MEP</p>
            <p className="text-sm font-bold">${fmt(usdMep)}</p>
          </div>
        </div>

        {/* Gain tiles */}
        <div className="grid grid-cols-3 gap-3">
          {periods.map(g => (
            <button key={g.key} onClick={() => setGainPeriod(g.key)}
              className={`rounded-2xl p-3 text-left transition-all ${
                gainPeriod === g.key ? "bg-white/25 ring-2 ring-white/40" : "bg-white/10 hover:bg-white/20"}`}>
              <p className="text-teal-100 text-xs font-medium">{g.label}</p>
              <p className={`text-xl font-bold mt-0.5 ${g.pct >= 0 ? "text-green-300" : "text-red-300"}`}>
                {pct(g.pct)}
              </p>
              <p className="text-teal-100 text-xs">{g.ars >= 0 ? "+" : ""}${fmt(g.ars)}</p>
            </button>
          ))}
        </div>
      </div>

      <AllocationChart holdings={p.holdings} totalArs={p.total_ars} />

      <WideCard title="Top Movers">
        <div className="flex items-center gap-2 mb-4">
          {["daily","mtd","ytd"].map(k => (
            <button key={k} onClick={() => setGainPeriod(k)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                gainPeriod === k ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
              {k === "daily" ? "Today" : k.toUpperCase()}
            </button>
          ))}
        </div>
        <TopMovers holdings={p.holdings} period={gainPeriod} />
      </WideCard>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3 px-1">All Holdings</h3>
        <HoldingsTable holdings={p.holdings} usdMep={usdMep} totalArs={p.total_ars} />
      </div>

      {/* FCI / Letes / ONs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg">🏦</div>
            <div>
              <div className="text-sm font-semibold text-gray-900">COCOSPPA</div>
              <div className="text-xs text-blue-600 font-medium">FCI</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">FCI Cocos Ret. Total III · 516K units @ ARS 1,280<br />
            <strong className="text-gray-900">Total: ARS 661K</strong> · ARS money market fund.</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-lg">📅</div>
            <div>
              <div className="text-sm font-semibold text-gray-900">S16M6 Letes</div>
              <div className="text-xs text-amber-600 font-medium">Matures 16 Mar</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">Letra Tesoro Nacional Capitalizable maturing March 16, 2026.<br />
            <strong className="text-gray-900">5.2M ARS</strong> · Rollover decision needed this week.</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg">💱</div>
            <div>
              <div className="text-sm font-semibold text-gray-900">FX Spread</div>
              <div className="text-xs text-gray-500 font-medium">~4.4%</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">Oficial ~1,380 · MEP ~{fmt(usdMep)} · CCL ~1,440<br />
            Spread narrowing. ARS carry advantage vs CCL shrinking.</div>
        </div>
      </div>
    </div>
  );
}
