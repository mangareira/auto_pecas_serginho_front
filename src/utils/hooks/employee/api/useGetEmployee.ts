import api from '@/lib/axios';
import { EmployeeValues } from '@/utils/schemas/employee-dto';
import { useQuery } from '@tanstack/react-query';

export const useGetEmployee = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['employee', { id }],
    queryFn: async () => {
      const response = await api.get<EmployeeValues>(`/employees/${id}`)
      if (response.status === 400) throw new Error('failed to fecth employee');
      const Admin = response.data;
      return Admin;
    },
  });
  return query;
};