/**
 * Sistema de tablas reutilizables para la aplicación.
 * 
 * Este módulo exporta componentes para crear tablas de datos
 * con características comunes como búsqueda, paginación, dark mode,
 * estados de carga, y diseño responsive.
 * También incluye el sistema de filtros múltiples (multi-select + rango de fechas).
 */

export { DataTable } from "./DataTable";
export type { ColumnConfig, DataTableProps } from "./DataTable";

export { DataTableContainer } from "./DataTableContainer";
export type { DataTableContainerProps } from "./DataTableContainer";

export { useTableState } from "./hooks/useTableState";
export type { UseTableStateProps, UseTableStateReturn } from "./hooks/useTableState";

// Filtros
export { useTableFilters } from "./hooks/useTableFilters";
export type {
  FilterFieldConfig,
  FilterOption,
  FilterType,
  FilterValue,
  FilterValues,
  DateRangeValue,
  ActiveFilterChip,
  TableFilterState,
} from "./types/filterTypes";
