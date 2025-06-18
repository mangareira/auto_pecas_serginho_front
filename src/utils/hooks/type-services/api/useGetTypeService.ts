import api from '@/lib/axios';
import { TypeServicesValue } from '@/utils/schemas/type-services-dto';
import { useQuery } from '@tanstack/react-query';

export const useGetTypeService = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['type_service', { id }],
    queryFn: async () => {
      const response = await api.get<TypeServicesValue>(`/type-services/${id}`)
      if (response.status === 400) throw new Error('failed to fecth type service');
      const typeService = response.data;
      return typeService;
    },
  });
  return query;
};