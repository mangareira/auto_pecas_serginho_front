import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { Loader2 } from 'lucide-react';
import { useConfirm } from '@/utils/hooks/useConfirm';
import { useOpenEmployee } from '@/utils/hooks/employee/hooks/use-open-employee';
import { useDeleteEMployee } from '@/utils/hooks/employee/api/useDeleteEmployee';
import { useGetEmployee } from '@/utils/hooks/employee/api/useGetEmployee';
import { useEditEmployee } from '@/utils/hooks/employee/api/useEditEmployee';
import { EmployeeValues } from '@/utils/schemas/employee-dto';
import { EmployeeForm } from './employee-form';

export const EditEmployeeSheet = () => {
  const { isOpen, onClose, id } = useOpenEmployee();
  const [ConfirmDialog, confirm] = useConfirm(
    'Você tem certeza ?',
    'Você esta prestes a deletar um colaborador'
  );

  const {mutate: mutateDelete} = useDeleteEMployee(id)

  const { data, isLoading, isPending } = useGetEmployee(id)

  const { mutate, isPending: isPendingEdit } = useEditEmployee(id)

  const onSubmit = (values: EmployeeValues) => {
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
            <SheetTitle>Editar um Colaborador</SheetTitle>
            <SheetDescription>Edite um Colaborador existente</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <EmployeeForm
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