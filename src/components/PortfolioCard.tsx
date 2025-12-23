import { motion } from "framer-motion";
import { portfolioHoldings } from "@/data/cryptoData";

const PortfolioCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-glow-accent rounded-2xl p-6"
    >
      <h3 className="text-lg font-bold text-foreground mb-4">Your Holdings</h3>
      
      <div className="space-y-4">
        {portfolioHoldings.map((holding, index) => (
          <motion.div
            key={holding.asset.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "hsl(var(--muted) / 0.3)",
            }}
            className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all"
          >
            <div className="flex items-center gap-3">
              <img
                src={holding.asset.image}
                alt={holding.asset.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-foreground">{holding.asset.symbol}</p>
                <p className="text-muted-foreground text-sm">
                  {holding.amount.toLocaleString()} coins
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground tabular-nums">
                ${holding.value.toLocaleString()}
              </p>
              <p className="text-muted-foreground text-sm tabular-nums">
                {holding.allocation}%
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Allocation bar */}
      <div className="mt-6">
        <p className="text-xs text-muted-foreground mb-2">Allocation</p>
        <div className="flex h-2 rounded-full overflow-hidden bg-muted">
          {portfolioHoldings.map((holding, index) => (
            <motion.div
              key={holding.asset.id}
              initial={{ width: 0 }}
              animate={{ width: `${holding.allocation}%` }}
              transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
              className={`h-full ${
                index === 0
                  ? "bg-primary"
                  : index === 1
                  ? "bg-accent"
                  : index === 2
                  ? "bg-success"
                  : "bg-orange-500"
              }`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-3">
          {portfolioHoldings.map((holding, index) => (
            <div key={holding.asset.id} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  index === 0
                    ? "bg-primary"
                    : index === 1
                    ? "bg-accent"
                    : index === 2
                    ? "bg-success"
                    : "bg-orange-500"
                }`}
              />
              <span className="text-xs text-muted-foreground">
                {holding.asset.symbol}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
