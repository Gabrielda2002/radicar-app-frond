import { AnimatePresence } from "framer-motion";
import React from "react";
import ErrorMessage from "../ErrorMessageModal/ErrorMessageModals";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  className?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: "default" | "dark" | "error" | "checkbox";
  size?: "sm" | "md" | "lg" | "full";
  helpText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  className = "",
  error,
  touched,
  required = false,
  icon,
  iconPosition = "left",
  variant = "default",
  size = "md",
  helpText,
  disabled,
  type,
  ...props
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-sm";
      case "lg":
        return "px-4 py-3 text-lg";
      case "md":
        return "px-3 py-2 text-base";
      case "full":
        return "w-full px-3 py-2 text-base";
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
        return "border-gray-600 dark:border-gray-600 bg-gray-700 bg:gray-200 dark:bg-gray-700 text-white dark:text-white";
      case "checkbox":
        return "border-gray-300 dark:border-gray-500 bg-white bg:gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100";
      default:
        return "border-gray-200 dark:border-gray-600 bg-transparent dark:bg-gray-800 dark:text-white";
    }
  };

  // Para checkbox, no usar inputClasses normales ni iconos dentro del input
  const inputClasses = `
    w-full border-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-color2 transition-colors duration-200
    ${getSizeClasses()}
    ${getVariantClasses()}
    ${
      disabled
        ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-75"
        : ""
    }
    ${
      icon && type !== "checkbox"
        ? iconPosition === "left"
          ? "pl-10"
          : "pr-10"
        : ""
    }
    ${className}
  `.trim();

  if (type === "checkbox" || variant === "checkbox") {
    return (
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          className={`mr-2 ${getVariantClasses()} ${className}`}
          disabled={disabled}
          {...props}
        />
        {icon && (
          <span className="flex items-center mr-2 text-gray-500 dark:text-gray-300">
            {icon}
          </span>
        )}
        {label && (
          <label className="text-base font-bold text-gray-700 select-none dark:text-gray-200">
            {label}
            {required && (
              <span className="ml-2 text-red-600 after:content-['*']"></span>
            )}
          </label>
        )}

        {helpText && !error && (
          <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            {helpText}
          </p>
        )}

        <AnimatePresence>
          {error && touched && (
            <ErrorMessage className="ml-2">{error}</ErrorMessage>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div>
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

      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <div className="w-5 h-5 text-gray-400 dark:text-gray-300">
              {icon}
            </div>
          </div>
        )}

        <input
          type={type}
          className={inputClasses}
          disabled={disabled}
          {...props}
        />

        {icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <div className="w-5 h-5 text-gray-400 dark:text-gray-300">
              {icon}
            </div>
          </div>
        )}
      </div>

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

export default Input;
