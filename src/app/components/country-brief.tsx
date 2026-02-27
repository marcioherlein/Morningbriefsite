import { BriefCard } from "./brief-card";
import { Globe, TrendingUp, AlertTriangle, Award } from "lucide-react";
import { motion } from "motion/react";

export function CountryBrief() {
  return (
    <div className="space-y-6">
      {/* Global Overview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-lg"
      >
        <div className="flex items-start gap-4">
          <Globe className="w-8 h-8 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Global Market Overview
            </h2>
            <p className="text-indigo-50 leading-relaxed">
              Major markets showing positive momentum. US markets leading with
              tech strength, European markets recovering on easing energy
              concerns, and Asian markets benefiting from China stimulus
              measures. Emerging markets outperforming developed markets for
              third consecutive week.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Regional Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BriefCard
          title="United States"
          content="S&P 500 approaching all-time highs driven by strong tech earnings and resilient consumer spending. Fed maintaining current policy stance. Employment data remains robust with 3.8% unemployment. Consumer confidence improving. GDP growth tracking at 2.5% for Q1."
          icon={<Award className="w-5 h-5 text-blue-600" />}
          trend="up"
          value="+1.2%"
          delay={0.1}
        />

        <BriefCard
          title="European Union"
          content="European markets rallying on energy price stabilization and positive economic data from Germany. ECB signaling potential rate cuts in H2 2026. Manufacturing PMI returned to expansion territory. Euro strengthening against dollar. CAC 40 and DAX both up this week."
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          trend="up"
          value="+0.9%"
          delay={0.2}
        />

        <BriefCard
          title="China"
          content="Chinese stimulus measures driving market gains. Property sector showing signs of stabilization. Tech stocks recovering after regulatory clarity. Manufacturing activity expanding. Yuan stable despite geopolitical tensions. Hang Seng index up 3.4% this week - best performance in months."
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          trend="up"
          value="+3.4%"
          delay={0.3}
        />

        <BriefCard
          title="Japan"
          content="Nikkei 225 consolidating near highs. Bank of Japan maintaining accommodative policy despite inflation above target. Yen weakness supporting exporters but raising import costs. Corporate governance reforms attracting foreign investment. Consider increasing Japan allocation."
          icon={<Globe className="w-5 h-5 text-blue-600" />}
          trend="up"
          value="+0.6%"
          delay={0.4}
        />

        <BriefCard
          title="United Kingdom"
          content="FTSE 100 showing resilience despite political uncertainty. Energy and financial sectors supporting index. Bank of England maintaining hawkish stance. Sterling stable. Brexit-related trade issues largely resolved. Mid-cap stocks offering value opportunities."
          icon={<Globe className="w-5 h-5 text-purple-600" />}
          trend="neutral"
          value="+0.3%"
          delay={0.5}
        />

        <BriefCard
          title="Emerging Markets"
          content="MSCI EM index outperforming developed markets. India leading with continued strong growth. Brazil benefiting from commodity prices. Mexico attracting nearshoring investment. However, Argentina and Turkey remain volatile. Selective opportunities in quality EM names."
          icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
          trend="up"
          value="+1.8%"
          delay={0.6}
        />
      </div>

      {/* Geopolitical Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="font-semibold text-gray-900 mb-4">
          Geopolitical Risk Assessment
        </h3>
        <div className="space-y-4 text-gray-600">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              US-China Relations
            </h4>
            <p>
              Trade tensions easing following successful high-level
              negotiations. Technology restrictions remain but dialogue has
              improved. Market sentiment increasingly positive. Supply chain
              diversification continues but at measured pace. Impact: Positive
              for multinational technology companies.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Middle East Stability
            </h4>
            <p>
              Oil prices stable despite ongoing regional tensions. Global energy
              supply chains functioning normally. Renewable energy transition
              accelerating, reducing dependency on single regions. Impact:
              Neutral for energy portfolio holdings.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              European Integration
            </h4>
            <p>
              EU cohesion strengthening with unified response to shared
              challenges. Digital single market progressing. Defense
              cooperation increasing. Euro zone expansion plans on track.
              Impact: Positive for European equity exposure.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Currency Outlook</h4>
            <ul className="space-y-2 mt-2">
              <li className="flex justify-between">
                <span>USD: Strong fundamentals, potential moderate decline</span>
                <span className="font-medium text-gray-900">Neutral</span>
              </li>
              <li className="flex justify-between">
                <span>EUR: Benefiting from economic recovery</span>
                <span className="font-medium text-green-700">Positive</span>
              </li>
              <li className="flex justify-between">
                <span>JPY: Weak but supportive for exporters</span>
                <span className="font-medium text-gray-900">Neutral</span>
              </li>
              <li className="flex justify-between">
                <span>CNY: Stable with managed appreciation</span>
                <span className="font-medium text-gray-900">Neutral</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Investment Implications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
      >
        <h3 className="font-semibold text-gray-900 mb-4">
          Recommended Geographic Allocation
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="font-medium text-gray-900">US Equities</span>
            <span className="text-gray-600">55% (Target: 50-60%)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="font-medium text-gray-900">
              Developed International
            </span>
            <span className="text-gray-600">25% (Target: 25-30%)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="font-medium text-gray-900">Emerging Markets</span>
            <span className="text-gray-600">15% (Target: 15-20%)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="font-medium text-gray-900">
              Cash & Alternatives
            </span>
            <span className="text-gray-600">5% (Target: 5-10%)</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Current allocation is well-balanced. Consider modest increase to
          emerging markets given recent positive momentum and attractive
          valuations.
        </p>
      </motion.div>
    </div>
  );
}
