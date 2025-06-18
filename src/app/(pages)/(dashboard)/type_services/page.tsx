'use client';
import { Loader2, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataTable from '@/components/data-table';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTypeServices } from '@/utils/hooks/type-services/api/useGetTypeServices';
import { useNewTypeServices } from '@/utils/hooks/type-services/hooks/use-new-type-services';
import { useDeleteBulkTypeServices } from '@/utils/hooks/type-services/api/useDeleteBulkTypeServices';

export default function TypePage() {

  const { data, isLoading } = useGetTypeServices()

  const { onOpen } = useNewTypeServices()

  const { mutate } = useDeleteBulkTypeServices()


  const tableData = !isLoading && data ? data : []

  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 mt-6">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex justify-center items-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 mt-6">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex-row items-center justify-between">
          <CardTitle className="text-xl line-clamp-1">Tipos de Serviços</CardTitle>
          <Button size={'sm'} onClick={onOpen}>
            <Plus className="size-4 mr-2" />
            Adcionar
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={tableData}
            disabled={isLoading}
            filterkey="name"
            placeholder="nome"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              mutate(ids);
            }}
            title='Tem certeza ?'
            text='Você esta prestes a deletar alguns tipos de serviços'
          />
        </CardContent>
      </Card>
    </div>
  );
}