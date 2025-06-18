import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@/lib/axios';
import { TypeServicesValue } from '@/utils/schemas/type-services-dto';

export const useEditTypeServices = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<TypeServicesValue, Error, TypeServicesValue>({
    mutationFn: async (json) => {
      const res = await api.put<TypeServicesValue>(
        `/type-services/${id}`, 
        json
      );
      
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['type_service', { id }] });
      queryClient.invalidateQueries({ queryKey: ['type_services'] });
      toast.success('Tipo de Serviço autalizado');
    },
    onError: () => {
      toast.error('Falha ao autalizar o Tipo de Serviço');
    },
  });
  return mutation;
};