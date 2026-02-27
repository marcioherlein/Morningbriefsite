function IndexCard({ label, data, prefix = "" }) {
  if (!data?.price) return null;
  const isPos = data.pct_change >= 0;
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-xl font-bold text-gray-900 mt-0.5">
        {prefix}{data.price.toLocaleString("es-AR", { maximumFractionDigits: 2 })}
      </p>
      <p className={`text-sm font-semibold mt-0.5 ${isPos ? "text-green-600" : "text-red-500"}`}>
        {isPos ? "+" : ""}{data.pct_change?.toFixed(2)}%
      </p>
    </div>
  );
}

export default function MarketsTab({ markets, fx }) {
  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-6 text-white">
        <h2 className="text-xl font-semibold mb-1">Markets</h2>
        <p className="text-indigo-100 text-sm">Real-time via Yahoo Finance</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">US Indices</p>
        <div className="grid grid-cols-3 gap-3">
          <IndexCard label="S&P 500" data={markets?.sp500} />
          <IndexCard label="Nasdaq" data={markets?.nasdaq} />
          <IndexCard label="Dow Jones" data={markets?.dow} />
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">Local</p>
        <div className="grid grid-cols-2 gap-3">
          <IndexCard label="Merval (ARS)" data={markets?.merval} />
          <IndexCard label="USD/BRL" data={markets?.usdbrl} prefix="R$ " />
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
        <p className="text-xs font-semibold text-blue-700 mb-2">FX Reference</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">USD MEP (GD30 ratio)</span>
          <span className="text-sm font-bold text-gray-900">${fx?.usd_mep?.toLocaleString("es-AR")}</span>
        </div>
      </div>
    </div>
  );
}
