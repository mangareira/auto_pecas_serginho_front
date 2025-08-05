import api from '@/lib/axios';
import { HelperValues } from '@/utils/schemas/helper-dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteHelper = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<HelperValues, Error>({
    mutationFn: async () => {
      const res = await api.delete<HelperValues>(`/helpers/${id}`)
      
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['helper', { id }] });
      queryClient.invalidateQueries({ queryKey: ['helpers'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Ajudante deletado');
    },
    onError: () => {
      toast.error('Falha ao deletar o Ajudante');
    },
  });
  return mutation;
};