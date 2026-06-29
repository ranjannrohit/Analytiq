import { Bell, Moon, Sun, Search, Menu } from 'lucide-react';
import { useTheme } from '@/contexts/theme.context';
import { useAuth } from '@/contexts/auth.context';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/students':  'Students',
  '/fees':      'Fee Management',
  '/attendance':'Attendance',
  '/analytics': 'Analytics',
  '/reports':   'Reports',
  '/notifications': 'Notifications',
  '/automation':'Automation',
  '/ai':        'AI Assistant',
  '/settings':  'Settings',
};

interface TopBarProps { onMenuClick: () => void; }
export function TopBar({ onMenuClick }: TopBarProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] || 'Analytiq';

  return (
    <header className="h-16 border-b border-default bg-primary flex items-center px-4 md:px-6 gap-4 shrink-0">
      <button onClick={onMenuClick} className="lg:hidden text-secondary hover:text-primary p-1.5 rounded-lg hover:bg-tertiary transition-colors">
        <Menu size={20} />
      </button>
      <h1 className="text-base font-semibold text-primary">{title}</h1>

      <div className="flex-1" />

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 h-9 px-3 bg-secondary border border-default rounded-xl text-sm text-muted cursor-text hover:border-brand-400 transition-colors">
        <Search size={15} />
        <span>Search…</span>
        <kbd className="ml-4 text-2xs font-mono bg-tertiary border border-default rounded px-1.5 py-0.5">⌘K</kbd>
      </div>

      <button onClick={toggleTheme} className="h-9 w-9 flex items-center justify-center rounded-xl text-secondary hover:text-primary hover:bg-secondary border border-default transition-all">
        {resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <button className="relative h-9 w-9 flex items-center justify-center rounded-xl text-secondary hover:text-primary hover:bg-secondary border border-default transition-all">
        <Bell size={16} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-primary" />
      </button>

      <Avatar name={user?.name || 'U'} size="sm" className="cursor-pointer" />
    </header>
  );
}
