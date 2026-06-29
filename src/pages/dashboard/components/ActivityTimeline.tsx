import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { timeAgo } from '@/lib/utils';
import type { ActivityItem } from '@/types';
import { CreditCard, UserPlus, CheckCircle, Bell, FileText, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeConfig = {
  payment:      { icon: CreditCard,  color: 'text-success', bg: 'bg-success/10' },
  admission:    { icon: UserPlus,    color: 'text-brand-500', bg: 'bg-brand-500/10' },
  attendance:   { icon: CheckCircle, color: 'text-info', bg: 'bg-info/10' },
  notification: { icon: Bell,        color: 'text-warning', bg: 'bg-warning/10' },
  report:       { icon: FileText,    color: 'text-surface-500', bg: 'bg-surface-100 dark:bg-surface-800' },
  task:         { icon: CheckSquare, color: 'text-success', bg: 'bg-success/10' },
};

export function ActivityTimeline({ activities }: { activities: ActivityItem[] }) {
  return (
    <Card>
      <CardHeader className="p-5">
        <CardTitle className="text-sm font-semibold text-primary">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-default" />
          <div className="space-y-4">
            {activities.map((act, idx) => {
              const cfg = typeConfig[act.type] || typeConfig.task;
              const Icon = cfg.icon;
              return (
                <div key={act.id} className="flex gap-4 relative">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0 z-10 border border-default', cfg.bg)}>
                    <Icon size={16} className={cfg.color} />
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-medium text-primary">{act.title}</div>
                        <div className="text-xs text-secondary mt-0.5">{act.description}</div>
                        <div className="text-xs text-muted mt-1">by {act.user}</div>
                      </div>
                      <span className="text-2xs text-muted whitespace-nowrap">{timeAgo(act.timestamp)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
