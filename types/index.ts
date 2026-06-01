export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon_name: string;
  href: string;
}

export interface StreakData {
  currentStreak: number;
  highestStreak: number;
  lastActive: string;
  history: {
    day: string; // e.g. "Mon"
    active: boolean;
  }[];
}

export interface ActivityData {
  day: string; // "Mon", etc.
  hours: number;
  percentage: number; // For visualization height
  subject: string;
}
