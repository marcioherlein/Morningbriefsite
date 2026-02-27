import { BriefCard } from "./brief-card";
import {
  TrendingUp,
  AlertCircle,
  Sparkles,
  DollarSign,
  Globe,
} from "lucide-react";
import { motion } from "motion/react";

export function OverviewBrief() {
  return (
    <div className="space-y-6">
      {/* Hero Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg"
      >
        <div className="flex items-start gap-4">
          <Sparkles className="w-8 h-8 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Good Morning! Here's Your Daily Brief
            </h2>
            <p className="text-blue-50 leading-relaxed">
              Markets are showing positive momentum today with the S&P 500 up
              0.8% in pre-market trading. Key developments include new tech
              sector regulations, strong earnings from major portfolio holdings,
              and geopolitical updates affecting emerging markets. We've
              identified three actionable insights for your immediate attention.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Key Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BriefCard
          title="Market Sentiment"
          content="Global equity markets are trading higher following positive economic data from the US and Europe. Tech and consumer discretionary sectors are leading gains. Treasury yields remain stable, suggesting balanced risk appetite among investors."
          icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
          trend="up"
          value="+0.8%"
          delay={0.1}
        />

        <BriefCard
          title="Portfolio Performance"
          content="Your portfolio outperformed benchmarks by 1.2% this week, driven by strong performance in technology holdings. Apple and Microsoft both reached new highs. Consider rebalancing if tech allocation exceeds your target by more than 5%."
          icon={<DollarSign className="w-5 h-5 text-green-600" />}
          trend="up"
          value="+2.4%"
          delay={0.2}
        />

        <BriefCard
          title="Regulatory Alert"
          content="The EU announced new AI regulations that could impact major tech companies. Compliance deadlines are set for Q4 2026. Companies in your portfolio with significant EU operations may face implementation costs but should benefit from regulatory clarity."
          icon={<AlertCircle className="w-5 h-5 text-amber-600" />}
          trend="neutral"
          value="Medium Impact"
          delay={0.3}
        />

        <BriefCard
          title="Geopolitical Update"
          content="Trade tensions between major economies are easing following successful negotiations. Emerging markets are responding positively, with the MSCI EM index up 1.5%. Consider increasing allocation to international equities if underweight."
          icon={<Globe className="w-5 h-5 text-purple-600" />}
          trend="up"
          value="+1.5%"
          delay={0.4}
        />
      </div>

      {/* Action Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="font-semibold text-gray-900 mb-4">
          Recommended Actions
        </h3>
        <ul className="space-y-3">
          {[
            "Review tech sector allocation - currently 5% over target",
            "Monitor earnings calls from AAPL and MSFT scheduled this week",
            "Assess EU regulatory impact on portfolio holdings",
            "Consider rebalancing into emerging market opportunities",
          ].map((action, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-3 text-gray-600"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
              {action}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
