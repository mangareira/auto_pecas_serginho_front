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
import { useEffect } from 'react';
import { TotalValueDisplay } from '../total-value';
import { cn } from '@/lib/utils';
import { Selectitems } from '../selectItems';

export const ServiceForm = ({
  onSubmit,
  defaultValues,
  disable,
  id,
  onDelete,
  employeeOptions,
  helperOptions,
  typeServicesOptions,
  itemsOptions
}: FormProps<ServicesValue, ServiceFormProps>) => {
  const form = useForm<ServicesValue>({
    resolver: zodResolver(servicesSchema),
    defaultValues: {
      ...defaultValues,
      clientType: defaultValues?.particular ? 'particular' : 'entreprise',
      enterprise_name: defaultValues?.enterprise_name || '',
    },
  });

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      
      if (form.watch('type_services')) {
        form.watch('type_services').forEach(serviceId => {
          const service = typeServicesOptions.find(s => s.value === serviceId);
          if (service) total += Number(service.cost) || 0;
        });
      }

      const employeeId = form.watch('employeesId');
      if (employeeId) {
        const employee = employeeOptions.find(e => e.value === employeeId);
        if (employee) total += Number(employee.cost) || 0;
      }

      const helperId = form.watch('helpersId');
      if (helperId) {
        const helper = helperOptions.find(h => h.value === helperId);
        if (helper) total += Number(helper.cost) || 0;
      }

      const items = form.watch('items')
      if(items) {
        items.forEach(itemId => {
          const item = itemsOptions.find(i => i.value === itemId)
          if(item) total += Number(item.cost) || 0
        })
      }

      form.setValue('value', total);
    };

    const subscription = form.watch((value, { name }) => {
      if (name === 'type_services' || 
          name === 'employeesId' || 
          name === 'helpersId' || 
          name === 'items'
        ) {
        calculateTotal();
      }
    });

    calculateTotal();

    return () => subscription.unsubscribe();
  }, [employeeOptions, helperOptions, typeServicesOptions, form, itemsOptions]);


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
          name="items"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Itens</FormLabel>
              <FormControl>
                <Selectitems 
                  disable={disable}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Adcione algum item'
                  options={itemsOptions}
                  isMulti={true}
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
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TotalValueDisplay 
                  value={field.value || '0'} 
                  className={cn(
                    "transition-all duration-300",
                    Number(form.watch('value')) > 0 ? "bg-green-100/50 border-green-300" : ""
                  )}
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