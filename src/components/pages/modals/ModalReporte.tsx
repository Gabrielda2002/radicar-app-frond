//*Funciones y Hooks
import React, { useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
import { useModalReport } from "../../../hooks/useReport";
import { useDownloadReport } from "../../../hooks/useDownloadReport";
//*Icons
import back from "/assets/back.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: "Autorizacion" | "Radicacion";
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, formType }) => {
  const { formValues, handleChange } = useModalReport();
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [dateStartRadicado, setDateStartRadicado] = useState("");
  const [dateEndRadicado, setDateEndRadicado] = useState("");
  const [cupsCode, setCupsCode] = useState("");

  const { downloadReport, error } = useDownloadReport();
  const { showAnimation, closing } = useAnimation(isOpen, onClose); // Hook con estado de cierre

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // lógica de envío
  };

  const handleDownloadReport = async () => {
    try {
      await downloadReport(dateStartRadicado, dateEndRadicado, cupsCode);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowSecondModal(false);
      setTimeout(() => onClose(), 300);
    }
  };

  const modalTitle =
    formType === "Autorizacion" ? "Autorizacion Reporte" : "Reporte Excel";

  if (!isOpen && !showAnimation) return null;

  return (
    <div
      className={`fixed z-30 flex pt-20 justify-center bg-black -inset-5 bg-opacity-40 transition-opacity duration-300 backdrop-blur-sm ${
        showAnimation && !closing ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOutsideClick}
    >
      <section>
        <div
          className={`w-[600px]  bg-white rounded-md  overflow-hidden shadow-lg dark:bg-gray-900 transform transition-transform duration-300 ${
            showAnimation && !closing
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* container-header */}
          <div className="flex items-center justify-between  px-2 py-2 dark:bg-gray-900">
            <h2 className="text-xl font-semibold text-color dark:text-gray-200  ">
              {modalTitle}
            </h2>
            <button
              className="text-xl text-gray-500 hover-gray-700 pr-2"
              onClick={() => {
                setShowSecondModal(false);
                setTimeout(onClose, 300);
              }}
            >
              &times;
            </button>
          </div>

          {/* init-form */}
          <form onSubmit={handleSubmit} className="">
            {!showSecondModal ? (
              <>
                <div className="mb-8 px-6 mt-2">
                  <label className="flex mb-2  text-xl font-medium text-blue-500 dark:text-white">
                    Seleccione la fecha con la que desea hacer el filtrado
                  </label>
                  <select
                    name="reportOptions"
                    value={formValues.reportOptions}
                    onChange={handleChange}
                    className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">SELECCIONE</option>
                    <option value="Autorizacion">Autorización</option>
                    <option value="Radicacion">Radicación</option>
                  </select>
                </div>
              </>
            ) : (
              // secction-option
              <div className="px-4">
                <div className="flex ">
                  <div className=" w-10 pb-1 -ms-4">
                    <img
                      src={back}
                      alt="back"
                      onClick={() => setShowSecondModal(false)}
                      className="cursor-pointer w-8 "
                    />
                  </div>

                  <label className="block mb-5 text-xl font-medium text-blue-500 dark:text-white">
                    {formValues.reportOptions === "Autorizacion"
                      ? "Código de Autorización"
                      : "Código de Radicación"}
                  </label>
                </div>

                <div className="mb-8">
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

            {/* section-two */}
            <div className="mb-6 px-2">
              <label className="flex mb-2 text-xl font-semibold text-color dark:text-white">
                Código CUPS :
              </label>
              <input
                type="text"
                name="cupsCode"
                onChange={(e) => {
                  handleChange(e);
                  setCupsCode(e.target.value);
                }}
                placeholder="Ingrese código..."
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring dark:ring-gray-500 dark:focus:bg-slate-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* container-footer */}
            <div className="flex justify-end space-x-2 py-4 px-2">
              <button
                type="button"
                onClick={() => {
                  setShowSecondModal(false);
                  setTimeout(onClose, 300);
                }}
                className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Cerrar
              </button>
              {!showSecondModal ? (
                <button
                  onClick={() => setShowSecondModal(true)}
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
      </section>
    </div>
  );
};

export default Modal;
