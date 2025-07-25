import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@/lib/axios';
import { ItemValue } from '@/utils/schemas/items-dto';

export const useDeleteItem = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ItemValue, Error>({
    mutationFn: async () => {
      const res = await api.delete<ItemValue>(`/items/${id}`)
      
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['item', { id }] });
      queryClient.invalidateQueries({ queryKey: ['items'] });
      toast.success('Item deletado');
    },
    onError: () => {
      toast.error('Falha ao deletar o Item');
    },
  });
  return mutation;
};