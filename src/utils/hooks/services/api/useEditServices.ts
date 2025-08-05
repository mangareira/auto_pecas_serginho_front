import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@/lib/axios';
import { ServicesValue } from '@/utils/schemas/services-dto';

export const useEditServices = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ServicesValue, Error, ServicesValue>({
    mutationFn: async (json) => {
      const res = await api.put<ServicesValue>(
        `/services/${id}`, 
        json
      );
      
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service', { id }] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Serviço autalizado');
    },
    onError: () => {
      toast.error('Falha ao autalizar o Serviço');
    },
  });
  return mutation;
};