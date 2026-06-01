"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Course } from '@/types';
import Sidebar from './Sidebar';
import BentoGrid from './BentoGrid';
import HeroTile from './HeroTile';
import CourseCard from './CourseCard';
import ActivityTile from './ActivityTile';
import StatsTile from './StatsTile';
import BadgeTile from './BadgeTile';
import BentoTile from './BentoTile';
import SkillStatsTab from './SkillStatsTab';
import StudyHeatmapTab from './StudyHeatmapTab';
import { 
  Sparkles, 
  HelpCircle, 
  Terminal, 
  ArrowRight,
  Database,
  BookOpen,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

interface DashboardClientProps {
  initialCourses: Course[];
}

export const DashboardClient = ({ initialCourses }: DashboardClientProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [userName, setUserName] = useState('Scholar-771');

  // Renders the main bento dashboard tab
  const renderDashboardTab = () => {
    return (
      <BentoGrid>
        {/* HERO TILE (spans 3 cols on desktop, 2 on tablet, 1 on mobile) */}
        <BentoTile glowColor="cyan" className="col-span-1 md:col-span-2 lg:col-span-3 min-h-[220px]">
          <HeroTile />
        </BentoTile>

        {/* STATS TILE (spans 1 col) */}
        <StatsTile />

        {/* HEATMAP ACTIVITY TILE (spans 2 cols on desktop/tablet) */}
        <ActivityTile />

        {/* BADGES TILE (spans 1 col) */}
        <BadgeTile />

        {/* DYNAMIC COURSE TILES FETCHED FROM SUPABASE (each spans 1 col) */}
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </BentoGrid>
    );
  };

  // Renders the standalone courses management tab
  const renderCoursesTab = () => {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel bg-card-bg/40">
          <div>
            <h2 className="text-xl font-bold text-foreground font-mono flex items-center gap-2">
              <BookOpen size={20} className="text-primary" /> ENROLLED COURSE CURRICULUM
            </h2>
            <p className="text-foreground-muted text-xs mt-1">Direct server dynamic fetching from Supabase SQL database</p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-success bg-success/5 border border-success/20 px-3 py-1.5 rounded-lg">
            <CheckCircle2 size={14} /> ACADEMIC INTEGRITY SECURED
          </div>
        </div>

        <BentoGrid>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </BentoGrid>
      </div>
    );
  };

  // Renders the settings/fallback tab
  const renderSettingsTab = () => {
    return (
      <div className="max-w-2xl mx-auto flex flex-col gap-6 p-6 rounded-2xl glass-panel bg-card-bg/40 border border-border mt-6">
        <h2 className="text-lg font-bold text-foreground font-mono flex items-center gap-2 border-b border-border pb-3">
          <Terminal size={18} className="text-accent-purple" /> Database Synchronization & Workspace Settings
        </h2>

        <div className="flex flex-col gap-4 text-xs font-mono leading-relaxed">
          <div className="p-4 rounded-xl bg-background/60 border border-border flex flex-col gap-3">
            <span className="text-foreground-muted uppercase tracking-wider font-bold">SUPABASE CONNECTION STATUS:</span>
            {isSupabaseConfigured ? (
              <div className="flex items-center gap-2 text-success font-bold">
                <CheckCircle2 size={16} /> CONNECTED TO LIVE SUPABASE POSTGRES DATABASE
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-warning font-bold">
                  <AlertTriangle size={16} /> OFFLINE SEEDED MODE ACTIVE (MOCK DATABASE)
                </div>
                <p className="text-[10px] text-foreground-faint">
                  To connect your live database, copy <code className="text-primary">.env.example</code> to <code className="text-primary">.env.local</code> in the project root and provide your URL and Anon Key.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-foreground-muted">STUDENT PROFILE ALIAS</span>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-background border border-border-highlight rounded-xl px-4 py-2.5 text-foreground font-sans focus:outline-none focus:ring-1 focus:ring-accent-purple/50 max-w-sm"
              placeholder="Update user alias"
            />
          </div>

          <p className="text-foreground-faint text-[10px] mt-2">
            Nova.Academy Student Dashboard. Built for Frontend Intern Evaluation.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Slim & Collapsible Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area (offset by sidebar spacing on desktop) */}
      <main className="flex-1 min-h-screen pl-0 md:pl-20 lg:pl-64 transition-all duration-300 pb-24 md:pb-8">
        
        {/* Subtle Ambient Background Neon Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '-3s' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 flex flex-col gap-6 relative z-10">
          
          {/* Header sync banner */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-widest text-foreground-faint uppercase">ACADEMIC WORKSPACE // LEVEL_UP</span>
              <h2 className="text-lg font-extrabold text-foreground font-mono tracking-tight uppercase">
                {activeTab === 'dashboard' ? 'Student Workspace' : activeTab === 'courses' ? 'My Enrolled Courses' : 'Workspace Options'}
              </h2>
            </div>
            
            {/* Supabase status telemetry bulb */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_#00ff87] animate-ping" />
              <span className="text-[9px] font-mono text-foreground-muted tracking-wider">
                {isSupabaseConfigured ? 'LIVE_DATABASE' : 'OFFLINE_SANDBOX'}
              </span>
            </div>
          </div>

          {/* Render Tab Contents */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {activeTab === 'dashboard' && renderDashboardTab()}
              {activeTab === 'courses' && renderCoursesTab()}
              {activeTab === 'activity' && <StudyHeatmapTab />}
              {activeTab === 'stats' && <SkillStatsTab />}
              {activeTab === 'settings' && renderSettingsTab()}
            </motion.div>
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
};

export default DashboardClient;
