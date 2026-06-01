"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface BentoGridProps {
  children: React.ReactNode;
}

export const BentoGrid = ({ children }: BentoGridProps) => {
  // Stagger entrance transitions for each child tile
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 auto-rows-[minmax(180px,auto)] w-full"
    >
      {children}
    </motion.section>
  );
};

export default BentoGrid;
