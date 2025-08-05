import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { ServicesValue } from '@/utils/schemas/services-dto';

export const useCreateServices = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ServicesValue, Error, ServicesValue>({
    mutationFn: async (json) => {
      const res = await api.post<ServicesValue>("/services", json)
      if(res.status === 400) throw new Error('Falha ao criar o serviço');
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['service'] });
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      queryClient.invalidateQueries({ queryKey: ['employee'] })
      queryClient.invalidateQueries({ queryKey: ['helpers'] })
      queryClient.invalidateQueries({ queryKey: ['helper'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Serviço criado com sucesso');
    },
    onError: () => {
      toast.error('Falha ao criar o Serviço');
    },
  });
  return mutation;
};