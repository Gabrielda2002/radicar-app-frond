import React from "react";
import { useModalReport } from "../../../hooks/useReport"; // Asumiendo que el hook está en un archivo llamado useModalReport.ts
import close from "/assets/close.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { formValues, opcionesReportes, handleChange, handleSubmit } = useModalReport();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-auto p-10 bg-white rounded-lg shadow-lg dark:bg-gray-900">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <img className="w-5 h-5 dark:invert" src={close} alt="close" />
          </button>
        </div>
        <div className="flex flex-row">
          <h2 className="mb-6 text-xl font-semibold text-color dark:text-white">
            Reporte Excel
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-10">
            <label className="block mb-5 text-lg font-medium text-blue-500 dark:text-white">
              Seleccione la fecha con la que desea hacer el filtrado
            </label>
            <select
              name="reportOptions"
              value={formValues.reportOptions}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">SELECCIONE</option>
              {opcionesReportes.map((opcion, index) => (
                <option key={index} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-4 text-xl font-semibold text-color dark:text-white">
              Código CUPS:
            </label>
            <input
              type="text"
              name="Numcups"
              value={formValues.Numcups}
              onChange={handleChange}
              placeholder="Ingrese código"
              className="w-full border-2 border-gray-300 rounded focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
            >
              Generar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
