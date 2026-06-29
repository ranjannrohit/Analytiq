import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Shield, Palette, Bell, Lock, Globe, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth.context';
import { useTheme } from '@/contexts/theme.context';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { id: 'institute', label: 'Institute Details', icon: Building2, desc: 'Name, logo, branding' },
  { id: 'users', label: 'Users & Roles', icon: Users, desc: 'Manage team access' },
  { id: 'security', label: 'Security', icon: Shield, desc: 'Password, 2FA, sessions' },
  { id: 'appearance', label: 'Appearance', icon: Palette, desc: 'Theme, colors' },
  { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Email, SMS, WhatsApp' },
];

const TEAM_MEMBERS = [
  { name: 'Riya Sharma', email: 'riya@analytiq.in', role: 'Owner', lastSeen: '2 min ago' },
  { name: 'Rohan Verma', email: 'rohan@analytiq.in', role: 'Manager', lastSeen: '1 hour ago' },
  { name: 'Prachi Singh', email: 'prachi@analytiq.in', role: 'Accountant', lastSeen: '3 hours ago' },
  { name: 'Kiran Patel', email: 'kiran@analytiq.in', role: 'Teacher', lastSeen: 'Yesterday' },
];

const ROLE_COLORS: Record<string, string> = {
  Owner: 'bg-brand-500/10 text-brand-600 dark:text-brand-400',
  Manager: 'bg-success/10 text-success',
  Accountant: 'bg-warning/10 text-warning',
  Teacher: 'bg-info/10 text-info',
  Staff: 'bg-surface-100 text-secondary dark:bg-surface-800',
};

export function SettingsPage() {
  const [section, setSection] = useState('institute');
  const { user } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-primary">Settings</h1>
        <p className="text-secondary text-sm mt-0.5">Manage your institute configuration</p>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-56 shrink-0">
          <nav className="space-y-1">
            {SECTIONS.map(({ id, label, icon: Icon, desc }) => (
              <button key={id} onClick={() => setSection(id)}
                className={cn('w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all',
                  section === id ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400' : 'text-secondary hover:bg-secondary hover:text-primary'
                )}>
                <Icon size={17} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{label}</div>
                  <div className="text-xs text-muted">{desc}</div>
                </div>
                {section === id && <ChevronRight size={14} />}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-4">
          {section === 'institute' && (
            <Card>
              <CardHeader className="p-5"><CardTitle>Institute Details</CardTitle></CardHeader>
              <CardContent className="p-5 pt-0 space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-default">
                  <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">A</div>
                  <div>
                    <Button variant="outline" size="sm">Upload Logo</Button>
                    <p className="text-xs text-muted mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>
                <Input label="Institute Name" defaultValue={user?.instituteName} />
                <Input label="Institute Email" type="email" defaultValue="info@analytiq.in" />
                <Input label="Phone Number" type="tel" defaultValue="+91 98765 43210" />
                <Input label="Address" defaultValue="123 Education Hub, Delhi, India" />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="City" defaultValue="New Delhi" />
                  <Input label="PIN Code" defaultValue="110001" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {section === 'users' && (
            <Card>
              <CardHeader className="p-5">
                <div className="flex items-center justify-between">
                  <CardTitle>Team Members</CardTitle>
                  <Button size="sm" icon={<Users size={13} />}>Invite</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-default">
                  {TEAM_MEMBERS.map(m => (
                    <div key={m.email} className="flex items-center gap-4 px-5 py-4">
                      <div className="w-9 h-9 bg-brand-500/10 rounded-xl flex items-center justify-center text-sm font-bold text-brand-600 dark:text-brand-400 shrink-0">
                        {m.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-primary">{m.name}</div>
                        <div className="text-xs text-muted">{m.email}</div>
                      </div>
                      <div className="text-xs text-muted hidden md:block">Last seen {m.lastSeen}</div>
                      <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full', ROLE_COLORS[m.role] || ROLE_COLORS.Staff)}>{m.role}</span>
                      {m.role !== 'Owner' && <Button size="xs" variant="ghost">Edit</Button>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {section === 'appearance' && (
            <Card>
              <CardHeader className="p-5"><CardTitle>Appearance</CardTitle></CardHeader>
              <CardContent className="p-5 pt-0 space-y-6">
                <div>
                  <div className="text-sm font-medium text-primary mb-3">Theme</div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'light', label: 'Light', icon: '☀️' },
                      { value: 'dark', label: 'Dark', icon: '🌙' },
                      { value: 'system', label: 'System', icon: '💻' },
                    ].map(({ value, label, icon }) => (
                      <button key={value} onClick={() => setTheme(value as any)}
                        className={cn('p-4 rounded-xl border-2 text-center transition-all', resolvedTheme === value || (value === 'system') ? 'border-brand-500 bg-brand-500/5' : 'border-default hover:border-brand-300')}>
                        <div className="text-2xl mb-1">{icon}</div>
                        <div className="text-sm font-medium text-primary">{label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {section === 'security' && (
            <Card>
              <CardHeader className="p-5"><CardTitle>Security Settings</CardTitle></CardHeader>
              <CardContent className="p-5 pt-0 space-y-4">
                <Input label="Current Password" type="password" placeholder="••••••••" />
                <Input label="New Password" type="password" placeholder="••••••••" />
                <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                <Button>Update Password</Button>
                <div className="pt-4 border-t border-default space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-primary">Two-Factor Authentication</div>
                      <div className="text-xs text-muted">Add an extra layer of security</div>
                    </div>
                    <div className="w-11 h-6 bg-surface-200 dark:bg-surface-700 rounded-full relative cursor-pointer">
                      <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {(section === 'notifications') && (
            <Card>
              <CardHeader className="p-5"><CardTitle>Notification Preferences</CardTitle></CardHeader>
              <CardContent className="p-5 pt-0 space-y-4">
                {[
                  ['Email Notifications', 'Receive reports and alerts via email'],
                  ['WhatsApp Alerts', 'Get business alerts on WhatsApp'],
                  ['Fee Due Reminders', 'Notify when student fees are due'],
                  ['Attendance Alerts', 'Daily attendance summary'],
                  ['Revenue Reports', 'Monthly revenue digest'],
                ].map(([label, desc]) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-default last:border-0">
                    <div>
                      <div className="text-sm font-medium text-primary">{label}</div>
                      <div className="text-xs text-muted">{desc}</div>
                    </div>
                    <div className="w-11 h-6 bg-brand-600 rounded-full relative cursor-pointer">
                      <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}
