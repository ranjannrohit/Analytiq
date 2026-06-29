import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageSquare, Mail, Smartphone, Plus, Send, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, StatusBadge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { MOCK_NOTIFICATIONS } from '@/services/mock-data';
import { delay, timeAgo } from '@/lib/utils';
import { cn } from '@/lib/utils';

const CHANNEL_ICONS = {
  whatsapp: { icon: MessageSquare, color: 'text-success', bg: 'bg-success/10', label: 'WhatsApp' },
  email:    { icon: Mail, color: 'text-info', bg: 'bg-info/10', label: 'Email' },
  sms:      { icon: Smartphone, color: 'text-warning', bg: 'bg-warning/10', label: 'SMS' },
  in_app:   { icon: Bell, color: 'text-brand-500', bg: 'bg-brand-500/10', label: 'In-App' },
};

const TEMPLATES = [
  { id: 't1', name: 'Fee Due Reminder', channel: 'WhatsApp', usage: 142 },
  { id: 't2', name: 'Absent Notification', channel: 'SMS', usage: 87 },
  { id: 't3', name: 'Fee Overdue Alert', channel: 'WhatsApp', usage: 34 },
  { id: 't4', name: 'Welcome Message', channel: 'Email', usage: 247 },
  { id: 't5', name: 'Monthly Report', channel: 'Email', usage: 6 },
];

const TABS = ['All', 'WhatsApp', 'Email', 'SMS', 'Templates'];

export function NotificationsPage() {
  const [tab, setTab] = useState('All');

  const notifs = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => { await delay(500); return MOCK_NOTIFICATIONS; },
  });

  const filtered = notifs.data?.filter(n => tab === 'All' ? true : n.channel === tab.toLowerCase());

  const stats = {
    sent: MOCK_NOTIFICATIONS.filter(n => n.status === 'sent').length,
    failed: MOCK_NOTIFICATIONS.filter(n => n.status === 'failed').length,
    scheduled: MOCK_NOTIFICATIONS.filter(n => n.status === 'scheduled').length,
    total: MOCK_NOTIFICATIONS.length,
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-primary">Notifications</h1>
          <p className="text-secondary text-sm mt-0.5">Manage and send notifications across all channels</p>
        </div>
        <Button size="sm" icon={<Send size={14} />}>Send Notification</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Sent', value: stats.sent, icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Failed', value: stats.failed, icon: XCircle, color: 'text-danger', bg: 'bg-danger/10' },
          { label: 'Scheduled', value: stats.scheduled, icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Total', value: stats.total, icon: Bell, color: 'text-brand-500', bg: 'bg-brand-500/10' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', bg)}>
                <Icon size={18} className={color} />
              </div>
              <div>
                <div className={cn('text-2xl font-bold', color)}>{value}</div>
                <div className="text-xs text-muted">{label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs + Feed */}
      <div className="card-base overflow-hidden">
        <div className="p-5 border-b border-default flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-1 bg-secondary rounded-xl p-1">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={cn('px-3 py-1.5 text-sm font-medium rounded-lg transition-all', tab === t ? 'bg-elevated text-primary shadow-sm' : 'text-muted hover:text-secondary')}>
                {t}
              </button>
            ))}
          </div>
          <Button size="sm" variant="outline" icon={<Plus size={13} />}>New Template</Button>
        </div>

        {tab === 'Templates' ? (
          <div className="divide-y divide-default">
            {TEMPLATES.map(tmpl => {
              const ch = CHANNEL_ICONS[tmpl.channel.toLowerCase() as keyof typeof CHANNEL_ICONS] || CHANNEL_ICONS.in_app;
              const ChIcon = ch.icon;
              return (
                <div key={tmpl.id} className="flex items-center gap-4 px-5 py-4 hover:bg-secondary transition-colors">
                  <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', ch.bg)}>
                    <ChIcon size={16} className={ch.color} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-primary">{tmpl.name}</div>
                    <div className="text-xs text-muted">via {tmpl.channel} · Used {tmpl.usage} times</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="xs" variant="outline">Edit</Button>
                    <Button size="xs" icon={<Send size={11} />}>Use</Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="divide-y divide-default">
            {filtered?.map(notif => {
              const ch = CHANNEL_ICONS[notif.channel] || CHANNEL_ICONS.in_app;
              const ChIcon = ch.icon;
              return (
                <div key={notif.id} className="flex items-start gap-4 px-5 py-4 hover:bg-secondary transition-colors">
                  <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', ch.bg)}>
                    <ChIcon size={16} className={ch.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-primary">{notif.title}</span>
                      <Badge variant="default" size="sm">{ch.label}</Badge>
                    </div>
                    <div className="text-xs text-secondary mt-0.5">{notif.message}</div>
                    <div className="text-xs text-muted mt-1">To: {notif.recipient} · {timeAgo(notif.createdAt)}</div>
                  </div>
                  <StatusBadge status={notif.status as any} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
