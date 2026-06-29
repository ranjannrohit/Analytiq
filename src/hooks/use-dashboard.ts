import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard.service';

export function useDashboardKPIs() {
  return useQuery({ queryKey: ['dashboard', 'kpis'], queryFn: () => dashboardService.getKPIs(), staleTime: 30_000 });
}
export function useRevenueChart() {
  return useQuery({ queryKey: ['dashboard', 'revenue'], queryFn: () => dashboardService.getRevenueChart(), staleTime: 60_000 });
}
export function useBatchAttendance() {
  return useQuery({ queryKey: ['dashboard', 'attendance'], queryFn: () => dashboardService.getBatchAttendance(), staleTime: 60_000 });
}
export function useRecentActivity() {
  return useQuery({ queryKey: ['dashboard', 'activity'], queryFn: () => dashboardService.getRecentActivity(), staleTime: 30_000 });
}
export function useRecentStudents() {
  return useQuery({ queryKey: ['dashboard', 'students'], queryFn: () => dashboardService.getRecentStudents(), staleTime: 60_000 });
}
export function usePendingFees() {
  return useQuery({ queryKey: ['dashboard', 'fees'], queryFn: () => dashboardService.getPendingFees(), staleTime: 60_000 });
}
