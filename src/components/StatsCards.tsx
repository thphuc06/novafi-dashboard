import { motion } from "framer-motion";
import { Activity, Zap, Globe } from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      icon: Activity,
      label: "24h Volume",
      value: "$2.4T",
      change: "+12.5%",
      positive: true,
      color: "primary",
    },
    {
      icon: Zap,
      label: "Active Trades",
      value: "1,234",
      change: "+89",
      positive: true,
      color: "accent",
    },
    {
      icon: Globe,
      label: "Market Cap",
      value: "$2.89T",
      change: "-0.8%",
      positive: false,
      color: "success",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: `0 0 30px -5px hsl(var(--${stat.color}) / 0.3)`,
          }}
          className={`glass rounded-xl p-5 border border-border/30 cursor-pointer transition-all hover:border-${stat.color}/30`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
              <stat.icon className={`w-5 h-5 text-${stat.color}`} />
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.positive
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {stat.change}
            </span>
          </div>
          <p className="text-muted-foreground text-sm">{stat.label}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
