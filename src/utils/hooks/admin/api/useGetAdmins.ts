import api from '@/lib/axios';
import { AdminValues } from '@/utils/schemas/new-admin-dto';
import { useQuery } from '@tanstack/react-query';

export const useGetAdmins = () => {
  const query = useQuery({
    queryKey: ['admins'],
    queryFn: async () => {
      const response = await api.get<AdminValues>("/admin")
      if (response.status === 400) throw new Error('failed to fecth account');
      const Admins = response.data;
      return Admins;
    },
  });
  return query;
};