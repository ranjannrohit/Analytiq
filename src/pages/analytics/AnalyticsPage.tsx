import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_REVENUE_DATA, MOCK_BATCH_ATTENDANCE } from '@/services/mock-data';
import { delay, formatNumber } from '@/lib/utils';

const COLORS = ['#5b70f6', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

const admissionData = [
  { month: 'Jan', admissions: 18 }, { month: 'Feb', admissions: 24 },
  { month: 'Mar', admissions: 21 }, { month: 'Apr', admissions: 32 },
  { month: 'May', admissions: 28 }, { month: 'Jun', admissions: 35 },
];

const courseData = [
  { name: 'Data Science', value: 68 },
  { name: 'Web Dev', value: 54 },
  { name: 'Computer Sci', value: 47 },
  { name: 'Digital Mktg', value: 39 },
  { name: 'Graphic Design', value: 23 },
  { name: 'Business Analytics', value: 16 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="card-base p-3 text-xs space-y-1">
      <p className="font-semibold text-primary">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-secondary">{p.name || p.dataKey}:</span>
          <span className="font-semibold text-primary">{typeof p.value === 'number' && p.value > 1000 ? `₹${formatNumber(p.value)}` : p.value}</span>
        </div>
      ))}
    </div>
  );
};

export function AnalyticsPage() {
  const revenue = useQuery({ queryKey: ['analytics', 'revenue'], queryFn: async () => { await delay(500); return MOCK_REVENUE_DATA; } });

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-primary">Analytics</h1>
        <p className="text-secondary text-sm mt-0.5">Performance insights and trends</p>
      </div>

      {/* Revenue & Admissions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="p-5"><CardTitle>Revenue Trend (6 Months)</CardTitle></CardHeader>
          <CardContent className="p-5 pt-0">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenue.data || []}>
                <defs>
                  <linearGradient id="aRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5b70f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#5b70f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${formatNumber(v)}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#5b70f6" strokeWidth={2.5} fill="url(#aRevGrad)" dot={false} />
                <Area type="monotone" dataKey="collected" stroke="#22c55e" strokeWidth={2} fill="none" dot={false} strokeDasharray="4 3" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-5"><CardTitle>Monthly Admissions</CardTitle></CardHeader>
          <CardContent className="p-5 pt-0">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={admissionData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="admissions" fill="#5b70f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Course Distribution & Attendance */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="p-5"><CardTitle>Students by Course</CardTitle></CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie data={courseData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" strokeWidth={0}>
                    {courseData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {courseData.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="text-xs text-secondary flex-1 truncate">{item.name}</span>
                    <span className="text-xs font-semibold text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-5"><CardTitle>Attendance by Batch</CardTitle></CardHeader>
          <CardContent className="p-5 pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={MOCK_BATCH_ATTENDANCE} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="batchName" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={85} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="percentage" name="Attendance %" radius={[0, 6, 6, 0]}>
                  {MOCK_BATCH_ATTENDANCE.map((entry, i) => (
                    <Cell key={i} fill={entry.percentage >= 85 ? '#22c55e' : entry.percentage >= 70 ? '#f59e0b' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Collection Rate Card */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Collection Rate', value: '82%', sub: '+3% vs last month', color: 'text-success' },
          { label: 'Top Batch', value: 'Batch B', sub: '95% attendance', color: 'text-brand-500' },
          { label: 'Revenue Growth', value: '+29%', sub: 'Jan to Jun 2024', color: 'text-success' },
          { label: 'Avg Attendance', value: '87%', sub: 'Across all batches', color: 'text-info' },
        ].map(({ label, value, sub, color }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-primary font-medium mt-1">{label}</div>
              <div className="text-xs text-muted mt-0.5">{sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
