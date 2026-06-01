"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  // Generate 4 mock course card skeleton frames
  const skeletonCourses = Array.from({ length: 4 });

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex overflow-hidden">
      
      {/* SIDEBAR SKELETON (Left) */}
      <aside className="hidden md:flex flex-col justify-between fixed left-0 top-0 h-screen w-20 lg:w-64 bg-card-bg/40 border-r border-border py-6 px-4">
        <div className="flex flex-col gap-8 w-full">
          {/* Logo frame */}
          <div className="flex items-center gap-3 w-full px-2 h-10">
            <div className="w-8 h-8 rounded-lg bg-background animate-pulse" />
            <div className="hidden lg:block w-24 h-4 bg-background rounded-full animate-pulse" />
          </div>
          
          {/* Links frame */}
          <div className="flex flex-col gap-4 w-full">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 w-full px-4 py-3">
                <div className="w-5 h-5 rounded-md bg-background animate-pulse" />
                <div className="hidden lg:block flex-1 h-3.5 bg-background rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer User frame */}
        <div className="flex items-center gap-3 w-full px-2">
          <div className="w-9 h-9 rounded-full bg-background animate-pulse" />
          <div className="hidden lg:flex flex-col gap-2 flex-1">
            <div className="w-16 h-3 bg-background rounded-full animate-pulse" />
            <div className="w-10 h-2 bg-background rounded-full animate-pulse" />
          </div>
        </div>
      </aside>

      {/* MAIN MAIN CONTENT SKELETON (Right) */}
      <main className="flex-1 min-h-screen pl-0 md:pl-20 lg:pl-64 pb-24 md:pb-8">
        
        {/* Neon orbs shadows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 flex flex-col gap-6 relative z-10 w-full">
          
          {/* Header Sync Banner skeleton */}
          <div className="flex items-center justify-between pb-4 border-b border-border w-full">
            <div className="flex flex-col gap-2">
              <div className="w-20 h-2 bg-background rounded-full animate-pulse" />
              <div className="w-36 h-5 bg-background rounded-full animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-background animate-pulse" />
              <div className="w-16 h-2 bg-background rounded-full animate-pulse" />
            </div>
          </div>

          {/* BENTO GRID REPLICA SKELETON */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 auto-rows-[minmax(180px,auto)] w-full">
            
            {/* HERO TILE SKELETON (spans 3 cols on desktop, 2 on tablet, 1 on mobile) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 min-h-[220px] rounded-2xl bg-card-bg/20 border border-border p-6 flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="w-28 h-3.5 bg-background rounded-full animate-pulse" />
                <div className="w-64 h-8 bg-background rounded-full animate-pulse" />
                <div className="w-96 h-4 bg-background rounded-full animate-pulse mt-2" />
              </div>
              <div className="w-full h-16 bg-background/60 rounded-xl mt-6 animate-pulse" />
            </div>

            {/* STATS TILE SKELETON */}
            <div className="col-span-1 min-h-[220px] rounded-2xl bg-card-bg/20 border border-border p-6 flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="w-24 h-4 bg-background rounded-full animate-pulse" />
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="h-12 bg-background rounded-xl animate-pulse" />
                  <div className="h-12 bg-background rounded-xl animate-pulse" />
                </div>
              </div>
              <div className="w-full h-10 bg-background/60 rounded-xl animate-pulse" />
            </div>

            {/* ACTIVITY TILE SKELETON */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 min-h-[220px] rounded-2xl bg-card-bg/20 border border-border p-6 flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="w-36 h-4 bg-background rounded-full animate-pulse" />
                <div className="w-full h-24 bg-background/40 rounded-xl animate-pulse mt-2" />
              </div>
              <div className="w-full h-8 bg-background/60 rounded-xl animate-pulse" />
            </div>

            {/* BADGE TILE SKELETON */}
            <div className="col-span-1 min-h-[220px] rounded-2xl bg-card-bg/20 border border-border p-6 flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="w-28 h-4 bg-background rounded-full animate-pulse" />
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="h-10 bg-background rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>
              <div className="w-full h-10 bg-background/60 rounded-xl animate-pulse" />
            </div>

            {/* COURSE TILES SKELETONS */}
            {skeletonCourses.map((_, i) => (
              <div key={i} className="col-span-1 min-h-[190px] rounded-2xl bg-card-bg/20 border border-border p-6 flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="w-10 h-10 bg-background rounded-xl animate-pulse" />
                    <div className="w-16 h-4 bg-background rounded-full animate-pulse" />
                  </div>
                  <div className="w-full h-5 bg-background rounded-full animate-pulse" />
                  <div className="w-24 h-3 bg-background rounded-full animate-pulse" />
                </div>
                <div className="w-full h-2 bg-background rounded-full animate-pulse mt-4" />
              </div>
            ))}

          </div>
        </div>
      </main>
    </div>
  );
}
