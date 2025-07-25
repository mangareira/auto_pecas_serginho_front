import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';


import { convertAmountToMiliunitis } from '@/lib/utils';
import { useCreateItem } from '@/utils/hooks/items/api/useCreateItem';
import { useNewItems } from '@/utils/hooks/items/hooks/use-new-items';
import { ItemValue } from '@/utils/schemas/items-dto';
import { ItemForm } from './item-form';

export const NewItemSheet = () => {
  const { isOpen, onClose } = useNewItems();

  const { mutate, isPending } = useCreateItem();

  const onSubmit = (values: ItemValue) => {
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
        <ItemForm
          defaultValues={{
            name: '',
            value: '',
            description: '',
            id: ''
          }}
          disable={isPending}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
};