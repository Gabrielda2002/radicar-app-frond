import clsx from 'clsx';
import React from 'react'

interface ModalBodyProps {
    children?: React.ReactNode;
    className?: string;
    maxHeight?: string;
    scrollable?: boolean;
}

const ModalBody: React.FC<ModalBodyProps> = ({
    children,
    className = '',
    maxHeight = 'max-h-[74vh] md:max-h-[70vh]',
    scrollable = true,
}) => {
  return (
    <div
        className={clsx(
            "bg-gradient-to-b from-[#fbffff] to-white text-gray-800 dark:from-gray-800 dark:to-gray-800 dark:text-gray-200",
            scrollable && `${maxHeight} overflow-y-auto`,
            className
        )}
    >
        {children}
    </div>
  )
}

export default ModalBody
