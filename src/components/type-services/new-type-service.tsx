import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';


import { TypeServiceForm } from './type-service-form';
import { useNewTypeServices } from '@/utils/hooks/type-services/hooks/use-new-type-services';
import { useCreateTypeServices } from '@/utils/hooks/type-services/api/useCreateTypeServices';
import { TypeServicesValue } from '@/utils/schemas/type-services-dto';
import { convertAmountToMiliunitis } from '@/lib/utils';

export const NewTypeServiceSheet = () => {
  const { isOpen, onClose } = useNewTypeServices();

  const { mutate, isPending } = useCreateTypeServices();

  const onSubmit = (values: TypeServicesValue) => {
    mutate({
        ...values, 
        value: convertAmountToMiliunitis(String(values.value))
    }, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 ">
        <SheetHeader>
          <SheetTitle>Novo Tipo de Serviço</SheetTitle>
          <SheetDescription>
            Crie um novo tipo de serviço para ser utilizado nos serviços
          </SheetDescription>
        </SheetHeader>
        <TypeServiceForm
          defaultValues={{
            name: '',
            value: '',
            id: ''
          }}
          disable={isPending}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
};