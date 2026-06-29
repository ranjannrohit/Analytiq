import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, BookOpen } from 'lucide-react';
import { useStudent } from '@/hooks/use-students';
import { Avatar } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatDate } from '@/lib/utils';

export function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: student, isLoading } = useStudent(id!);

  if (isLoading) return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-48 w-full rounded-2xl" />
      <div className="grid grid-cols-3 gap-4">{Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}</div>
    </div>
  );

  if (!student) return <div className="text-center py-20 text-secondary">Student not found</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <Link to="/students" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors">
        <ArrowLeft size={16} /> Back to Students
      </Link>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-5">
            <Avatar name={student.name} size="xl" />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-xl font-bold text-primary">{student.name}</h1>
                  <div className="text-sm text-muted mt-0.5">{student.enrollmentNo}</div>
                </div>
                <StatusBadge status={student.status as any} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                <div className="flex items-center gap-2 text-sm text-secondary"><Phone size={14} className="text-muted" />{student.phone}</div>
                <div className="flex items-center gap-2 text-sm text-secondary"><Mail size={14} className="text-muted" />{student.email}</div>
                <div className="flex items-center gap-2 text-sm text-secondary"><Calendar size={14} className="text-muted" />Joined {formatDate(student.joinDate)}</div>
                <div className="flex items-center gap-2 text-sm text-secondary"><BookOpen size={14} className="text-muted" />{student.course}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Fees', value: formatCurrency(student.totalFees), color: 'text-primary' },
          { label: 'Paid Fees', value: formatCurrency(student.paidFees), color: 'text-success' },
          { label: 'Pending', value: formatCurrency(student.pendingFees), color: student.pendingFees > 0 ? 'text-danger' : 'text-success' },
          { label: 'Attendance', value: `${student.attendancePercent}%`, color: student.attendancePercent >= 85 ? 'text-success' : student.attendancePercent >= 70 ? 'text-warning' : 'text-danger' },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="p-5"><CardTitle>Personal Information</CardTitle></CardHeader>
          <CardContent className="p-5 pt-0 space-y-3">
            {[
              ['Batch', student.batch],
              ['Course', student.course],
              ['Date of Birth', formatDate(student.dob)],
              ['Gender', student.gender.charAt(0).toUpperCase() + student.gender.slice(1)],
              ['Address', student.address],
            ].map(([k, v]) => (
              <div key={k} className="flex items-start gap-3">
                <span className="text-xs text-muted w-28 shrink-0 pt-0.5">{k}</span>
                <span className="text-sm text-primary">{v}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-5"><CardTitle>Parent / Guardian</CardTitle></CardHeader>
          <CardContent className="p-5 pt-0 space-y-3">
            {[
              ['Name', student.parentName],
              ['Phone', student.parentPhone],
            ].map(([k, v]) => (
              <div key={k} className="flex items-start gap-3">
                <span className="text-xs text-muted w-28 shrink-0 pt-0.5">{k}</span>
                <span className="text-sm text-primary">{v}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
