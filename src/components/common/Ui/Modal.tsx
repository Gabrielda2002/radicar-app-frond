import useAnimation from '@/hooks/useAnimations';
import { useBlockScroll } from '@/hooks/useBlockScroll';
import clsx from 'clsx';
import React from 'react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    children: React.ReactNode;
    closeOnBackdrop?: boolean;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    size = 'lg',
    children,
    closeOnBackdrop = false,
    className,
}) => {

    useBlockScroll(isOpen);

    const { showAnimation, closing } = useAnimation(
        isOpen,
        onClose
    );

  const sizeClasses = {
    sm: "w-[400px]",
    md: "w-[600px]",
    lg: "w-[420px] md:w-[1000px]",
    xl: "w-[420px] md:w-[1200px]",
    full: "w-full max-w-[95vw]"
  };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
        }
    }

    if (!isOpen) return null;

  return (
    <>
      <section 
        className={clsx(
            "fixed inset-0 z-50 flex justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm",
            showAnimation && !closing ? 'opacity-100' : 'opacity-0'
        )}
        onClick={handleBackdropClick}
      >
        <div
            className={clsx(
                "overflow-hidden transition-transform duration-300 transform bg-white rounded shadow-lg dark:bg-gray-800 h-fit",
                sizeClasses[size],
                showAnimation && !closing ? 'translate-y-0' : 'translate-y-10',
                className
            )}
        >
            {children}
        </div>
      </section>
    </>
  )
}

export default Modal
