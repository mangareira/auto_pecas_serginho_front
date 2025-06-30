import { useQuery } from '@tanstack/react-query';

import api from '@/lib/axios';
import { ServicesValue } from '@/utils/schemas/services-dto';

export const useGetServices = () => {
  const query = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await api.get<ServicesValue[]>("/services")
      if (response.status === 400) throw new Error('failed to fecth Services');
      const services = response.data;
      return services;
    },
  });
  return query;
};