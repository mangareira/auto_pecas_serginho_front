'use client';
import { Loader2, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataTable from '@/components/data-table';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { useDeleteBulkServices } from '@/utils/hooks/services/api/useDeleteBulkServices';
import { useNewServices } from '@/utils/hooks/services/hooks/use-new-services';
import { useGetServices } from '@/utils/hooks/services/api/useGetServices';
import { formatPhoneNumber } from '@/lib/utils';

export default function TypePage() {

  const { data, isLoading } = useGetServices()

  const { onOpen } = useNewServices()

  const { mutate } = useDeleteBulkServices()


  const tableData = !isLoading && data ? data.map((v) => {
    return {
      ...v,
      phone: formatPhoneNumber(v.phone)
    }
  }): []

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
          <CardTitle className="text-xl line-clamp-1">Serviços</CardTitle>
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
            filterkey="client"
            placeholder="cliente"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              mutate(ids);
            }}
            title='Tem certeza ?'
            text='Você esta prestes a deletar alguns serviços'
          />
        </CardContent>
      </Card>
    </div>
  );
}