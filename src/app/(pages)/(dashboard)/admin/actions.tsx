'use client';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useOpenAdmin } from '@/utils/hooks/admin/hooks/use-ope-admin';

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenAdmin();
  // const deleteAccount = useDeleteAccount(id);

  // const onDelete = async () => {
  //   const ok = await confirm();

  //   if (ok) {
  //     deleteAccount.mutate();
  //   }
  // };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8 p-0" variant="ghost">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            // disabled={deleteAccount.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            // disabled={deleteAccount.isPending}
            // onClick={onDelete}
          >
            <Trash className="size-4 mr-2" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};