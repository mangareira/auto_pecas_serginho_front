import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { ItemValue } from '@/utils/schemas/items-dto';

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ItemValue, Error, ItemValue>({
    mutationFn: async (json) => {
      const res = await api.post<ItemValue>("/items", json)
      if(res.status === 400) throw new Error('Falha ao criar Item');
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['item'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Item criado com sucesso');
    },
    onError: () => {
      toast.error('Falha ao criar Item');
    },
  });
  return mutation;
};