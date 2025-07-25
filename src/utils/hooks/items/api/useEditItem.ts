import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@/lib/axios';
import { ItemValue } from '@/utils/schemas/items-dto';

export const useEditItem = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ItemValue, Error, ItemValue>({
    mutationFn: async (json) => {
      const res = await api.put<ItemValue>(
        `/type-services/${id}`, 
        json
      );
      
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['item', { id }] });
      queryClient.invalidateQueries({ queryKey: ['items'] });
      toast.success('Item autalizado');
    },
    onError: () => {
      toast.error('Falha ao autalizar o Item');
    },
  });
  return mutation;
};