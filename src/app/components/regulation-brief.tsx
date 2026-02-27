import { BriefCard } from "./brief-card";
import { FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { motion } from "motion/react";

export function RegulationBrief() {
  return (
    <div className="space-y-6">
      {/* Critical Alert */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-lg"
      >
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              New AI Regulations Announced
            </h2>
            <p className="text-amber-50 leading-relaxed">
              The European Union has finalized comprehensive AI regulations
              affecting companies with EU operations. Compliance deadline: Q4
              2026. Estimated implementation costs range from $5M-$50M depending
              on company size. Multiple portfolio holdings will be impacted.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Regulatory Updates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BriefCard
          title="EU AI Act - Final Rules"
          content="The EU AI Act introduces risk-based regulation for AI systems. High-risk applications require extensive documentation, testing, and human oversight. Portfolio companies Google, Microsoft, and Amazon will need significant compliance investments but are well-positioned due to existing governance frameworks."
          icon={<FileText className="w-5 h-5 text-blue-600" />}
          trend="neutral"
          value="High Priority"
          delay={0.1}
        />

        <BriefCard
          title="SEC Climate Disclosure Rules"
          content="New SEC rules require enhanced climate risk disclosures starting fiscal year 2027. Public companies must report Scope 1 and 2 emissions with third-party assurance. Portfolio energy and industrial holdings should begin preparation now to ensure compliance."
          icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
          trend="neutral"
          value="Medium Impact"
          delay={0.2}
        />

        <BriefCard
          title="Crypto Regulation Framework"
          content="Congress advanced bipartisan cryptocurrency legislation establishing clear regulatory framework. This positive development should reduce uncertainty for crypto-exposed holdings. Coinbase and Block stand to benefit from regulatory clarity and institutional adoption."
          icon={<CheckCircle className="w-5 h-5 text-green-600" />}
          trend="up"
          value="Positive"
          delay={0.3}
        />

        <BriefCard
          title="Drug Pricing Reforms"
          content="Medicare drug price negotiations begin for 10 medications. Pharmaceutical holdings Merck and Pfizer are not immediately affected but monitoring is recommended. Industry analysts expect limited impact on large-cap pharma profitability over next 3-5 years."
          icon={<Clock className="w-5 h-5 text-purple-600" />}
          trend="neutral"
          value="Low Priority"
          delay={0.4}
        />
      </div>

      {/* Impact Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="font-semibold text-gray-900 mb-4">
          Portfolio Impact Analysis
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              High Impact Holdings (6 companies, 23% of portfolio)
            </h4>
            <p className="text-gray-600 mb-3">
              Google, Microsoft, Amazon, Meta, Salesforce, Adobe - All will
              require significant AI compliance investments. However, these
              companies have strong regulatory teams and substantial resources.
              Expected implementation costs: 0.5-1% of revenue.
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-900">Recommendation:</strong> Hold
              positions. These companies are best positioned to absorb
              compliance costs and may benefit from increased barriers to entry
              for smaller competitors.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Medium Impact Holdings (4 companies, 11% of portfolio)
            </h4>
            <p className="text-gray-600 mb-3">
              ExxonMobil, Chevron, Caterpillar, 3M - Face enhanced climate
              disclosure requirements. Implementation complexity varies but
              timeline is manageable with 2027 deadline.
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-900">Recommendation:</strong>{" "}
              Monitor quarterly progress on compliance preparation. No
              immediate action needed.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Positive Impact Holdings (2 companies, 3% of portfolio)
            </h4>
            <p className="text-gray-600 mb-3">
              Coinbase, Block - Benefit from crypto regulatory clarity.
              Institutional adoption likely to accelerate with clear rules.
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-900">Recommendation:</strong>{" "}
              Consider increasing allocation as regulatory uncertainty
              diminishes. Target 5% portfolio weight.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
