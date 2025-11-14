import { motion } from "framer-motion";
import { MotionCard } from "@/components/MotionCard";
import { mockFactorExposures, mockRiskMetrics, mockScenarios } from "@/api/mock/factors";
import { motionTheme } from "@/lib/motion-theme";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FactorModel = () => {
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
        Factor Model & Risk Analytics
      </motion.h1>

      {/* Risk Metrics Overview */}
      <motion.div
        variants={motionTheme.variants.fadeIn}
        className="grid gap-4 md:grid-cols-4"
      >
        <MotionCard>
          <div className="p-6">
            <div className="text-sm text-muted-foreground">Market Beta</div>
            <div className="mt-2 text-2xl font-bold">{mockRiskMetrics.beta.toFixed(2)}</div>
          </div>
        </MotionCard>
        <MotionCard>
          <div className="p-6">
            <div className="text-sm text-muted-foreground">R-Squared</div>
            <div className="mt-2 text-2xl font-bold">
              {(mockRiskMetrics.rSquared * 100).toFixed(1)}%
            </div>
          </div>
        </MotionCard>
        <MotionCard>
          <div className="p-6">
            <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
            <div className="mt-2 text-2xl font-bold">
              {mockRiskMetrics.sharpeRatio.toFixed(2)}
            </div>
          </div>
        </MotionCard>
        <MotionCard>
          <div className="p-6">
            <div className="text-sm text-muted-foreground">Volatility (Ann.)</div>
            <div className="mt-2 text-2xl font-bold">
              {(mockRiskMetrics.volatility * 100).toFixed(1)}%
            </div>
          </div>
        </MotionCard>
      </motion.div>

      {/* Factor Exposures */}
      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">Factor Exposures</h2>
        <MotionCard>
          <div className="p-6">
            <div className="h-96 flex items-center justify-center text-muted-foreground">
              Factor exposure bar chart - Ready for chart library integration
            </div>
          </div>
        </MotionCard>
      </motion.div>

      {/* Rolling Beta & R² */}
      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">Rolling Beta & R²</h2>
        <MotionCard>
          <div className="p-6">
            <div className="h-80 flex items-center justify-center text-muted-foreground">
              Rolling beta & R² line charts - Ready for chart library integration
            </div>
          </div>
        </MotionCard>
      </motion.div>

      {/* Statistical Table */}
      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">Factor Coefficients</h2>
        <MotionCard>
          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Factor</TableHead>
                  <TableHead className="text-right">Exposure</TableHead>
                  <TableHead className="text-right">Beta</TableHead>
                  <TableHead className="text-right">t-Value</TableHead>
                  <TableHead className="text-right">p-Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFactorExposures.map((factor) => (
                  <TableRow key={factor.factor}>
                    <TableCell className="font-medium">{factor.factor}</TableCell>
                    <TableCell className="text-right">
                      {factor.exposure.toFixed(3)}
                    </TableCell>
                    <TableCell className="text-right">
                      {factor.beta.toFixed(3)}
                    </TableCell>
                    <TableCell className="text-right">
                      {factor.tValue.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          factor.pValue < 0.05
                            ? "text-bull font-medium"
                            : "text-muted-foreground"
                        }
                      >
                        {factor.pValue.toFixed(3)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </MotionCard>
      </motion.div>

      {/* Scenario Analysis */}
      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">Scenario Analysis</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockScenarios.map((scenario) => (
            <MotionCard key={scenario.name}>
              <div className="p-6">
                <div className="text-sm font-medium">{scenario.name}</div>
                <div className="mt-3 flex items-end justify-between">
                  <div
                    className={`text-3xl font-bold ${
                      scenario.impact >= 0 ? "text-bull" : "text-bear"
                    }`}
                  >
                    {scenario.impact >= 0 ? "+" : ""}
                    {scenario.impact.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Prob: {(scenario.probability * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </MotionCard>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FactorModel;
