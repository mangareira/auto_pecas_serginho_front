'use client';

import { useState } from 'react';

import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { DateRange } from 'react-day-picker';

import {dateRangeISO, formatDateRange } from '@/lib/utils';

import { Button } from './button';
import { Calendar } from './calendar';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from './popover';

export const DateFilter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();
  const from = params.get('from') || '';
  const to = params.get('to') || '';

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);


  const pushToUrl = (dateRange: DateRange | undefined) => {
    const query = {
      from: format(dateRange?.from || defaultFrom, 'yyyy-MM-dd', {
        locale: ptBR,
      }),
      to: format(dateRange?.to || defaultTo, 'yyyy-MM-dd', {
        locale: ptBR,
      }),
    };

    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };

  const onReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="lg:w-auto w-full h-9 rounded-md px-3 font-normal hover:bg-white/20 border focus:ring-offset-0 focus:ring-transparent outline-none focus:bg-white/30 transition"
          disabled={false}
          size={'sm'}
          variant={'outline'}
        >
          <span>{formatDateRange(dateRangeISO(paramState))}</span>
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="lg:w-auto w-full p-0">
        <Calendar
          autoFocus
          defaultMonth={date?.from}
          disabled={false}
          mode="range"
          numberOfMonths={2}
          selected={dateRangeISO(date)}
          onSelect={setDate}
        />
        <div className=" w-full p-4 flex items-center gap-x-2 justify-between">
          <PopoverClose asChild>
            <Button
              className='flex-1'
              disabled={!date?.from || !date.to}
              variant={'outline'}
              onClick={onReset}
            >
              Resetar
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              disabled={!date?.from || !date.to}
              onClick={() => pushToUrl(date)}
            >
              Confirmar
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};