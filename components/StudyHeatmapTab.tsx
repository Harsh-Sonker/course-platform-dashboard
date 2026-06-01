"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Flame, Activity, Trophy } from 'lucide-react';
import BentoGrid from './BentoGrid';
import BentoTile from './BentoTile';

interface ActivityBlock {
  id: number;
  date: string;
  hours: number;
  subject: string;
}

export const StudyHeatmapTab = () => {
  const [hoveredBlock, setHoveredBlock] = useState<ActivityBlock | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Generate a large heatmap for a full year or half-year
  const generateBlocks = (): ActivityBlock[] => {
    const blocks: ActivityBlock[] = [];
    const baseDate = new Date(2025, 8, 1); // Mock start date
    const subjects = ['React', 'SSR', 'Framer', 'Supabase', 'TypeScript', 'Node.js'];
    
    // 30 weeks x 7 days = 210 days
    for (let i = 0; i < 210; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + i);
      
      const pseudoRandom = ((i * 23 + 47) % 100) / 100;
      const dayOfWeek = currentDate.getDay();
      let hours = 0;
      
      // Heavier study on weekends and specific days
      if (pseudoRandom > 0.3) {
        hours = Number((pseudoRandom * (dayOfWeek === 0 || dayOfWeek === 6 ? 8 : 4) + 0.5).toFixed(1));
      }

      blocks.push({
        id: i,
        date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        hours: hours,
        subject: subjects[i % subjects.length]
      });
    }
    return blocks;
  };

  const allBlocks = generateBlocks();

  const getIntensityClass = (hours: number) => {
    if (hours === 0) return 'bg-background/60 border border-border';
    if (hours < 2.0) return 'bg-primary/20 border border-primary/5';
    if (hours < 4.0) return 'bg-primary/40 border border-primary/10';
    if (hours < 6.0) return 'bg-primary/70 border border-primary/15 hover:shadow-[0_0_15px_rgba(0,242,254,0.6)]';
    return 'bg-primary border border-primary/30 shadow-[0_0_10px_rgba(0,242,254,0.4)] hover:shadow-[0_0_20px_rgba(0,242,254,0.8)] text-primary';
  };

  return (
    <motion.div 
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Immersive Header */}
      <motion.div variants={itemVariants} className="p-8 rounded-2xl glass-panel border border-primary/20 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-background border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,242,254,0.15)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            <Activity size={28} className="text-primary animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground font-mono tracking-tight">ENGAGEMENT HEATMAP</h2>
            <p className="text-foreground-muted text-sm mt-1">Deep analysis of longitudinal study patterns and hourly investment.</p>
          </div>
        </div>

        <div className="flex gap-4 relative z-10">
          <div className="flex flex-col p-3 rounded-xl bg-card-bg/60 border border-border min-w-[120px]">
            <span className="text-[10px] text-foreground-faint font-mono uppercase">Total Hours</span>
            <span className="text-2xl font-black text-foreground font-sans flex items-center gap-2">
              438 <Clock size={16} className="text-primary" />
            </span>
          </div>
          <div className="flex flex-col p-3 rounded-xl bg-card-bg/60 border border-border min-w-[120px]">
            <span className="text-[10px] text-foreground-faint font-mono uppercase">Longest Streak</span>
            <span className="text-2xl font-black text-foreground font-sans flex items-center gap-2">
              21 D <Flame size={16} className="text-warning" />
            </span>
          </div>
        </div>
      </motion.div>

      <BentoGrid>
        {/* Full Width Heatmap */}
        <BentoTile glowColor="cyan" className="col-span-1 md:col-span-2 lg:col-span-4 p-6 overflow-hidden min-h-[300px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono flex items-center gap-2">
              <Calendar size={16} className="text-primary" /> 30-Week Study Telemetry
            </h3>
            
            <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-md text-[10px] font-mono text-primary flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              LIVE TRACKING
            </div>
          </div>

          <div className="relative flex-1 bg-card-bg/40 rounded-xl border border-border p-4 flex flex-col justify-center overflow-x-auto scrollbar-none shadow-inner">
            <div className="grid grid-flow-col grid-rows-7 gap-[4px] py-2 justify-start md:justify-center min-w-max">
              {allBlocks.map((block) => (
                <motion.div
                  key={block.id}
                  onMouseEnter={() => setHoveredBlock(block)}
                  onMouseLeave={() => setHoveredBlock(null)}
                  whileHover={{ scale: 1.3, zIndex: 50, borderRadius: "4px" }}
                  className={`w-[12px] h-[12px] md:w-[14px] md:h-[14px] rounded-[3px] transition-all duration-200 cursor-pointer ${getIntensityClass(block.hours)}`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Tooltip & Legend */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-foreground-muted">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-[2px] bg-background/60 border border-border" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-primary/20" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-primary/40" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-primary/70" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-primary shadow-[0_0_8px_rgba(0,242,254,0.4)]" />
              <span>More</span>
            </div>

            <div className="h-8 flex items-center">
              {hoveredBlock ? (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-4 py-1.5 rounded-full bg-background border border-border-highlight text-[10px] font-mono flex items-center gap-2"
                >
                  <span className="text-foreground font-bold">{hoveredBlock.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span className="text-primary font-bold">{hoveredBlock.hours} HOURS</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span className="text-foreground-muted">{hoveredBlock.subject}</span>
                </motion.div>
              ) : (
                <span className="text-[10px] text-foreground-faint font-mono tracking-widest uppercase">
                  Hover over blocks for telemetry data
                </span>
              )}
            </div>
          </div>
        </BentoTile>

        {/* Milestone Cards */}
        <BentoTile glowColor="purple" className="col-span-1 md:col-span-1 lg:col-span-2 p-6 flex flex-col justify-center gap-4">
           <div className="flex items-center gap-3">
             <div className="p-3 bg-accent-purple/10 rounded-xl border border-accent-purple/20">
               <Trophy size={20} className="text-accent-purple" />
             </div>
             <div>
               <h4 className="text-sm font-bold text-foreground font-mono uppercase">Consistency Peak</h4>
               <p className="text-[10px] text-foreground-muted">Top 5% of active learners</p>
             </div>
           </div>
           <p className="text-xs text-foreground-muted leading-relaxed">
             Your weekend study sessions are <span className="text-accent-purple font-bold">2.4x</span> longer than the global average. Maintaining this pattern will accelerate your LV 25 promotion.
           </p>
        </BentoTile>

        <BentoTile glowColor="orange" className="col-span-1 md:col-span-1 lg:col-span-2 p-6 flex flex-col justify-center gap-4">
           <div className="flex items-center gap-3">
             <div className="p-3 bg-warning/10 rounded-xl border border-warning/20">
               <Flame size={20} className="text-warning" />
             </div>
             <div>
               <h4 className="text-sm font-bold text-foreground font-mono uppercase">Current Streak</h4>
               <p className="text-[10px] text-foreground-muted">Requires 2 hours/day</p>
             </div>
           </div>
           <div className="flex flex-col gap-1">
             <div className="flex justify-between text-xs font-mono">
               <span className="text-foreground-muted">7 Days</span>
               <span className="text-warning font-bold">Target: 14</span>
             </div>
             <div className="h-2 w-full bg-background rounded-full overflow-hidden">
               <div className="h-full bg-warning w-1/2 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
             </div>
           </div>
        </BentoTile>

      </BentoGrid>
    </motion.div>
  );
};

export default StudyHeatmapTab;
