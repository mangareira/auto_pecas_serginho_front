import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProps } from '@/utils/interfaces/form-props';
import { MaskedInput } from '../ui/masked-input';
import { helperValues, HelperValues } from '@/utils/schemas/helper-dto';
import { AmountInput } from '../amount-input';

export const HelperForm = ({
  onSubmit,
  defaultValues,
  disable,
  id,
  onDelete,
}: FormProps<HelperValues>) => {
  const form = useForm<HelperValues>({
    resolver: zodResolver(helperValues),
    defaultValues: defaultValues,
  });
  const handleSubmit = (values: HelperValues) => {
    const cleanedValues = {
      ...values,
      phone: values.phone.replace(/\D/g, ''),
    };
    
    onSubmit(cleanedValues);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4 pt-4 px-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  disabled={disable}
                  placeholder="Nome do Colaborador"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <MaskedInput
                  mask='(00) 00000-0000'
                  field={field}
                  placeholder="(99) 99999-9999"
                  disabled={disable}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor do Serviço</FormLabel>
              <FormControl>
                <AmountInput disable={disable} placeholder='0.00' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disable}>
          {id ? 'Salvar mudanças' : 'Criar conta'}
        </Button>
        {!!id && (
          <Button
            className="w-full"
            disabled={disable}
            type="button"
            variant="outline"
            onClick={handleDelete}
          >
            <Trash className="size-4 mr-2" />
            Deletar Ajudante
          </Button>
        )}
      </form>
    </Form>
  );
};