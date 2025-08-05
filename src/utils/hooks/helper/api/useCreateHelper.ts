import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { HelperValues } from '@/utils/schemas/helper-dto';

export const useCreateHelper = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<HelperValues, Error, HelperValues>({
    mutationFn: async (json) => {
      const res = await api.post<HelperValues>("/helpers", json)
      if(res.status === 400) throw new Error('Falha ao criar ajudante');
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['helpers'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      queryClient.invalidateQueries({ queryKey: ['helper'] });
      toast.success('Ajudante criado com sucesso');
    },
    onError: () => {
      toast.error('Falha ao criar Ajudante');
    },
  });
  return mutation;
};