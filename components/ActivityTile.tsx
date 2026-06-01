"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, HelpCircle, Flame, Calendar } from 'lucide-react';
import BentoTile from './BentoTile';

interface ActivityBlock {
  id: number;
  date: string;
  hours: number;
  subject: 'React' | 'SSR' | 'Framer' | 'Supabase';
}

export const ActivityTile = () => {
  const [activeSubject, setActiveSubject] = useState<'All' | 'Development' | 'Design'>('All');
  const [hoveredBlock, setHoveredBlock] = useState<ActivityBlock | null>(null);

  // Generate 7 rows (days) x 16 columns (weeks) of mock data = 112 days
  const subjects: Array<'React' | 'SSR' | 'Framer' | 'Supabase'> = ['React', 'SSR', 'Framer', 'Supabase'];
  const generateBlocks = (): ActivityBlock[] => {
    const blocks: ActivityBlock[] = [];
    const baseDate = new Date(2026, 2, 1); // Start in March 2026
    
    for (let i = 0; i < 112; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + i);
      
      // Generate deterministic seed behavior (avoids Math.random() hydration mismatches)
      const pseudoRandom = ((i * 17 + 29) % 100) / 100;
      const dayOfWeek = currentDate.getDay();
      let hours = 0;
      if (pseudoRandom > 0.18) {
        hours = Number((pseudoRandom * (dayOfWeek === 0 || dayOfWeek === 6 ? 6 : 3) + 0.5).toFixed(1));
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

  // Filter blocks based on user choice
  const getFilteredBlocks = () => {
    return allBlocks.map(block => {
      if (activeSubject === 'All') return block;
      if (activeSubject === 'Development' && (block.subject === 'React' || block.subject === 'SSR' || block.subject === 'Supabase')) {
        return block;
      }
      if (activeSubject === 'Design' && block.subject === 'Framer') {
        return block;
      }
      return { ...block, hours: 0 }; // Hide other blocks
    });
  };

  const filteredBlocks = getFilteredBlocks();

  const getIntensityClass = (hours: number) => {
    if (hours === 0) return 'bg-background/60 border border-border';
    if (hours < 1.5) return 'bg-primary/20 border border-primary/5';
    if (hours < 3.0) return 'bg-primary/40 border border-primary/10';
    if (hours < 4.5) return 'bg-primary/70 border border-primary/15';
    return 'bg-primary border border-primary/30 shadow-[0_0_10px_rgba(0,242,254,0.4)]';
  };

  return (
    <BentoTile glowColor="cyan" className="col-span-1 md:col-span-2 lg:col-span-2 h-full flex flex-col justify-between min-h-[220px]">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">Study Commitment Heatmap</h3>
          </div>
          
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-card-bg/60 border border-border rounded-lg p-0.5 text-[10px] font-mono">
            {['All', 'Development', 'Design'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubject(tab as any)}
                className={`px-2 py-0.5 rounded transition-all duration-300 ${
                  activeSubject === tab 
                    ? 'bg-primary/15 text-primary font-bold border border-primary/10' 
                    : 'text-foreground-faint hover:text-foreground-muted'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Heatmap Grid Container */}
        <div className="relative mt-2 p-3 bg-card-bg/40 rounded-xl border border-border flex flex-col justify-center">
          
          {/* Contribution Graph Grid */}
          <div className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto select-none py-1 justify-between scrollbar-none">
            {filteredBlocks.map((block) => (
              <motion.div
                key={block.id}
                onMouseEnter={() => setHoveredBlock(block)}
                onMouseLeave={() => setHoveredBlock(null)}
                whileHover={{ scale: 1.25, zIndex: 30 }}
                className={`w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-[2px] transition-all duration-200 cursor-pointer ${getIntensityClass(block.hours)}`}
              />
            ))}
          </div>

          {/* Labels & Legend */}
          <div className="flex items-center justify-between text-[9px] font-mono text-foreground-faint mt-2">
            <div className="flex items-center gap-2">
              <span>Mon</span>
              <span>•</span>
              <span>Wed</span>
              <span>•</span>
              <span>Fri</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span>Less</span>
              <div className="w-1.5 h-1.5 rounded-[1px] bg-background" />
              <div className="w-1.5 h-1.5 rounded-[1px] bg-primary/20" />
              <div className="w-1.5 h-1.5 rounded-[1px] bg-primary/40" />
              <div className="w-1.5 h-1.5 rounded-[1px] bg-primary/70" />
              <div className="w-1.5 h-1.5 rounded-[1px] bg-primary" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Stats Bar */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-border text-xs font-mono text-foreground-muted">
        <span className="flex items-center gap-1.5">
          <Flame size={13} className="text-warning animate-pulse" />
          Active: <strong className="text-foreground">82% of days</strong>
        </span>
        
        <span className="text-[10px] font-medium text-primary uppercase">
          {hoveredBlock ? (
            `${hoveredBlock.date}: ${hoveredBlock.hours}h (${hoveredBlock.subject})`
          ) : (
            'Hover cells for study hours'
          )}
        </span>
      </div>
    </BentoTile>
  );
};

export default ActivityTile;
