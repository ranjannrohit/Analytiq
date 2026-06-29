import { motion } from 'framer-motion';
import { useDashboardKPIs, useRevenueChart, useBatchAttendance, useRecentActivity, useRecentStudents, usePendingFees } from '@/hooks/use-dashboard';
import { KPICardComponent } from './components/KPICard';
import { RevenueChart } from './components/RevenueChart';
import { AttendanceChart } from './components/AttendanceChart';
import { RecentStudentsTable } from './components/RecentStudentsTable';
import { PendingFeesTable } from './components/PendingFeesTable';
import { ActivityTimeline } from './components/ActivityTimeline';
import { SkeletonCard } from '@/components/ui/skeleton';

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

export function DashboardPage() {
  const kpis      = useDashboardKPIs();
  const revenue   = useRevenueChart();
  const attendance = useBatchAttendance();
  const activity  = useRecentActivity();
  const students  = useRecentStudents();
  const fees      = usePendingFees();

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-primary">Good morning, Riya 👋</h1>
        <p className="text-secondary text-sm mt-1">Here's what's happening at your institute today.</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.isLoading
          ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : kpis.data?.map(kpi => <KPICardComponent key={kpi.id} kpi={kpi} />)
        }
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          {revenue.isLoading ? <SkeletonCard /> : <RevenueChart data={revenue.data || []} />}
        </div>
        <div>
          {attendance.isLoading ? <SkeletonCard /> : <AttendanceChart data={attendance.data || []} />}
        </div>
      </motion.div>

      {/* Tables Row */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {students.isLoading ? <SkeletonCard /> : <RecentStudentsTable students={students.data || []} />}
        {fees.isLoading ? <SkeletonCard /> : <PendingFeesTable fees={fees.data || []} />}
      </motion.div>

      {/* Activity Timeline */}
      <motion.div variants={fadeUp}>
        {activity.isLoading ? <SkeletonCard /> : <ActivityTimeline activities={activity.data || []} />}
      </motion.div>
    </motion.div>
  );
}
