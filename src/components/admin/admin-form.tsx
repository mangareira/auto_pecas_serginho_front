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
import { adminFormSchema, AdminFormValues } from '@/utils/schemas/new-admin-dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProps } from '@/utils/interfaces/form-props';

export const AdminForm = ({
  onSubmit,
  defaultValues,
  disable,
  id,
  onDelete,
}: FormProps<AdminFormValues>) => {
  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: defaultValues,
  });
  const handleSubmit = (values: AdminFormValues) => {
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
                  placeholder="Nome do administrativo"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={disable}
                  placeholder="exemple@gmail.com"
                  type='email'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  disabled={disable}
                  placeholder="••••••••"
                  type='password'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disable}>
          {id ? 'Salvar mudanças' : 'Criar admininstrador'}
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
            Deletar administrador
          </Button>
        )}
      </form>
    </Form>
  );
};