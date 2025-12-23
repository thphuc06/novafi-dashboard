import { motion } from "framer-motion";
import { trendingCoin } from "@/data/cryptoData";
import { Flame, TrendingUp, Sparkles } from "lucide-react";

const TrendingCard = () => {
  const isPositive = trendingCoin.priceChangePercentage24h >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="card-3d"
    >
      <motion.div
        className="card-3d-inner relative overflow-hidden rounded-2xl glass p-6 border border-primary/30"
        whileHover={{ 
          boxShadow: "0 0 60px -10px hsl(var(--primary) / 0.4)",
        }}
        style={{
          background: "linear-gradient(135deg, hsl(var(--card) / 0.8), hsl(var(--card) / 0.4))",
        }}
      >
        {/* Animated glow background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, delay: 0.5 }}
          className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30"
        >
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-semibold text-orange-400">HOT</span>
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Trending Today
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <motion.img
              src={trendingCoin.image}
              alt={trendingCoin.name}
              className="w-16 h-16 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div>
              <h3 className="text-2xl font-bold text-foreground neon-text-accent">
                {trendingCoin.name}
              </h3>
              <p className="text-muted-foreground">{trendingCoin.symbol}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Price</span>
              <span className="text-xl font-bold text-foreground tabular-nums">
                ${trendingCoin.currentPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">24h Change</span>
              <motion.div
                className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
                  isPositive
                    ? "bg-success/20 text-success"
                    : "bg-destructive/20 text-destructive"
                }`}
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold tabular-nums">
                  +{trendingCoin.priceChangePercentage24h.toFixed(2)}%
                </span>
              </motion.div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Market Cap</span>
              <span className="text-foreground font-medium tabular-nums">
                ${(trendingCoin.marketCap / 1e9).toFixed(2)}B
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
          >
            Trade Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrendingCard;
