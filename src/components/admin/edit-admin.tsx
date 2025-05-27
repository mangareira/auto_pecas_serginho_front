import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';


import { AdminFormValues } from '@/utils/schemas/new-admin-dto';
import { AdminForm } from './admin-form';
import { useOpenAdmin } from '@/utils/hooks/admin/hooks/use-ope-admin';
import { useGetAdmin } from '@/utils/hooks/admin/api/useGetAdmin';
import { Loader2 } from 'lucide-react';

export const EditAdminSheet = () => {
  const { isOpen, onClose, id } = useOpenAdmin();

  const { data, isLoading, isPending } = useGetAdmin(id)

  const onSubmit = (values: AdminFormValues) => {
    // mutate(values, {
    //   onSuccess: () => {
    //     onClose();
    //   },
    // });
  };
  const defaultValues = data
    ? {
        name: data.name,
        email: data.email,
        password: data.password
      }
    : {
        name: '',
        email: '',
        password: '',
      };

  return (
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
            disable={isPending}
            id={id}
            // onDelete={onDelete}
            onSubmit={onSubmit}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};