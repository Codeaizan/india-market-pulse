// Motion theme with canonical easings, durations, and reusable variants
export const motionTheme = {
  // Easing curves
  easing: {
    ease: [0.4, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    spring: { type: "spring", stiffness: 300, damping: 30 },
  },

  // Durations (in seconds)
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
  },

  // Reusable animation variants
  variants: {
    fadeIn: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
    },
    
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },

    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },

    slideInRight: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
    },

    cardHover: {
      rest: { y: 0, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" },
      hover: { 
        y: -6, 
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
      },
    },

    stagger: {
      animate: {
        transition: {
          staggerChildren: 0.05,
        },
      },
    },
  },

  // Transition presets
  transition: {
    fast: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
    normal: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    slow: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    spring: { type: "spring", stiffness: 300, damping: 30 },
  },
} as const;

// Hook to check if user prefers reduced motion
export const usePrefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
