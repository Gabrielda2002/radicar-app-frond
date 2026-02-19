import React from "react";
import type {
  FilterFieldConfig,
  FilterValues,
  FilterValue,
  DateRangeValue,
  FilterOption,
} from "../types/filterTypes";
import MultiSelectFilter from "./MultiSelectFilter";
import DateRangeFilter from "./DateRangeFilter";

interface FilterPanelProps {
  /** Configuración de los campos filtrables */
  config: FilterFieldConfig[];
  /** Valores actuales de los filtros */
  values: FilterValues;
  /** Si el panel está visible */
  isOpen: boolean;
  /** Callback al cambiar un filtro */
  onChange: (key: string, value: FilterValue) => void;
  /** Callback para limpiar todos los filtros */
  onClearAll: () => void;
  /** Obtener las opciones disponibles de un campo */
  getOptions: (key: string) => FilterOption[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  config,
  values,
  isOpen,
  onChange,
  onClearAll,
  getOptions,
}) => {
  if (!isOpen) return null;

  const handleMultiSelectChange = (key: string, selected: string[]) => {
    onChange(key, selected);
  };

  const handleDateRangeChange = (key: string, range: DateRangeValue) => {
    onChange(key, range);
  };

  const hasAnyFilter = config.some((c) => {
    const val = values[c.key];
    if (!val) return false;
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === "object") {
      const range = val as DateRangeValue;
      return !!(range.from || range.to);
    }
    return false;
  });

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-750 dark:bg-gray-900/40 p-4 mb-4 animate-fade-in">
      {/* Header del panel */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <svg
            className="w-4 h-4 text-indigo-500"
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
          Filtros
        </h3>
        {hasAnyFilter && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium hover:underline transition-colors"
          >
            Limpiar todos
          </button>
        )}
      </div>

      {/* Grid de filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {config.map((fieldConfig) => {
          const currentValue = values[fieldConfig.key];

          if (fieldConfig.type === "multi-select") {
            const options =
              fieldConfig.options && !fieldConfig.getOptionsFromData
                ? fieldConfig.options
                : getOptions(fieldConfig.key);

            const selectedValues = Array.isArray(currentValue)
              ? currentValue
              : [];

            return (
              <div
                key={fieldConfig.key}
                className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <MultiSelectFilter
                  label={fieldConfig.label}
                  fieldKey={fieldConfig.key}
                  options={options}
                  selectedValues={selectedValues}
                  onChange={(selected) =>
                    handleMultiSelectChange(fieldConfig.key, selected)
                  }
                />
              </div>
            );
          }

          if (fieldConfig.type === "date-range") {
            const rangeValue =
              currentValue && !Array.isArray(currentValue)
                ? (currentValue as DateRangeValue)
                : { from: "", to: "" };

            return (
              <div
                key={fieldConfig.key}
                className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <DateRangeFilter
                  label={fieldConfig.label}
                  value={rangeValue}
                  onChange={(range) =>
                    handleDateRangeChange(fieldConfig.key, range)
                  }
                />
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default FilterPanel;
