'use client';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { MdDesignServices } from 'react-icons/md'

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useConfirm } from '@/utils/hooks/useConfirm';
import { useOpenEmployee } from '@/utils/hooks/employee/hooks/use-open-employee';
import { useDeleteEMployee } from '@/utils/hooks/employee/api/useDeleteEmployee';

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfimationDialog, confirm] = useConfirm(
    'Você tem certeza ?',
    'Você esta prestes a deletar um colaborador'
  )
  
  const { onOpen } = useOpenEmployee();
  const { mutate, isPending } = useDeleteEMployee(id);

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      mutate();
    }
  };

  return (
    <>
      <ConfimationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8 p-0" variant="ghost">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            // onClick={() => onOpen(id)}
          >
            <MdDesignServices className="size-4 mr-2" />
            Serviços
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            onClick={onDelete}
          >
            <Trash className="size-4 mr-2" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};