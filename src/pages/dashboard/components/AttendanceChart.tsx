import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';
import type { BatchAttendance } from '@/types';
import { cn } from '@/lib/utils';

export function AttendanceChart({ data }: { data: BatchAttendance[] }) {
  return (
    <Card>
      <CardHeader className="p-5">
        <CardTitle className="text-sm font-semibold text-primary">Today's Attendance</CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="space-y-3">
          {data.map(batch => (
            <div key={batch.batchId}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-primary">{batch.batchName}</span>
                <span className={cn('text-xs font-bold', batch.percentage >= 85 ? 'text-success' : batch.percentage >= 70 ? 'text-warning' : 'text-danger')}>
                  {batch.percentage}%
                </span>
              </div>
              <div className="w-full h-2 bg-tertiary rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-700', batch.percentage >= 85 ? 'bg-success' : batch.percentage >= 70 ? 'bg-warning' : 'bg-danger')}
                  style={{ width: `${batch.percentage}%` }}
                />
              </div>
              <div className="flex gap-3 mt-1">
                <span className="text-2xs text-muted">{batch.present}P</span>
                <span className="text-2xs text-muted">{batch.absent}A</span>
                {batch.late > 0 && <span className="text-2xs text-muted">{batch.late}L</span>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
