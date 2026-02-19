import React, { useState, useMemo } from "react";
import type { FilterOption } from "../types/filterTypes";

interface MultiSelectFilterProps {
  /** Etiqueta visible del campo */
  label: string;
  /** Clave del campo */
  fieldKey: string;
  /** Opciones disponibles */
  options: FilterOption[];
  /** Valores actualmente seleccionados */
  selectedValues: string[];
  /** Callback al cambiar la selección */
  onChange: (values: string[]) => void;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  label,
  fieldKey,
  options,
  selectedValues,
  onChange,
}) => {
  const [searchText, setSearchText] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchText.trim()) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [options, searchText]);

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const handleSelectAll = () => {
    const allValues = filteredOptions.map((o) => o.value);
    const allSelected = allValues.every((v) => selectedValues.includes(v));
    if (allSelected) {
      // Deseleccionar las que están en la lista filtrada
      onChange(selectedValues.filter((v) => !allValues.includes(v)));
    } else {
      // Seleccionar todas las filtradas (sin duplicar)
      const merged = [...new Set([...selectedValues, ...allValues])];
      onChange(merged);
    }
  };

  const allFilteredSelected =
    filteredOptions.length > 0 &&
    filteredOptions.every((o) => selectedValues.includes(o.value));

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label + contador */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {label}
        </span>
        {selectedValues.length > 0 && (
          <span className="text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-2 py-0.5 rounded-full">
            {selectedValues.length} selec.
          </span>
        )}
      </div>

      {/* Buscador interno (solo si hay más de 7 opciones) */}
      {options.length > 7 && (
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Buscar..."
          className="w-full text-xs px-2 py-1.5 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
      )}

      {/* Lista de opciones */}
      <div className="flex flex-col gap-0.5 max-h-44 overflow-y-auto pr-1 custom-scrollbar">
        {filteredOptions.length === 0 ? (
          <p className="text-xs text-gray-400 dark:text-gray-500 py-1 text-center">
            Sin resultados
          </p>
        ) : (
          filteredOptions.map((opt) => {
            const checked = selectedValues.includes(opt.value);
            const checkboxId = `filter-${fieldKey}-${opt.value}`;
            return (
              <label
                key={opt.value}
                htmlFor={checkboxId}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm transition-colors duration-150
                  ${
                    checked
                      ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
              >
                <input
                  id={checkboxId}
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleToggle(opt.value)}
                  className="w-3.5 h-3.5 accent-indigo-500 cursor-pointer flex-shrink-0"
                />
                <span className="truncate">{opt.label}</span>
              </label>
            );
          })
        )}
      </div>

      {/* Seleccionar / Deseleccionar todo */}
      {filteredOptions.length > 1 && (
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline self-start mt-0.5"
        >
          {allFilteredSelected ? "Deseleccionar todo" : "Seleccionar todo"}
        </button>
      )}
    </div>
  );
};

export default MultiSelectFilter;
