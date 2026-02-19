import React from "react";
import type { ActiveFilterChip } from "../types/filterTypes";

interface FilterChipsProps {
  /** Lista de chips de filtros activos */
  chips: ActiveFilterChip[];
  /** Callback para remover un chip específico */
  onRemove: (key: string, value: string) => void;
  /** Callback para limpiar todos los filtros */
  onClearAll: () => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  chips,
  onRemove,
  onClearAll,
}) => {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-2 pb-4">
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
        Filtros activos:
      </span>

      {chips.map((chip) => (
        <span
          key={`${chip.key}-${chip.value}`}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
            bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300
            border border-indigo-200 dark:border-indigo-700"
        >
          {chip.displayValue}
          <button
            type="button"
            onClick={() => onRemove(chip.key, chip.value)}
            aria-label={`Quitar filtro ${chip.displayValue}`}
            className="flex-shrink-0 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full
              text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800
              transition-colors duration-150"
          >
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      ))}

      {/* Botón "Limpiar todos" cuando hay 2 o más chips */}
      {chips.length >= 2 && (
        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
            text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700
            hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-150"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Limpiar todos
        </button>
      )}
    </div>
  );
};

export default FilterChips;
