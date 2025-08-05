import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@/lib/axios';
import { ServicesValue } from '@/utils/schemas/services-dto';

export const useDeleteServices = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ServicesValue, Error>({
    mutationFn: async () => {
      const res = await api.delete<ServicesValue>(`/services/${id}`)
      
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service', { id }] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      queryClient.invalidateQueries({ queryKey: ['employee'] })
      queryClient.invalidateQueries({ queryKey: ['helpers'] })
      queryClient.invalidateQueries({ queryKey: ['helper'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Serviço deletado');
    },
    onError: () => {
      toast.error('Falha ao deletar o Serviço');
    },
  });
  return mutation;
};