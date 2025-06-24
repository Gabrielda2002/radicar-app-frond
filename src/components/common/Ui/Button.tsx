import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "closed" | "secondary" | "danger" | "success" | "ghost" | "outline" | "any";
  size?: "xs"| "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  className,
  disabled,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  icon,
  iconPosition = "left",
  children,
  ...props
}) => {
  const variantClasses = {
    primary:
      "text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600",
    closed:
      "text-blue-400 duration-200 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-600 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200",
    secondary:
      "text-gray-600 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 border-2 border-gray-400 focus:ring-gray-500",
    danger:
      "text-white bg-red-500 hover:bg-red-600 active:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 border-2 border-transparent focus:ring-red-500",
    success:
      "text-white bg-green-500 hover:bg-green-600 active:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 border-2 border-transparent focus:ring-green-500",
    ghost:
      "text-blue-400 hover:text-red-500 hover:border-red-500 active:text-red-600 dark:text-gray-200 dark:hover:text-gray-200 border-2 border-gray-400 bg-transparent focus:ring-blue-500",
    outline:
      "text-gray-600 bg-transparent hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 border-2 border-gray-400 focus:ring-gray-500",
    any: ""
  };

  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-2 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const disabledClasses =
    disabled || isLoading ? "opacity-50 cursor-not-allowed" : "";

    const renderSpinner = () => (
      <svg
          className="animate-spin h-5 w-5 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
    );

    const renderContent = () => {
      
      if (isLoading)  {
        return (
          <div className="flex items-center justify-center">
            <span className="mr-2">{renderSpinner()}</span>
            {children}
          </div>
        );
      }

      if (icon)  {
        return (
          <div className="flex items-center justify-center">
            {iconPosition === "left" && <span className="mr-2">{icon}</span>}
            {children}
            {iconPosition === "right" && <span className="ml-2">{icon}</span>}
          </div>
        );
      }

      return children;

    }

  return (
    <button
      className={clsx(
        "duration-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium inline-flex items-center justify-center",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        disabledClasses,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
