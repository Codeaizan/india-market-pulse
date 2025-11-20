import { motion } from "framer-motion";
import { MotionCard } from "@/components/MotionCard";
import { mockIndices, mockTickers } from "@/api/mock/tickers";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { motionTheme } from "@/lib/motion-theme";
import { SearchBar } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useUpstoxQuotes } from "@/hooks/useUpstoxQuotes";
import { getUpstoxSymbols } from "@/api/upstoxInstruments";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Overview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch real-time quotes for indices
  const indicesSymbols = ['NIFTY50', 'BANKNIFTY', 'SENSEX'];
  const { data: indicesData, isLoading: indicesLoading, error: indicesError } = useUpstoxQuotes(
    getUpstoxSymbols(indicesSymbols)
  );

  // Fetch real-time quotes for stocks
  const stockSymbols = mockTickers.slice(0, 6).map(t => t.symbol);
  const { data: stocksData, isLoading: stocksLoading, error: stocksError } = useUpstoxQuotes(
    getUpstoxSymbols(stockSymbols)
  );

  useEffect(() => {
    if (indicesError) {
      toast({
        title: "Error fetching indices data",
        description: "Using demo data. Check your Upstox API key.",
        variant: "destructive",
      });
    }
    if (stocksError) {
      toast({
        title: "Error fetching stocks data", 
        description: "Using demo data. Check your Upstox API key.",
        variant: "destructive",
      });
    }
  }, [indicesError, stocksError, toast]);

  // Helper to get real-time price data or fallback to mock
  const getIndexData = (name: string) => {
    if (indicesData?.data) {
      const upstoxKey = getUpstoxSymbols([name])[0];
      const quote = indicesData.data[upstoxKey];
      if (quote) {
        const lastPrice = quote.last_price || mockIndices[name as keyof typeof mockIndices].value;
        const change = quote.net_change || mockIndices[name as keyof typeof mockIndices].change;
        const changePercent = ((change / (lastPrice - change)) * 100);
        return { value: lastPrice, change, changePercent };
      }
    }
    return mockIndices[name as keyof typeof mockIndices];
  };

  const getStockData = (symbol: string) => {
    if (stocksData?.data) {
      const upstoxKey = getUpstoxSymbols([symbol])[0];
      const quote = stocksData.data[upstoxKey];
      if (quote) {
        const ticker = mockTickers.find(t => t.symbol === symbol)!;
        return {
          ...ticker,
          currentPrice: quote.last_price || ticker.currentPrice,
          change: quote.net_change || ticker.change,
          changePercent: ((quote.net_change / (quote.last_price - quote.net_change)) * 100) || ticker.changePercent,
        };
      }
    }
    return mockTickers.find(t => t.symbol === symbol)!;
  };

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
        <div className="flex items-center gap-4">
          {(indicesLoading || stocksLoading) && (
            <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
          <SearchBar />
        </div>
      </div>

      {/* Indices */}
      <motion.div
        variants={motionTheme.variants.fadeIn}
        className="grid gap-4 md:grid-cols-3"
      >
        {indicesSymbols.map((name) => {
          const data = getIndexData(name);
          return (
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
        );
        })}
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
              {stockSymbols.map((symbol) => {
                const ticker = getStockData(symbol);
                return (
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
              );
              })}
            </div>
          </div>
        </MotionCard>
      </motion.div>
    </motion.div>
  );
};

export default Overview;
