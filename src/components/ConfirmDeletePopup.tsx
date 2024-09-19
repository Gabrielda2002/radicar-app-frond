import React from "react";

import danger from "../../public/assets/danger.svg";

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
  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        condicClase ? " backdrop-blur-sm" : ""
      }`}
    >
      <div className="overflow-hidden bg-gray-200 rounded shadow-lg ">
        {/* header */}
        <div className="flex justify-between p-2 mb-4 space-x-24 bg-red-600">
          <h1 className="text-xl font-semibold text-white">
            Confirmación de Eliminación
          </h1>
          <button

            onClick={onClose}
            className="pr-2 text-xl text-gray-200 hover-gray-700"
          >
            &times;
          </button>
        </div>

        {/* content */}
        <div className="grid grid-cols-2 px-2 -space-x-36 ms-2">
          <img src={danger} alt="" className="-top-8 htext-red-400" />
          <h2 className="pb-2 mb-4 text-lg font-semibold text-stone-800">
            ¿Estas seguro de eliminar {iteamName}?
          </h2>
        </div>

        {/* footer */}
        <div className="flex justify-end p-2 space-x-2">
          <button
            className="px-4 py-2 text-gray-800 bg-gray-300 rounded hover:bg-gray-400 active:bg-gray-500"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 active:bg-red-700"
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
