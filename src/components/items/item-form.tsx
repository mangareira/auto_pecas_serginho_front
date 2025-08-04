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
import { AmountInput } from '../amount-input';
import { itemSchema, ItemValue } from '@/utils/schemas/items-dto';

export const ItemForm = ({
  onSubmit,
  defaultValues,
  disable,
  id,
  onDelete,
}: FormProps<ItemValue>) => {
  const form = useForm<ItemValue>({
    resolver: zodResolver(itemSchema),
    defaultValues: defaultValues,
  });
  const handleSubmit = (values: ItemValue) => {
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
                  placeholder="Nome do item"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input
                  disabled={disable}
                  placeholder="Descrição do item"
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
          {id ? 'Salvar mudanças' : 'Criar item'}
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
            Deletar Item
          </Button>
        )}
      </form>
    </Form>
  );
};