import api from '@/lib/axios';
import { AdminValues } from '@/utils/schemas/new-admin-dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteAdmin = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<AdminValues, Error>({
    mutationFn: async () => {
      const res = await api.delete<AdminValues>(`/admin/${id}`)
      
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', { id }] });
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      toast.success('Administrador deletado');
    },
    onError: () => {
      toast.error('Falha ao deletar o administrador');
    },
  });
  return mutation;
};