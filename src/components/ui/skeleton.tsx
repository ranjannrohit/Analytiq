import { cn } from '@/lib/utils';
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('shimmer rounded-lg', className)} />;
}
export function SkeletonCard() {
  return (
    <div className="card-base p-5 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}
