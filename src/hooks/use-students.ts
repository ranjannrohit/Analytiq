import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { FilterParams } from '@/types';
import { studentsService } from '@/services/students.service';

export function useStudents(params?: FilterParams) {
  return useQuery({ queryKey: ['students', params], queryFn: () => studentsService.getAll(params) });
}
export function useStudent(id: string) {
  return useQuery({ queryKey: ['students', id], queryFn: () => studentsService.getById(id), enabled: !!id });
}
export function useDeleteStudent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: studentsService.delete, onSuccess: () => qc.invalidateQueries({ queryKey: ['students'] }) });
}
