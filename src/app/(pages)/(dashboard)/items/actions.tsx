'use client';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useConfirm } from '@/utils/hooks/useConfirm';
import { useOpenItems } from '@/utils/hooks/items/hooks/use-open-items';
import { useDeleteItem } from '@/utils/hooks/items/api/useDeleteItem';

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfimationDialog, confirm] = useConfirm(
    'Você tem certeza ?',
    'Você esta prestes a deletar um item'
  )
  
  const { onOpen } = useOpenItems();
  const { mutate, isPending } = useDeleteItem(id);

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