//*Funciones y Hooks
import React, { useCallback, useMemo, useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
import { useDownloadReport } from "../../../hooks/useDownloadReport";
import { useFetchEstados } from "../../../hooks/useFetchUsers";
//*Icons
// import back from "../../../assets/icons/back.svg";
interface ModalReporteRadicadoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalReporteRadicado: React.FC<ModalReporteRadicadoProps> = ({
  isOpen,
  onClose,
}) => {

  // hook que trae los estados de CUPS
  const loadEstados = true;
  const { dataEstados, errorEstados } = useFetchEstados(loadEstados);

  // const [showSecondModal, setShowSecondModal] = useState(false);
  const [dateStartRadicado, setDateStartRadicado] = useState("");
  const [dateEndRadicado, setDateEndRadicado] = useState("");
  const [cupsCode, setCupsCode] = useState("");
  const [estadoCups, setEstadoCups] = useState("");

  const { downloadReport, error } = useDownloadReport();
  const { showAnimation, closing } = useAnimation(isOpen, onClose); // Hook con estado de cierre

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    // lógica de envío
  }, []);

  const handleDownloadReport = async () => {
    try {
      const endPoint: string = "report-excel-filtro";
      await downloadReport(
        dateStartRadicado,
        dateEndRadicado,
        cupsCode,
        endPoint,
        estadoCups
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        // setShowSecondModal(false);
        setTimeout(() => onClose(), 300);
      }
    },
    [onClose]
  );


  const isDownloadDisabled = useMemo(() => {
    return !dateStartRadicado && !dateEndRadicado && !cupsCode && !estadoCups;
  }, [dateStartRadicado, dateEndRadicado, cupsCode, estadoCups]);

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
              Reporte de Radicados
            </h2>
            <button
              className="text-xl text-gray-500 duration-200 rounded-md w-7 h-7 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-300 dark:hover:text-gray-900"
              onClick={() => {
                // setShowSecondModal(false);
                setTimeout(onClose, 300);
              }}
            >
              &times;
            </button>
          </div>

          {/* init-form */}
          <form onSubmit={handleSubmit} className="">
            <div className="px-4">
              <div className="flex items-center mt-4 mb-4">
                <label className="block text-xl font-medium text-blue-500 dark:text-white">
                  Opciones de Reporte
                </label>
              </div>
              {/* rango fecchas radicado */}
              <div className="mb-8">
                <h3 className="mb-4 block text-gray-700 dark:text-gray-300">
                  Seleccione el rango del periodo de reporte:
                </h3>
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
              {/* Código CUPS */}
              <div className="mb-6">
                <label className="flex mb-2 text-xl font-semibold text-blue-500 dark:text-white">
                  Código CUPS:
                </label>
                <input
                  type="text"
                  name="cupsCode"
                  onChange={(e) => {
                    setCupsCode(e.target.value);
                  }}
                  placeholder="Ingrese código..."
                  className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring dark:ring-gray-500 dark:focus:bg-slate-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              {/* estado de cups radicados */}
              <div className="mb-6">
                  <label className="flex mb-2 text-xl font-semibold text-blue-500 dark:text-white">
                    Estado de los servicios radicados:
                  </label>
                  <select
                    name="estadoCups"
                    onChange={(e) => {
                      setEstadoCups(e.target.value);
                    }}
                    className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring dark:ring-gray-500 dark:focus:bg-slate-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Seleccionar...</option>
                    {dataEstados?.map((estado) => (
                      <option key={estado.id} value={estado.id}>
                        {estado.name}
                      </option>
                    ))}
                  </select>
                  {errorEstados && (
                    <p className="mt-2 text-red-500">{errorEstados}</p>
                  )}
              </div>
            </div>

            {/* container-footer */}
            <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-medium bg-white h-14 dark:bg-gray-600">
              <button
                type="button"
                onClick={() => {
                  // setShowSecondModal(false);
                  setTimeout(onClose, 300);
                }}
                className="w-20 h-10 text-blue-400 duration-200 border-2 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className={`w-20 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-800 dark:hover:bg-gray-600 ${isDownloadDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleDownloadReport}
                disabled={isDownloadDisabled}
              >
                Descargar
              </button>
            </div>

            {error && <p className="mt-4 text-red-500">{error}</p>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default ModalReporteRadicado;
