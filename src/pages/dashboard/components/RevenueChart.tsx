import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { RevenueDataPoint } from '@/types';
import { formatNumber } from '@/lib/utils';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="card-base p-3 text-xs space-y-1.5">
      <p className="font-semibold text-primary">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-secondary capitalize">{p.dataKey}:</span>
          <span className="font-semibold text-primary">₹{formatNumber(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export function RevenueChart({ data }: { data: RevenueDataPoint[] }) {
  return (
    <Card>
      <CardHeader className="p-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-primary">Revenue Trend</CardTitle>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-brand-500 rounded" />Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-surface-300 rounded border-dashed border" />Target</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5b70f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#5b70f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" strokeOpacity={0.5} vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${formatNumber(v)}`} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-default)', strokeWidth: 1 }} />
            <Area type="monotone" dataKey="revenue" stroke="#5b70f6" strokeWidth={2} fill="url(#revGrad)" dot={false} />
            <Area type="monotone" dataKey="collected" stroke="#22c55e" strokeWidth={2} fill="url(#colGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
