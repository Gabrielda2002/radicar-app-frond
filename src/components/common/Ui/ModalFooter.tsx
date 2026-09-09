import clsx from "clsx";
import React from "react";

interface ModalFooterProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "form";
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = "",
  variant = "default",
}) => {
  const baseClasses = {
    default: "flex items-center justify-end w-full gap-2 p-4",
    form: "flex items-center justify-end w-full gap-2 p-2 text-sm font-semibold h-14",
  };

  const defaultStyle = {
    default: "bg-white dark:bg-gray-800",
    form: "border-t border-[#ccebec] bg-[#f5fbfb] dark:border-gray-600 dark:bg-gray-700",
  };

  return (
    <div
      className={clsx(
        baseClasses[variant],
        !className && defaultStyle[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export default ModalFooter;