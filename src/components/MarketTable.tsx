import { motion } from "framer-motion";
import { cryptoAssets, CryptoAsset } from "@/data/cryptoData";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const SparklineChart = ({ 
  data, 
  isPositive 
}: { 
  data: number[]; 
  isPositive: boolean;
}) => {
  const chartData = data.map((value, index) => ({ value, index }));
  const color = isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))";

  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id={`sparkline-${isPositive ? 'up' : 'down'}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#sparkline-${isPositive ? 'up' : 'down'})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CoinRow = ({ 
  asset, 
  index 
}: { 
  asset: CryptoAsset; 
  index: number;
}) => {
  const isPositive = asset.priceChangePercentage24h >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.01,
        backgroundColor: "hsl(var(--muted) / 0.3)",
      }}
      className={`grid grid-cols-12 gap-4 items-center p-4 rounded-xl border border-transparent cursor-pointer transition-all duration-300 ${
        isPositive 
          ? "hover:border-success/20 hover:shadow-[0_0_20px_-5px] hover:shadow-success/10" 
          : "hover:border-destructive/20 hover:shadow-[0_0_20px_-5px] hover:shadow-destructive/10"
      }`}
    >
      {/* Rank */}
      <div className="col-span-1 text-muted-foreground text-sm">
        #{asset.rank}
      </div>

      {/* Asset Info */}
      <div className="col-span-3 flex items-center gap-3">
        <motion.img
          src={asset.image}
          alt={asset.name}
          className="w-10 h-10 rounded-full"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
        <div>
          <p className="font-semibold text-foreground">{asset.name}</p>
          <p className="text-muted-foreground text-sm">{asset.symbol}</p>
        </div>
      </div>

      {/* Price */}
      <div className="col-span-2 text-right">
        <p className="font-semibold text-foreground tabular-nums">
          ${asset.currentPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: asset.currentPrice < 1 ? 4 : 2,
          })}
        </p>
      </div>

      {/* 24h Change */}
      <div className="col-span-2 text-right">
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg ${
            isPositive
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span className="text-sm font-medium tabular-nums">
            {isPositive ? "+" : ""}
            {asset.priceChangePercentage24h.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Market Cap */}
      <div className="col-span-2 text-right text-muted-foreground text-sm tabular-nums">
        ${(asset.marketCap / 1e9).toFixed(2)}B
      </div>

      {/* Sparkline */}
      <div className="col-span-2">
        <SparklineChart data={asset.sparklineData} isPositive={isPositive} />
      </div>
    </motion.div>
  );
};

const MarketTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-glow rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Live Market</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
        >
          View All
        </motion.button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 pb-3 border-b border-border/30 text-muted-foreground text-xs uppercase tracking-wider">
        <div className="col-span-1">#</div>
        <div className="col-span-3">Asset</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-right">24h Change</div>
        <div className="col-span-2 text-right">Market Cap</div>
        <div className="col-span-2 text-right">Last 24h</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border/20">
        {cryptoAssets.map((asset, index) => (
          <CoinRow key={asset.id} asset={asset} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default MarketTable;
