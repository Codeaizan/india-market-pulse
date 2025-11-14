import { motion } from "framer-motion";
import { MotionCard } from "@/components/MotionCard";
import { mockTickers } from "@/api/mock/tickers";
import { motionTheme } from "@/lib/motion-theme";
import { Star, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const navigate = useNavigate();
  
  // Mock watchlist items (first 4 tickers)
  const watchlistItems = mockTickers.slice(0, 4);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={motionTheme.variants.stagger}
      className="space-y-6"
    >
      <motion.div
        variants={motionTheme.variants.fadeIn}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold">Watchlist</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Ticker
        </Button>
      </motion.div>

      <motion.div
        variants={motionTheme.variants.fadeIn}
        className="grid gap-4 md:grid-cols-2"
      >
        {watchlistItems.map((ticker) => (
          <MotionCard key={ticker.symbol}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{ticker.symbol}</h3>
                  <p className="text-sm text-muted-foreground">{ticker.name}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-warning"
                  >
                    <Star className="h-4 w-4 fill-current" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    ₹{ticker.currentPrice.toLocaleString("en-IN")}
                  </div>
                  <div
                    className={`mt-1 text-sm ${
                      ticker.changePercent >= 0 ? "text-bull" : "text-bear"
                    }`}
                  >
                    {ticker.changePercent >= 0 ? "+" : ""}
                    {ticker.changePercent.toFixed(2)}%
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/ticker/${ticker.symbol}`)}
                >
                  View Details
                </Button>
              </div>

              <div className="mt-4 h-16 flex items-center justify-center border-t pt-4 text-xs text-muted-foreground">
                Sparkline chart placeholder
              </div>
            </div>
          </MotionCard>
        ))}
      </motion.div>

      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">Alerts</h2>
        <MotionCard>
          <div className="p-6">
            <div className="text-center text-muted-foreground">
              No active alerts. Set price alerts to get notified.
            </div>
          </div>
        </MotionCard>
      </motion.div>
    </motion.div>
  );
};

export default Watchlist;
