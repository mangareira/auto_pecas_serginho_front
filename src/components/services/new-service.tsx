import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ServiceForm } from './service-form';
import { ServicesValue } from '@/utils/schemas/services-dto';
import { useCreateServices } from '@/utils/hooks/services/api/useCreateServices';
import { useNewServices } from '@/utils/hooks/services/hooks/use-new-services';
import { useGetEmployees } from '@/utils/hooks/employee/api/useGetEmployees';
import { useGetHelpers } from '@/utils/hooks/helper/api/useGetHelpers';
import { useGetTypeServices } from '@/utils/hooks/type-services/api/useGetTypeServices';
import { convertAmountFromMiliunitis, convertAmountToMiliunitis } from '@/lib/utils';
import { useGetItems } from '@/utils/hooks/items/api/useGetItems';


export const NewServiceSheet = () => {
  const { isOpen, onClose } = useNewServices();

  const { mutate, isPending } = useCreateServices();

  const { data: dataEmployee, isLoading: isLoadingEmployee } = useGetEmployees()
  const { data: dataHelper, isLoading: isLoadingHelper } = useGetHelpers()
  const { data: dataTypeServices, isLoading: isLoadingTypeServices } = useGetTypeServices()
  const { data: dataItems, isLoading: isLoadingItems } = useGetItems()

  const onSubmit = (values: ServicesValue) => {
    
    mutate({
      ...values,
      value: convertAmountToMiliunitis(String(values.value))
    }, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const employeeOptions = (dataEmployee ?? []).map((employee) => ({
    label: employee.name,
    value: employee.id,
    cost: convertAmountFromMiliunitis(Number(employee.value)),
  }));

  const helperOptions = (dataHelper ?? []).map((helper) => ({
    label: helper.name,
    value: helper.id,
    cost: convertAmountFromMiliunitis(Number(helper.value)),
  }));

  const typeServiceOptions = (dataTypeServices ?? []).map((type_services) => ({
    label: type_services.name,
    value: type_services.id,
    cost: convertAmountFromMiliunitis(Number(type_services.value)),
  }));

  const itemsOptions = (dataItems ?? []).map((items) => ({
    label: items.name,
    value: items.id,
    cost: convertAmountFromMiliunitis(Number(items.value)),
  }));

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Novo Serviço</SheetTitle>
          <SheetDescription>
            Crie um novo serviço
          </SheetDescription>
        </SheetHeader>
        <ServiceForm
          defaultValues={{
            id: '',
            client: '',
            date: new Date(),
            employees: {
              id: '',
              name: '',
              phone: '',
              value: 0
            },
            helpers:  {
              id: '',
              name: '',
              phone: '',
              value: 0
            },
            type_services: [],
            diagnoses: '',
            enterprise: false,
            particular: true,
            phone: '',
            plate: '',
            vehicle: '',
            value: '',
            items: [],
          }}
          disable={
            isPending &&  
            isLoadingEmployee && 
            isLoadingTypeServices &&
            isLoadingHelper &&
            isLoadingItems
          }
          onSubmit={onSubmit}
          itemsOptions={itemsOptions}
          employeeOptions={employeeOptions}
          helperOptions={helperOptions}
          typeServicesOptions={typeServiceOptions}
        />
      </SheetContent>
    </Sheet>
  );
};