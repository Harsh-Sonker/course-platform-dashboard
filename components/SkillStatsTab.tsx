"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Cpu, 
  Award, 
  Zap, 
  Target, 
  Flame, 
  Layers, 
  Code2, 
  Database 
} from 'lucide-react';
import BentoGrid from './BentoGrid';
import BentoTile from './BentoTile';

export const SkillStatsTab = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const skillMetrics = [
    { name: 'React Patterns', level: 92, color: 'bg-primary', icon: Code2 },
    { name: 'Next.js SSR', level: 85, color: 'bg-white', icon: Layers },
    { name: 'Framer Motion', level: 78, color: 'bg-accent-purple', icon: Zap },
    { name: 'Database Design', level: 64, color: 'bg-success', icon: Database },
  ];

  return (
    <motion.div 
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header Banner */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-accent-purple/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div>
          <h2 className="text-xl font-bold text-foreground font-mono flex items-center gap-2">
            <Target size={20} className="text-accent-purple animate-pulse" /> SKILL DEXTERITY MATRIX
          </h2>
          <p className="text-foreground-muted text-xs mt-1 max-w-lg">Advanced analytics telemetry mapping your neurological adaptation to synthetic engineering constructs.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-foreground-faint uppercase tracking-widest">Global Rank</span>
            <span className="text-lg font-black text-foreground font-sans flex items-center gap-1">Top 4% <TrendingUp size={14} className="text-success" /></span>
          </div>
        </div>
      </motion.div>

      {/* Main Grid Layout */}
      <BentoGrid>
        
        {/* Core Level Ring (Spans 1 Col md, 2 lg) */}
        <BentoTile glowColor="purple" className="col-span-1 md:col-span-1 lg:col-span-2 h-full flex flex-col min-h-[320px] p-6">
          <div className="flex items-center gap-2 text-accent-purple text-xs font-mono font-bold tracking-widest mb-6">
            <Cpu size={14} /> SYSTEM STATUS
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
              {/* Background Track */}
              <circle cx="96" cy="96" r="80" className="stroke-slate-900/80 fill-none" strokeWidth="8" />
              {/* Progress Ring */}
              <motion.circle
                cx="96" cy="96" r="80"
                className="stroke-accent-purple fill-none"
                strokeWidth="8"
                strokeDasharray={502}
                initial={{ strokeDashoffset: 502 }}
                animate={{ strokeDashoffset: 502 - (502 * 0.85) }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 12px rgba(168,85,247,0.4))" }}
              />
            </svg>
            
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xs font-mono text-foreground-faint uppercase tracking-widest mb-1">Level</span>
              <span className="text-6xl font-black text-foreground font-sans tracking-tighter">24</span>
              <span className="text-[10px] text-accent-purple font-mono bg-accent-purple/10 px-2 py-0.5 rounded-full mt-2 border border-accent-purple/20">
                85% TO LV 25
              </span>
              </div>
            </div>
          </div>
        </BentoTile>

        {/* Skill Progression Bars */}
        <BentoTile glowColor="cyan" className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col justify-between min-h-[320px] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono flex items-center gap-2">
              <BarChart3 size={16} className="text-primary" /> Domain Expertise
            </h3>
          </div>

          <div className="flex flex-col gap-6 flex-1 justify-center">
            {skillMetrics.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={skill.name} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-foreground-muted flex items-center gap-1.5"><Icon size={14} className="text-foreground-faint" /> {skill.name}</span>
                    <span className="text-foreground font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-background rounded-full overflow-hidden border border-border relative">
                    <motion.div
                      className={`h-full ${skill.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                      style={{ boxShadow: `0 0 10px ${skill.color}` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </BentoTile>

        {/* Recent Achievements */}
        <BentoTile glowColor="emerald" className="col-span-1 md:col-span-2 lg:col-span-4 p-6 min-h-[160px]">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono flex items-center gap-2 mb-4">
            <Award size={16} className="text-success" /> Recent Milestones
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "React Alchemist", desc: "Completed 50 components", icon: Flame, color: "text-warning" },
              { title: "Query Master", desc: "100 complex SQL queries", icon: Database, color: "text-success" },
              { title: "Pixel Perfect", desc: "10 hours of Framer Motion", icon: Zap, color: "text-primary" },
            ].map((achievement, i) => (
              <motion.div 
                key={i} 
                className="flex items-start gap-3 p-3 rounded-xl bg-background/40 border border-border hover:bg-background/80 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-2 rounded-lg bg-card-bg border border-border-highlight shadow-inner">
                  <achievement.icon size={18} className={achievement.color} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground font-mono">{achievement.title}</span>
                  <span className="text-[10px] text-foreground-faint">{achievement.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoTile>

      </BentoGrid>
    </motion.div>
  );
};

export default SkillStatsTab;
