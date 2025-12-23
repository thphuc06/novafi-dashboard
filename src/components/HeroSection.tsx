import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { portfolioStats, portfolioHistory } from "@/data/cryptoData";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const AnimatedCounter = ({ 
  value, 
  duration = 2000,
  prefix = "$",
}: { 
  value: number; 
  duration?: number;
  prefix?: string;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const animationFrame = useRef<number>();

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(value * easeOutQuart);
      
      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };

    animationFrame.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [value, duration]);

  return (
    <span className="tabular-nums">
      {prefix}
      {displayValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
};

const HeroSection = () => {
  const isPositive = portfolioStats.changePercentage24h >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl glass-glow p-8"
    >
      {/* Background Chart */}
      <div className="absolute inset-0 opacity-30">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={portfolioHistory}>
            <defs>
              <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#heroGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="p-3 rounded-xl bg-primary/20 border border-primary/30"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Wallet className="w-6 h-6 text-primary" />
          </motion.div>
          <div>
            <p className="text-muted-foreground text-sm">Total Portfolio Value</p>
            <p className="text-xs text-muted-foreground/70">Updated just now</p>
          </div>
        </div>

        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4 neon-text"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatedCounter value={portfolioStats.totalBalance} />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            isPositive
              ? "bg-success/20 border border-success/30"
              : "bg-destructive/20 border border-destructive/30"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-destructive" />
          )}
          <span className={isPositive ? "text-success font-medium" : "text-destructive font-medium"}>
            {isPositive ? "+" : ""}
            ${portfolioStats.change24h.toLocaleString()} ({isPositive ? "+" : ""}
            {portfolioStats.changePercentage24h}%)
          </span>
          <span className="text-muted-foreground text-sm">24h</span>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-4 rounded-xl bg-muted/30 border border-border/30"
          >
            <p className="text-muted-foreground text-xs mb-1">All-Time High</p>
            <p className="text-lg font-semibold text-foreground">
              ${portfolioStats.allTimeHigh.toLocaleString()}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-4 rounded-xl bg-muted/30 border border-border/30"
          >
            <p className="text-muted-foreground text-xs mb-1">All-Time Low</p>
            <p className="text-lg font-semibold text-foreground">
              ${portfolioStats.allTimeLow.toLocaleString()}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
