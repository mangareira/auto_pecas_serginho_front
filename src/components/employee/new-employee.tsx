import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';


import { useNewEmployee } from '@/utils/hooks/employee/hooks/use-new-employee';
import { useCreateEmployee } from '@/utils/hooks/employee/api/useCreateEmployee';
import { EmployeeValues } from '@/utils/schemas/employee-dto';
import { EmployeeForm } from './employee-form';
import { convertAmountToMiliunitis } from '@/lib/utils';

export const NewEmployeeSheet = () => {
  const { isOpen, onClose } = useNewEmployee();

  const { mutate, isPending } = useCreateEmployee();

  const onSubmit = (values: EmployeeValues) => {
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
          <SheetTitle>Novo Colaborador</SheetTitle>
          <SheetDescription>
            Crie um novo colaborador para adcionalos ao serviços ou fazer o controle de pessoal.
          </SheetDescription>
        </SheetHeader>
        <EmployeeForm
          defaultValues={{
            name: '',
            phone: '',
            id: '',
            value: ''
          }}
          disable={isPending}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
};