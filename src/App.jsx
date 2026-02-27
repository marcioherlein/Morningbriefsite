import { useState, useEffect } from "react";
import OverviewTab   from "./components/OverviewTab";
import PortfolioTab  from "./components/PortfolioTab";
import MarketsTab    from "./components/MarketsTab";
import RegulationTab from "./components/RegulationTab";
import CountryTab    from "./components/CountryTab";
import SapTab        from "./components/SapTab";

const TABS = [
  { id: "overview",    label: "Overview",    icon: "🌅" },
  { id: "portfolio",   label: "Portfolio",   icon: "💼" },
  { id: "markets",     label: "Markets",     icon: "📊" },
  { id: "regulation",  label: "Regulation",  icon: "⚖️" },
  { id: "country",     label: "Country",     icon: "🌐" },
  { id: "sap",         label: "SAP",         icon: "🔷" },
];

function fmt(n, d = 0) {
  if (n == null) return "—";
  return n.toLocaleString("es-AR", { maximumFractionDigits: d });
}

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d  => { setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  const meta    = data?.meta;
  const usdMep  = data?.fx?.usd_mep;
  const session = meta?.session;

  function switchTab(id) {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <header className="bg-white/85 backdrop-blur-xl border-b border-black/[0.06] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 pt-6 pb-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight">
                Morning Brief
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {meta?.updated_at
                  ? `${meta.updated_at} · ${session === "morning" ? "Pre-market" : "Post-close"}`
                  : "Friday, February 27, 2026 · Buenos Aires, ART"}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {usdMep && (
                <div className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  MEP ${fmt(usdMep)}
                </div>
              )}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600
                              flex items-center justify-center text-2xl shadow-lg shadow-blue-500/30">
                ☀️
              </div>
            </div>
          </div>

          {/* Tab nav */}
          <nav className="flex gap-2 overflow-x-auto scrollbar-hide pb-0">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => switchTab(tab.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                             whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md shadow-blue-500/30"
                    : "text-gray-500 hover:text-gray-900 hover:bg-black/[0.04]"
                }`}>
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </nav>
          <div className="h-3" />
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-5xl mx-auto px-6 py-8 pb-20">
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700">
            <p className="font-semibold">Failed to load data.json: {error}</p>
            <p className="text-sm mt-2">
              Run <code className="bg-red-100 px-1.5 py-0.5 rounded font-mono text-xs">python3 scripts/update_data.py</code> to generate it,
              then refresh.
            </p>
          </div>
        )}

        {!loading && (
          <>
            {activeTab === "overview"   && <OverviewTab   data={data} />}
            {activeTab === "portfolio"  && <PortfolioTab  data={data} />}
            {activeTab === "markets"    && <MarketsTab    data={data} />}
            {activeTab === "regulation" && <RegulationTab />}
            {activeTab === "country"    && <CountryTab    />}
            {activeTab === "sap"        && <SapTab        />}
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-black/[0.06] bg-white/70 px-6 py-5 flex justify-between items-center flex-wrap gap-2">
        <span className="text-xs text-gray-400">
          <strong className="text-gray-500">SAP ERM · Morning Brief v5.0</strong> · All data sourced and cited · Feb 27 2026
        </span>
        <span className="text-xs text-gray-400">07:00 ART · Buenos Aires</span>
      </footer>
    </div>
  );
}
