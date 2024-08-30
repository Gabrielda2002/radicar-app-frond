import React, { useState, useEffect } from "react";
import { useModalReport } from "../../../hooks/useReport";
import close from "/assets/close.svg";
import back from "/assets/back.svg";
import { useDownloadReport } from "../../../hooks/useDownloadReport";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: "Autorizacion" | "Radicacion";
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, formType }) => {
  const { formValues, handleChange, handleSubmit } = useModalReport();
const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { formValues, opcionesReportes, handleChange } =
    useModalReport();
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const [dateStartRadicado, setDateStartRadicado] = useState("");
  const [dateEndRadicado, setDateEndRadicado] = useState("");
  const [cupsCode, setCupsCode] = useState("");

  const { downloadReport,error } = useDownloadReport();

  // * funcion para descargar el archivo y enviar datos al servidor

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  }

  const handleDownloadReport = async () => {
    try {
      await downloadReport(dateStartRadicado, dateEndRadicado, cupsCode);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (isOpen) {
      setShowAnimation(true);
    } else {
      setShowAnimation(false);
      setTimeout(() => onClose(), 300);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen && !showAnimation) return null;

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
      setTimeout(() => onClose(), 300);
    }
  };

  const handleGenerateClick = () => {
    setShowSecondModal(true);
  };

  const handleBackClick = () => {
    setShowSecondModal(false);
  };

  const modalTitle =
    formType === "Autorizacion" ? "Autorizacion Reporte" : "Reporte Excel";

  return (
    <div
      className={`fixed z-50 flex items-center justify-center bg-black -inset-5 bg-opacity-40 transition-opacity duration-300 backdrop-blur-sm ${
        showAnimation ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOutsideClick}
    >
      <div
        className={`w-auto p-10 bg-white rounded-lg shadow-lg dark:bg-gray-900 transform transition-transform duration-300 ${
          showAnimation
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0"
        }`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => {
              setShowAnimation(false);
              setTimeout(onClose, 300);
            }}
          >
            <img className="w-5 h-5 dark:invert" src={close} alt="close" />
          </button>
        </div>
        <div className="flex flex-row">
          <h2 className="mb-6 text-xl font-semibold text-color dark:text-white">
            {modalTitle}
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          {!showSecondModal ? (
            <>
              <div className="mb-10">
                <label className="block mb-5 text-lg font-medium text-blue-500 dark:text-white">
                  Seleccione la fecha con la que desea hacer el filtrado
                </label>
                <select
                  name="reportOptions"
                  value={formValues.reportOptions}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">SELECCIONE</option>
                  <option value="Autorizacion">Autorizacion</option>
                  <option value="Radicacion">Radicacion</option>
                </select>
              </div>
            </>
          ) : (
            <div className="px-4">
              <button
                type="button"
                onClick={handleBackClick}
                className="flex items-center mb-6"
              >
                <img className="w-8 h-8 dark:invert" src={back} alt="back" />
              </button>
              <div className="mb-10">
                <label className="block mb-5 text-lg font-medium text-blue-500 dark:text-white">
                  {formValues.reportOptions === "Autorizacion"
                    ? "Código de Autorizacion"
                    : "Código de Radicacion"}
                </label>


                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-gray-700 dark:text-gray-300">
                      Inicio
                    </label>
                    <input
                      type="date"
                      name="dateStartRadicado"
                      onChange={(e) => setDateStartRadicado(e.target.value)}
                      className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 dark:text-gray-300">
                      Fin
                    </label>
                    <input
                      type="date"
                      name="dateEndRadicado"
                      onChange={(e) => setDateEndRadicado(e.target.value)}
                      className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>


              </div>
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-4 text-xl font-semibold text-color dark:text-white">
              Código CUPS:
            </label>
            <input
              type="text"
              name="cupsCode"
              onChange={(e) => {
                handleChange(e);
                setCupsCode(e.target.value);
              }
                }
              placeholder="Ingrese código"
              type="number"
              name="Numcups"
              value={formValues.Numcups}
              onChange={handleChange}
              placeholder="Ingrese código..."
              className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setShowAnimation(false);
                setTimeout(onClose, 300);
              }}
              className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Cerrar
            </button>
            {!showSecondModal ? (
              <button
                type="button"
                onClick={handleGenerateClick}
                className={`px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 ${
                  !formValues.reportOptions
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!formValues.reportOptions} // Deshabilita si no hay opción seleccionada
              >
                Generar
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                onClick={handleDownloadReport}
              >
                Descargar
              </button>
            )}
          </div>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Modal;
