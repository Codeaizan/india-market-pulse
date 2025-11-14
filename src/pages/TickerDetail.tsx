import { motion } from "framer-motion";
import { MotionCard } from "@/components/MotionCard";
import { useParams } from "react-router-dom";
import { mockTickers } from "@/api/mock/tickers";
import { generateMockPriceData, calculateMovingAverage, calculateRSI } from "@/api/mock/priceData";
import { motionTheme } from "@/lib/motion-theme";
import { TrendingUp, TrendingDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo } from "react";

const TickerDetail = () => {
  const { symbol } = useParams();
  const ticker = mockTickers.find((t) => t.symbol === symbol);

  const priceData = useMemo(() => generateMockPriceData(symbol || "", 365), [symbol]);
  const ma20 = useMemo(() => calculateMovingAverage(priceData, 20), [priceData]);
  const ma50 = useMemo(() => calculateMovingAverage(priceData, 50), [priceData]);
  const rsi = useMemo(() => calculateRSI(priceData, 14), [priceData]);

  if (!ticker) {
    return <div>Ticker not found</div>;
  }

  const handleDownload = () => {
    const csv = [
      ["Date", "Open", "High", "Low", "Close", "Volume"],
      ...priceData.map((p) => [
        new Date(p.timestamp).toISOString(),
        p.open,
        p.high,
        p.low,
        p.close,
        p.volume,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${symbol}_data.csv`;
    a.click();
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={motionTheme.variants.stagger}
      className="space-y-6"
    >
      <motion.div
        variants={motionTheme.variants.fadeIn}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">{ticker.symbol}</h1>
          <p className="text-muted-foreground">{ticker.name}</p>
        </div>
        <Button onClick={handleDownload} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </motion.div>

      <motion.div variants={motionTheme.variants.fadeIn}>
        <MotionCard>
          <div className="p-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-4xl font-bold">
                  ₹{ticker.currentPrice.toLocaleString("en-IN")}
                </div>
                <div
                  className={`mt-2 flex items-center text-lg ${
                    ticker.changePercent >= 0 ? "text-bull" : "text-bear"
                  }`}
                >
                  {ticker.changePercent >= 0 ? (
                    <TrendingUp className="mr-2 h-5 w-5" />
                  ) : (
                    <TrendingDown className="mr-2 h-5 w-5" />
                  )}
                  {ticker.change >= 0 ? "+" : ""}
                  {ticker.change.toFixed(2)} ({ticker.changePercent >= 0 ? "+" : ""}
                  {ticker.changePercent.toFixed(2)}%)
                </div>
              </div>
              <div className="space-y-2 text-right text-sm">
                <div>
                  <span className="text-muted-foreground">Exchange: </span>
                  <span className="font-medium">{ticker.exchange}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Sector: </span>
                  <span className="font-medium">{ticker.sector}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Market Cap: </span>
                  <span className="font-medium">
                    ₹{(ticker.marketCap / 10000000).toFixed(0)}Cr
                  </span>
                </div>
              </div>
            </div>
          </div>
        </MotionCard>
      </motion.div>

      <motion.div variants={motionTheme.variants.fadeIn}>
        <Tabs defaultValue="price" className="w-full">
          <TabsList>
            <TabsTrigger value="price">Price & MA</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="rsi">RSI</TabsTrigger>
          </TabsList>

          <TabsContent value="price" className="mt-4">
            <MotionCard>
              <div className="p-6">
                <div className="h-96 flex items-center justify-center text-muted-foreground">
                  Price chart with MA(20), MA(50), MA(200) - Ready for chart library integration
                </div>
              </div>
            </MotionCard>
          </TabsContent>

          <TabsContent value="volume" className="mt-4">
            <MotionCard>
              <div className="p-6">
                <div className="h-96 flex items-center justify-center text-muted-foreground">
                  Volume chart - Ready for chart library integration
                </div>
              </div>
            </MotionCard>
          </TabsContent>

          <TabsContent value="rsi" className="mt-4">
            <MotionCard>
              <div className="p-6">
                <div className="h-96 flex items-center justify-center text-muted-foreground">
                  RSI(14) chart with overbought/oversold levels - Ready for chart library integration
                </div>
              </div>
            </MotionCard>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default TickerDetail;
