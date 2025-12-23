import { motion } from "framer-motion";
import AppSidebar from "@/components/AppSidebar";
import MarqueeTicker from "@/components/MarqueeTicker";
import HeroSection from "@/components/HeroSection";
import MarketTable from "@/components/MarketTable";
import TrendingCard from "@/components/TrendingCard";
import PortfolioCard from "@/components/PortfolioCard";
import StatsCards from "@/components/StatsCards";

const Index = () => {
  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <div className="flex w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Ticker */}
          <MarqueeTicker />

          {/* Dashboard Content */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 p-6 lg:p-8 overflow-auto custom-scrollbar"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, <span className="neon-text">Trader</span>
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your portfolio today.
              </p>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Hero - Full Width on Mobile, 2 cols on Desktop */}
              <div className="lg:col-span-2">
                <HeroSection />
              </div>

              {/* Trending Card */}
              <div className="lg:col-span-1">
                <TrendingCard />
              </div>

              {/* Stats Cards - Full Width */}
              <div className="lg:col-span-2">
                <StatsCards />
              </div>

              {/* Portfolio Holdings */}
              <div className="lg:col-span-1">
                <PortfolioCard />
              </div>

              {/* Market Table - Full Width */}
              <div className="lg:col-span-3">
                <MarketTable />
              </div>
            </div>

            {/* Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 pt-6 border-t border-border/30 text-center"
            >
              <p className="text-muted-foreground text-sm">
                NovaFi © 2024 • Powered by real-time market data
              </p>
            </motion.footer>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default Index;
