import { motion } from "motion/react";
import { ReactNode } from "react";

interface BriefCardProps {
  title: string;
  content: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  value?: string;
  delay?: number;
}

export function BriefCard({
  title,
  content,
  icon,
  trend,
  value,
  delay = 0,
}: BriefCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              {icon}
            </div>
          )}
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        {value && (
          <div
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              trend === "up"
                ? "bg-green-50 text-green-700"
                : trend === "down"
                ? "bg-red-50 text-red-700"
                : "bg-gray-50 text-gray-700"
            }`}
          >
            {value}
          </div>
        )}
      </div>
      <p className="text-gray-600 leading-relaxed">{content}</p>
    </motion.div>
  );
}
