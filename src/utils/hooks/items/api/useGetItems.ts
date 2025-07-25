import { useQuery } from '@tanstack/react-query';

import api from '@/lib/axios';
import { ItemValue } from '@/utils/schemas/items-dto';

export const useGetItems = () => {
  const query = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const response = await api.get<ItemValue[]>("/items")
      if (response.status === 400) throw new Error('failed to fecth Type Services');
      const items = response.data;
      return items;
    },
  });
  return query;
};