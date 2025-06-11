//*Funciones y Hooks
import React, { useMemo, useState } from "react";
import { useDownloadReport } from "../hooks/UseDownloadReport";
import { useFetchStatus } from "@/hooks/UseFetchStatus";
import { useAuth } from "@/context/authContext";
import ModalDefault from "@/components/common/Ui/ModalDefault";
//*Icons
// import back from "../../../assets/icons/back.svg";
interface ModalReporteRadicadoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalGestionReportes: React.FC<ModalReporteRadicadoProps> = ({
  isOpen,
  onClose,
}) => {
  const { rol } = useAuth();

  // hook que trae los estados de CUPS
  const loadEstados = true;
  const { dataEstados, errorEstados } = useFetchStatus(loadEstados);

  // const [showSecondModal, setShowSecondModal] = useState(false);
  const [dateStartRadicado, setDateStartRadicado] = useState("");
  const [dateEndRadicado, setDateEndRadicado] = useState("");
  const [cupsCode, setCupsCode] = useState("");
  const [estadoCups, setEstadoCups] = useState("");

  // Estado para manejar el tipo de reporte
  const [reportType, setReportType] = useState("");

  const { downloadReport, error, loading } = useDownloadReport();

  const handleDownloadReport = async () => {
    try {
      const endPoint: string =
        reportType == "1"
          ? "report-excel-filtro"
          : reportType == "2"
          ? "report-excel-gestion-auxiliar"
          : reportType == "3"
          ? "report-breakes-active"
          : reportType == "4"
          ? "report/excel/biometric"
          : reportType === "5"
          ? "report-excel-cirugias-filtro"
          : "report/tickets";
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

  const isDownloadDisabled = useMemo(() => {
    return !dateStartRadicado && !dateEndRadicado && !cupsCode && !estadoCups;
  }, [dateStartRadicado, dateEndRadicado, cupsCode, estadoCups]);

  // if (!isOpen && !showAnimation) return null;

  return (
    <>
      <ModalDefault
        isOpen={isOpen}
        onClose={onClose}
        funtionClick={() => handleDownloadReport()}
        title={"Generar Reportes"}
        size="md"
        submitText={"Descargar"}
        isSubmitting={loading}
        isValid={!isDownloadDisabled}
      >
        {/* init-form */}
        <div className="px-4">
          <div className="flex items-center mt-4 mb-4">
            <label className="block text-xl font-medium text-blue-500 dark:text-white">
              Opciones de Reporte:
            </label>
            <select
              name="reportType"
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring dark:ring-gray-500 dark:focus:bg-slate-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Seleccione</option>
              <option value="1">Radicados</option>
              <option value="2">Gestion Servicios Radicados</option>
              <option value="3">Pausas Activas</option>
              <option value="4">Registros Biométricos</option>
              <option value="5">Cirugía</option>
              {[1].includes(Number(rol)) && (
                <option value="6">Tickets Mesa de Ayuda</option>
              )}
            </select>
          </div>
          {/* rango fecchas radicado */}
          <div className="mb-8">
            <h3 className="block mb-4 text-gray-700 dark:text-gray-300">
              Seleccione el rango del periodo de reporte:
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300">
                  Inicio:
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
                  Fin:
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
          {reportType == "1" && (
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
          )}
          {/* estado de cups radicados */}
          {reportType == "1" && (
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
          )}
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </ModalDefault>
    </>
  );
};

export default ModalGestionReportes;
