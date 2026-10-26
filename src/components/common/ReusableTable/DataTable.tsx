import React, { ReactNode, useMemo } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { ColumnSize, COLUMN_WEIGHTS } from "@/components/common/ReusableTable/utils/tableLayouts";

export interface ColumnConfig<T> {
  key: string;
  header: string;
  /** 
   * Tamaño de la columna (xs, sm, md, lg, xl)
   * Se convierte automáticamente a porcentaje según el total de pesos
   */
  size?: ColumnSize;
  /** 
   * Peso personalizado para cálculo de ancho (alternativa a size)
   * Si se proporciona size, este se ignora
   */
  weight?: number;
  /** 
   * Ancho explícito en px/rem (tiene prioridad sobre size/weight)
   * Incluir unidad: "200px", "15rem", "30%"
   */
  width?: string;
  render?: (item: T) => ReactNode;
  /** Función para obtener el valor de la celda (si no se usa render) */
  accessor?: (item: T) => ReactNode;
  cellClassName?: string;
  headerClassName?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  /** Función para obtener la key única de cada fila */
  getRowKey: (item: T) => string | number;
  /** Contenido para la sección de acciones por fila (opcional) */
  renderActions?: (item: T) => ReactNode;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  /** Clases CSS adicionales para el contenedor */
  className?: string;
  /** Clases CSS adicionales para la tabla */
  tableClassName?: string;
  showMobileCards?: boolean;
  renderMobileCard?: (item: T) => ReactNode;
  isRowExpanded?: (item: T) => boolean;
  renderExpandedRow?: (item: T) => ReactNode;
}
export function DataTable<T>({
  data,
  columns,
  getRowKey,
  renderActions,
  loading = false,
  error,
  emptyMessage = "No se encontraron resultados para la búsqueda.",
  className = "",
  tableClassName = "",
  showMobileCards = true,
  renderMobileCard,
  isRowExpanded,
  renderExpandedRow,
}: DataTableProps<T>) {
  // Calcular widths automáticamente basado en size/weight (antes de cualquier early return)
  const calculateColumnWidths = useMemo(() => {
    return columns.map((column) => {
      if (column.width) {
        return column.width;
      }

      // Si no tiene size ni weight, usar default
      let weight = column.weight;
      if (!weight && column.size) {
        weight = COLUMN_WEIGHTS[column.size];
      }
      if (!weight) {
        weight = 1; // default
      }

      // Calcular el total de pesos
      const totalWeights = columns.reduce((sum, col) => {
        if (col.width) return sum; // Ignorar los que tienen width explícito
        let w = col.weight;
        if (!w && col.size) {
          w = COLUMN_WEIGHTS[col.size];
        }
        return sum + (w || 1);
      }, 0);

      // Calcular porcentaje dejando 1 numero despues de la coma
      return `${((weight / totalWeights) * 100).toFixed(1)}%`;
    });
  }, [columns]);

  // Loading state
  if (loading) {
    return <LoadingSpinner duration={100000} />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-300">
        {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-red-500 dark:text-red-300">
        {emptyMessage}
      </div>
    );
  }

  // Renderizar valor de celda
  const renderCellValue = (column: ColumnConfig<T>, item: T) => {
    if (column.render) {
      return column.render(item);
    }
    if (column.accessor) {
      return column.accessor(item);
    }
    return null;
  };

  return (
    <>
      {/* Vista Desktop - Tabla */}
      <div className={`hidden overflow-x-auto md:flex ${className}`}>
        <table
          className={`w-full text-sm rounded-lg shadow-lg ${tableClassName}`}
          style={{ tableLayout: "fixed" }}
        >
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`${column.headerClassName || ""} overflow-hidden text-ellipsis`}
                  style={{ width: calculateColumnWidths[index] }}
                >
                  {column.header}
                </th>
              ))}
              {renderActions && <th className="w-24">Acciones</th>}
            </tr>
          </thead>

          <tbody className="text-xs text-center bg-white dark:bg-gray-800 dark:text-gray-200">
            {data.map((item, index) => {
              const rowKey = getRowKey(item);
              const isExpanded = isRowExpanded ? isRowExpanded(item) : false;
              const totalColSpan = columns.length + (renderActions ? 1 : 0);

              return (
                <React.Fragment key={`${String(rowKey)}-${index}`}>
                  <tr
                    className={`transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                      isExpanded ? "bg-slate-50 dark:bg-gray-750" : ""
                    }`}
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={`${rowKey}-${column.key}`}
                        className={`p-3 border-b dark:border-gray-700 border border-gray-200 overflow-hidden ${
                          column.cellClassName || ""
                        }`}
                        style={{ width: calculateColumnWidths[colIndex] }}
                      >
                        <div>
                          {renderCellValue(column, item)}
                        </div>
                      </td>
                    ))}
                    {renderActions && (
                      <td className="p-3 border-b dark:border-gray-700 border border-gray-200 w-24">
                        {renderActions(item)}
                      </td>
                    )}
                  </tr>
                  {isExpanded && renderExpandedRow && (
                    <tr className="bg-slate-50/70 dark:bg-gray-900/60 border-b dark:border-gray-700">
                      <td
                        colSpan={totalColSpan}
                        className="p-0 border border-gray-200 dark:border-gray-700"
                      >
                        {renderExpandedRow(item)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Vista Mobile - Cards */}
      {showMobileCards && (
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {data.map((item, index) => {
            const isExpanded = isRowExpanded ? isRowExpanded(item) : false;

            if (renderMobileCard) {
              return (
                <div
                  key={`${String(getRowKey(item))}-${index}`}
                  className="p-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  {renderMobileCard(item)}
                  {isExpanded && renderExpandedRow && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                      {renderExpandedRow(item)}
                    </div>
                  )}
                </div>
              );
            }

            // Card por defecto
            return (
              <div
                key={`${String(getRowKey(item))}-${index}`}
                className="p-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                <div className="grid grid-cols-[35%_65%] gap-2 text-sm">
                  {columns.map((column) => (
                    <React.Fragment key={`${getRowKey(item)}-mobile-${column.key}`}>
                      <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                        {column.header}:
                      </div>
                      <div className="text-gray-800 dark:text-gray-100">
                        {renderCellValue(column, item)}
                      </div>
                    </React.Fragment>
                  ))}
                  {renderActions && (
                    <>
                      <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                        Acciones:
                      </div>
                      <div className="text-gray-800 dark:text-gray-100">
                        {renderActions(item)}
                      </div>
                    </>
                  )}
                </div>
                {isExpanded && renderExpandedRow && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    {renderExpandedRow(item)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
