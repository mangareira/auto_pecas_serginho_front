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


export const NewServiceSheet = () => {
  const { isOpen, onClose } = useNewServices();

  const { mutate, isPending } = useCreateServices();

  const { data: dataEmployee, isLoading: isLoadingEmployee } = useGetEmployees()
  const { data: dataHelper, isLoading: isLoadingHelper } = useGetHelpers()
  const { data: dataTypeServices, isLoading: isLoadingTypeServices } = useGetTypeServices()

  const onSubmit = (values: ServicesValue) => {
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const employeeOptions = (dataEmployee ?? []).map((employee) => ({
    label: employee.name,
    value: employee.id,
  }));

  const helperOptions = (dataHelper ?? []).map((helper) => ({
    label: helper.name,
    value: helper.id,
  }));

  const typeServiceOptions = (dataTypeServices ?? []).map((type_services) => ({
    label: type_services.name,
    value: type_services.id,
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
            employees: '',
            helpers: '',
            type_services: [],
            diagnoses: '',
            enterprise: false,
            particular: true,
            phone: '',
            plate: '',
            vehicle: '',
          }}
          disable={
            isPending &&  
            isLoadingEmployee && 
            isLoadingTypeServices &&
            isLoadingHelper
          }
          onSubmit={onSubmit}
          employeeOptions={employeeOptions}
          helperOptions={helperOptions}
          typeServicesOptions={typeServiceOptions}
        />
      </SheetContent>
    </Sheet>
  );
};