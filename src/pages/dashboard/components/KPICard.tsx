import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';
import type { KPICard } from '@/types';

const colorMap = {
  brand:   { bg: 'bg-brand-600/10', icon: 'text-brand-500', border: 'border-brand-500/20' },
  success: { bg: 'bg-success/10', icon: 'text-success', border: 'border-success/20' },
  warning: { bg: 'bg-warning/10', icon: 'text-warning', border: 'border-warning/20' },
  danger:  { bg: 'bg-danger/10', icon: 'text-danger', border: 'border-danger/20' },
  info:    { bg: 'bg-info/10', icon: 'text-info', border: 'border-info/20' },
};

export function KPICardComponent({ kpi }: { kpi: KPICard }) {
  const colors = colorMap[kpi.color];
  const IconComp = (Icons as any)[kpi.icon] || Icons.Circle;
  const isUp = kpi.changeType === 'increase';
  const isDown = kpi.changeType === 'decrease';

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="card-base p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center border', colors.bg, colors.border)}>
          <IconComp size={17} className={colors.icon} />
        </div>
        <div className={cn('flex items-center gap-1 text-2xs font-semibold px-2 py-1 rounded-full', isUp ? 'bg-success/10 text-success' : isDown ? 'bg-danger/10 text-danger' : 'bg-surface-100 text-muted dark:bg-surface-800')}>
          {isUp ? <TrendingUp size={11} /> : isDown ? <TrendingDown size={11} /> : <Minus size={11} />}
          {Math.abs(kpi.change)}%
        </div>
      </div>
      <div>
        <div className="text-xl font-bold text-primary tabular-nums">{kpi.value}</div>
        <div className="text-xs text-muted mt-1">{kpi.title}</div>
        <div className="text-2xs text-muted mt-0.5">{kpi.changeLabel}</div>
      </div>
    </motion.div>
  );
}
