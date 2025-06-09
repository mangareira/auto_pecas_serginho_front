
import { useCallback, useEffect } from 'react';
import { useIMask } from 'react-imask';
import type { InputMaskElement } from 'imask';
import type { ControllerRenderProps } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { EmployeeValues } from '@/utils/schemas/employee-dto';

interface MaskedInputProps extends React.ComponentProps<'input'> {
  field: ControllerRenderProps<EmployeeValues, "phone">;
}

export function MaskedInput({ field, ...props }: MaskedInputProps) {
  const { ref: maskRef, setValue } = useIMask(
    {
      mask: '(00) 00000-0000',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { onAccept: (value: any) => field.onChange(value) }
  );

  useEffect(() => {
    setValue(field.value || '');
  }, [field.value, setValue]);

  const handleRef = useCallback(
    (node: HTMLInputElement | null) => {
      (field.ref as (instance: HTMLInputElement | null) => void)(node);
      (maskRef as React.MutableRefObject<InputMaskElement | null>).current = node;
    },
    [field.ref, maskRef]
  );

  return (
    <Input
      {...props}
      ref={handleRef}
      name={field.name}
      onBlur={field.onBlur}
      defaultValue={field.value}
    />
  );
}