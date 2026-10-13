import React, { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import ErrorMessage from "../ErrorMessageModal/ErrorMessageModals";

export interface SelectOption {
  value: string | number;
  label: string;
  title?: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  options: SelectOption[];
  error?: string;
  touched?: boolean;
  required?: boolean;
  className?: string;
  variant?: "default" | "dark" | "error";
  selectSize?: "sm" | "md" | "lg";
  helpText?: string;
  placeholder?: string;
  hidePlaceholder?: boolean;
  maxOptionLength?: number;
}

const truncateText = (text: string, maxLength?: number): string => {
  if (!maxLength || maxLength <= 0 || text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).trimEnd()}...`;
};

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  touched,
  required = false,
  className = "",
  variant = "default",
  selectSize = "md",
  helpText,
  placeholder = "Seleccione",
  hidePlaceholder = false,
  disabled,
  maxOptionLength = 90,
  ...props
}) => {
  const getSizeClasses = () => {
    switch (selectSize) {
      case "sm":
        return "px-2 py-1 text-sm";
      case "lg":
        return "px-4 py-3 text-lg";
      default:
        return "px-3 py-2";
    }
  };

  const getVariantClasses = () => {
    if (error && touched) {
      return "border-red-500 dark:border-red-500 focus:ring-red-500 bg-transparent dark:bg-gray-800";
    }
    switch (variant) {
      case "dark":
        return "border-gray-600 dark:border-gray-600 bg-gray-700 dark:bg-gray-700 text-white dark:text-white";
      default:
        return "border-gray-200 bg-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white";
    }
  };

  const selectClasses = `
    w-full max-w-full truncate border-2 rounded focus:outline-none focus:ring-2 focus:ring-color2 transition-colors duration-200
    ${getSizeClasses()}
    ${getVariantClasses()}
    ${disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-75" : ""}
    ${className}
  `.trim();

  const selectedOption = useMemo(() => {
    if (props.value === undefined || props.value === null || props.value === "") {
      return null;
    }
    return options.find((op) => String(op.value) === String(props.value)) ?? null;
  }, [options, props.value]);

  const selectTitle = props.title || selectedOption?.label || undefined;

  return (
    <div className="w-full min-w-0">
      {label && (
        <label className="block mb-2 text-base font-bold text-gray-700 dark:text-gray-200">
          <span className="flex items-center">
            {label}
            {required && (
              <span className="ml-2 text-red-600 after:content-['*']"></span>
            )}
          </span>
        </label>
      )}
      <select
        className={selectClasses}
        disabled={disabled}
        title={selectTitle}
        {...props}
      >
        {!hidePlaceholder && (
          <option value="" title={placeholder}>
            {truncateText(placeholder, maxOptionLength)}
          </option>
        )}
        {options.map((op) => {
          const fullLabel = String(op.label ?? "");
          const displayLabel = truncateText(fullLabel, maxOptionLength);
          return (
            <option
              key={op.value}
              value={op.value}
              title={op.title || fullLabel}
              disabled={op.disabled}
            >
              {displayLabel}
            </option>
          );
        })}
      </select>
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helpText}
        </p>
      )}
      <AnimatePresence>
        {error && touched && <ErrorMessage>{error}</ErrorMessage>}
      </AnimatePresence>
    </div>
  );
};

export default Select;
