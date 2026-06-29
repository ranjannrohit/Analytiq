import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Clock, AlertCircle, TrendingUp, Download, Plus, Search, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { feesService } from '@/services/fees.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

const TABS = ['All', 'Pending', 'Overdue', 'Paid', 'Partial'];

export function FeesPage() {
  const [tab, setTab] = useState('All');
  const [search, setSearch] = useState('');

  const summary = useQuery({ queryKey: ['fees', 'summary'], queryFn: () => feesService.getSummary() });
  const records = useQuery({
    queryKey: ['fees', 'records', tab, search],
    queryFn: () => feesService.getFeeRecords({ status: tab === 'All' ? '' : tab.toLowerCase(), search }),
  });
  const transactions = useQuery({ queryKey: ['fees', 'transactions'], queryFn: () => feesService.getTransactions() });

  const summaryCards = [
    { label: 'Total Collected', value: summary.data?.totalCollected || 0, icon: CreditCard, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Pending', value: summary.data?.pending || 0, icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Overdue', value: summary.data?.overdue || 0, icon: AlertCircle, color: 'text-danger', bg: 'bg-danger/10' },
    { label: 'This Month', value: summary.data?.thisMonth || 0, icon: TrendingUp, color: 'text-brand-500', bg: 'bg-brand-500/10' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-primary">Fee Management</h1>
          <p className="text-secondary text-sm mt-0.5">Track collections, dues, and transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Download size={14} />}>Export</Button>
          <Button size="sm" icon={<Plus size={14} />}>Collect Fee</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', bg)}>
                  <Icon size={17} className={color} />
                </div>
              </div>
              <div className="text-xl font-bold text-primary">{formatCurrency(value)}</div>
              <div className="text-xs text-muted mt-1">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fee Records Table */}
      <div className="card-base overflow-hidden">
        <div className="p-5 border-b border-default space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1 min-w-48">
              <Input placeholder="Search student…" value={search} onChange={e => setSearch(e.target.value)} leftIcon={<Search size={14} />} />
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-1 bg-secondary rounded-xl p-1 w-fit">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={cn('px-3 py-1.5 text-sm font-medium rounded-lg transition-all', tab === t ? 'bg-elevated text-primary shadow-sm' : 'text-muted hover:text-secondary')}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-default">
              {['Student', 'Batch', 'Amount', 'Paid', 'Pending', 'Due Date', 'Method', 'Status'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-muted px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-default">
            {records.isLoading ? Array(5).fill(0).map((_, i) => (
              <tr key={i}><td colSpan={8} className="px-4 py-3"><Skeleton className="h-7 w-full" /></td></tr>
            )) : records.data?.data.map(fee => (
              <tr key={fee.id} className="hover:bg-secondary transition-colors">
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-primary">{fee.studentName}</div>
                  <div className="text-xs text-muted">{fee.enrollmentNo}</div>
                </td>
                <td className="px-4 py-3 text-sm text-secondary">{fee.batch}</td>
                <td className="px-4 py-3 text-sm font-medium text-primary">{formatCurrency(fee.amount)}</td>
                <td className="px-4 py-3 text-sm text-success">{formatCurrency(fee.paid)}</td>
                <td className="px-4 py-3 text-sm font-medium text-danger">{formatCurrency(fee.pending)}</td>
                <td className="px-4 py-3 text-sm text-secondary">{formatDate(fee.dueDate)}</td>
                <td className="px-4 py-3 text-xs text-secondary capitalize">{fee.method?.replace('_', ' ') || '—'}</td>
                <td className="px-4 py-3"><StatusBadge status={fee.status as any} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Transactions */}
      <div className="card-base overflow-hidden">
        <div className="p-5 border-b border-default">
          <h2 className="text-sm font-semibold text-primary">Recent Transactions</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-default">
              {['Receipt No', 'Student', 'Amount', 'Method', 'Date', 'Collected By', 'Status'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-muted px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-default">
            {transactions.data?.data.map(tx => (
              <tr key={tx.id} className="hover:bg-secondary transition-colors">
                <td className="px-4 py-3 text-xs font-mono text-secondary">{tx.receiptNo}</td>
                <td className="px-4 py-3 text-sm text-primary">{tx.studentName}</td>
                <td className="px-4 py-3 text-sm font-semibold text-success">{formatCurrency(tx.amount)}</td>
                <td className="px-4 py-3 text-xs text-secondary capitalize">{tx.method.replace('_', ' ')}</td>
                <td className="px-4 py-3 text-sm text-secondary">{formatDate(tx.date)}</td>
                <td className="px-4 py-3 text-sm text-secondary">{tx.collectedBy}</td>
                <td className="px-4 py-3"><StatusBadge status={tx.status as any} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
