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
import { employeeValues, EmployeeValues } from '@/utils/schemas/employee-dto';
import { MaskedInput } from '../ui/masked-input';
import { AmountInput } from '../amount-input';

export const EmployeeForm = ({
  onSubmit,
  defaultValues,
  disable,
  id,
  onDelete,
}: FormProps<EmployeeValues>) => {
  const form = useForm<EmployeeValues>({
    resolver: zodResolver(employeeValues),
    defaultValues: defaultValues,
  });
  const handleSubmit = (values: EmployeeValues) => {
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
            Deletar colaborador
          </Button>
        )}
      </form>
    </Form>
  );
};