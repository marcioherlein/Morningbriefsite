import { useState, useEffect } from "react";
import PortfolioTab from "./components/PortfolioTab";
import MarketsTab from "./components/MarketsTab";

const TABS = ["Overview", "Portfolio", "Markets", "Regulation", "Countries", "SAP"];

export default function App() {
  const [activeTab, setActiveTab] = useState("Portfolio");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Morning Brief</h1>
              <p className="text-xs text-gray-500">
                {data?.meta?.updated_at || "Loading..."}
                {data?.meta?.session === "morning" ? " · Pre-market" : " · Post-close"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {data?.fx?.usd_mep && (
                <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-lg">
                  MEP ${data.fx.usd_mep.toLocaleString("es-AR")}
                </span>
              )}
            </div>
          </div>
          {/* Tab bar */}
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-red-700 rounded-2xl p-6">
            <p className="font-semibold">Failed to load data.json</p>
            <p className="text-sm mt-1">{error}</p>
            <p className="text-sm mt-2">Run <code className="bg-red-100 px-1 rounded">python3 scripts/update_data.py</code> to generate it.</p>
          </div>
        )}
        {!loading && !error && data && (
          <>
            {activeTab === "Portfolio" && <PortfolioTab portfolio={data.portfolio} fx={data.fx} />}
            {activeTab === "Markets" && <MarketsTab markets={data.markets} fx={data.fx} />}
            {activeTab === "Overview" && <OverviewTab data={data} />}
            {["Regulation", "Countries", "SAP"].includes(activeTab) && (
              <PlaceholderTab name={activeTab} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function OverviewTab({ data }) {
  const p = data.portfolio;
  const fmt = (n) => n ? n.toLocaleString("es-AR", { maximumFractionDigits: 0 }) : "—";
  const pct = (n) => n != null ? `${n > 0 ? "+" : ""}${n.toFixed(2)}%` : "—";
  const color = (n) => n > 0 ? "text-green-600" : n < 0 ? "text-red-500" : "text-gray-600";

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 text-white">
        <p className="text-blue-100 text-sm mb-1">Total Portfolio</p>
        <p className="text-3xl font-bold">${fmt(p.total_usd_mep)} USD</p>
        <p className="text-blue-100 text-sm mt-1">ARS {fmt(p.total_ars)}</p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { label: "Today", pct: p.daily_gain_pct, abs: p.daily_gain_ars },
            { label: "MTD", pct: p.mtd_gain_pct, abs: p.mtd_gain_ars },
            { label: "YTD", pct: p.ytd_gain_pct, abs: p.ytd_gain_ars },
          ].map((g) => (
            <div key={g.label} className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-blue-100 text-xs">{g.label}</p>
              <p className={`text-lg font-bold ${g.pct >= 0 ? "text-green-300" : "text-red-300"}`}>
                {pct(g.pct)}
              </p>
              <p className="text-blue-100 text-xs">{g.abs >= 0 ? "+" : ""}${fmt(g.abs)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlaceholderTab({ name }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 text-center text-gray-400">
      <p className="text-lg font-medium">{name}</p>
      <p className="text-sm mt-1">Content coming soon</p>
    </div>
  );
}
