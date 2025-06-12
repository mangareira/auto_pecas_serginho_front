import { Loader2 } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { HelperForm } from './helper-form';
import { useConfirm } from '@/utils/hooks/useConfirm';
import { HelperValues } from '@/utils/schemas/helper-dto';
import { useDeleteHelper } from '@/utils/hooks/helper/api/useDeleteHelper';
import { useGetHelper } from '@/utils/hooks/helper/api/useGetHelper';
import { useEditHelper } from '@/utils/hooks/helper/api/useEditHelper';
import { useOpenHelper } from '@/utils/hooks/helper/hooks/use-open-helper';

export const EditHelperSheet = () => {
  const {id, onClose, isOpen} = useOpenHelper()
  
  const [ConfirmDialog, confirm] = useConfirm(
    'Você tem certeza ?',
    'Você esta prestes a deletar um ajudante'
  );

  const {mutate: mutateDelete} = useDeleteHelper(id)
  
  const { data, isLoading, isPending } = useGetHelper(id)
  
  const { mutate, isPending: isPendingEdit } = useEditHelper(id)

  const onSubmit = (values: HelperValues) => {
    mutate(values, {
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
      phone: data.phone
    }
    : {
        id: '',
        name: '',
        phone: '',
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 ">
          <SheetHeader>
            <SheetTitle>Editar um Ajudante</SheetTitle>
            <SheetDescription>Edite um Ajudante existente</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <HelperForm
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