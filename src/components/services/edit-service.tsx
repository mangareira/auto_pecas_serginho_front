import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { Loader2 } from 'lucide-react';
import { useConfirm } from '@/utils/hooks/useConfirm';
import { ServiceForm } from './service-form';
import { ServicesValue } from '@/utils/schemas/services-dto';
import { useEditServices } from '@/utils/hooks/services/api/useEditServices';
import { useGetService } from '@/utils/hooks/services/api/useGetService';
import { useDeleteServices } from '@/utils/hooks/services/api/useDeleteServices';
import { useOpenServices } from '@/utils/hooks/services/hooks/use-open-type-services';
import { useGetEmployees } from '@/utils/hooks/employee/api/useGetEmployees';
import { useGetTypeServices } from '@/utils/hooks/type-services/api/useGetTypeServices';
import { useGetHelpers } from '@/utils/hooks/helper/api/useGetHelpers';
import { convertAmountFromMiliunitis, convertAmountToMiliunitis } from '@/lib/utils';

export const EditServiceSheet = () => {
  const { isOpen, onClose, id } = useOpenServices();
  const [ConfirmDialog, confirm] = useConfirm(
    'Você tem certeza ?',
    'Você esta prestes a deletar um tipo de serviço'
  );

  const {mutate: mutateDelete} = useDeleteServices(id)

  const { data, isLoading, isPending } = useGetService(id)
  const { data: dataEmployee, isLoading: isLoadingEmployee } = useGetEmployees()
  const { data: dataHelper, isLoading: isLoadingHelper } = useGetHelpers()
  const { data: dataTypeServices, isLoading: isLoadingTypeServices } = useGetTypeServices()

  const { mutate, isPending: isPendingEdit } = useEditServices(id)

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
  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      mutateDelete(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
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

  const defaultValues = data
    ? {
      ...data,
      type_services: data.type_services.map(service => service.id)
    }
    : {
        id: '',
        client: '',
        date: new Date(),
        employees: '',
        helpers: '',
        type_services: [],
        diagnoses: '',
        entreprise: false,
        particular: false,
        phone: '',
        plate: '',
        vehicle: '',
        value: '',
        };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Editar um Serviço</SheetTitle>
            <SheetDescription>Edite um Serviço existente</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <ServiceForm
              defaultValues={defaultValues}
              disable={
                  isPending && 
                  isPendingEdit && 
                  isLoadingEmployee && 
                  isLoadingTypeServices &&
                  isLoadingHelper
              }
              id={id}
              onDelete={onDelete}
              onSubmit={onSubmit}
              employeeOptions={employeeOptions}
              helperOptions={helperOptions}
              typeServicesOptions={typeServiceOptions}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};