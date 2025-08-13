'use client';

import { FaArrowTrendUp, FaPiggyBank } from 'react-icons/fa6';
import { DataCard, DataCardLoading } from '../data-card';
import { dateRangeISO, formatDateRange } from '@/lib/utils';
import Filters from '../filters';
import { useGetSummary } from '@/utils/hooks/useGetSummary';
import { useSearchParams } from 'next/navigation';


export const DataGrid = () => {

  const { data, isLoading } = useGetSummary();

  const params = useSearchParams();
  const to = params.get('to') || undefined;
  const from = params.get('from') || undefined;

  const dateRangeLabel = formatDateRange(dateRangeISO({ to, from }));

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <Filters />
      <div className="grid grid-cols-2 gap-8 pb-2 mb-8">
        <DataCard
          dateRange={dateRangeLabel}
          variant={"success"}
          icon={FaPiggyBank}
          percentageChange={data?.remainingChange}
          title="Renda dos serviços"
          value={data?.remainingAmount}
        />
        <DataCard
          dateRange={dateRangeLabel}
          variant={"default"}
          icon={FaArrowTrendUp}
          percentageChange={data?.incomeChange}
          title="Renda do mes"
          value={data?.incomeAmount}
        />
      </div>
    </div>
  );
};