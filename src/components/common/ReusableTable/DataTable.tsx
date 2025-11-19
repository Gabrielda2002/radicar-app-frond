import React, { ReactNode } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

export interface ColumnConfig<T> {
  /** Clave única de la columna */
  key: string;
  /** Título que se muestra en el header */
  header: string;
  /** Ancho de la columna (opcional) */
  width?: string;
  /** Función para renderizar el contenido de la celda */
  render?: (item: T) => ReactNode;
  /** Función para obtener el valor de la celda (si no se usa render) */
  accessor?: (item: T) => ReactNode;
  /** Clases CSS adicionales para la celda */
  cellClassName?: string;
  /** Clases CSS adicionales para el header */
  headerClassName?: string;
}

export interface DataTableProps<T> {
  /** Datos a mostrar en la tabla */
  data: T[];
  /** Configuración de las columnas */
  columns: ColumnConfig<T>[];
  /** Función para obtener la key única de cada fila */
  getRowKey: (item: T) => string | number;
  /** Contenido para la sección de acciones por fila (opcional) */
  renderActions?: (item: T) => ReactNode;
  /** Indica si se está cargando */
  loading?: boolean;
  /** Mensaje de error (opcional) */
  error?: string | null;
  /** Mensaje cuando no hay datos */
  emptyMessage?: string;
  /** Clases CSS adicionales para el contenedor */
  className?: string;
  /** Clases CSS adicionales para la tabla */
  tableClassName?: string;
  /** Mostrar responsive cards en mobile (default: true) */
  showMobileCards?: boolean;
  /** Renderizar card mobile personalizada */
  renderMobileCard?: (item: T) => ReactNode;
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
}: DataTableProps<T>) {
  // Loading state
  if (loading) {
    return <LoadingSpinner duration={100000} />;
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-300">
        {error}
      </div>
    );
  }

  // Empty state
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
          className={`min-w-full overflow-hidden text-sm rounded-lg shadow-lg ${tableClassName}`}
        >
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={column.width ? `w-[${column.width}]` : ""}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.header}
                </th>
              ))}
              {renderActions && <th>Acciones</th>}
            </tr>
          </thead>

          <tbody className="text-xs text-center bg-white dark:bg-gray-800 dark:text-gray-200">
            {data.map((item) => (
              <tr
                key={getRowKey(item)}
                className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                {columns.map((column) => (
                  <td
                    key={`${getRowKey(item)}-${column.key}`}
                    className={`p-3 border-b dark:border-gray-700 ${
                      column.cellClassName || ""
                    }`}
                  >
                    {renderCellValue(column, item)}
                  </td>
                ))}
                {renderActions && (
                  <td className="p-3 border-b dark:border-gray-700">
                    {renderActions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista Mobile - Cards */}
      {showMobileCards && (
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {data.map((item) => {
            if (renderMobileCard) {
              return (
                <div key={getRowKey(item)} className="p-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600">
                  {renderMobileCard(item)}
                </div>
              );
            }

            // Card por defecto
            return (
              <div
                key={getRowKey(item)}
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
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
