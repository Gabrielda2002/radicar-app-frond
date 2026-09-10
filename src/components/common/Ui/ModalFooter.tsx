import clsx from 'clsx';
import React from 'react'

interface ModalFooterProps {
    children?: React.ReactNode;
    className?: string;
    variant?: 'default' | 'form';
}

const ModalFooter: React.FC<ModalFooterProps> = ({
    children,
    className = '',
    variant = 'default',
}) => {

    const variantClasses = {
    default: "flex items-center justify-end w-full gap-2 p-4 bg-white dark:bg-gray-800",
    form: "flex items-center justify-end w-full gap-2 p-2 text-sm font-semibold bg-gray-200 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white"
  };

  return (
    <div
        className={clsx(variantClasses[variant], className)}
    >
        {children}
    </div>
  )
}

export default ModalFooter
