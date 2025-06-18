import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { TypeServicesValue } from '@/utils/schemas/type-services-dto';

export const useCreateTypeServices = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<TypeServicesValue, Error, TypeServicesValue>({
    mutationFn: async (json) => {
      const res = await api.post<TypeServicesValue>("/type-services", json)
      if(res.status === 400) throw new Error('Falha ao criar tipo de serviços');
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['type_services'] });
      queryClient.invalidateQueries({ queryKey: ['type_service'] });
      toast.success('Tipo de Serviço criado com sucesso');
    },
    onError: () => {
      toast.error('Falha ao criar Tipo de Serviço');
    },
  });
  return mutation;
};