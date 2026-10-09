import React, { useEffect, useState } from "react";
import { parseTimeValue, buildTimeValue } from "../utils/timeSelectUtils";

interface TimeSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

type Period = "AM" | "PM";

export const TimeSelect: React.FC<TimeSelectProps> = ({ label, value, onChange, onBlur, error, touched, required }) => {
  const parsed = parseTimeValue(value);
  const [hour, setHour] = useState(parsed.hour12);
  const [minute, setMinute] = useState(parsed.minute);
  const [period, setPeriod] = useState<Period>(parsed.meridiem);
  const showError = Boolean(touched && error);
  const inputClass = `w-full border-2 rounded bg-transparent px-3 py-2 text-center text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-color2 transition-colors duration-200 dark:bg-gray-800 dark:text-black ${showError ? "border-red-500 dark:border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-600"}`;

  useEffect(() => {
    const next = parseTimeValue(value);
    setHour(next.hour12);
    setMinute(next.minute);
    setPeriod(next.meridiem);
  }, [value]);

  const commit = (nextHour: string, nextMinute: string, nextPeriod: Period, finalize = false) => {
    const valid = nextHour && nextMinute && (finalize || (nextHour.length === 2 && nextMinute.length === 2)) && Number(nextHour) >= 1 && Number(nextHour) <= 12 && Number(nextMinute) < 60;
    if (!nextHour && !nextMinute) onChange("");
    else if (valid) onChange(buildTimeValue(nextHour, nextMinute, nextPeriod));
  };

  const changeHour = (next: string) => {
    const digits = next.replace(/\D/g, "").slice(0, 2);
    if (digits && (Number(digits) < 1 || Number(digits) > 12)) return;
    setHour(digits);
    commit(digits, minute, period);
  };

  const changeMinute = (next: string) => {
    const digits = next.replace(/\D/g, "").slice(0, 2);
    if (digits && Number(digits) > 59) return;
    setMinute(digits);
    commit(hour, digits, period);
  };

  const changePeriod = (next: Period) => {
    setPeriod(next);
    commit(hour || "12", minute || "00", next, true);
  };

  return (
    <div className="space-y-1.5">
      <label className="text-base font-semibold text-gray-700 dark:text-gray-200">
        {label} {required && <span className="ml-2 text-red-600 after:content-['*']"></span>}
      </label>
      <div className="flex items-center gap-1.5" onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            commit(hour, minute, period, true);
            onBlur?.();
          }
        }}
      >
        <div className="min-w-0 flex-1">
          <input inputMode="numeric" maxLength={2} aria-label="Hora" value={hour} onChange={(event) => changeHour(event.target.value)} className={inputClass} />
          <span className="mt-1.0 block text-[12px] font-medium text-gray-500">Hora</span>
        </div>
        <span className="pb-3 text-lg font-semibold">:</span>
        <div className="min-w-0 flex-1">
          <input inputMode="numeric" maxLength={2} aria-label="Minuto" value={minute} onChange={(event) => changeMinute(event.target.value)} className={inputClass} />
          <span className="mt-1.0 block text-[12px] font-medium text-gray-500">Minuto</span>
        </div>
        <div className="flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
          {(["AM", "PM"] as const).map((option) => (
            <button key={option} type="button" onClick={() => changePeriod(option)} className={`px-2 py-1 text-[11px] font-semibold transition-colors ${period === option ? "bg-[#008d93] text-white" : "bg-white text-gray-500 hover:bg-[#effbfb] dark:bg-gray-800 dark:text-gray-300"}`}>
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