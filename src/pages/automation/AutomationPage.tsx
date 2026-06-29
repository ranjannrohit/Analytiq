import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Plus, Play, Pause, ChevronRight, CheckCircle, Activity, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_AUTOMATION_RULES } from '@/services/mock-data';
import { delay, timeAgo } from '@/lib/utils';
import { cn } from '@/lib/utils';

const TRIGGER_LABELS: Record<string, string> = {
  fee_due: 'Fee Due (3 days before)', fee_overdue: 'Fee Overdue', student_absent: 'Student Absent',
  revenue_drop: 'Revenue Drop Alert', admission_added: 'New Admission Added', custom: 'Custom Trigger',
};
const ACTION_LABELS: Record<string, string> = {
  send_whatsapp: 'Send WhatsApp', send_email: 'Send Email', send_sms: 'Send SMS',
  notify_owner: 'Notify Owner', update_dashboard: 'Update Dashboard', create_task: 'Create Task',
};
const TRIGGER_COLORS: Record<string, string> = {
  fee_due: 'bg-warning/10 text-warning', fee_overdue: 'bg-danger/10 text-danger',
  student_absent: 'bg-info/10 text-info', revenue_drop: 'bg-danger/10 text-danger',
  admission_added: 'bg-success/10 text-success', custom: 'bg-surface-100 text-secondary dark:bg-surface-800',
};

const EXAMPLE_FLOWS = [
  { trigger: 'Fee Due (3 days away)', action: 'Send WhatsApp to Parent', icon: '💬', desc: 'Automated payment reminder' },
  { trigger: 'Student Absent', action: 'SMS to Parent', icon: '📱', desc: 'Real-time absence alert' },
  { trigger: 'Revenue drops 20%', action: 'Alert Owner', icon: '📊', desc: 'Business performance monitor' },
  { trigger: 'New Admission', action: 'Update Dashboard + Send Welcome', icon: '🎉', desc: 'Onboarding automation' },
];

export function AutomationPage() {
  const rules = useQuery({ queryKey: ['automation'], queryFn: async () => { await delay(600); return MOCK_AUTOMATION_RULES; } });
  const [activeRules, setActiveRules] = useState<Record<string, boolean>>(
    Object.fromEntries(MOCK_AUTOMATION_RULES.map(r => [r.id, r.isActive]))
  );

  const toggle = (id: string) => setActiveRules(prev => ({ ...prev, [id]: !prev[id] }));
  const totalRuns = MOCK_AUTOMATION_RULES.reduce((sum, r) => sum + r.runCount, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-primary">Automation</h1>
          <p className="text-secondary text-sm mt-0.5">Build rules that run your business on autopilot</p>
        </div>
        <Button size="sm" icon={<Plus size={14} />}>Create Rule</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Rules', value: MOCK_AUTOMATION_RULES.length, icon: Zap, color: 'text-brand-500', bg: 'bg-brand-500/10' },
          { label: 'Active Rules', value: Object.values(activeRules).filter(Boolean).length, icon: Play, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Total Executions', value: totalRuns, icon: Activity, color: 'text-info', bg: 'bg-info/10' },
          { label: 'Time Saved', value: '~32h', icon: CheckCircle, color: 'text-warning', bg: 'bg-warning/10' },
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

      {/* Example Flows */}
      <div>
        <h2 className="text-sm font-semibold text-secondary mb-3">How Automation Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {EXAMPLE_FLOWS.map(flow => (
            <div key={flow.trigger} className="card-base p-4 flex items-center gap-4 hover:border-brand-500/30 transition-colors">
              <div className="w-10 h-10 bg-brand-500/10 border border-brand-500/20 rounded-xl flex items-center justify-center text-xl shrink-0">
                {flow.icon}
              </div>
              <div className="flex-1 flex items-center gap-2 flex-wrap min-w-0">
                <div className="bg-secondary border border-default rounded-lg px-2.5 py-1.5 text-xs font-medium text-primary">
                  {flow.trigger}
                </div>
                <ArrowRight size={14} className="text-muted shrink-0" />
                <div className="bg-brand-500/10 border border-brand-500/20 rounded-lg px-2.5 py-1.5 text-xs font-medium text-brand-600 dark:text-brand-400">
                  {flow.action}
                </div>
              </div>
              <div className="text-xs text-muted shrink-0 hidden md:block">{flow.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-secondary">Your Rules</h2>
        {rules.data?.map(rule => (
          <motion.div key={rule.id} layout
            className={cn('card-base p-5 transition-all', !activeRules[rule.id] && 'opacity-60')}>
            <div className="flex items-start gap-4">
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', activeRules[rule.id] ? 'bg-brand-500/10' : 'bg-surface-100 dark:bg-surface-800')}>
                <Zap size={16} className={activeRules[rule.id] ? 'text-brand-500' : 'text-muted'} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-sm font-semibold text-primary">{rule.name}</span>
                  {activeRules[rule.id]
                    ? <Badge variant="success" size="sm" dot>Active</Badge>
                    : <Badge variant="default" size="sm" dot>Paused</Badge>
                  }
                </div>
                <p className="text-xs text-secondary mb-3">{rule.description}</p>

                {/* Flow */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={cn('text-xs px-2.5 py-1 rounded-lg font-medium', TRIGGER_COLORS[rule.trigger] || 'bg-surface-100 text-secondary')}>
                    ⚡ {TRIGGER_LABELS[rule.trigger] || rule.trigger}
                  </span>
                  <ChevronRight size={14} className="text-muted" />
                  <span className="text-xs px-2.5 py-1 rounded-lg font-medium bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    → {ACTION_LABELS[rule.action] || rule.action}
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-muted">Run {rule.runCount} times</span>
                  {rule.lastRun && <span className="text-xs text-muted">Last: {timeAgo(rule.lastRun)}</span>}
                </div>
              </div>

              <button onClick={() => toggle(rule.id)}
                className={cn('w-11 h-6 rounded-full transition-all shrink-0 relative',
                  activeRules[rule.id] ? 'bg-brand-600' : 'bg-surface-300 dark:bg-surface-700'
                )}>
                <span className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all',
                  activeRules[rule.id] ? 'left-[22px]' : 'left-0.5'
                )} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
