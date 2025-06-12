import api from '@/lib/axios';
import { HelperValues } from '@/utils/schemas/helper-dto';
import { useQuery } from '@tanstack/react-query';

export const useGetHelpers = () => {
  const query = useQuery({
    queryKey: ['helpers'],
    queryFn: async () => {
      const response = await api.get<HelperValues[]>("/helpers")
      if (response.status === 400) throw new Error('failed to fecth helpers');
      const helpers = response.data;
      return helpers;
    },
  });
  return query;
};