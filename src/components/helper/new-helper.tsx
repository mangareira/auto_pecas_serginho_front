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
import { convertAmountToMiliunitis } from '@/lib/utils';



export const NewHelperSheet = () => {
  const { isOpen, onClose } = useNewHelper();

  const { mutate, isPending } = useCreateHelper();

  const onSubmit = (values: HelperValues) => {
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
            value: ''
          }}
          disable={isPending}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
};