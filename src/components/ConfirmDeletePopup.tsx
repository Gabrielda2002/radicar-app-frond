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
      className={`fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        condicClase ? " backdrop-blur-sm" : ""
      }`}
    >
      <div className=" bg-gray-200 overflow-hidden rounded shadow-lg ">
        {/* header */}
        <div className="flex justify-between space-x-24 mb-4 bg-red-600 p-2">
          <h1 className="text-xl font-semibold text-white">
            Confirmación de Eliminación
          </h1>
          <button

            onClick={onClose}
            className="text-xl text-gray-200 hover-gray-700 pr-2"
          >
            &times;
          </button>
        </div>

        {/* content */}
        <div className="grid grid-cols-2 -space-x-36 px-2 ms-2">
          <img src={danger} alt="" className="-top-8 htext-red-400" />
          <h2 className="mb-4 text-lg text-stone-800 font-semibold pb-2">
            ¿Estas seguro de eliminar {iteamName}?
          </h2>
        </div>

        {/* footer */}
        <div className="flex justify-end space-x-2 p-2">
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
