import { AnimatePresence } from "framer-motion";
import React from "react";
import ErrorMessage from "../ErrorMessageModal/ErrorMessageModals";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  className?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: "default" | "dark" | "error";
  size?: "sm" | "md" | "lg";
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
  ...props 
}) => {
  const getSizeClasses = () => {
    switch (size) {
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

  const inputClasses = `
    w-full border-2 rounded focus:outline-none focus:ring-2 focus:ring-color2 transition-colors duration-200
    ${getSizeClasses()}
    ${getVariantClasses()}
    ${disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-75" : ""}
    ${icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : ""}
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
      
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <div className="w-5 h-5 text-gray-400 dark:text-gray-300">
              {icon}
            </div>
          </div>
        )}
        
        <input
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