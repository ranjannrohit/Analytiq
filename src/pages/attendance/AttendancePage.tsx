import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Users, UserCheck, UserX, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MOCK_ATTENDANCE, MOCK_BATCH_ATTENDANCE } from '@/services/mock-data';
import { delay } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { BATCH_LIST } from '@/constants';
import { format } from 'date-fns';

const TABS = ['Daily View', 'Batch View', 'Calendar'];

export function AttendancePage() {
  const [tab, setTab] = useState('Daily View');
  const [selectedBatch, setSelectedBatch] = useState('');
  const today = format(new Date(), 'dd MMM yyyy');

  const attendance = useQuery({
    queryKey: ['attendance', 'daily'],
    queryFn: async () => { await delay(500); return MOCK_ATTENDANCE; },
  });

  const batchAttendance = useQuery({
    queryKey: ['attendance', 'batch'],
    queryFn: async () => { await delay(500); return MOCK_BATCH_ATTENDANCE; },
  });

  const summary = {
    total: MOCK_ATTENDANCE.length,
    present: MOCK_ATTENDANCE.filter(a => a.status === 'present').length,
    absent: MOCK_ATTENDANCE.filter(a => a.status === 'absent').length,
    late: MOCK_ATTENDANCE.filter(a => a.status === 'late').length,
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-primary">Attendance</h1>
          <p className="text-secondary text-sm mt-0.5">Today — {today}</p>
        </div>
        <button className="h-9 px-4 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-colors">
          Mark Attendance
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: summary.total, icon: Users, color: 'text-primary', bg: 'bg-surface-100 dark:bg-surface-800' },
          { label: 'Present', value: summary.present, icon: UserCheck, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Absent', value: summary.absent, icon: UserX, color: 'text-danger', bg: 'bg-danger/10' },
          { label: 'Late', value: summary.late, icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
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

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary rounded-xl p-1 w-fit">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn('px-4 py-2 text-sm font-medium rounded-lg transition-all', tab === t ? 'bg-elevated text-primary shadow-sm' : 'text-muted hover:text-secondary')}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Daily View' && (
        <div className="card-base overflow-hidden">
          <div className="p-4 border-b border-default flex items-center justify-between">
            <h2 className="text-sm font-semibold text-primary">Student Attendance — {today}</h2>
            <select value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}
              className="h-8 px-3 text-xs bg-secondary border border-default rounded-lg text-primary focus:outline-none">
              <option value="">All Batches</option>
              {BATCH_LIST.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-default">
                {['Student', 'Batch', 'Status', 'Marked At', 'Marked By'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-muted px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-default">
              {attendance.isLoading ? Array(5).fill(0).map((_, i) => (
                <tr key={i}><td colSpan={5} className="px-4 py-3"><Skeleton className="h-7 w-full" /></td></tr>
              )) : attendance.data
                ?.filter(a => !selectedBatch || a.batch === selectedBatch)
                .map(record => (
                  <tr key={record.id} className="hover:bg-secondary transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-primary">{record.studentName}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{record.batch}</td>
                    <td className="px-4 py-3"><StatusBadge status={record.status as any} /></td>
                    <td className="px-4 py-3 text-sm text-secondary">{new Date(record.markedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{record.markedBy}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'Batch View' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {batchAttendance.data?.map(batch => (
            <Card key={batch.batchId}>
              <CardHeader className="p-5">
                <div className="flex items-center justify-between">
                  <CardTitle>{batch.batchName}</CardTitle>
                  <span className={cn('text-xl font-bold', batch.percentage >= 85 ? 'text-success' : batch.percentage >= 70 ? 'text-warning' : 'text-danger')}>
                    {batch.percentage}%
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3">
                <div className="w-full h-2.5 bg-tertiary rounded-full overflow-hidden">
                  <div className={cn('h-full rounded-full', batch.percentage >= 85 ? 'bg-success' : batch.percentage >= 70 ? 'bg-warning' : 'bg-danger')}
                    style={{ width: `${batch.percentage}%` }} />
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-success">{batch.present} Present</span>
                  <span className="text-danger">{batch.absent} Absent</span>
                  {batch.late > 0 && <span className="text-warning">{batch.late} Late</span>}
                  <span className="text-muted">{batch.total} Total</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === 'Calendar' && (
        <Card>
          <CardContent className="p-8 text-center">
            <CalendarCheck size={40} className="mx-auto text-muted mb-3" />
            <p className="text-secondary font-medium">Calendar view coming soon</p>
            <p className="text-muted text-sm mt-1">Attendance history will be displayed in a monthly calendar format</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
