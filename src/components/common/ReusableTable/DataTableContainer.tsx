import React, { ReactNode } from "react";
import Pagination from "@/components/common/PaginationTable/PaginationTable";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import FilterPanel from "./components/FilterPanel";
import FilterChips from "./components/FilterChips";
import type { TableFilterState } from "./types/filterTypes";

export interface DataTableContainerProps {
  /** Valor del input de búsqueda */
  searchValue?: string;
  /** Callback cuando cambia la búsqueda */
  onSearchChange?: (value: string) => void;
  /** Placeholder del input de búsqueda */
  searchPlaceholder?: string;
  /** Label del input de búsqueda */
  searchLabel?: string;
  /** Mostrar input de búsqueda (default: true) */
  showSearch?: boolean;
  /** Items por página actual */
  itemsPerPage?: number;
  /** Opciones para el selector de items por página */
  itemsPerPageOptions?: number[];
  /** Callback cuando cambia items por página */
  onItemsPerPageChange?: (value: number) => void;
  /** Mostrar selector de items por página (default: true) */
  showItemsPerPageSelector?: boolean;
  /** Contenido adicional para el header (botones de acción, etc) */
  headerActions?: ReactNode;
  /** Página actual para paginación */
  currentPage?: number;
  /** Total de páginas */
  totalPages?: number;
  /** Callback cuando cambia la página */
  onPageChange?: (page: number) => void;
  /** Mostrar paginación (default: true) */
  showPagination?: boolean;
  /** Contenido principal (la tabla) */
  children: ReactNode;
  /** Clases CSS adicionales para el contenedor */
  className?: string;
  /**
   * Estado completo del sistema de filtros avanzados.
   * Se obtiene de `useTableState` cuando se pasa `filterConfig`.
   * Si se omite, no se muestran los controles de filtros (backwards compatible).
   */
  filterState?: TableFilterState;
}

export const DataTableContainer: React.FC<DataTableContainerProps> = ({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Buscar",
  searchLabel,
  showSearch = true,
  itemsPerPage = 10,
  itemsPerPageOptions = [10, 20, 30],
  onItemsPerPageChange,
  showItemsPerPageSelector = true,
  headerActions,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showPagination = true,
  children,
  className = "",
  filterState,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onItemsPerPageChange) {
      onItemsPerPageChange(Number(e.target.value));
    }
  };

  return (
    <>
      {/* Contenedor principal */}
      <section
        className={`p-5 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40 ${className}`}
      >
        {/* Header de la tabla */}
        <section className="items-center justify-between pb-6 md:flex header-tabla">
          {/* Búsqueda */}
          {showSearch && (
            <div className="flex items-center space-x-2 container-filter">
              <Input
                label={searchLabel}
                value={searchValue}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
                className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100 dark:focus:bg-gray-500 dark:focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          )}

          {/* Controles de la derecha */}
          <div className="flex items-center mt-3 space-x-4 md:mt-0">
            {/* Selector de items por página */}
            {showItemsPerPageSelector && (
              <Select
                options={itemsPerPageOptions.map((value) => ({
                  value: value.toString(),
                  label: `${value} Páginas`,
                }))}
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border-2 h-[40px] w-[120px] rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            )}

            {/* Botón Filtros (solo si se configuró filterState) */}
            {filterState && (
              <button
                type="button"
                onClick={filterState.onToggle}
                className={`relative inline-flex items-center gap-1.5 px-3 h-[40px] text-sm font-medium rounded-md border-2 transition-colors duration-200
                  ${
                    filterState.isOpen
                      ? "bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700"
                      : "border-gray-400 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
                  }`}
                title="Filtros avanzados"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                  />
                </svg>
                <span>Filtros</span>
                {/* Badge con número de filtros activos */}
                {filterState.activeCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {filterState.activeCount > 9 ? "9+" : filterState.activeCount}
                  </span>
                )}
              </button>
            )}

            {/* Acciones adicionales (botones, modales, etc) */}
            {headerActions}
          </div>
        </section>

        {/* Panel de filtros avanzados (dropdown) */}
        {filterState && (
          <FilterPanel
            config={filterState.config}
            values={filterState.values}
            isOpen={filterState.isOpen}
            onChange={filterState.onChange}
            onClearAll={filterState.onClearAll}
            getOptions={filterState.getOptions}
          />
        )}

        {/* Chips de filtros activos */}
        {filterState && filterState.activeChips.length > 0 && (
          <FilterChips
            chips={filterState.activeChips}
            onRemove={filterState.onRemove}
            onClearAll={filterState.onClearAll}
          />
        )}

        {/* Contenido de la tabla */}
        {children}

        {/* Paginación */}
        {showPagination && totalPages > 1 && (
          <>
            <div>‎</div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange || (() => {})}
            />
          </>
        )}
      </section>
    </>
  );
};
