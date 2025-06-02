import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';


import { useNewAdmin } from '@/utils/hooks/admin/hooks/use-new-admin';
import { AdminFormValues } from '@/utils/schemas/new-admin-dto';
import { AdminForm } from './admin-form';
import { useCreateAdmin } from '@/utils/hooks/admin/api/useCreateAdmin';

export const NewAdminSheet = () => {
  const { isOpen, onClose } = useNewAdmin();

  const { mutate, isPending } = useCreateAdmin();

  const onSubmit = (values: AdminFormValues) => {
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 ">
        <SheetHeader>
          <SheetTitle>Novo Administrador</SheetTitle>
          <SheetDescription>
            Crie um novo administrador para fazer a criação dos serviços ou ministra-los.
          </SheetDescription>
        </SheetHeader>
        <AdminForm
          defaultValues={{
            name: '',
            email:'',
            password: ""
          }}
          disable={isPending}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
};