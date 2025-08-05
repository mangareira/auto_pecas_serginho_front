import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@/lib/axios';
import { TypeServicesValue } from '@/utils/schemas/type-services-dto';

export const useDeleteTypeServices = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<TypeServicesValue, Error>({
    mutationFn: async () => {
      const res = await api.delete<TypeServicesValue>(`/type-services/${id}`)
      
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['type_service', { id }] });
      queryClient.invalidateQueries({ queryKey: ['type_services'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Tipo de Serviço deletado');
    },
    onError: () => {
      toast.error('Falha ao deletar o Tipo de Serviço');
    },
  });
  return mutation;
};