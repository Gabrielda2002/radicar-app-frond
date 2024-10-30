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

const ModalReporteRadicado: React.FC<ModalProps> = ({ isOpen, onClose, formType }) => {
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
      const endPoint: string = "report-excel-filtro";
      await downloadReport(dateStartRadicado, dateEndRadicado, cupsCode, endPoint);
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
      className={`fixed z-30 flex pt-14 justify-center bg-black -inset-5 bg-opacity-40 transition-opacity duration-300 backdrop-blur-sm ${
        showAnimation && !closing ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOutsideClick}
    >
      <section>
        <div
          className={`w-[600px]  bg-white rounded-md  overflow-hidden shadow-lg dark:bg-gray-800 transform transition-transform duration-300 ${
            showAnimation && !closing
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* container-header */}
          <div className="flex items-center justify-between p-4 dark:bg-gray-600">
            <h2 className="text-2xl font-semibold text-color dark:text-gray-200 ">
              {modalTitle}
            </h2>
            <button
              className="text-xl text-gray-500 duration-200 rounded-md w-7 h-7 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-300 dark:hover:text-gray-900"
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
                <div className="px-6 mt-2 mb-8">
                  <label className="flex mb-2  text-xl font-bold text-blue-500 dark:text-white after:content-['*'] after:ml-2 after:text-red-600">
                    Fecha Filtrado:
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
                <div className="flex items-center mt-4 mb-4">
                  <div className="flex items-center mr-2">
                    <img
                      src={back}
                      alt="back"
                      onClick={() => setShowSecondModal(false)}
                      className="w-8 duration-300 rounded-lg cursor-pointer dark:hover:bg-gray-300 hover:bg-gray-200"
                    />
                  </div>

                  <label className="block text-xl font-medium text-blue-500 dark:text-white">
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
            <div className="px-6 mb-6">
              <label className="flex mb-2 text-xl font-semibold text-blue-500 dark:text-white after:content-['*'] after:ml-2 after:text-red-600">
                Código CUPS:
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
            <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-medium bg-white h-14 dark:bg-gray-600">
              <button
                type="button"
                onClick={() => {
                  setShowSecondModal(false);
                  setTimeout(onClose, 300);
                }}
                className="w-20 h-10 text-blue-400 duration-200 border-2 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                Cerrar
              </button>
              {!showSecondModal ? (
                <button
                  onClick={() => setShowSecondModal(true)}
                  className={`w-20 h-10 border-2 duration-200 dark:hover:border-gray-900 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-800 dark:hover:bg-gray-600 ${
                    !formValues.reportOptions
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={!formValues.reportOptions} // Deshabilita si no hay opción seleccionada
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-20 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-800 dark:hover:bg-gray-600"
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

export default ModalReporteRadicado;
