import { Link } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { FeeRecord } from '@/types';

export function PendingFeesTable({ fees }: { fees: FeeRecord[] }) {
  return (
    <Card>
      <CardHeader className="p-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-primary flex items-center gap-2">
            <AlertCircle size={15} className="text-warning" /> Pending Fees
          </CardTitle>
          <Link to="/fees" className="text-xs text-brand-500 hover:text-brand-600 flex items-center gap-1">View all <ArrowRight size={12} /></Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-default">
          {fees.map(fee => (
            <div key={fee.id} className="flex items-center gap-3 px-5 py-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-primary truncate">{fee.studentName}</div>
                <div className="text-xs text-muted">{fee.batch} · Due {formatDate(fee.dueDate)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-danger">{formatCurrency(fee.pending)}</div>
                <div className="text-xs text-muted">pending</div>
              </div>
              <StatusBadge status={fee.status as any} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
