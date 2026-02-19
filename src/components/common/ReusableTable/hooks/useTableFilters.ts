import { useState, useMemo, useCallback } from "react";
import type {
  FilterFieldConfig,
  FilterValues,
  FilterValue,
  DateRangeValue,
  ActiveFilterChip,
  FilterOption,
  TableFilterState,
} from "../types/filterTypes";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers internos
// ─────────────────────────────────────────────────────────────────────────────

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce((curr: unknown, key: string) => {
    if (curr && typeof curr === "object") {
      return (curr as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function parseDateValue(value: unknown): Date | null {
  if (!value) return null;
  try {
    const d = value instanceof Date ? value : new Date(value as string);
    return isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook principal
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hook que gestiona el estado y la lógica de filtros múltiples sobre un array
 * de datos. Encadena el filtrado antes de la búsqueda de texto y la paginación.
 *
 * @param data        Array completo de datos (sin paginar ni buscar).
 * @param filterConfig Configuración declarativa de los campos filtrables.
 * @returns           Estado de filtros + datos filtrados + TableFilterState listo
 *                    para pasar a DataTableContainer.
 */
export function useTableFilters<T extends object>(
  data: T[],
  filterConfig: FilterFieldConfig[]
) {
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // ── Acciones ──────────────────────────────────────────────────────────────

  const toggleFilterPanel = useCallback(() => {
    setIsFilterPanelOpen((prev) => !prev);
  }, []);

  const setFilter = useCallback((key: string, value: FilterValue) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const removeFilter = useCallback((key: string, value?: string) => {
    setFilterValues((prev) => {
      const current = prev[key];

      // Multi-select: remover solo el valor indicado
      if (Array.isArray(current) && value !== undefined) {
        const updated = current.filter((v) => v !== value);
        if (updated.length === 0) {
          const { [key]: _removed, ...rest } = prev;
          return rest;
        }
        return { ...prev, [key]: updated };
      }

      // Date-range o se omite value: remover filtro completo
      const { [key]: _removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilterValues({});
  }, []);

  // ── Opciones dinámicas extraídas de los datos ──────────────────────────────

  const getOptions = useCallback(
    (key: string): FilterOption[] => {
      const config = filterConfig.find((c) => c.key === key);

      // Si tiene opciones estáticas, retornarlas directamente
      if (config?.options && !config.getOptionsFromData) {
        return config.options;
      }

      // Extraer valores únicos del campo en los datos completos
      const unique = [
        ...new Set(
          data
            .map((item) => {
              const val = getNestedValue(item, key);
              return val !== null && val !== undefined ? String(val) : null;
            })
            .filter((v): v is string => v !== null && v !== "")
        ),
      ].sort();

      return unique.map((v) => ({ value: v, label: v }));
    },
    [data, filterConfig]
  );

  // ── Filtrado ──────────────────────────────────────────────────────────────

  const filteredData = useMemo(() => {
    if (filterConfig.length === 0) return data;

    return data.filter((item) =>
      filterConfig.every((config) => {
        const filterVal = filterValues[config.key];
        if (!filterVal) return true;

        const itemVal = getNestedValue(item, config.key);

        if (config.type === "multi-select") {
          const selected = filterVal as string[];
          if (selected.length === 0) return true;
          return selected.includes(String(itemVal ?? ""));
        }

        if (config.type === "date-range") {
          const range = filterVal as DateRangeValue;
          if (!range.from && !range.to) return true;

          const itemDate = parseDateValue(itemVal);
          if (!itemDate) return false;

          if (range.from) {
            const from = parseDateValue(range.from + "T00:00:00");
            if (from && itemDate < from) return false;
          }
          if (range.to) {
            const to = parseDateValue(range.to + "T23:59:59");
            if (to && itemDate > to) return false;
          }
          return true;
        }

        return true;
      })
    );
  }, [data, filterValues, filterConfig]);

  // ── Chips activos ─────────────────────────────────────────────────────────

  const activeChips: ActiveFilterChip[] = useMemo(() => {
    const chips: ActiveFilterChip[] = [];

    filterConfig.forEach((config) => {
      const val = filterValues[config.key];
      if (!val) return;

      if (
        config.type === "multi-select" &&
        Array.isArray(val) &&
        val.length > 0
      ) {
        val.forEach((v) => {
          chips.push({
            key: config.key,
            fieldLabel: config.label,
            value: v,
            displayValue: `${config.label}: ${v}`,
          });
        });
      }

      if (config.type === "date-range") {
        const range = val as DateRangeValue;
        if (range.from || range.to) {
          const from = range.from
            ? range.from.split("-").reverse().join("/")
            : "...";
          const to = range.to
            ? range.to.split("-").reverse().join("/")
            : "...";
          chips.push({
            key: config.key,
            fieldLabel: config.label,
            value: `${range.from}|${range.to}`,
            displayValue: `${config.label}: ${from} → ${to}`,
          });
        }
      }
    });

    return chips;
  }, [filterValues, filterConfig]);

  const activeCount = activeChips.length;

  // ── TableFilterState listo para pasar al componente ────────────────────────

  const tableFilterState: TableFilterState = useMemo(
    () => ({
      config: filterConfig,
      values: filterValues,
      isOpen: isFilterPanelOpen,
      activeChips,
      activeCount,
      onToggle: toggleFilterPanel,
      onChange: setFilter,
      onRemove: removeFilter,
      onClearAll: clearAllFilters,
      getOptions,
    }),
    [
      filterConfig,
      filterValues,
      isFilterPanelOpen,
      activeChips,
      activeCount,
      toggleFilterPanel,
      setFilter,
      removeFilter,
      clearAllFilters,
      getOptions,
    ]
  );

  return {
    filteredData,
    filterState: tableFilterState,
  };
}
