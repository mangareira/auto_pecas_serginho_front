import { ReactNode } from 'react';

export interface SelectItemsOption {
  readonly label: ReactNode;
  readonly value: string;
  readonly cost?: number | string;
}

export interface SelectitemsProps {
  onChange: (value?: string | string[] | null) => void;
  disable?: boolean;
  onCreate?: (inputValue: string) => void;
  options?: SelectItemsOption[];
  placeholder?: string;
  value?: string | string[] | null;
  isMulti?: boolean;
}