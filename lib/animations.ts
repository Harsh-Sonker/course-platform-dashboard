import { Variants } from "framer-motion";

// Staggered Container for Bento Grids
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

// Standard Fade Up for Cards inside the Grid
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  }
};

// Subtle Card Hover Effect (No Layout Shift)
export const cardHover = {
  hover: { 
    scale: 1.015, 
    y: -2,
    transition: { type: "spring", stiffness: 400, damping: 20 }
  },
  tap: { scale: 0.98 }
};

// Fluid Progress Bar Fill
export const progressFill: Variants = {
  hidden: { width: 0 },
  show: (targetWidth: string | number) => ({
    width: targetWidth,
    transition: { duration: 1.2, ease: "easeOut" }
  })
};

// Micro-interaction for Heatmap blocks
export const heatmapBlock = {
  hover: { scale: 1.3, borderRadius: "4px", zIndex: 10 }
};
