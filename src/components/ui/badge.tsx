import { cn } from '@/lib/utils';
import { STATUS_COLORS } from '@/constants';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'brand';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-300',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger:  'bg-danger/10 text-danger',
  info:    'bg-info/10 text-info',
  brand:   'bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300',
};

export function Badge({ children, variant = 'default', size = 'sm', className, dot }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 font-medium rounded-full',
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      variantStyles[variant],
      className,
    )}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', {
        'bg-surface-400': variant === 'default',
        'bg-success':    variant === 'success',
        'bg-warning':    variant === 'warning',
        'bg-danger':     variant === 'danger',
        'bg-info':       variant === 'info',
        'bg-brand-500':  variant === 'brand',
      })} />}
      {children}
    </span>
  );
}

// Status-aware badge
type StatusKey = keyof typeof STATUS_COLORS;
export function StatusBadge({ status }: { status: StatusKey }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.inactive;
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full border', s.bg, s.text, s.border)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', s.text.replace('text-', 'bg-'))} />
      {label}
    </span>
  );
}
