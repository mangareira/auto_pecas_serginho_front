import api from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteBulkServices = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<null, Error, Array<string>>({
    mutationFn: async (json) => {
      const res = await api.post(`/services/bulk-delete`, json )
      
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      queryClient.invalidateQueries({ queryKey: ['employee'] })
      queryClient.invalidateQueries({ queryKey: ['helpers'] })
      queryClient.invalidateQueries({ queryKey: ['helper'] })
      toast.success('Serviços deletados');
    },
    onError: () => {
      toast.error('Falha ao deletar os Serviços');
    },
  });
  return mutation;
};