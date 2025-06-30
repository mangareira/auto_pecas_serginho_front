import { TriangleAlert } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useOpenServices } from '@/utils/hooks/services/hooks/use-open-type-services';
import { useOpenHelper } from '@/utils/hooks/helper/hooks/use-open-helper';
import { HelperColumnsProps } from '@/utils/interfaces/helper-column-props';
import { useGetHelper } from '@/utils/hooks/helper/api/useGetHelper';

export const HelperColumn = ({
  id,
  helpersId,
}: HelperColumnsProps) => {
  const { onOpen: onOpenHelper } = useOpenHelper();
  const { onOpen: onOpenService } = useOpenServices();

  const { data } = useGetHelper(helpersId);

  const onClick = () => {
    if (helpersId) {
      onOpenHelper(helpersId);
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
      {data?.name || 'Sem Ajudante'}
    </div>
  );
};