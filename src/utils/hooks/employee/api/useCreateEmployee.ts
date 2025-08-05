import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { EmployeeValues } from '@/utils/schemas/employee-dto';

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<EmployeeValues, Error, EmployeeValues>({
    mutationFn: async (json) => {
      const res = await api.post<EmployeeValues>("/employees", json)
      if(res.status === 400) throw new Error('Falha ao criar colaborador');
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employee'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      toast.success('Colaborador criado com sucesso');
    },
    onError: () => {
      toast.error('Falha ao criar Colaborador');
    },
  });
  return mutation;
};