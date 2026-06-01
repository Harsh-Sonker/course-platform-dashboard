"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Settings, 
  ChevronRight, 
  ChevronLeft, 
  GraduationCap, 
  Flame 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'activity', label: 'Study Heatmap', icon: Calendar },
    { id: 'stats', label: 'Skill Stats', icon: BarChart3 },
    { id: 'settings', label: 'Preferences', icon: Settings },
  ];

  return (
    <>
      {/* DESKTOP & TABLET SIDEBAR */}
      <motion.nav
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`hidden md:flex flex-col justify-between fixed left-0 top-0 h-screen bg-card-bg/80 border-r border-border z-40 backdrop-blur-xl py-6 px-4`}
      >
        <div className="flex flex-col gap-8">
          {/* Logo & Collapse Button */}
          <div className="flex items-center justify-between w-full h-10 px-2">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-purple shadow-[0_0_15px_rgba(0,242,254,0.3)]">
                <GraduationCap size={16} className="text-foreground animate-pulse" />
              </div>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="font-black text-sm text-foreground tracking-widest font-mono uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"
                >
                  Nova.Academy
                </motion.span>
              )}
            </div>
            
            {/* Manual Toggle Trigger (Desktop exclusive) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex items-center justify-center p-1 rounded-md border border-border bg-background/60 hover:bg-background text-foreground-muted hover:text-primary hover:border-primary/20 transition-all duration-300 active:scale-95"
            >
              {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-4 py-3 px-4 rounded-xl text-sm font-medium font-mono tracking-wide relative z-10 transition-colors duration-300 ${
                      isActive ? 'text-primary' : 'text-foreground-muted hover:text-foreground'
                    }`}
                  >
                    {/* Active Snapping Sliding Accent Pill (layoutId) */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-l-2 border-primary -z-10"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                    
                    <Icon size={18} className={isActive ? 'text-primary animate-pulse' : 'text-foreground-muted'} />
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="truncate"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer / User Widget */}
        <div className="flex flex-col gap-4 border-t border-border pt-4">
          <div className="flex items-center gap-3 px-2">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-accent-purple p-[1px]">
                <div className="w-full h-full rounded-full bg-card-bg flex items-center justify-center text-xs font-bold text-foreground font-mono">
                  JD
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-slate-950" />
            </div>
            
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col overflow-hidden"
              >
                <span className="text-xs font-bold text-foreground truncate font-mono">Jane Doe</span>
                <span className="text-[10px] text-foreground-faint font-mono flex items-center gap-0.5">
                  XP LEVEL 24 <Flame size={9} className="text-warning fill-warning" />
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 h-16 rounded-2xl border border-border-highlight bg-card-bg/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] z-50 flex items-center justify-around px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center p-2 rounded-xl relative"
            >
              {/* Sliding Pill for Mobile */}
              {isActive && (
                <motion.div
                  layoutId="activeNavBackgroundMobile"
                  className="absolute inset-0 rounded-xl bg-primary/10 border-t-2 border-primary -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              
              <Icon size={20} className={isActive ? 'text-primary' : 'text-foreground-faint'} />
              <span className={`text-[9px] font-mono mt-1 ${isActive ? 'text-primary font-bold' : 'text-foreground-faint'}`}>
                {item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
