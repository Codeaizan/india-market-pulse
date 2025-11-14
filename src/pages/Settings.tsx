import { motion } from "framer-motion";
import { MotionCard } from "@/components/MotionCard";
import { motionTheme } from "@/lib/motion-theme";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
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
        Settings
      </motion.h1>

      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">Appearance</h2>
        <MotionCard>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reduced-motion">Reduced Motion</Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animations for accessibility
                </p>
              </div>
              <Switch id="reduced-motion" />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compact-mode">Compact Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Reduce spacing and card sizes
                </p>
              </div>
              <Switch id="compact-mode" />
            </div>
          </div>
        </MotionCard>
      </motion.div>

      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">Data Sources</h2>
        <MotionCard>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="nse-data">NSE Real-time Data</Label>
                <p className="text-sm text-muted-foreground">
                  Enable live NSE market data
                </p>
              </div>
              <Switch id="nse-data" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="bse-data">BSE Real-time Data</Label>
                <p className="text-sm text-muted-foreground">
                  Enable live BSE market data
                </p>
              </div>
              <Switch id="bse-data" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="news-feed">News Feed</Label>
                <p className="text-sm text-muted-foreground">
                  Aggregate news from multiple sources
                </p>
              </div>
              <Switch id="news-feed" defaultChecked />
            </div>
          </div>
        </MotionCard>
      </motion.div>

      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">API Configuration</h2>
        <MotionCard>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <Label>API Keys</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure your API keys for real-time data sources. Keys are encrypted and stored securely.
                </p>
              </div>
              <Separator />
              <div className="text-sm text-muted-foreground">
                <strong>Supported Sources:</strong>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>NSE/BSE Official APIs</li>
                  <li>RBI DBIE (Database on Indian Economy)</li>
                  <li>MOSPI (Ministry of Statistics)</li>
                  <li>MCA (Ministry of Corporate Affairs)</li>
                  <li>GDELT Project (News)</li>
                </ul>
              </div>
            </div>
          </div>
        </MotionCard>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
