/**
 * Sistema de tablas reutilizables para la aplicación.
 * 
 * Este módulo exporta componentes para crear tablas de datos
 * con características comunes como búsqueda, paginación, dark mode,
 * estados de carga, y diseño responsive.
 */

export { DataTable } from "./DataTable";
export type { ColumnConfig, DataTableProps } from "./DataTable";

export { DataTableContainer } from "./DataTableContainer";
export type {  DataTableContainerProps } from "./DataTableContainer";

export { useTableState } from "./hooks/useTableState";
export type { UseTableStateProps, UseTableStateReturn } from "./hooks/useTableState";
