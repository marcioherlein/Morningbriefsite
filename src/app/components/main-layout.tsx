import { Outlet, NavLink } from "react-router";
import { Sun, TrendingUp, FileText, Building2, Globe } from "lucide-react";
import { motion } from "motion/react";

const tabs = [
  { path: "/", label: "Overview", icon: Sun },
  { path: "/portfolio", label: "Portfolio", icon: TrendingUp },
  { path: "/stocks", label: "Stocks", icon: Building2 },
  { path: "/regulation", label: "Regulation", icon: FileText },
  { path: "/country", label: "Country", icon: Globe },
];

export function MainLayout() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                Morning Brief
              </h1>
              <p className="text-sm text-gray-500 mt-1">{today}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
            >
              <Sun className="w-6 h-6 text-white" />
            </motion.div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.path === "/"}
                className={({ isActive }) =>
                  `relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <tab.icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{tab.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
