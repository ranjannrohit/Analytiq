import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import type { Student } from '@/types';

export function RecentStudentsTable({ students }: { students: Student[] }) {
  return (
    <Card>
      <CardHeader className="p-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-primary">Recent Students</CardTitle>
          <Link to="/students" className="text-xs text-brand-500 hover:text-brand-600 flex items-center gap-1">View all <ArrowRight size={12} /></Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-default">
          {students.map(student => (
            <Link key={student.id} to={`/students/${student.id}`}
              className="flex items-center gap-3 px-5 py-3 hover:bg-secondary transition-colors">
              <Avatar name={student.name} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-primary truncate">{student.name}</div>
                <div className="text-xs text-muted">{student.batch} · {student.course}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-primary">{formatCurrency(student.paidFees)}</div>
                <div className="text-xs text-muted">paid</div>
              </div>
              <StatusBadge status={student.status as any} />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
