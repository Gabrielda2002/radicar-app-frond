import { useCallback, useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
import { useDownloadReport } from "../../../hooks/useDownloadReport";

interface ModalCirugiaProps {
  isOpen: boolean;
  onCLose: () => void;
}

const ModalReporteCirugia: React.FC<ModalCirugiaProps> = ({
  isOpen,
  onCLose,
}) => {
  const { downloadReport, error } = useDownloadReport();
  const { showAnimation, closing } = useAnimation(isOpen, onCLose);

  const [dateStartRadicado, setDateStartRadicado] = useState("");
  const [dateEndRadicado, setDateEndRadicado] = useState("");

  const handleOutsideClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Verificamos si el clic fue en el fondo (backdrop) y no en el contenido del modal
      if (e.target === e.currentTarget) {
        setTimeout(onCLose, 300);
      }
    },
    [onCLose]
  );

  const handleDownloadReport = async () => {
    try {
      const endPoint: string = "report-excel-cirugias-filtro";
      await downloadReport(dateStartRadicado, dateEndRadicado, null, endPoint);
    } catch (error) {
      console.log(error);
    }
  };

  const isDownloadDisabled = !dateStartRadicado || !dateEndRadicado;

  if (!isOpen && !showAnimation) return null;

  return (
    <div
      className={`fixed z-30 flex pt-14 justify-center bg-black -inset-5 bg-opacity-40 transition-opacity duration-300 backdrop-blur-sm  ${
        showAnimation && !closing ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOutsideClick}
    >
      <section>
        <div
          className={`w-[600px] bg-white rounded-md  overflow-hidden shadow-lg dark:bg-gray-800 transform transition-transform duration-300 ${
            showAnimation && !closing
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Container-header */}
          <div className="flex items-center justify-between p-4 dark:bg-gray-600">
            <h2 className="text-2xl font-semibold text-color dark:text-gray-200">
              Reporte Cirugía
            </h2>
            <button
              className="text-xl text-gray-500 duration-200 rounded-md w-7 h.7 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-300 dark:hover:text-gray-900"
              onClick={() => {
                setTimeout(onCLose, 300);
              }}
            >
              &times;
            </button>
          </div>

          {/* init-form */}
          <div className="p-4">
            <div className="mt-4 mb-4">
              <div className="grid grid-cols-2 gap-10">
                {/* Content Dates */}
                <div>
                  <label className="flex mb-2 text-base font-bold text-blue-500 dark:text-white after:content-['*'] after:ml-2 after:text-red-600">
                    Fecha Inicio
                  </label>
                  <input
                    type="date"
                    name="dateStartCirugia"
                    onChange={(e) => setDateStartRadicado(e.target.value)}
                    className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="flex mb-2 text-base font-bold text-blue-500 dark:text-white after:content-['*'] after:ml-2 after:text-red-600">
                    Fecha Fín
                  </label>
                  <input
                    type="date"
                    name="dateEndCirugia"
                    onChange={(e) => setDateEndRadicado(e.target.value)}
                    className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Content Footer */}
          <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-medium bg-white h-14 dark:bg-gray-600">
            <button
              type="button"
              onClick={() => {
                setTimeout(onCLose, 300);
              }}
              className="w-20 h-10 text-blue-400 duration-200 border-2 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              Cerrar
            </button>

            <button
              type="button"
              onClick={handleDownloadReport}
              disabled={isDownloadDisabled}
              className={`w-20 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-800 dark:hover:bg-gray-600 ${
                isDownloadDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Descargar
            </button>
          </div>
          {error && <div className="mt-4 text-red-500">{error}</div>}
        </div>
      </section>
    </div>
  );
};

export default ModalReporteCirugia;
