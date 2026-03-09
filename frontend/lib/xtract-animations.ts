export const xtractEasings = {
  smooth: [0.16, 1, 0.3, 1],
  bounce: [0.68, -0.6, 0.32, 1.6],
  elastic: [0.68, -0.55, 0.265, 1.55],
} as const;

export const xtractDelays = {
  fast: 0.1,
  medium: 0.2,
  slow: 0.3,
} as const;

export const xtractDurations = {
  fast: 0.4,
  medium: 0.6,
  slow: 0.8,
} as const;

export const fadeInUpVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: xtractDurations.medium,
      ease: xtractEasings.smooth,
    },
  },
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const cardHoverVariants = {
  hover: {
    scale: 1.05,
    y: -8,
    transition: {
      duration: 0.2,
      ease: xtractEasings.smooth,
    },
  },
};

export const slideInFromLeftVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: xtractDurations.medium,
      ease: xtractEasings.smooth,
    },
  },
};

export const slideInFromRightVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: xtractDurations.medium,
      ease: xtractEasings.smooth,
    },
  },
};

export const wordRevealVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: xtractEasings.smooth,
    },
  },
};
