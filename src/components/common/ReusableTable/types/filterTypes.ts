// ─────────────────────────────────────────────────────────────────────────────
// Tipos del sistema de filtros múltiples para DataTableContainer
// ─────────────────────────────────────────────────────────────────────────────

/** Tipos de filtro soportados */
export type FilterType = "multi-select" | "date-range";

/** Opción individual de un filtro multi-select */
export interface FilterOption {
  value: string;
  label: string;
}

/** Configuración declarativa de un campo filtrable */
export interface FilterFieldConfig {
  /** Clave del campo en el objeto de datos (soporta notación con punto: "address.city") */
  key: string;
  /** Etiqueta visible para el usuario */
  label: string;
  /** Tipo de control que se renderiza para este filtro */
  type: FilterType;
  /**
   * Opciones estáticas para multi-select.
   * Si se omite junto con getOptionsFromData: true, las opciones se extraen de los datos.
   */
  options?: FilterOption[];
  /**
   * Si es true, las opciones del multi-select se calculan dinámicamente
   * extrayendo los valores únicos del campo en el array de datos completo.
   * Útil para campos como "category", "headquarter", "municipio".
   */
  getOptionsFromData?: boolean;
}

/** Valor de un filtro de rango de fechas */
export interface DateRangeValue {
  from: string; // Formato YYYY-MM-DD (input[type="date"])
  to: string;   // Formato YYYY-MM-DD (input[type="date"])
}

/** Valor de cualquier filtro (multi-select o rango de fechas) */
export type FilterValue = string[] | DateRangeValue;

/** Estado actual de todos los filtros aplicados */
export type FilterValues = Record<string, FilterValue | undefined>;

/** Chip de filtro activo visible en la barra de chips */
export interface ActiveFilterChip {
  /** Clave del campo */
  key: string;
  /** Etiqueta del campo (ej: "Estado") */
  fieldLabel: string;
  /** Valor crudo del filtro (para identificar qué remover) */
  value: string;
  /** Texto mostrado en el chip (ej: "Estado: Abierto") */
  displayValue: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Estado completo del sistema de filtros que se pasa al DataTableContainer
// ─────────────────────────────────────────────────────────────────────────────

/** Objeto que agrupa toda la configuración y estado del sistema de filtros */
export interface TableFilterState {
  /** Configuración declarativa de los campos filtrables */
  config: FilterFieldConfig[];
  /** Valores actuales de los filtros */
  values: FilterValues;
  /** Si el panel de filtros está abierto */
  isOpen: boolean;
  /** Lista de chips activos (filtros aplicados) */
  activeChips: ActiveFilterChip[];
  /** Número total de valores filtrados activos */
  activeCount: number;
  /** Abrir/cerrar el panel de filtros */
  onToggle: () => void;
  /** Actualizar o establecer el valor de un filtro */
  onChange: (key: string, value: FilterValue) => void;
  /** Remover un valor de un filtro (o el filtro completo si no se pasa value) */
  onRemove: (key: string, value?: string) => void;
  /** Limpiar TODOS los filtros */
  onClearAll: () => void;
  /** Obtener las opciones disponibles para un campo (dinámicas desde datos) */
  getOptions: (key: string) => FilterOption[];
}
