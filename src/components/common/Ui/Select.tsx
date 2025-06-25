import React from "react";
import { AnimatePresence } from "framer-motion";
import ErrorMessage from "../ErrorMessageModal/ErrorMessageModals";

export interface SelectOption {
  value: string | number;
  label: string;
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
}

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
  disabled,
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
      return "border-red-500 dark:border-red-500 focus:ring-red-500";
    }
    switch (variant) {
      case "dark":
        return "border-gray-600 dark:border-gray-600 bg-gray-700 dark:bg-gray-700 text-white dark:text-white";
      default:
        return "border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white";
    }
  };

  const selectClasses = `
    w-full border-2 rounded focus:outline-none focus:ring-2 focus:ring-color2 transition-colors duration-200
    ${getSizeClasses()}
    ${getVariantClasses()}
    ${disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-75" : ""}
    ${className}
  `.trim();

  return (
    <div className="mb-4">
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
        {...props}
      >
        <option value="">Seleccione</option>
        {options.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
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
