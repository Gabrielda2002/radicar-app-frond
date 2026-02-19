import React from "react";

import ModalDefault from "../Ui/ModalDefault";

interface ConfirmDeletePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  isDeleting?: boolean;
}

const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = "este elemento",
  isDeleting = false,
}) => {
  if (!isOpen) return null;

  return (
    <ModalDefault
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title="Confirmar eliminación"
      footerVariant="form"
      funtionClick={onConfirm}
      submitText="Confirmar"
      showSubmitButton={true}
      isSubmitting={isDeleting}
    >
      <div className="flex items-start gap-4 py-2">
        {/* Icono de Advertencia */}
        <div className="shrink-0">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full dark:bg-red-900/30">
            <svg 
              className="w-6 h-6 text-red-600 dark:text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 space-y-3">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            ¿Estás seguro de eliminar "{itemName}"?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Esta acción es permanente y no se puede deshacer. El elemento será eliminado 
            de forma definitiva del sistema.
          </p>
        </div>
      </div>
    </ModalDefault>
  );
};

export default ConfirmDeletePopup;
