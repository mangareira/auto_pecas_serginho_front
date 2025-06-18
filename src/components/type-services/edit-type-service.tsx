import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { Loader2 } from 'lucide-react';
import { useConfirm } from '@/utils/hooks/useConfirm';
import { useOpenTypeServices } from '@/utils/hooks/type-services/hooks/use-open-type-services';
import { useDeleteTypeServices } from '@/utils/hooks/type-services/api/useDeleteTypeServices';
import { useGetTypeService } from '@/utils/hooks/type-services/api/useGetTypeService';
import { useEditTypeServices } from '@/utils/hooks/type-services/api/useEditTypeServices';
import { TypeServicesValue } from '@/utils/schemas/type-services-dto';
import { TypeServiceForm } from './type-service-form';
import { convertAmountFromMiliunitis, convertAmountToMiliunitis } from '@/lib/utils';

export const EditTypeServiceSheet = () => {
  const { isOpen, onClose, id } = useOpenTypeServices();
  const [ConfirmDialog, confirm] = useConfirm(
    'Você tem certeza ?',
    'Você esta prestes a deletar um tipo de serviço'
  );

  const {mutate: mutateDelete} = useDeleteTypeServices(id)

  const { data, isLoading, isPending } = useGetTypeService(id)

  const { mutate, isPending: isPendingEdit } = useEditTypeServices(id)

  const onSubmit = (values: TypeServicesValue) => {
    mutate({...values,
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

  const defaultValues = data
    ? {
      id: data.id,
      name: data.name,
      value: convertAmountFromMiliunitis(Number(data.value))
    }
    : {
        id: '',
        name: '',
        value: 0,
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 ">
          <SheetHeader>
            <SheetTitle>Editar um Tipo de Serviço</SheetTitle>
            <SheetDescription>Edite um Tipo de Serviço existente</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TypeServiceForm
              defaultValues={defaultValues}
              disable={isPending && isPendingEdit}
              id={id}
              onDelete={onDelete}
              onSubmit={onSubmit}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};