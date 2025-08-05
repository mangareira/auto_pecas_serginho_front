import api from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteBulkHelper = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<null, Error, Array<string>>({
    mutationFn: async (json) => {
      const res = await api.post(`/helpers/bulk-delete`, json )
      
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['helpers'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Ajudantes deletados');
    },
    onError: () => {
      toast.error('Falha ao deletar o Ajudantes');
    },
  });
  return mutation;
};