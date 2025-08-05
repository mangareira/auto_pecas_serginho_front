import api from '@/lib/axios';
import { HelperValues } from '@/utils/schemas/helper-dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useEditHelper = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<HelperValues, Error, HelperValues>({
    mutationFn: async (json) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { services, ...dataWithoutServices } = json;
      
      const res = await api.put<HelperValues>(
        `/helpers/${id}`, 
        dataWithoutServices
      );
      
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['helper', { id }] });
      queryClient.invalidateQueries({ queryKey: ['helpers'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Ajudantes autalizado');
    },
    onError: () => {
      toast.error('Falha ao autalizar o Ajudantes');
    },
  });
  return mutation;
};