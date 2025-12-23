import { motion } from "framer-motion";
import { tickerData } from "@/data/cryptoData";
import { TrendingUp, TrendingDown } from "lucide-react";

const MarqueeTicker = () => {
  // Double the data for seamless infinite scroll
  const doubledData = [...tickerData, ...tickerData];

  return (
    <div className="w-full overflow-hidden glass border-b border-border/30 py-3">
      <motion.div
        className="flex gap-8 animate-ticker"
        style={{ width: "fit-content" }}
      >
        {doubledData.map((item, index) => (
          <div
            key={`${item.symbol}-${index}`}
            className="flex items-center gap-2 px-4"
          >
            <span className="font-semibold text-foreground">{item.symbol}</span>
            <span className="text-muted-foreground">
              ${item.price.toLocaleString(undefined, { 
                minimumFractionDigits: 2,
                maximumFractionDigits: item.price < 1 ? 4 : 2 
              })}
            </span>
            <span
              className={`flex items-center gap-1 text-sm font-medium ${
                item.change >= 0 ? "text-success" : "text-destructive"
              }`}
            >
              {item.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {item.change >= 0 ? "+" : ""}
              {item.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeTicker;
