import { useState } from "react";
import useSearch from "@/hooks/useSearch";
import usePagination from "@/hooks/usePagination";

export interface UseTableStateProps<T> {
  /** Datos originales */
  data: T[];
  /** Campos por los cuales buscar */
  searchFields: (keyof T | string)[];
  /** Items por página inicial */
  initialItemsPerPage?: number;
}

export interface UseTableStateReturn<T> {
  /** Valor actual de búsqueda */
  searchQuery: string;
  /** Función para actualizar búsqueda */
  setSearchQuery: (query: string) => void;
  /** Datos filtrados por búsqueda */
  filteredData: T[];
  /** Página actual */
  currentPage: number;
  /** Total de páginas */
  totalPages: number;
  /** Cambiar de página */
  paginate: (page: number) => void;
  /** Datos de la página actual */
  currentData: () => T[];
  /** Items por página actual */
  itemsPerPage: number;
  /** Cambiar items por página */
  setItemsPerPage: (items: number) => void;
}

/**
 * Hook personalizado que combina búsqueda y paginación
 * para simplificar el manejo del estado de las tablas.
 * 
 * @example
 * ```tsx
 * const tableState = useTableState({
 *   data: users,
 *   searchFields: ['name', 'email', 'documentNumber'],
 *   initialItemsPerPage: 10
 * });
 * 
 * <DataTableContainer
 *   searchValue={tableState.searchQuery}
 *   onSearchChange={tableState.setSearchQuery}
 *   itemsPerPage={tableState.itemsPerPage}
 *   onItemsPerPageChange={tableState.setItemsPerPage}
 *   currentPage={tableState.currentPage}
 *   totalPages={tableState.totalPages}
 *   onPageChange={tableState.paginate}
 * >
 *   <DataTable data={tableState.currentData()} />
 * </DataTableContainer>
 * ```
 */
export function useTableState<T>({
  data,
  searchFields,
  initialItemsPerPage = 10,
}: UseTableStateProps<T>): UseTableStateReturn<T> {
  const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage);

  // Hook de búsqueda
  const { query, setQuery, filteredData } = useSearch<T>(data, searchFields);

  // Hook de paginación
  const {
    currentPage,
    totalPages,
    paginate,
    currentData,
    setItemsPerPage: setPaginationItemsPerPage,
  } = usePagination(filteredData, itemsPerPage);

  // Función para cambiar items por página
  const setItemsPerPage = (items: number) => {
    setItemsPerPageState(items);
    setPaginationItemsPerPage(items);
  };

  return {
    searchQuery: query,
    setSearchQuery: setQuery,
    filteredData,
    currentPage,
    totalPages,
    paginate,
    currentData,
    itemsPerPage,
    setItemsPerPage,
  };
}
