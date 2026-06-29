import { cn, getInitials } from '@/lib/utils';

const sizes = { xs: 'w-6 h-6 text-2xs', sm: 'w-8 h-8 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-11 h-11 text-base', xl: 'w-14 h-14 text-lg' };
const colors = ['bg-brand-200 text-brand-700','bg-success/20 text-success','bg-warning/20 text-warning','bg-info/20 text-info','bg-surface-200 text-surface-700'];

interface AvatarProps { name: string; src?: string; size?: keyof typeof sizes; className?: string; }
export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const colorIdx = name.charCodeAt(0) % colors.length;
  return (
    <div className={cn('rounded-full flex items-center justify-center font-semibold shrink-0', sizes[size], !src && colors[colorIdx], className)}>
      {src ? <img src={src} alt={name} className="w-full h-full rounded-full object-cover" /> : getInitials(name)}
    </div>
  );
}
