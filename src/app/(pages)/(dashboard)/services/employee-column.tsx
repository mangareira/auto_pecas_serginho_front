import { TriangleAlert } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useOpenEmployee } from '@/utils/hooks/employee/hooks/use-open-employee';
import { useOpenServices } from '@/utils/hooks/services/hooks/use-open-type-services';
import { EmployeeColumnsProps } from '@/utils/interfaces/employee-column-props';
import { useGetEmployee } from '@/utils/hooks/employee/api/useGetEmployee';

export const EmployeeColumn = ({
  id,
  employeeId,
}: EmployeeColumnsProps) => {

  const { onOpen: onOpenEmployee } = useOpenEmployee();
  const { onOpen: onOpenService } = useOpenServices();

  const { data } = useGetEmployee(employeeId)

  const onClick = () => {
    if (employeeId) {
      onOpenEmployee(employeeId);
    } else {
      onOpenService(id);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center cursor-pointer hover:underline',
        !data?.name && 'text-rose-500'
      )}
      onClick={onClick}
    >
      {!data?.name && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {data?.name || 'Sem Colaborador'}
    </div>
  );
};