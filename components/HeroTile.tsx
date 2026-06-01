"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, Edit3, Check, Award } from 'lucide-react';

export const HeroTile = () => {
  const [name, setName] = useState('Astro Scholar');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  const days = [
    { name: 'Mon', completed: true },
    { name: 'Tue', completed: true },
    { name: 'Wed', completed: true },
    { name: 'Thu', completed: true },
    { name: 'Fri', completed: true },
    { name: 'Sat', completed: true },
    { name: 'Sun', completed: false, isToday: true }
  ];

  const handleSave = () => {
    if (tempName.trim()) {
      setName(tempName);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col justify-between h-full min-h-[220px] md:min-h-[240px]">
      {/* Top Section: Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-1.5">
            <Sparkles size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
            <span>ACADEMIC ENGINE RUNNING</span>
          </div>

          <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
              {!isEditing ? (
                <motion.h1
                  key="greeting"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2"
                >
                  Welcome back, <span className="bg-gradient-to-r from-primary via-blue-400 to-accent-purple bg-clip-text text-transparent">{name}</span>
                </motion.h1>
              ) : (
                <motion.div
                  key="editing"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    className="bg-background/80 border border-primary/40 rounded-lg px-3 py-1 text-xl md:text-2xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 max-w-[200px] md:max-w-[300px]"
                    autoFocus
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => {
                if (isEditing) handleSave();
                else {
                  setTempName(name);
                  setIsEditing(true);
                }
              }}
              className="p-1.5 rounded-lg bg-background/50 border border-border hover:border-primary/30 text-foreground-muted hover:text-primary hover:bg-background/80 transition-all duration-300 active:scale-95"
            >
              {isEditing ? <Check size={14} /> : <Edit3 size={14} />}
            </button>
          </div>
          
          <p className="text-foreground-muted text-sm mt-2 max-w-lg leading-relaxed">
            Your learning focus index and study hours are highly optimized this week. You have completed 82% of your weekly academic target. Keep it up!
          </p>
        </div>

        {/* Floating Streak Widget */}
        <div className="flex items-center gap-4 bg-background/60 border border-border rounded-2xl p-4 self-start md:self-auto backdrop-blur-md">
          {/* Flame SVG container */}
          <div className="relative flex items-center justify-center w-12 h-12">
            <motion.div
              animate={{
                scale: [1, 1.1, 1, 1.05, 1],
                filter: [
                  'drop-shadow(0 0 4px rgba(255, 107, 107, 0.4))',
                  'drop-shadow(0 0 10px rgba(255, 107, 107, 0.8))',
                  'drop-shadow(0 0 4px rgba(255, 107, 107, 0.4))'
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-10 h-10 flex items-center justify-center text-warning"
            >
              <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" className="opacity-20" />
                <path d="M8 13.5c0-1.8 1.5-3.5 3-4.5 0.5 1 1 1.5 2 2.5 1.5 1.5 2.5 3 2.5 5 0 2.5-2 4.5-4.5 4.5S6.5 19 6.5 16.5c0-1 .8-2.2 1.5-3z" className="text-warning animate-pulse" />
                <path d="M10 3.5C10 5.5 12 7 13.5 8c0.8 0.5 1.5 1.5 1.5 2.5 0 2-1.5 3.5-3.5 3.5S8 12.5 8 10.5c0-1.5 1-2.5 2-7z" className="text-orange-400" />
              </svg>
            </motion.div>
            
            {/* Pulsing Backglow */}
            <div className="absolute inset-0 bg-warning/20 rounded-full blur-xl animate-pulse" />
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-mono text-foreground-muted uppercase tracking-wider">Learning Streak</span>
            <span className="text-xl font-black text-foreground flex items-center gap-1.5">
              7 DAYS <Flame size={16} className="text-warning fill-warning" />
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Week Streak Matrix */}
      <div className="mt-6 pt-5 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">Weekly Streak Matrix</span>
          <span className="text-[11px] font-mono text-success flex items-center gap-1">
            <Award size={12} /> Next milestone: 10 Days
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, i) => (
            <div
              key={day.name}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all duration-300 ${
                day.isToday
                  ? 'bg-warning/10 border-warning/30 shadow-[0_0_15px_rgba(255,107,107,0.1)]'
                  : day.completed
                  ? 'bg-success/5 border-success/20'
                  : 'bg-background/40 border-border'
              }`}
            >
              <span className={`text-[10px] font-mono font-medium ${day.isToday ? 'text-warning' : day.completed ? 'text-success' : 'text-foreground-faint'}`}>
                {day.name}
              </span>
              
              <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-background/60">
                {day.completed ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-success"
                  >
                    <Check size={14} strokeWidth={3} />
                  </motion.div>
                ) : day.isToday ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5
                    }}
                    className="text-warning"
                  >
                    <Flame size={12} className="fill-current" />
                  </motion.div>
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroTile;
