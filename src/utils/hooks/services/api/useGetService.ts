import api from '@/lib/axios';
import { ServicesResponse} from '@/utils/schemas/services-dto';
import { useQuery } from '@tanstack/react-query';

export const useGetService = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['service', { id }],
    queryFn: async () => {
      const response = await api.get<ServicesResponse>(`/services/${id}`)
      if (response.status === 400) throw new Error('failed to fecth service');
      const service = response.data;
      return service;
    },
  });
  return query;
};