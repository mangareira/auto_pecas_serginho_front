import api from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteBulkTypeServices = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<null, Error, Array<string>>({
    mutationFn: async (json) => {
      const res = await api.post(`/type-services/bulk-delete`, json )
      
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['type_services'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Tipos de Serviços deletados');
    },
    onError: () => {
      toast.error('Falha ao deletar os Tipos de Serviços');
    },
  });
  return mutation;
};