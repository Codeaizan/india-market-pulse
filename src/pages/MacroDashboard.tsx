import { motion } from "framer-motion";
import { MotionCard } from "@/components/MotionCard";
import { mockMacroIndicators } from "@/api/mock/macro";
import { motionTheme } from "@/lib/motion-theme";
import { TrendingUp, TrendingDown } from "lucide-react";

const MacroDashboard = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={motionTheme.variants.stagger}
      className="space-y-6"
    >
      <motion.h1
        variants={motionTheme.variants.fadeIn}
        className="text-3xl font-bold"
      >
        Macro Dashboard - India
      </motion.h1>

      <motion.div
        variants={motionTheme.variants.fadeIn}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {mockMacroIndicators.map((indicator) => (
          <MotionCard key={indicator.name}>
            <div className="p-6">
              <div className="text-sm text-muted-foreground">{indicator.name}</div>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {indicator.value.toLocaleString("en-IN")}
                    <span className="ml-1 text-sm text-muted-foreground">
                      {indicator.unit}
                    </span>
                  </div>
                  <div
                    className={`mt-1 flex items-center text-sm ${
                      indicator.changePercent >= 0 ? "text-bull" : "text-bear"
                    }`}
                  >
                    {indicator.changePercent >= 0 ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {indicator.changePercent >= 0 ? "+" : ""}
                    {indicator.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                As of {indicator.asOf}
              </div>
            </div>
          </MotionCard>
        ))}
      </motion.div>

      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">Sector Indices Comparison</h2>
        <MotionCard>
          <div className="p-6">
            <div className="h-96 flex items-center justify-center text-muted-foreground">
              Sector indices performance chart - Ready for integration
            </div>
          </div>
        </MotionCard>
      </motion.div>

      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">FPI Flows Trend</h2>
        <MotionCard>
          <div className="p-6">
            <div className="h-80 flex items-center justify-center text-muted-foreground">
              Foreign portfolio investor flows chart - Ready for integration
            </div>
          </div>
        </MotionCard>
      </motion.div>
    </motion.div>
  );
};

export default MacroDashboard;
