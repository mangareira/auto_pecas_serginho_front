import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { AdminForm } from './admin-form';
import { useOpenAdmin } from '@/utils/hooks/admin/hooks/use-open-admin';
import { useGetAdmin } from '@/utils/hooks/admin/api/useGetAdmin';
import { Loader2 } from 'lucide-react';
import { useEditAdmin } from '@/utils/hooks/admin/api/useEditAdmin';
import { AdminValues } from '@/utils/schemas/new-admin-dto';
import { useConfirm } from '@/utils/hooks/useConfirm';
import { useDeleteAdmin } from '@/utils/hooks/admin/api/useDeleteAdmin';

export const EditAdminSheet = () => {
  const { isOpen, onClose, id } = useOpenAdmin();
  const [ConfirmDialog, confirm] = useConfirm(
    'Você tem certeza ?',
    'Você esta prestes a deletar uma administrador'
  );

  const {mutate: mutateDelete} = useDeleteAdmin(id)

  const { data, isLoading, isPending } = useGetAdmin(id)

  const { mutate, isPending: isPendingEdit } = useEditAdmin(id)

  const onSubmit = (values: AdminValues) => {
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
    ? data
    : {
        name: '',
        email: '',
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 ">
          <SheetHeader>
            <SheetTitle>Editar Administrativo</SheetTitle>
            <SheetDescription>Edite um administrativo existente</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <AdminForm
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