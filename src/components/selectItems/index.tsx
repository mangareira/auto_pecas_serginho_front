'use client';

import { useMemo, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SelectItemsOption, SelectitemsProps } from '@/utils/interfaces/select-items-props';

export const Selectitems = ({
  onChange,
  disable,
  onCreate,
  options = [],
  placeholder,
  value,
  isMulti = false,
}: SelectitemsProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (
    newValue: MultiValue<SelectItemsOption> | SingleValue<SelectItemsOption>,
  ) => {
    if (isMulti) {
      const values = (newValue as MultiValue<SelectItemsOption>).map(item => item.value);
      onChange(values);
    } else {
      const singleValue = newValue as SingleValue<SelectItemsOption>;
      onChange(singleValue?.value || null);
    }
  };

  const handleCreate = () => {
    if (inputValue.trim() && onCreate) {
      onCreate(inputValue);
      setInputValue('');
    }
  };

  const formattedValue = useMemo(() => {
    if (isMulti && Array.isArray(value)) {
      return options.filter(option => value.includes(option.value));
    } else if (isMulti) {
      return [];
    }
    return options.find(option => option.value === value) || null;
  }, [options, value, isMulti]);

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <CreatableSelect<SelectItemsOption, boolean>
          className="text-sm"
          isDisabled={disable}
          options={options}
          placeholder={placeholder}
          value={formattedValue}
          onChange={handleChange}
          onCreateOption={onCreate}
          isMulti={isMulti}
          onInputChange={setInputValue}
          inputValue={inputValue}
          styles={{
            control: (base) => ({
              ...base,
              borderColor: '#e2e8f0',
              minHeight: '40px',
              ':hover': {
                borderColor: '#e2e8f0',
              },
            }),
          }}
        />
      </div>
      {isMulti && onCreate && (
        <Button
          type="button"
          size="icon"
          onClick={handleCreate}
          disabled={disable || !inputValue.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};