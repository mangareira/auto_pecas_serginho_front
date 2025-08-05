import api from '@/lib/axios';
import { EmployeeValues } from '@/utils/schemas/employee-dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteEMployee = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<EmployeeValues, Error>({
    mutationFn: async () => {
      const res = await api.delete<EmployeeValues>(`/employees/${id}`)
      
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee', { id }] });
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Colaborador deletado');
    },
    onError: () => {
      toast.error('Falha ao deletar o Colaborador');
    },
  });
  return mutation;
};