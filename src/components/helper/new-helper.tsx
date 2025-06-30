import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { HelperForm } from './helper-form';
import { HelperValues } from '@/utils/schemas/helper-dto';
import { useNewHelper } from '@/utils/hooks/helper/hooks/use-new-helper';
import { useCreateHelper } from '@/utils/hooks/helper/api/useCreateHelper';



export const NewHelperSheet = () => {
  const { isOpen, onClose } = useNewHelper();

  const { mutate, isPending } = useCreateHelper();

  const onSubmit = (values: HelperValues) => {
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
          <SheetTitle>Novo Ajudante</SheetTitle>
          <SheetDescription>
            Crie um novo ajudante para adciona-los ao serviços.
          </SheetDescription>
        </SheetHeader>
        <HelperForm
          defaultValues={{
            id: '',
            name: '',
            phone: '',
          }}
          disable={isPending}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
};