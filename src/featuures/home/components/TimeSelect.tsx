import React from "react";
import { HOURS_12, MINUTES, buildTimeValue, parseTimeValue } from "../utils/timeSelectUtils";

interface TimeSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

const timeSelectBaseClass =
  "rounded-lg border bg-white px-2 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#008d93]/40 dark:bg-gray-800 dark:text-gray-100";

export const TimeSelect: React.FC<TimeSelectProps> = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required,
}) => {
  const { hour12, minute, meridiem } = parseTimeValue(value);
  const showError = Boolean(touched && error);

  const emit = (nextHour: string, nextMinute: string, nextMeridiem: "AM" | "PM") => {
    onChange(buildTimeValue(nextHour, nextMinute, nextMeridiem));
  };

  return (
    <div className="space-y-1.5">
      <label className="text-base font-semibold text-gray-700 dark:text-gray-200">
        {label} {required && <span className="ml-2 text-red-600 after:content-['*']"></span>}
      </label>
      <div className="flex items-center gap-1.5" onBlur={onBlur}>
        <select
          value={hour12}
          onChange={(e) => emit(e.target.value, minute || "00", meridiem)}
          className={`${timeSelectBaseClass} ${showError ? "border-[#008d93]" : "border-gray-200 dark:border-gray-600"}`}
          aria-label="Hora"
        >
          <option value="" disabled>--</option>
          {HOURS_12.map((h) => (
            <option key={h} value={h}>{String(h).padStart(2, "0")}</option>
          ))}
        </select>
        <span className="text-gray-400">:</span>
        <select
          value={minute}
          onChange={(e) => emit(hour12 || "12", e.target.value, meridiem)}
          className={`${timeSelectBaseClass} ${showError ? "border-rose-300" : "border-gray-200 dark:border-gray-600"}`}
          aria-label="Minuto"
        >
          <option value="" disabled>--</option>
          {MINUTES.map((m) => (
            <option key={m} value={String(m).padStart(2, "0")}>{String(m).padStart(2, "0")}</option>
          ))}
        </select>
        <div className="ml-1 flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
          {(["AM", "PM"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => emit(hour12 || "12", minute || "00", option)}
              className={`px-2.5 py-2 text-xs font-semibold transition-colors ${meridiem === option
                  ? "bg-[#008d93] text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {showError && <p className="text-xs text-gray-700 dark:text-gray-200">{error}</p>}
    </div>
  );
};

export default TimeSelect;
