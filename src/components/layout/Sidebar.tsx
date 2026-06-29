import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth.context';
import { Avatar } from '@/components/ui/avatar';
import {
  LayoutDashboard, Users, UserPlus, CreditCard, CalendarCheck, BarChart3,
  FileText, Bell, CheckSquare, Zap, Bot, Settings, HelpCircle, LogOut, X, ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard',     path: '/dashboard',     icon: LayoutDashboard },
  { label: 'Students',      path: '/students',       icon: Users },
  { label: 'Fees',          path: '/fees',           icon: CreditCard },
  { label: 'Attendance',    path: '/attendance',     icon: CalendarCheck },
  { label: 'Analytics',     path: '/analytics',      icon: BarChart3 },
  { label: 'Reports',       path: '/reports',        icon: FileText },
  { label: 'Notifications', path: '/notifications',  icon: Bell },
  { label: 'Automation',    path: '/automation',     icon: Zap },
  { label: 'AI Assistant',  path: '/ai',             icon: Bot, badge: 'AI' },
  { label: 'Settings',      path: '/settings',       icon: Settings },
  { label: 'Help',          path: '/help',           icon: HelpCircle },
];

interface SidebarProps { open: boolean; onClose: () => void; }

export function Sidebar({ open, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const content = (
    <div className="flex flex-col h-full" style={{ background: 'var(--sidebar-bg)' }}>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="10" width="4" height="8" rx="1" fill="white" fillOpacity="0.9" />
              <rect x="8" y="6"  width="4" height="12" rx="1" fill="white" />
              <rect x="14" y="2" width="4" height="16" rx="1" fill="white" fillOpacity="0.7" />
            </svg>
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-none">Analytiq</div>
            <div className="text-surface-600 text-2xs mt-0.5 leading-none">{user?.instituteName}</div>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden text-surface-600 hover:text-white p-1">
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV_ITEMS.map(({ label, path, icon: Icon, badge }) => {
          const isActive = location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));
          return (
            <NavLink key={path} to={path} onClick={onClose} className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative',
              isActive
                ? 'text-brand-400 bg-brand-500/10'
                : 'text-surface-500 hover:text-surface-200 hover:bg-white/5',
            )}>
              <Icon size={17} className={isActive ? 'text-brand-400' : 'text-surface-600 group-hover:text-surface-300'} />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="text-2xs font-bold bg-brand-600/80 text-brand-200 px-1.5 py-0.5 rounded-md">{badge}</span>
              )}
              {isActive && <ChevronRight size={14} className="text-brand-500" />}
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-white/5 p-3 shrink-0">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
          <Avatar name={user?.name || 'User'} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="text-surface-200 text-sm font-medium truncate">{user?.name}</div>
            <div className="text-surface-600 text-2xs capitalize">{user?.role}</div>
          </div>
          <button onClick={logout} className="text-surface-700 hover:text-danger transition-colors p-1 opacity-0 group-hover:opacity-100">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex w-60 h-full shrink-0 flex-col">{content}</div>
      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed left-0 top-0 h-full w-60 z-40 lg:hidden"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
