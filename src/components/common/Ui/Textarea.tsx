import { AnimatePresence } from "framer-motion";
import React, { useRef, useCallback, useEffect } from "react";
import ErrorMessage from "../ErrorMessageModal/ErrorMessageModals";

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  className?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  variant?: "default" | "dark" | "error" | "any";
  size?: "sm" | "md" | "lg" | "full";
  helpText?: string;
  maxLength?: number;
  showCharCount?: boolean;
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  className = "",
  error,
  touched,
  required = false,
  variant = "default",
  size = "md",
  helpText,
  disabled,
  maxLength,
  showCharCount = false,
  autoResize = false,
  minRows = 3,
  maxRows = 10,
  value,
  onChange,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
        return "border-gray-600 dark:border-gray-600 bg-gray-700 dark:bg-gray-700 text-white dark:text-white";
      case "error":
        return "border-red-500 dark:border-red-500 bg-red-100 dark:bg-red-800 text-red-900 dark:text-red-100";
      case "any":
        return "";
      default:
        return "border-gray-200 dark:border-gray-600 bg-transparent dark:bg-gray-800 dark:text-white";
    }
  };

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || !autoResize) return;

    textarea.style.height = "auto";

    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
    const minHeight = lineHeight * minRows;
    const maxHeight = lineHeight * maxRows;
    const scrollHeight = textarea.scrollHeight;

    textarea.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`;
    textarea.style.overflowY = scrollHeight > maxHeight ? "auto" : "hidden";
  }, [autoResize, minRows, maxRows]);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
    if (autoResize) {
      adjustHeight();
    }
  };

  const charCount = typeof value === "string" ? value.length : 0;

  const textareaClasses = `
    w-full border-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-color2 transition-colors duration-200 resize-vertical leading-relaxed
    ${getSizeClasses()}
    ${getVariantClasses()}
    ${disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-75 resize-none" : ""}
    ${autoResize ? "resize-none" : ""}
    ${className}
  `.trim();

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

      <textarea
        ref={textareaRef}
        className={textareaClasses}
        disabled={disabled}
        rows={autoResize ? minRows : minRows}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        {...props}
      />

      <div className="flex items-center justify-between mt-1">
        <div className="flex-1">
          {helpText && !error && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {helpText}
            </p>
          )}
          <AnimatePresence>
            {error && touched && <ErrorMessage>{error}</ErrorMessage>}
          </AnimatePresence>
        </div>

        {showCharCount && (
          <span
            className={`text-xs ml-2 shrink-0 tabular-nums ${
              maxLength && charCount >= maxLength
                ? "text-red-500 dark:text-red-400 font-semibold"
                : charCount > 0 && maxLength && charCount >= maxLength * 0.9
                  ? "text-yellow-500 dark:text-yellow-400"
                  : "text-gray-400 dark:text-gray-500"
            }`}
          >
            {charCount}
            {maxLength ? ` / ${maxLength}` : ""}
          </span>
        )}
      </div>
    </div>
  );
};

export default Textarea;
