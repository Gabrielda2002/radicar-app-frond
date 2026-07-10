import { type ReactNode } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  /** Indica si la tabla es de "alertas" (header con tinte error) */
  alertHeader?: boolean;
  emptyState?: ReactNode;
  className?: string;
}

/**
 * DataTable: tabla generica sobre TanStack Table. Sin paginacion para
 * mantener el componente liviano; los dashboards renderizan top-N
 * acotados desde el backend.
 */
export function DataTable<T>({
  data,
  columns,
  alertHeader = false,
  emptyState,
  className,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
        {emptyState ?? 'Sin datos para mostrar'}
      </div>
    );
  }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse text-left">
        <thead
          className={cn(
            'text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400',
            alertHeader ? 'bg-red-50 dark:bg-red-950' : 'bg-gray-50 dark:bg-gray-800',
          )}
        >
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    className={cn(
                      'px-6 py-4 font-semibold',
                      canSort && 'cursor-pointer select-none',
                    )}
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <div className="inline-flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {sorted === 'asc' && <ChevronUp className="h-3 w-3" />}
                      {sorted === 'desc' && <ChevronDown className="h-3 w-3" />}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
