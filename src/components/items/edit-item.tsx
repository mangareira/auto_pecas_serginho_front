import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { Loader2 } from 'lucide-react';
import { useConfirm } from '@/utils/hooks/useConfirm';
import { convertAmountFromMiliunitis, convertAmountToMiliunitis } from '@/lib/utils';
import { useOpenItems } from '@/utils/hooks/items/hooks/use-open-items';
import { useDeleteItem } from '@/utils/hooks/items/api/useDeleteItem';
import { useGetItem } from '@/utils/hooks/items/api/useGetItem';
import { useEditItem } from '@/utils/hooks/items/api/useEditItem';
import { ItemValue } from '@/utils/schemas/items-dto';
import { ItemForm } from './item-form';

export const EditItemSheet = () => {
  const { isOpen, onClose, id } = useOpenItems();
  const [ConfirmDialog, confirm] = useConfirm(
    'Você tem certeza ?',
    'Você esta prestes a deletar um item'
  );

  const {mutate: mutateDelete} = useDeleteItem(id)

  const { data, isLoading, isPending } = useGetItem(id)

  const { mutate, isPending: isPendingEdit } = useEditItem(id)

  const onSubmit = (values: ItemValue) => {
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
      description: data.description,
      value: convertAmountFromMiliunitis(Number(data.value))
    }
    : {
        id: '',
        name: '',
        description: '',
        value: 0,
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 ">
          <SheetHeader>
            <SheetTitle>Editar um Item</SheetTitle>
            <SheetDescription>Edite um Item existente</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <ItemForm
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