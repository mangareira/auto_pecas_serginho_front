import { cn } from '@/lib/utils';

export const TotalValueDisplay = ({ 
  value,
  className 
}: { 
  value: number | string;
  className?: string;
}) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
  
  return (
    <div className={cn(
      "flex flex-col items-end p-4 rounded-lg bg-muted/50 border",
      className
    )}>
      <div className="text-sm text-muted-foreground">Valor Total</div>
      <div className="text-2xl font-bold tracking-tight">
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(numericValue)}
      </div>
    </div>
  );
};