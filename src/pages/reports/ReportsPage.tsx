import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Plus, Clock, CheckCircle, RefreshCw, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, StatusBadge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const REPORT_TYPES = [
  { id: 'revenue', name: 'Revenue Report', desc: 'Monthly/weekly fee collection summary', icon: '💰', color: 'bg-success/10 border-success/20' },
  { id: 'attendance', name: 'Attendance Report', desc: 'Batch-wise and student attendance', icon: '📋', color: 'bg-brand-500/10 border-brand-500/20' },
  { id: 'students', name: 'Student Report', desc: 'Enrollment status and details', icon: '👥', color: 'bg-info/10 border-info/20' },
  { id: 'fees', name: 'Fee Dues Report', desc: 'Pending and overdue fee list', icon: '⚠️', color: 'bg-warning/10 border-warning/20' },
  { id: 'performance', name: 'Batch Performance', desc: 'Top and low performing batches', icon: '📊', color: 'bg-brand-500/10 border-brand-500/20' },
  { id: 'custom', name: 'Custom Report', desc: 'Build your own report with filters', icon: '⚙️', color: 'bg-surface-100 border-default dark:bg-surface-800' },
];

const HISTORY = [
  { id: 'r1', name: 'Revenue Report — May 2024', type: 'revenue', format: 'PDF', generatedAt: '2024-06-01 09:00 AM', generatedBy: 'Riya Admin', size: '124 KB', status: 'ready' },
  { id: 'r2', name: 'Attendance Report — Week 23', type: 'attendance', format: 'Excel', generatedAt: '2024-06-07 11:30 AM', generatedBy: 'Manager', size: '86 KB', status: 'ready' },
  { id: 'r3', name: 'Fee Dues Report — June 2024', type: 'fees', format: 'PDF', generatedAt: '2024-06-10 02:00 PM', generatedBy: 'Accountant', size: '98 KB', status: 'ready' },
  { id: 'r4', name: 'Student Enrollment Report', type: 'students', format: 'Excel', generatedAt: '2024-06-12 08:00 AM', generatedBy: 'System', size: '201 KB', status: 'ready' },
  { id: 'r5', name: 'Monthly Report — June 2024', type: 'revenue', format: 'PDF', generatedAt: '2024-06-28 07:00 AM', generatedBy: 'System (Scheduled)', size: '—', status: 'pending' },
];

export function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);

  const handleGenerate = async (id: string) => {
    setGenerating(id);
    await new Promise(r => setTimeout(r, 1800));
    setGenerating(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-primary">Reports</h1>
        <p className="text-secondary text-sm mt-0.5">Generate, schedule, and download reports</p>
      </div>

      {/* Report Types */}
      <div>
        <h2 className="text-sm font-semibold text-secondary mb-3">Generate Report</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {REPORT_TYPES.map(rt => (
            <div key={rt.id} className={cn('card-base p-4 border cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200', rt.color)}>
              <div className="text-2xl mb-3">{rt.icon}</div>
              <div className="text-sm font-semibold text-primary mb-1">{rt.name}</div>
              <div className="text-xs text-secondary mb-4">{rt.desc}</div>
              <div className="flex gap-2">
                <Button size="xs" variant="outline" icon={<Download size={11} />}
                  onClick={() => handleGenerate(rt.id)} loading={generating === rt.id}>
                  PDF
                </Button>
                <Button size="xs" variant="outline" icon={<Download size={11} />}>Excel</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader className="p-5">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Calendar size={15} className="text-brand-500" /> Scheduled Reports</CardTitle>
            <Button size="sm" variant="outline" icon={<Plus size={13} />}>Schedule</Button>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <div className="space-y-3">
            {[
              { name: 'Monthly Revenue Report', schedule: '1st of every month', channel: 'Email', next: 'Jul 1, 2024' },
              { name: 'Weekly Attendance Summary', schedule: 'Every Monday 8 AM', channel: 'Email + WhatsApp', next: 'Jul 1, 2024' },
              { name: 'Fee Dues Alert', schedule: 'Every 15th', channel: 'WhatsApp', next: 'Jul 15, 2024' },
            ].map(s => (
              <div key={s.name} className="flex items-center justify-between gap-4 py-3 border-b border-default last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-500/10 rounded-xl flex items-center justify-center">
                    <RefreshCw size={14} className="text-brand-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary">{s.name}</div>
                    <div className="text-xs text-muted">{s.schedule} · via {s.channel}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-secondary">Next: {s.next}</div>
                  <Badge variant="success" size="sm" dot>Active</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report History */}
      <Card>
        <CardHeader className="p-5">
          <CardTitle className="flex items-center gap-2"><Clock size={15} className="text-muted" /> Report History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-default">
                {['Report Name', 'Format', 'Generated At', 'By', 'Size', 'Status', ''].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-muted px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-default">
              {HISTORY.map(r => (
                <tr key={r.id} className="hover:bg-secondary transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-muted shrink-0" />
                      <span className="text-sm text-primary">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge variant={r.format === 'PDF' ? 'danger' : 'success'} size="sm">{r.format}</Badge></td>
                  <td className="px-4 py-3 text-xs text-secondary">{r.generatedAt}</td>
                  <td className="px-4 py-3 text-xs text-secondary">{r.generatedBy}</td>
                  <td className="px-4 py-3 text-xs text-muted">{r.size}</td>
                  <td className="px-4 py-3">
                    {r.status === 'ready'
                      ? <span className="flex items-center gap-1 text-xs text-success"><CheckCircle size={12} /> Ready</span>
                      : <span className="flex items-center gap-1 text-xs text-warning"><Clock size={12} /> Pending</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    {r.status === 'ready' && (
                      <Button size="xs" variant="ghost" icon={<Download size={12} />}>Download</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
