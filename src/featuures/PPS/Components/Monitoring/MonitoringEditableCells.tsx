import { useState } from "react";

const cellClassName =
  "w-full px-2 py-1 text-xs text-gray-800 bg-transparent border border-gray-200 rounded dark:text-gray-100 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-color2 transition-colors duration-200 disabled:bg-gray-100 disabled:dark:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-75";

interface MonitoringNumberCellProps {
  value: number | null;
  onSave: (value: number | null) => void;
  disabled?: boolean;
}

export const MonitoringNumberCell: React.FC<MonitoringNumberCellProps> = ({
  value,
  onSave,
  disabled = false,
}) => {
  const [localValue, setLocalValue] = useState<string>(
    value === null ? "" : String(value)
  );
  const [prevValue, setPrevValue] = useState<number | null>(value);

  if (prevValue !== value) {
    setPrevValue(value);
    setLocalValue(value === null ? "" : String(value));
  }

  const handleBlur = () => {
    const parsed = localValue === "" ? null : Number(localValue);
    const next = parsed !== null && Number.isNaN(parsed) ? null : parsed;
    if (next !== value) {
      onSave(next);
    }
  };

  return (
    <input
      type="number"
      min={0}
      step={1}
      value={localValue}
      disabled={disabled}
      onChange={(event) => setLocalValue(event.target.value)}
      onBlur={handleBlur}
      className={cellClassName}
    />
  );
};

interface MonitoringTextCellProps {
  value: string | null;
  onSave: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const MonitoringTextCell: React.FC<MonitoringTextCellProps> = ({
  value,
  onSave,
  placeholder,
  disabled = false,
}) => {
  const [localValue, setLocalValue] = useState<string>(value ?? "");
  const [prevValue, setPrevValue] = useState<string | null>(value);

  if (prevValue !== value) {
    setPrevValue(value);
    setLocalValue(value ?? "");
  }

  const handleBlur = () => {
    const next = localValue === "" ? null : localValue;
    if (next !== value) {
      onSave(next);
    }
  };

  return (
    <input
      type="text"
      value={localValue}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(event) => setLocalValue(event.target.value)}
      onBlur={handleBlur}
      className={cellClassName}
    />
  );
};

interface MonitoringSelectCellProps {
  value: number | null;
  options: { value: number; label: string }[];
  onSave: (value: number | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const MonitoringSelectCell: React.FC<MonitoringSelectCellProps> = ({
  value,
  options,
  onSave,
  placeholder,
  disabled = false,
}) => {
  const [localValue, setLocalValue] = useState<string>(
    value === null ? "" : String(value)
  );
  const [prevValue, setPrevValue] = useState<number | null>(value);

  if (prevValue !== value) {
    setPrevValue(value);
    setLocalValue(value === null ? "" : String(value));
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const raw = event.target.value;
    setLocalValue(raw);
    onSave(raw === "" ? null : Number(raw));
  };

  return (
    <select
      value={localValue}
      disabled={disabled}
      onChange={handleChange}
      className={cellClassName}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
