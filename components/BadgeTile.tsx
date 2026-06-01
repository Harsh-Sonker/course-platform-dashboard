"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldAlert, CheckCircle, HelpCircle, Trophy } from 'lucide-react';
import BentoTile from './BentoTile';

interface Badge {
  name: string;
  desc: string;
  icon: string;
  glow: 'cyan' | 'purple' | 'emerald' | 'orange';
  earned: boolean;
}

export const BadgeTile = () => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const badges: Badge[] = [
    { name: 'React Arch', desc: 'Completed Advanced React Patterns with 75%+', icon: 'Atom', glow: 'cyan', earned: true },
    { name: 'SSR Pioneer', desc: 'Build secure, dynamic Server Components and route boundaries', icon: 'Globe', glow: 'emerald', earned: true },
    { name: 'Fluid Motion', desc: 'Implement high-performance Framer Motion and zero layout shift states', icon: 'Sparkles', glow: 'purple', earned: true },
    { name: 'Core Architect', desc: 'Complete all curriculum goals and earn platform certifications', icon: 'Database', glow: 'orange', earned: false }
  ];

  const colorClasses = {
    cyan: 'border-primary/20 text-primary bg-primary/5 shadow-[0_0_10px_rgba(0,242,254,0.1)]',
    purple: 'border-accent-purple/20 text-accent-purple bg-accent-purple/5 shadow-[0_0_10px_rgba(157,78,221,0.1)]',
    emerald: 'border-success/20 text-success bg-success/5 shadow-[0_0_10px_rgba(0,255,135,0.1)]',
    orange: 'border-border text-slate-600 bg-background/30'
  };

  const textColors = {
    cyan: 'text-primary',
    purple: 'text-accent-purple',
    emerald: 'text-success',
    orange: 'text-warning'
  };

  return (
    <BentoTile glowColor="emerald" className="h-full flex flex-col justify-between min-h-[220px]">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-success" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">Academic Badges</h3>
          </div>
          <span className="text-[10px] font-mono text-success font-bold">3 / 4 UNLOCKED</span>
        </div>

        {/* Badges Layout */}
        <div className="grid grid-cols-4 gap-2 mt-1">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.name}
              onClick={() => setSelectedBadge(badge)}
              whileHover={{ scale: 1.1, y: -2 }}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${colorClasses[badge.glow]}`}
            >
              <div className="w-8 h-8 rounded-lg bg-card-bg/60 border border-border flex items-center justify-center relative">
                {badge.icon === 'Atom' && <span className="text-xs font-bold">⚛️</span>}
                {badge.icon === 'Globe' && <span className="text-xs font-bold">🌐</span>}
                {badge.icon === 'Sparkles' && <span className="text-xs font-bold">✨</span>}
                {badge.icon === 'Database' && <span className="text-xs font-bold opacity-30">🛡️</span>}
                
                {/* Micro Ticked Status Dot */}
                {badge.earned && (
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-success rounded-full border border-slate-950 flex items-center justify-center shadow-md">
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>
                )}
              </div>
              <span className="text-[9px] font-mono text-foreground-muted text-center truncate w-full mt-2">
                {badge.name.split(' ')[0]}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Tooltip Bottom Section */}
      <div className="mt-4 pt-3 border-t border-border min-h-[45px] flex items-center">
        <AnimatePresence mode="wait">
          {selectedBadge ? (
            <motion.div
              key={selectedBadge.name}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex flex-col text-[11px] font-mono leading-tight w-full"
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className={`font-bold ${textColors[selectedBadge.glow]}`}>{selectedBadge.name}</span>
                <span className="text-[9px] text-foreground-faint uppercase">{selectedBadge.earned ? 'UNLOCKED' : 'LOCKED'}</span>
              </div>
              <p className="text-foreground-muted text-[10px] line-clamp-2 leading-relaxed">{selectedBadge.desc}</p>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-mono text-foreground-faint flex items-center gap-1.5"
            >
              <HelpCircle size={12} /> Click any academic badge for details
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BentoTile>
  );
};

export default BadgeTile;
