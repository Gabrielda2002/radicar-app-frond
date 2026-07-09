import type { ReactNode } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Card } from '@dash/components/ui/card';

interface QueryStateProps {
  isLoading: boolean;
  /** True cuando hay refetch en curso pero ya hay data previa visible (con keepPreviousData). */
  isFetching?: boolean;
  isError: boolean;
  error?: unknown;
  /** Mensaje cuando no hay datos */
  empty?: boolean;
  emptyMessage?: string;
  children: ReactNode;
}

/**
 * Renderiza placeholder mientras una query carga inicialmente o falla.
 * Si isFetching=true pero ya hay children (data previa), muestra una banda
 * "Actualizando..." en la parte superior sin esconder el contenido.
 */
export function QueryState({
  isLoading,
  isFetching,
  isError,
  error,
  empty,
  emptyMessage,
  children,
}: QueryStateProps) {
  if (isLoading) {
    return (
      <Card className="flex h-40 items-center justify-center gap-2 text-on-surface-variant">
        <Loader2 className="h-5 w-5 animate-spin" />
        Cargando datos...
      </Card>
    );
  }
  if (isError) {
    return (
      <Card className="flex h-40 flex-col items-center justify-center gap-2 text-normative-red">
        <AlertTriangle className="h-6 w-6" />
        <p className="text-body-md font-bold">Error al cargar datos</p>
        {error instanceof Error && (
          <p className="text-label-md text-on-surface-variant">{error.message}</p>
        )}
      </Card>
    );
  }
  if (empty) {
    return (
      <Card className="flex h-40 items-center justify-center text-on-surface-variant">
        {emptyMessage ?? 'Sin datos en el periodo seleccionado'}
      </Card>
    );
  }
  return (
    <div className="relative space-y-gutter">
      {isFetching && (
        <div className="pointer-events-none fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-full bg-corporate-navy/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-card backdrop-blur-sm">
          <Loader2 className="mr-2 inline h-3 w-3 animate-spin" />
          Actualizando...
        </div>
      )}
      {children}
    </div>
  );
}
