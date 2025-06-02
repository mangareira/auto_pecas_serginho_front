import api from '@/lib/axios';
import { AdminValues } from '@/utils/schemas/new-admin-dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useEditAdmin = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<AdminValues, Error, AdminValues>({
    mutationFn: async (json) => {
      const res = await api.put<AdminValues>(`/admin/${id}`, json)
      
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', { id }] });
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      toast.success('Administrador autalizado');
    },
    onError: () => {
      toast.error('Falha ao autalizar o administrador');
    },
  });
  return mutation;
};