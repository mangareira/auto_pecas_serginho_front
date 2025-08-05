import api from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteBulkEmployee = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<null, Error, Array<string>>({
    mutationFn: async (json) => {
      const res = await api.post(`/employees/bulk-delete`, json )
      
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Colaboradores deletados');
    },
    onError: () => {
      toast.error('Falha ao deletar o Colaboradores');
    },
  });
  return mutation;
};