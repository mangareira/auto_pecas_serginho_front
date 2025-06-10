import api from '@/lib/axios';
import { EmployeeValues } from '@/utils/schemas/employee-dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useEditEmployee = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<EmployeeValues, Error, EmployeeValues>({
    mutationFn: async (json) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { services, ...dataWithoutServices } = json;
      
      const res = await api.put<EmployeeValues>(
        `/employees/${id}`, 
        dataWithoutServices
      );
      
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee', { id }] });
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('Colaborador autalizado');
    },
    onError: () => {
      toast.error('Falha ao autalizar o colaborador');
    },
  });
  return mutation;
};