import { useQuery } from '@tanstack/react-query';

import { convertAmountFromMiliunitis } from '@/lib/utils';
import api from '@/lib/axios';
import { useSearchParams } from 'next/navigation';
import { Summary } from '../schemas/summary-dto';

export const useGetSummary = () => {

  const params = useSearchParams();
  const to = params.get('to') || ''
  const from = params.get('from') || ''

  const query = useQuery({
    queryKey: ['summary', { from, to }],
    queryFn: async () => {
      const response = await api.get<Summary>(`/summary?from=${from}&to=${to}`);
      if (response.status != 200 ) throw new Error('failed to fecth transactions');
      const data = response.data;
      return {
        ...data,
        incomeAmount: convertAmountFromMiliunitis(data.incomeAmount),
        expensesAmount: convertAmountFromMiliunitis(data.expensesAmount),
        remainingAmount: convertAmountFromMiliunitis(data.remainingAmount),
      };
    },
  });
  return query;
};