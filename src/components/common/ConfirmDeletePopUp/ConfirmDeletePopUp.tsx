import React from "react";

import { useBlockScroll } from "@/hooks/useBlockScroll";

interface ConfirmDeletePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  iteamName?: string; //prop? cambio de nombre
  condicClase?: true; //prop? classe filter
}

const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  condicClase,
  iteamName = "la foto",
}) => {

  useBlockScroll(isOpen);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        condicClase ? " backdrop-blur-sm" : ""
      }`}
    >
      <div className="overflow-hidden bg-gray-200 rounded shadow-lg max-w-sm w-full dark:bg-gray-800 ">
        {/* header */}
        <div className="flex justify-between p-2 mb-4 space-x-24 bg-gray-200 border-b-2 border-b-gray-900 dark:bg-gray-600 dark:border-b-white ">
          <h1 className="text-xl font-semibold text-white"></h1>
          <button
            type="button"
            onClick={onClose}
            className="text-xl text-gray-400 duration-300 rounded-md w-7 h-7 hover:bg-gray-400 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-900"
          >
            &times;
          </button>
        </div>

        {/* content */}
        <div className="grid grid-cols-2 px-2 -space-x-36 ms-2">
          <img src="/assets/danger.svg" alt="Warning icon" className="-top-8 htext-red-400" />
          <h2 className="pb-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            ¿Estas seguro de eliminar "{iteamName}"?
            <p className="col-span-2 text-xs text-gray-600 dark:text-gray-300">
              Este elemento se eliminará permanentemente y no podrá ser
              recuperado. Asegúrate de que realmente deseas eliminarlo.
            </p>
          </h2>
        </div>

        {/* footer */}
        <div className="flex justify-end p-2 space-x-2">
          <button
            className="px-4 py-2 text-gray-800 bg-gray-300 rounded hover:bg-gray-400 active:bg-gray-500 transition-colors duration-300"
            onClick={onClose}
            type="button"
          >
            Cancelar
          </button>
          <button
            type="button"
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-900 hover:text-gray-200 active:bg-red-700 transition-colors duration-300"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;
