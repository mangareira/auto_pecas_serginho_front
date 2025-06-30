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
import { typeServicesSchema, TypeServicesValue } from '@/utils/schemas/type-services-dto';
import { AmountInput } from '../amount-input';

export const TypeServiceForm = ({
  onSubmit,
  defaultValues,
  disable,
  id,
  onDelete,
}: FormProps<TypeServicesValue>) => {
  const form = useForm<TypeServicesValue>({
    resolver: zodResolver(typeServicesSchema),
    defaultValues: defaultValues,
  });
  const handleSubmit = (values: TypeServicesValue) => {
    onSubmit(values);
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
                  placeholder="Nome do tipo de serviço"
                  {...field}
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
              <FormLabel>Valor</FormLabel>
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
            Deletar Tipo de Serviço
          </Button>
        )}
      </form>
    </Form>
  );
};