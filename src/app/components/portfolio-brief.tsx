import { BriefCard } from "./brief-card";
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";
import { motion } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { month: "Jan", value: 100 },
  { month: "Feb", value: 105 },
  { month: "Mar", value: 103 },
  { month: "Apr", value: 110 },
  { month: "May", value: 115 },
  { month: "Jun", value: 118 },
];

export function PortfolioBrief() {
  return (
    <div className="space-y-6">
      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="font-semibold text-gray-900 mb-6">
          Portfolio Performance (YTD)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#colorGradient)"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", r: 4 }}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Portfolio Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BriefCard
          title="Top Performers"
          content="NVIDIA (+12.3%) and Tesla (+8.7%) led portfolio gains this week. Strong earnings reports and positive analyst upgrades drove momentum. Tech sector allocation is now 35%, slightly above your 30% target. Consider trimming positions to maintain diversification."
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          trend="up"
          value="+10.5%"
          delay={0.1}
        />

        <BriefCard
          title="Underperformers"
          content="Traditional retail holdings declined -3.2% amid consumer spending concerns. However, this presents a potential buying opportunity as valuations are now attractive. Long-term fundamentals remain solid with strong balance sheets."
          icon={<TrendingDown className="w-5 h-5 text-red-600" />}
          trend="down"
          value="-3.2%"
          delay={0.2}
        />

        <BriefCard
          title="Dividend Income"
          content="Expected quarterly dividend income: $4,850. Three holdings announced dividend increases this quarter: Johnson & Johnson (+5%), Coca-Cola (+4%), and Procter & Gamble (+3%). Total yield portfolio: 3.2%, exceeding S&P 500 average."
          icon={<DollarSign className="w-5 h-5 text-blue-600" />}
          trend="up"
          value="+$650"
          delay={0.3}
        />

        <BriefCard
          title="Asset Allocation"
          content="Current allocation: Equities 65%, Bonds 25%, Cash 10%. Your equity allocation is within target range. Bond allocation is slightly underweight - consider adding duration given current yield curve. Cash position provides flexibility for opportunistic investments."
          icon={<PieChart className="w-5 h-5 text-purple-600" />}
          trend="neutral"
          value="Balanced"
          delay={0.4}
        />
      </div>

      {/* Detailed Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="font-semibold text-gray-900 mb-4">
          LLM Analysis & Recommendations
        </h3>
        <div className="space-y-4 text-gray-600">
          <p>
            Your portfolio is performing well with a YTD return of +18%,
            outperforming the S&P 500 by 3.2 percentage points. The
            outperformance is primarily driven by overweight positions in the
            technology sector, which has been the strongest performing sector
            this year.
          </p>
          <p>
            <strong className="text-gray-900">Risk Assessment:</strong> Current
            portfolio volatility is moderate at 14% annualized, slightly above
            your target of 12%. This is primarily due to increased tech
            concentration. Consider rebalancing to reduce single-sector risk.
          </p>
          <p>
            <strong className="text-gray-900">Upcoming Events:</strong> Five of
            your holdings report earnings next week. Pay particular attention to
            Apple (Tuesday) and Microsoft (Thursday) as they represent 12% of
            portfolio value. Analyst consensus suggests positive surprises are
            likely.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
