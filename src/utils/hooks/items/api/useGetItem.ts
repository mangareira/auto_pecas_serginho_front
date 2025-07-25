import api from '@/lib/axios';
import { ItemValue } from '@/utils/schemas/items-dto';
import { useQuery } from '@tanstack/react-query';

export const useGetItem = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['item', { id }],
    queryFn: async () => {
      const response = await api.get<ItemValue>(`/items/${id}`)
      if (response.status === 400) throw new Error('failed to fecth item');
      const item = response.data;
      return item;
    },
  });
  return query;
};