"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, cardHover } from '@/lib/animations';

interface BentoTileProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'emerald' | 'orange' | 'default';
}

export const BentoTile = ({ children, className = '', glowColor = 'default' }: BentoTileProps) => {
  // Define backglow gradients using tailwind syntax
  const glowGradients = {
    cyan: 'from-cyan-500/10 via-blue-500/5 to-purple-600/5',
    purple: 'from-purple-500/10 via-pink-500/5 to-indigo-600/5',
    emerald: 'from-emerald-500/10 via-teal-500/5 to-cyan-500/5',
    orange: 'from-orange-500/10 via-red-500/5 to-yellow-500/5',
    default: 'from-slate-700/10 via-slate-600/5 to-slate-800/5',
  };

  const neonBorders = {
    cyan: 'hover:border-primary/35',
    purple: 'hover:border-accent-purple/35',
    emerald: 'hover:border-success/35',
    orange: 'hover:border-warning/35',
    default: 'hover:border-border-highlight',
  };

  const neonGlows = {
    cyan: 'rgba(0, 240, 255, 0.12)',
    purple: 'rgba(168, 85, 247, 0.12)',
    emerald: 'rgba(16, 185, 129, 0.12)',
    orange: 'rgba(245, 158, 11, 0.12)',
    default: 'rgba(255, 255, 255, 0.05)',
  };

  return (
    <motion.article
      variants={{ ...fadeUp, ...cardHover }}
      whileHover="hover"
      whileTap="tap"
      className={`group relative overflow-hidden rounded-2xl glass-panel grain-overlay flex flex-col p-6 transition-colors duration-500 ${className} ${neonBorders[glowColor]}`}
      style={{
        boxShadow: `0 4px 30px rgba(0, 0, 0, 0.4)`
      }}
    >
      {/* Dynamic Background Hover Glow (Hardware Accelerated, no layout shifts) */}
      <div 
        className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${neonGlows[glowColor]} 0%, transparent 70%)`
        }}
      />
      
      {/* Subtly colored ambient glowing spot inside the card background */}
      <div className={`absolute -right-20 -top-20 w-44 h-44 rounded-full bg-gradient-to-br ${glowGradients[glowColor]} blur-[50px] opacity-60 pointer-events-none group-hover:scale-110 transition-transform duration-700 ease-out`} />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full w-full">
        {children}
      </div>
    </motion.article>
  );
};

export default BentoTile;
