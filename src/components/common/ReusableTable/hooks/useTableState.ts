import { useState } from "react";
import useSearch, { type NestedKeyOf } from "@/hooks/useSearch";
import usePagination from "@/hooks/usePagination";
import { useTableFilters } from "./useTableFilters";
import type { FilterFieldConfig, TableFilterState } from "../types/filterTypes";

export interface UseTableStateProps<T extends object> {
  /** Datos originales */
  data: T[];
  /** Campos por los cuales buscar */
  searchFields: NestedKeyOf<T>[];
  /** Items por página inicial */
  initialItemsPerPage?: number;
  /**
   * Configuración de filtros múltiples (opcional).
   * Si se omite, el sistema de filtros no aparece y el comportamiento es idéntico
   * al original — no hay breaking changes.
   */
  filterConfig?: FilterFieldConfig[];
}

export interface UseTableStateReturn<T> {
  /** Valor actual de búsqueda */
  searchQuery: string;
  /** Función para actualizar búsqueda */
  setSearchQuery: (query: string) => void;
  /** Datos tras aplicar filtros + búsqueda (sin paginar) */
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
  /**
   * Estado completo del sistema de filtros. Pásalo directamente al prop
   * `filterState` de DataTableContainer.
   * Será `undefined` si no se proporcionó `filterConfig`.
   */
  filterState: TableFilterState | undefined;
}

export function useTableState<T extends object>({
  data,
  searchFields,
  initialItemsPerPage = 10,
  filterConfig,
}: UseTableStateProps<T>): UseTableStateReturn<T> {
  const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage);

  // ── Paso 1: Filtros multi-campo ──────────────────────────────────────────
  // Siempre se llama (regla de hooks), pero cuando filterConfig es undefined/[]
  // simplemente devuelve los datos sin modificar.
  const { filteredData: dataAfterFilters, filterState } = useTableFilters<T>(
    data,
    filterConfig ?? []
  );

  // ── Paso 2: Búsqueda de texto libre sobre datos ya filtrados ─────────────
  const { query, setQuery, filteredData } = useSearch<T>(
    dataAfterFilters,
    searchFields
  );

  // ── Paso 3: Paginación sobre datos filtrados + buscados ──────────────────
  const {
    currentPage,
    totalPages,
    paginate,
    currentData,
    setItemsPerPage: setPaginationItemsPerPage,
  } = usePagination(filteredData, itemsPerPage);

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
    // Solo exponer filterState si el consumidor pasó filterConfig
    filterState: filterConfig ? filterState : undefined,
  };
}
