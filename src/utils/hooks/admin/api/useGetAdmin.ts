import api from '@/lib/axios';
import { AdminFormValues } from '@/utils/schemas/new-admin-dto';
import { useQuery } from '@tanstack/react-query';

export const useGetAdmin = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['admin', { id }],
    queryFn: async () => {
      const response = await api.get<AdminFormValues>(`/admin/${id}`)
      if (response.status === 400) throw new Error('failed to fecth account');
      const Admin = response.data;
      return Admin;
    },
  });
  return query;
};