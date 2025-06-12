
import { useCallback, useEffect } from 'react';
import { useIMask } from 'react-imask';
import type { InputMaskElement } from 'imask';
import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

import { Input } from '@/components/ui/input';

interface MaskedInputProps<TFieldValues extends FieldValues> 
  extends React.ComponentProps<'input'> {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  mask: string;
}

export function MaskedInput<I extends FieldValues>({ field, mask ,...props }: MaskedInputProps<I>) {
  const { ref: maskRef, setValue } = useIMask(
    {
      mask,
    },
     
    { onAccept: (value: string) => field.onChange(value) }
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