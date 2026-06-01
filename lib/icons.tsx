import React from 'react';
import { 
  Atom, 
  Globe, 
  Sparkles, 
  Database, 
  Terminal, 
  Cpu, 
  GraduationCap, 
  BookOpen, 
  Layout, 
  Award,
  Flame,
  BarChart3,
  Settings,
  User,
  LogOut,
  Calendar,
  Layers
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Atom: Atom,
  Globe: Globe,
  Sparkles: Sparkles,
  Database: Database,
  Terminal: Terminal,
  Cpu: Cpu,
  GraduationCap: GraduationCap,
  BookOpen: BookOpen,
  Layout: Layout,
  Award: Award,
  Flame: Flame,
  BarChart3: BarChart3,
  Settings: Settings,
  User: User,
  LogOut: LogOut,
  Calendar: Calendar,
  Layers: Layers
};

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon = ({ name, className = '', size = 24 }: DynamicIconProps) => {
  const IconComponent = iconMap[name] || BookOpen; // secure fallback to BookOpen
  return <IconComponent className={className} size={size} />;
};
