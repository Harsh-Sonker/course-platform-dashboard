import React from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Course } from '@/types';
import DashboardClient from '@/components/DashboardClient';

// Enable dynamic rendering so it fetches fresh database contents on reload
export const dynamic = 'force-dynamic';

async function getCourses(): Promise<Course[]> {
  // If Supabase is not configured, fall back immediately to high-fidelity mock database
  if (!isSupabaseConfigured || !supabase) {
    console.warn("Supabase keys are not configured. Running Dashboard in SEEDED_FALLBACK mode.");
    return getLocalMockCourses();
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error("Database query error:", error.message);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log("Supabase table 'courses' is empty. Feeding local dashboard seed data.");
      return getLocalMockCourses();
    }

    return data as Course[];
  } catch (err) {
    console.error("Supabase sync failed. Initializing offline backup.");
    return getLocalMockCourses();
  }
}

// Gorgeous default seeded courses used as fallback or local demonstration
function getLocalMockCourses(): Course[] {
  return [
    {
      id: 'mock-1',
      title: 'Advanced React Patterns',
      progress: 78,
      icon_name: 'Atom',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-2',
      title: 'Next.js Server Actions & SSR',
      progress: 45,
      icon_name: 'Globe',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-3',
      title: 'Framer Motion 3D Masterclass',
      progress: 92,
      icon_name: 'Sparkles',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-4',
      title: 'Supabase Database Design',
      progress: 60,
      icon_name: 'Database',
      created_at: new Date().toISOString()
    }
  ];
}

export default async function DashboardPage() {
  const courses = await getCourses();

  return <DashboardClient initialCourses={courses} />;
}
