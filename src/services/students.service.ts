import type { Student, FilterParams, ApiResponse } from '@/types';
import { MOCK_STUDENTS } from './mock-data';
import { delay } from '@/lib/utils';
import { MOCK_DELAY_MS } from '@/constants';

export const studentsService = {
  async getAll(params?: FilterParams): Promise<ApiResponse<Student[]>> {
    await delay(MOCK_DELAY_MS);
    let data = [...MOCK_STUDENTS];
    if (params?.search) {
      const q = params.search.toLowerCase();
      data = data.filter(s => s.name.toLowerCase().includes(q) || s.enrollmentNo.toLowerCase().includes(q) || s.email.toLowerCase().includes(q));
    }
    if (params?.status) data = data.filter(s => s.status === params.status);
    if (params?.batch)  data = data.filter(s => s.batch === params.batch);
    const total = data.length;
    const page  = params?.page || 1;
    const perPage = params?.perPage || 10;
    const start = (page - 1) * perPage;
    data = data.slice(start, start + perPage);
    return { success: true, data, meta: { total, page, perPage, totalPages: Math.ceil(total / perPage) } };
  },

  async getById(id: string): Promise<Student> {
    await delay(MOCK_DELAY_MS);
    const student = MOCK_STUDENTS.find(s => s.id === id);
    if (!student) throw new Error('Student not found');
    return student;
  },

  async create(data: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> {
    await delay(MOCK_DELAY_MS);
    const student: Student = { ...data, id: `s${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    MOCK_STUDENTS.push(student);
    return student;
  },

  async update(id: string, data: Partial<Student>): Promise<Student> {
    await delay(MOCK_DELAY_MS);
    const idx = MOCK_STUDENTS.findIndex(s => s.id === id);
    if (idx === -1) throw new Error('Student not found');
    MOCK_STUDENTS[idx] = { ...MOCK_STUDENTS[idx], ...data, updatedAt: new Date().toISOString() };
    return MOCK_STUDENTS[idx];
  },

  async delete(id: string): Promise<void> {
    await delay(MOCK_DELAY_MS);
    const idx = MOCK_STUDENTS.findIndex(s => s.id === id);
    if (idx !== -1) MOCK_STUDENTS.splice(idx, 1);
  },
};
