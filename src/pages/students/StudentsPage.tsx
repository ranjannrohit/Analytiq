import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Download, Filter, Users } from 'lucide-react';
import { useStudents } from '@/hooks/use-students';
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { BATCH_LIST } from '@/constants';

export function StudentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [page, setPage] = useState(1);
  const debounced = useDebounce(search, 400);

  const { data, isLoading } = useStudents({ search: debounced, status: statusFilter, batch: batchFilter, page, perPage: 10 });

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-primary">Students</h1>
          <p className="text-secondary text-sm mt-0.5">{data?.meta?.total || 0} students enrolled</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Download size={14} />}>Export</Button>
          <Button size="sm" icon={<Plus size={14} />}>Add Student</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-48">
          <Input placeholder="Search students…" value={search} onChange={e => setSearch(e.target.value)} leftIcon={<Search size={14} />} />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="h-9 px-3 text-sm bg-elevated border border-default rounded-xl text-primary focus:border-brand-500 focus:outline-none">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="graduated">Graduated</option>
        </select>
        <select value={batchFilter} onChange={e => setBatchFilter(e.target.value)}
          className="h-9 px-3 text-sm bg-elevated border border-default rounded-xl text-primary focus:border-brand-500 focus:outline-none">
          <option value="">All Batches</option>
          {BATCH_LIST.map(b => <option key={b}>{b}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card-base overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-default">
              {['Student','Batch / Course','Contact','Fees','Attendance','Status',''].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-muted px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-default">
            {isLoading ? Array(6).fill(0).map((_, i) => (
              <tr key={i}><td colSpan={7} className="px-4 py-3"><Skeleton className="h-8 w-full" /></td></tr>
            )) : data?.data.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-16 text-secondary">
                <Users size={36} className="mx-auto mb-3 text-muted" />
                <p className="font-medium">No students found</p>
                <p className="text-sm text-muted mt-1">Try adjusting your filters</p>
              </td></tr>
            ) : data?.data.map(student => (
              <tr key={student.id} className="hover:bg-secondary transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={student.name} size="sm" />
                    <div>
                      <div className="text-sm font-medium text-primary">{student.name}</div>
                      <div className="text-xs text-muted">{student.enrollmentNo}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-primary">{student.batch}</div>
                  <div className="text-xs text-muted">{student.course}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-primary">{student.phone}</div>
                  <div className="text-xs text-muted">{student.email}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-primary">{formatCurrency(student.paidFees)}</div>
                  {student.pendingFees > 0 && <div className="text-xs text-danger">{formatCurrency(student.pendingFees)} pending</div>}
                </td>
                <td className="px-4 py-3">
                  <div className={`text-sm font-medium ${student.attendancePercent >= 85 ? 'text-success' : student.attendancePercent >= 70 ? 'text-warning' : 'text-danger'}`}>
                    {student.attendancePercent}%
                  </div>
                </td>
                <td className="px-4 py-3"><StatusBadge status={student.status as any} /></td>
                <td className="px-4 py-3">
                  <Link to={`/students/${student.id}`} className="text-xs text-brand-500 hover:text-brand-600 font-medium">View →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {data && data.meta && data.meta.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-default">
            <span className="text-xs text-muted">Showing {((page - 1) * 10) + 1}–{Math.min(page * 10, data.meta.total)} of {data.meta.total}</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</Button>
              <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={page >= (data.meta?.totalPages || 1)}>Next</Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
