import { motion, HTMLMotionProps } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motionTheme } from "@/lib/motion-theme";

interface MotionCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const MotionCard = ({
  hover = true,
  className,
  children,
  ...props
}: MotionCardProps) => {
  const hoverAnimation = hover
    ? {
        initial: "rest",
        whileHover: "hover",
        variants: motionTheme.variants.cardHover,
      }
    : {};

  return (
    <motion.div
      {...hoverAnimation}
      {...props}
      className={cn("will-change-transform", className)}
    >
      <Card className="h-full">{children}</Card>
    </motion.div>
  );
};
