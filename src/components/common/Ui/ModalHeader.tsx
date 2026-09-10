import clsx from "clsx";
import React from "react";

interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  showCloseButton = true,
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-between p-4 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white",
        className
      )}
    >
      <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
        {title}
      </h1>
      <div className="flex items-center gap-2">
        {children}
        {showCloseButton && onClose && (
          <button
            type="button"
            aria-label="Cerrar modal"
            className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalHeader;
