import type { FeeRecord, Transaction, FilterParams, ApiResponse } from '@/types';
import { MOCK_FEE_RECORDS, MOCK_TRANSACTIONS } from './mock-data';
import { delay } from '@/lib/utils';
import { MOCK_DELAY_MS } from '@/constants';

export const feesService = {
  async getFeeRecords(params?: FilterParams): Promise<ApiResponse<FeeRecord[]>> {
    await delay(MOCK_DELAY_MS);
    let data = [...MOCK_FEE_RECORDS];
    if (params?.status) data = data.filter(f => f.status === params.status);
    if (params?.search) {
      const q = params.search.toLowerCase();
      data = data.filter(f => f.studentName.toLowerCase().includes(q));
    }
    return { success: true, data, meta: { total: data.length, page: 1, perPage: 10, totalPages: 1 } };
  },

  async getTransactions(params?: FilterParams): Promise<ApiResponse<Transaction[]>> {
    await delay(MOCK_DELAY_MS);
    return { success: true, data: MOCK_TRANSACTIONS, meta: { total: MOCK_TRANSACTIONS.length, page: 1, perPage: 10, totalPages: 1 } };
  },

  async collectPayment(data: { feeId: string; amount: number; method: string }): Promise<Transaction> {
    await delay(MOCK_DELAY_MS);
    return { id:`t${Date.now()}`, studentId:'s1', studentName:'Student', amount: data.amount, method: data.method as any, receiptNo:`RCP-${Date.now()}`, date: new Date().toISOString(), collectedBy:'Admin', status:'success' };
  },

  async getSummary(): Promise<{ totalCollected: number; pending: number; overdue: number; thisMonth: number }> {
    await delay(MOCK_DELAY_MS);
    return { totalCollected: 1850000, pending: 320000, overdue: 87000, thisMonth: 368000 };
  },
};
