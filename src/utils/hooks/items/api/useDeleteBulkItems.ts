import api from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteBulkItems = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<null, Error, Array<string>>({
    mutationFn: async (json) => {
      const res = await api.post(`/items/bulk-delete`, json )
      
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      toast.success('Items deletados');
    },
    onError: () => {
      toast.error('Falha ao deletar os Items');
    },
  });
  return mutation;
};