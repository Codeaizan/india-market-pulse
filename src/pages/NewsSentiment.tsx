import { motion } from "framer-motion";
import { MotionCard } from "@/components/MotionCard";
import { useParams } from "react-router-dom";
import { mockNews } from "@/api/mock/news";
import { motionTheme } from "@/lib/motion-theme";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const NewsSentiment = () => {
  const { symbol } = useParams();

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
        News & Sentiment - {symbol}
      </motion.h1>

      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">Sentiment Overview</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <MotionCard>
            <div className="p-6">
              <div className="text-sm text-muted-foreground">Overall Sentiment</div>
              <div className="mt-2 text-3xl font-bold text-bull">Positive</div>
              <div className="mt-1 text-sm">Avg Score: 0.62</div>
            </div>
          </MotionCard>
          <MotionCard>
            <div className="p-6">
              <div className="text-sm text-muted-foreground">News Volume (7d)</div>
              <div className="mt-2 text-3xl font-bold">156</div>
              <div className="mt-1 text-sm text-bull">+12% from prev week</div>
            </div>
          </MotionCard>
          <MotionCard>
            <div className="p-6">
              <div className="text-sm text-muted-foreground">Price Impact</div>
              <div className="mt-2 text-3xl font-bold text-bull">+1.8%</div>
              <div className="mt-1 text-sm">Correlation: 0.67</div>
            </div>
          </MotionCard>
        </div>
      </motion.div>

      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">Recent News</h2>
        <div className="space-y-3">
          {mockNews.map((news) => (
            <motion.div
              key={news.id}
              variants={motionTheme.variants.fadeInUp}
            >
              <MotionCard hover={false}>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant={
                            news.sentiment === "positive"
                              ? "default"
                              : news.sentiment === "negative"
                              ? "destructive"
                              : "secondary"
                          }
                          className={
                            news.sentiment === "positive"
                              ? "bg-bull/20 text-bull hover:bg-bull/30"
                              : news.sentiment === "negative"
                              ? "bg-bear/20 text-bear hover:bg-bear/30"
                              : ""
                          }
                        >
                          {news.sentiment.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Score: {news.sentimentScore.toFixed(2)}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary">
                        {news.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {news.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{news.source}</span>
                        <span>•</span>
                        <span>
                          {new Date(news.publishedAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </a>
              </MotionCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={motionTheme.variants.fadeIn}>
        <h2 className="mb-4 text-xl font-semibold">Sentiment-Price Impact</h2>
        <MotionCard>
          <div className="p-6">
            <div className="h-80 flex items-center justify-center text-muted-foreground">
              Scatter plot: Sentiment score vs price change - Ready for integration
            </div>
          </div>
        </MotionCard>
      </motion.div>
    </motion.div>
  );
};

export default NewsSentiment;
