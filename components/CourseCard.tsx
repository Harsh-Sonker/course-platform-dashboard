"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Course } from '@/types';
import { DynamicIcon } from '@/lib/icons';
import BentoTile from './BentoTile';

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const { title, progress, icon_name } = course;

  // Determine a glowing accent color based on course progress
  const getGlowColor = (val: number): 'cyan' | 'purple' | 'emerald' | 'orange' => {
    if (val >= 85) return 'emerald'; // Mastered
    if (val >= 60) return 'cyan';    // Intermediate
    if (val >= 40) return 'purple';  // Getting started
    return 'orange';                 // Low progress
  };

  const glowColor = getGlowColor(progress);

  const neonColors = {
    cyan: 'text-primary bg-primary/10 border-primary/20',
    purple: 'text-accent-purple bg-accent-purple/10 border-accent-purple/20',
    emerald: 'text-success bg-success/10 border-success/20',
    orange: 'text-warning bg-warning/10 border-warning/20',
    default: 'text-foreground bg-white/10 border-border-highlight',
  };

  const progressColors = {
    cyan: 'bg-gradient-to-r from-blue-500 to-primary shadow-[0_0_10px_#00f2fe]',
    purple: 'bg-gradient-to-r from-indigo-500 to-accent-purple shadow-[0_0_10px_#9d4edd]',
    emerald: 'bg-gradient-to-r from-teal-500 to-success shadow-[0_0_10px_#00ff87]',
    orange: 'bg-gradient-to-r from-red-500 to-warning shadow-[0_0_10px_#ff6b6b]',
  };

  return (
    <BentoTile glowColor={glowColor} className="h-full flex flex-col justify-between min-h-[190px]">
      <div className="flex flex-col gap-4">
        {/* Top: Icon & Status Badge */}
        <div className="flex items-center justify-between w-full">
          <div className={`flex items-center justify-center w-11 h-11 rounded-xl border transition-all duration-300 ${neonColors[glowColor]}`}>
            <DynamicIcon name={icon_name} size={20} className="animate-pulse" />
          </div>
          
          <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${neonColors[glowColor]}`}>
            {progress >= 90 ? 'MASTERED' : progress >= 50 ? 'IN PROGRESS' : 'STARTED'}
          </span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-foreground tracking-tight line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <span className="text-[11px] font-mono text-foreground-faint">COURSE MODULE</span>
        </div>
      </div>

      {/* Bottom: Progress Bar */}
      <div className="mt-5 w-full">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-mono text-foreground-muted">LEARNING PROGRESS</span>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-xs font-mono font-bold ${
              glowColor === 'cyan' ? 'text-primary' : 
              glowColor === 'purple' ? 'text-accent-purple' : 
              glowColor === 'emerald' ? 'text-success' : 'text-warning'
            }`}
          >
            {progress}%
          </motion.span>
        </div>

        {/* Outer Bar */}
        <div className="relative w-full h-2 bg-background/80 rounded-full border border-border overflow-hidden">
          {/* Animated Inner Bar (zero layout shift using scaleX and transformOrigin or simple width animation) */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ 
              type: "spring", 
              stiffness: 70, 
              damping: 15,
              delay: 0.2
            }}
            className={`h-full rounded-full ${progressColors[glowColor]}`}
          />
        </div>
      </div>
    </BentoTile>
  );
};

export default CourseCard;
