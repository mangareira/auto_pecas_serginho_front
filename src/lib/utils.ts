import { Period } from '@/utils/interfaces/format-period-props';
import { type ClassValue, clsx } from 'clsx';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountFromMiliunitis(amount: number) {
  return amount / 1000;
}

export function convertAmountToMiliunitis(amount: string) {
    const cleanValue = amount
    .replace(/\./g, '') 
    .replace(',', '.');     
  
  const amountConverted = parseFloat(cleanValue);

  return Math.round(amountConverted * 1000)
}

export function formatCurrency(value: number) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatDateRange(period?: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    return `${format(defaultFrom, 'LLL dd', { locale: ptBR })} - ${format(defaultTo, 'LLL dd, y', { locale: ptBR })}`;
  }

  if (period.to) {
    return `${format(period.from, 'LLL dd', { locale: ptBR })} - ${format(period.to, 'LLL dd, y', { locale: ptBR })}`;
  }

  return format(period.from, 'LLL dd, y', { locale: ptBR });
}

export function dateRangeISO(period?: Period) {
  if(period?.from && period.to) {
    const newDateFrom = `${new Date(String(period?.from)).toISOString().split('T')[0]}${
      Number(new Date(String(period?.from)).toISOString().split('T')[1].split(':')[0]) < 10
        ? 'T0'
        : 'T'
    }${
      Number(new Date(String(period?.from)).toISOString().split('T')[1].split(':')[0]) + 1
    }:${new Date(String(period?.from)).toISOString().split('T')[1].split(':')[1]}`;
  
    const newDateTo = `${new Date(String(period?.to)).toISOString().split('T')[0]}${
      Number(new Date(String(period?.to)).toISOString().split('T')[1].split(':')[0]) < 10
        ? 'T0'
        : 'T'
    }${
      Number(new Date(String(period?.to)).toISOString().split('T')[1].split(':')[0]) + 1
    }:${new Date(String(period?.to)).toISOString().split('T')[1].split(':')[1]}`;
    
    return {
      from: new Date(newDateFrom),
      to: new Date(newDateTo)
    }
  }
}

export function calculcatePercentageChange(current: number, previous: number) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
}
export function formatPercentage(
  value: number,
  options: { addPrefix?: boolean } = { addPrefix: false }
) {
  const result = new Intl.NumberFormat('pt-BR', {
    style: 'percent',
  }).format(value / 100);

  if (options.addPrefix && value > 0) {
    return `+${result}`;
  }

  return result;
}

export const formatPhoneNumber = (phone: string) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
  }
  if (cleaned.length === 10) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
  }
  return phone;
};