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
import { servicesSchema, ServicesValue } from '@/utils/schemas/services-dto';
import { DatePicker } from '../ui/date-picker';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { MaskedInput } from '../ui/masked-input';
import { Select } from '../select';
import { ServiceFormProps } from '@/utils/interfaces/service-form-props';
import { CheckBoxInput } from '../check-box-input';

export const ServiceForm = ({
  onSubmit,
  defaultValues,
  disable,
  id,
  onDelete,
  employeeOptions,
  helperOptions,
  typeServicesOptions,
}: FormProps<ServicesValue, ServiceFormProps>) => {
  const form = useForm<ServicesValue>({
    resolver: zodResolver(servicesSchema),
    defaultValues: {
      ...defaultValues,
      clientType: defaultValues?.particular ? 'particular' : 'entreprise',
      enterprise_name: defaultValues?.enterprise_name || '',
    },
  });
  const handleSubmit = (values: ServicesValue) => {
    onSubmit({
      ...values,
      particular: values.clientType === 'particular',
      enterprise: values.clientType === 'entreprise',
      phone: values.phone.replace(/\D/g, ''),
    });
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
          name="client"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <FormControl>
                <Input
                  disabled={disable}
                  placeholder="Nome do cliente"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker 
                  disable={disable} 
                  value={field.value} 
                  onChange={field.onChange} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Cliente</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="particular" />
                    </FormControl>
                    <FormLabel className="font-normal">Particular</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="entreprise" />
                    </FormControl>
                    <FormLabel className="font-normal">Empresa</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        {form.watch('clientType') === 'entreprise' && (
          <FormField
            control={form.control}
            name="enterprise_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Empresa</FormLabel>
                <FormControl>
                  <Input
                    disabled={disable}
                    placeholder="Nome da empresa"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <MaskedInput 
                  disabled={disable}
                  mask="(00) 00000-0000"
                  placeholder="(00) 00000-0000"
                  field={field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placa do veículo</FormLabel>
              <FormControl>
                <Input 
                  disabled={disable}
                  placeholder="Placa do veículo"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vehicle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Veículo</FormLabel>
              <FormControl>
                <Input
                  disabled={disable}
                  placeholder="Modelo do veículo"
                  {...field}
                />

              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="diagnoses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diagnóstico</FormLabel>
              <FormControl>
                <Input
                  disabled={disable}
                  placeholder="Descreva o diagnóstico"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employeesId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colaborador</FormLabel>
              <FormControl>
                <Select 
                  disable={disable}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Selecione um colaborador'
                  options={employeeOptions}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helpersId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ajudante</FormLabel>
              <FormControl>
                <Select 
                  disable={disable}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Selecione um Ajudante'
                  options={helperOptions}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type_services"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipos de Serviços</FormLabel>
              <FormControl>
                <CheckBoxInput 
                  field={field}
                  typeServiceOptions={typeServicesOptions}
                  disable={disable}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disable}>
          {id ? 'Salvar mudanças' : 'Criar Serviço'}
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
            Deletar Serviço
          </Button>
        )}
      </form>
    </Form>
  );
};