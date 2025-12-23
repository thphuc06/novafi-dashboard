import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  TrendingUp, 
  Wallet, 
  Bell, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BarChart3,
  ArrowRightLeft,
  Shield,
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: TrendingUp, label: "Markets" },
  { icon: ArrowRightLeft, label: "Trade" },
  { icon: Wallet, label: "Portfolio" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Bell, label: "Alerts" },
];

const bottomNavItems: NavItem[] = [
  { icon: Shield, label: "Security" },
  { icon: Settings, label: "Settings" },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        width: collapsed ? 80 : 240,
      }}
      transition={{ duration: 0.4 }}
      className="h-screen sticky top-0 glass border-r border-border/30 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border/30">
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <h1 className="text-xl font-bold text-foreground neon-text">
                  NovaFi
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: item.active 
                ? "hsl(var(--primary) / 0.15)" 
                : "hsl(var(--muted) / 0.5)",
            }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              item.active
                ? "bg-primary/10 border border-primary/30 text-primary shadow-lg shadow-primary/10"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 ${item.active ? "text-primary" : ""}`} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium overflow-hidden whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 space-y-2 border-t border-border/30">
        {bottomNavItems.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "hsl(var(--muted) / 0.5)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-all"
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium overflow-hidden whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Collapse Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </motion.button>
    </motion.aside>
  );
};

export default AppSidebar;
