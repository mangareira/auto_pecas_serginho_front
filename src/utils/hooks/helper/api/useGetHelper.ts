import api from '@/lib/axios';
import { HelperValues } from '@/utils/schemas/helper-dto';
import { useQuery } from '@tanstack/react-query';

export const useGetHelper = (id?: string | null) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['helper', { id }],
    queryFn: async () => {
      const response = await api.get<HelperValues>(`/helpers/${id}`)
      if (response.status === 400) throw new Error('failed to fecth employee');
      const Helper = response.data;
      return Helper;
    },
  });
  return query;
};