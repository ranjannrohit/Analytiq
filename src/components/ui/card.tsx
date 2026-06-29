import { cn } from '@/lib/utils';

interface CardProps { children: React.ReactNode; className?: string; hover?: boolean; onClick?: () => void; }
export function Card({ children, className, hover, onClick }: CardProps) {
  return (
    <div onClick={onClick} className={cn('card-base', hover && 'transition-all duration-200 cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5', onClick && 'cursor-pointer', className)}>
      {children}
    </div>
  );
}
export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-5 pb-0', className)}>{children}</div>;
}
export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-5', className)}>{children}</div>;
}
export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('text-sm font-semibold text-secondary', className)}>{children}</h3>;
}
