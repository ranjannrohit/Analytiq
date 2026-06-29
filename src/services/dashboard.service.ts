import { MOCK_KPI, MOCK_REVENUE_DATA, MOCK_BATCH_ATTENDANCE, MOCK_ACTIVITIES, MOCK_FEE_RECORDS, MOCK_STUDENTS } from './mock-data';
import { delay } from '@/lib/utils';
import { MOCK_DELAY_MS } from '@/constants';

export const dashboardService = {
  async getKPIs() {
    await delay(MOCK_DELAY_MS);
    return MOCK_KPI;
  },
  async getRevenueChart() {
    await delay(MOCK_DELAY_MS);
    return MOCK_REVENUE_DATA;
  },
  async getBatchAttendance() {
    await delay(MOCK_DELAY_MS);
    return MOCK_BATCH_ATTENDANCE;
  },
  async getRecentActivity() {
    await delay(MOCK_DELAY_MS);
    return MOCK_ACTIVITIES;
  },
  async getRecentStudents() {
    await delay(MOCK_DELAY_MS);
    return MOCK_STUDENTS.slice(0, 5);
  },
  async getPendingFees() {
    await delay(MOCK_DELAY_MS);
    return MOCK_FEE_RECORDS.filter(f => f.status === 'pending' || f.status === 'overdue').slice(0, 5);
  },
};
