import { motion } from "framer-motion";
import { MotionCard } from "@/components/MotionCard";
import { mockIndices, mockTickers } from "@/api/mock/tickers";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motionTheme } from "@/lib/motion-theme";
import { SearchBar } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={motionTheme.variants.stagger}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <motion.h1
          variants={motionTheme.variants.fadeIn}
          className="text-3xl font-bold"
        >
          Market Overview
        </motion.h1>
        <SearchBar />
      </div>

      {/* Indices */}
      <motion.div
        variants={motionTheme.variants.fadeIn}
        className="grid gap-4 md:grid-cols-3"
      >
        {Object.entries(mockIndices).map(([name, data]) => (
          <MotionCard key={name}>
            <div className="p-6">
              <div className="text-sm text-muted-foreground">{name}</div>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {data.value.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div
                    className={`mt-1 flex items-center text-sm ${
                      data.changePercent >= 0 ? "text-bull" : "text-bear"
                    }`}
                  >
                    {data.changePercent >= 0 ? (
                      <TrendingUp className="mr-1 h-4 w-4" />
                    ) : (
                      <TrendingDown className="mr-1 h-4 w-4" />
                    )}
                    {data.change >= 0 ? "+" : ""}
                    {data.change.toFixed(2)} ({data.changePercent >= 0 ? "+" : ""}
                    {data.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
            </div>
          </MotionCard>
        ))}
      </motion.div>

      {/* Sector Heatmap */}
      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">Market by Sector</h2>
        <MotionCard>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { name: "Banking", change: 1.2 },
                { name: "IT Services", change: -0.8 },
                { name: "Oil & Gas", change: 0.5 },
                { name: "Telecom", change: 2.1 },
                { name: "FMCG", change: -0.3 },
                { name: "Auto", change: 1.8 },
                { name: "Pharma", change: 0.9 },
                { name: "Metals", change: -1.2 },
              ].map((sector) => (
                <div
                  key={sector.name}
                  className={`rounded-xl p-4 ${
                    sector.change >= 0
                      ? "bg-bull/10 text-bull"
                      : "bg-bear/10 text-bear"
                  }`}
                >
                  <div className="text-sm font-medium">{sector.name}</div>
                  <div className="mt-1 text-lg font-bold">
                    {sector.change >= 0 ? "+" : ""}
                    {sector.change.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionCard>
      </motion.div>

      {/* Top Movers */}
      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">Active Stocks</h2>
        <MotionCard>
          <div className="p-6">
            <div className="space-y-3">
              {mockTickers.slice(0, 6).map((ticker) => (
                <button
                  key={ticker.symbol}
                  onClick={() => navigate(`/ticker/${ticker.symbol}`)}
                  className="w-full rounded-xl border border-transparent p-3 text-left transition-all hover:border-border hover:bg-muted/50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{ticker.symbol}</div>
                      <div className="text-sm text-muted-foreground">
                        {ticker.sector}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ₹{ticker.currentPrice.toFixed(2)}
                      </div>
                      <div
                        className={`text-sm ${
                          ticker.changePercent >= 0 ? "text-bull" : "text-bear"
                        }`}
                      >
                        {ticker.changePercent >= 0 ? "+" : ""}
                        {ticker.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </MotionCard>
      </motion.div>
    </motion.div>
  );
};

export default Overview;
