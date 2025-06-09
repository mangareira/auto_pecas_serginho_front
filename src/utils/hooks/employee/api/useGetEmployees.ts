import api from '@/lib/axios';
import { EmployeeValues } from '@/utils/schemas/employee-dto';
import { useQuery } from '@tanstack/react-query';

export const useGetEmployees = () => {
  const query = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const response = await api.get<EmployeeValues[]>("/employees")
      if (response.status === 400) throw new Error('failed to fecth employees');
      const employee = response.data;
      return employee;
    },
  });
  return query;
};