import React from "react";
import type { DateRangeValue } from "../types/filterTypes";

interface DateRangeFilterProps {
  /** Etiqueta visible del campo */
  label: string;
  /** Valor actual del rango */
  value: DateRangeValue;
  /** Callback al cambiar el rango */
  onChange: (value: DateRangeValue) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  label,
  value,
  onChange,
}) => {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, from: e.target.value });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, to: e.target.value });
  };

  const handleClear = () => {
    onChange({ from: "", to: "" });
  };

  const hasValue = value.from || value.to;

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label + botón limpiar */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {label}
        </span>
        {hasValue && (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-red-500 dark:text-red-400 hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Inputs de rango */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <label className="text-xs text-gray-500 dark:text-gray-400">
            Desde
          </label>
          <input
            type="date"
            value={value.from}
            max={value.to || undefined}
            onChange={handleFromChange}
            className="w-full text-sm px-2 py-1.5 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 [color-scheme:light] dark:[color-scheme:dark]"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-xs text-gray-500 dark:text-gray-400">
            Hasta
          </label>
          <input
            type="date"
            value={value.to}
            min={value.from || undefined}
            onChange={handleToChange}
            className="w-full text-sm px-2 py-1.5 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 [color-scheme:light] dark:[color-scheme:dark]"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
