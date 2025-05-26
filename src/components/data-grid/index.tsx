'use client';

import { FaArrowTrendUp } from 'react-icons/fa6';
import { DataCard } from '../data-card';


export const DataGrid = () => {

  // if (isLoading) {
  //   return (
  //     <div className="grid grid-cols-1 gap-8 pb-2 mb-8">
  //       <DataCardLoading />
  //     </div>
  //   );
  // }

  return (
    <div className="grid grid-cols-1 gap-8 pb-2 mb-8">
      <DataCard
        icon={FaArrowTrendUp}
        percentageChange={10000}
        title="Renda dos serviços"
        value={10000}
      />
    </div>
  );
};