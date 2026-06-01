"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Cpu, Award } from 'lucide-react';
import BentoTile from './BentoTile';

export const StatsTile = () => {
  // Stats details
  const stats = [
    { label: 'SKILL DEXTERITY', value: '98.6', change: '+2.4%', icon: TrendingUp, color: 'text-primary' },
    { label: 'STUDY PROGRESS', value: 'Lv. 24', change: '24,850 XP', icon: Cpu, color: 'text-accent-purple' },
  ];

  return (
    <BentoTile glowColor="purple" className="h-full flex flex-col justify-between min-h-[220px]">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-accent-purple" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">Learning Insights</h3>
          </div>
          <span className="text-[10px] font-mono text-accent-purple px-2 py-0.5 rounded-full border border-accent-purple/20 bg-accent-purple/5">OPTIMIZED</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mt-1">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col p-3 bg-card-bg/40 border border-border rounded-xl">
              <span className="text-[9px] font-mono text-foreground-faint uppercase tracking-wider mb-1">
                {stat.label}
              </span>
              
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-foreground font-sans">{stat.value}</span>
                <span className={`text-[10px] font-mono font-bold ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Radial Gauge */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="relative w-11 h-11 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="22"
              cy="22"
              r="18"
              className="stroke-slate-900 fill-none"
              strokeWidth="3.5"
            />
            <motion.circle
              cx="22"
              cy="22"
              r="18"
              className="stroke-accent-purple fill-none"
              strokeWidth="3.5"
              strokeDasharray={113}
              initial={{ strokeDashoffset: 113 }}
              animate={{ strokeDashoffset: 113 - (113 * 82) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-[10px] font-bold text-foreground font-mono">82%</span>
          {/* Subtle Backglow */}
          <div className="absolute inset-0 bg-accent-purple/10 rounded-full blur-md" />
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-foreground-muted">FOCUS INDEX</span>
          <span className="text-xs font-bold text-foreground flex items-center gap-1">
            EXCELLENT TIER <Award size={12} className="text-accent-purple animate-pulse" />
          </span>
        </div>
      </div>
    </BentoTile>
  );
};

export default StatsTile;
