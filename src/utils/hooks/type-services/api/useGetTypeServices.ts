import { useQuery } from '@tanstack/react-query';

import api from '@/lib/axios';
import { TypeServicesValue } from '@/utils/schemas/type-services-dto';

export const useGetTypeServices = () => {
  const query = useQuery({
    queryKey: ['type_services'],
    queryFn: async () => {
      const response = await api.get<TypeServicesValue[]>("/type-services")
      if (response.status === 400) throw new Error('failed to fecth Type Services');
      const typeServices = response.data;
      return typeServices;
    },
  });
  return query;
};