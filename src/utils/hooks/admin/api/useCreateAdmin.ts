import { AdminFormValues, AdminValues } from '@/utils/schemas/new-admin-dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '@/lib/axios';

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<AdminValues, Error, AdminFormValues>({
    mutationFn: async (json) => {
      const res = await api.post<AdminValues>("/admin", json)
      if(res.status === 400) throw new Error('Falha ao criar conta');
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      toast.success('Conta criada com sucesso');
    },
    onError: () => {
      toast.error('Falha ao criar conta');
    },
  });
  return mutation;
};