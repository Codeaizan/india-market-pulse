import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockTickers } from "@/api/mock/tickers";
import { motion, AnimatePresence } from "framer-motion";
import { motionTheme } from "@/lib/motion-theme";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const filteredTickers = query.length > 0
    ? mockTickers.filter(
        (t) =>
          t.symbol.toLowerCase().includes(query.toLowerCase()) ||
          t.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (symbol: string) => {
    navigate(`/ticker/${symbol}`);
    setQuery("");
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search NSE/BSE tickers..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="pl-10"
        />
      </div>

      <AnimatePresence>
        {showResults && filteredTickers.length > 0 && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={motionTheme.variants.fadeIn}
            transition={motionTheme.transition.fast}
            className="absolute top-full mt-2 w-full rounded-2xl border bg-popover p-2 shadow-lg z-50"
          >
            {filteredTickers.slice(0, 5).map((ticker) => (
              <button
                key={ticker.symbol}
                onClick={() => handleSelect(ticker.symbol)}
                className="w-full rounded-xl px-3 py-2 text-left hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{ticker.symbol}</div>
                    <div className="text-sm text-muted-foreground">{ticker.name}</div>
                  </div>
                  <div className={ticker.changePercent >= 0 ? "text-bull" : "text-bear"}>
                    {ticker.changePercent >= 0 ? "+" : ""}
                    {ticker.changePercent.toFixed(2)}%
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
