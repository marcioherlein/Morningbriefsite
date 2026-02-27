import { BriefCard } from "./brief-card";
import { TrendingUp, Zap, Star, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const sectorData = [
  { sector: "Tech", performance: 8.5 },
  { sector: "Finance", performance: 3.2 },
  { sector: "Health", performance: 4.1 },
  { sector: "Energy", performance: -1.3 },
  { sector: "Consumer", performance: 2.8 },
];

const getBarColor = (value: number) => {
  if (value > 5) return "#10b981";
  if (value > 0) return "#3b82f6";
  return "#ef4444";
};

export function StocksBrief() {
  return (
    <div className="space-y-6">
      {/* Sector Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="font-semibold text-gray-900 mb-6">
          Sector Performance (1 Week %)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={sectorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="sector" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="performance" radius={[8, 8, 0, 0]}>
              {sectorData.map((entry, index) => (
                <Cell key={index} fill={getBarColor(entry.performance)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Stock Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BriefCard
          title="NVIDIA (NVDA)"
          content="Reached new all-time high following strong data center revenue guidance. AI chip demand remains robust with order backlog extending into 2027. Analyst price targets increased to $850 (avg). Current P/E: 45x forward earnings. Valuation stretched but growth justifies premium."
          icon={<Star className="w-5 h-5 text-yellow-600" />}
          trend="up"
          value="+12.3%"
          delay={0.1}
        />

        <BriefCard
          title="Apple (AAPL)"
          content="Reports earnings Tuesday after market close. Expectations: $1.54 EPS vs $1.46 consensus. iPhone 16 sales in China showing strength. Services revenue growth accelerating. Options market implies 4% move. Consider protective strategies if heavily concentrated."
          icon={<Zap className="w-5 h-5 text-blue-600" />}
          trend="neutral"
          value="Earnings"
          delay={0.2}
        />

        <BriefCard
          title="Tesla (TSLA)"
          content="Production ramp at new facilities ahead of schedule. Q1 deliveries beat expectations by 8%. Autonomous driving updates scheduled for next month. Stock up 8.7% this week. Volatility remains elevated - suitable for risk-tolerant investors only."
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          trend="up"
          value="+8.7%"
          delay={0.3}
        />

        <BriefCard
          title="Bank Stocks Alert"
          content="Regional banks under pressure following Fed comments on commercial real estate exposure. KRE index down 3.2%. Larger money center banks (JPM, BAC) showing resilience. Consider defensive positioning if holding regional bank exposure."
          icon={<AlertCircle className="w-5 h-5 text-red-600" />}
          trend="down"
          value="-3.2%"
          delay={0.4}
        />
      </div>

      {/* Market Intelligence */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="font-semibold text-gray-900 mb-4">
          AI-Powered Market Intelligence
        </h3>
        <div className="space-y-4 text-gray-600">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Sentiment Analysis
            </h4>
            <p>
              Natural language processing of 10,000+ analyst reports, news
              articles, and social media posts reveals bullish sentiment toward
              tech stocks (87% positive), neutral on financials (52%), and
              cautious on energy (38%). Sentiment momentum suggests continued
              tech outperformance near-term.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Unusual Options Activity
            </h4>
            <p>
              Detected significant call buying in semiconductor stocks,
              particularly AMD and QCOM. Volume 3x above average. Expiration
              dates suggest traders positioning for 3-month upside. May signal
              informed buying ahead of positive developments.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Technical Pattern Recognition
            </h4>
            <p>
              Machine learning models identified bullish continuation patterns
              in 12 portfolio holdings. Strong support at $420 for SPY. Breakout
              above $435 would target $450. RSI levels indicate market is
              approaching overbought but momentum remains strong.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Upcoming Catalysts
            </h4>
            <ul className="space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-medium">Tuesday:</span>
                <span>Apple earnings (High importance)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-medium">Wednesday:</span>
                <span>Fed meeting minutes release</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-medium">Thursday:</span>
                <span>Microsoft & Meta earnings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-medium">Friday:</span>
                <span>Employment report (Consensus: 200k jobs)</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
