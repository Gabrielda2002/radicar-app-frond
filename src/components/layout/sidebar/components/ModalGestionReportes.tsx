//*Funciones y Hooks
import React, { useEffect, useMemo, useState } from "react";
import { useDownloadReport } from "../hooks/UseDownloadReport";
import { useFetchStatus } from "@/hooks/UseFetchStatus";
import ModalDefault from "@/components/common/Ui/ModalDefault";
import Select from "@/components/common/Ui/Select";
import Input from "@/components/common/Ui/Input";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import { useAuth } from "@/context/authContext";
interface ModalReporteRadicadoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalGestionReportes: React.FC<ModalReporteRadicadoProps> = ({
  isOpen,
  onClose,
}) => {

  const { rol } = useAuth();

    const user = localStorage.getItem("user");

  const headquarterCurrentUser = user ? JSON.parse(user).headquartersId : "";
  console.log("headquarterCurrentUser", headquarterCurrentUser);

  const loadEstados = true;
  const { dataEstados, errorEstados } = useFetchStatus(loadEstados);

  // const [showSecondModal, setShowSecondModal] = useState(false);
  const [dateStartRadicado, setDateStartRadicado] = useState("");
  const [dateEndRadicado, setDateEndRadicado] = useState("");
  const [cupsCode, setCupsCode] = useState("");
  const [estadoCups, setEstadoCups] = useState("");
  const [headquarter, setHeadquarter] = useState<number>(0);

  // Estado para manejar el tipo de reporte
  const [reportType, setReportType] = useState("");
  
  useEffect(() => {
    if (rol && Number(rol) === 21) {
      setHeadquarter(Number(headquarterCurrentUser));
    }
  }, []);

  const { downloadReport, error, loading } = useDownloadReport();

  const REPORT_ENDPOINTS: Record<string, string> = {
    "1": "report-excel-filtro",
    "2": "report-excel-gestion-auxiliar", 
    "3": "report-breakes-active",
    "4": "report/excel/biometric",
    "5": "report-excel-cirugias-filtro",
    "6": "report/tickets",
    "7": "reporte/demanda/inducida",
    "8": "report/equipments",
    "9": "report/device-red",
    "10": "report/general-inventory",
    "11": "report/tv",
    "12": "report/phones",
  };

  const handleDownloadReport = async () => {
    try {
      const endPoint: string = REPORT_ENDPOINTS[reportType] || "reporte/demanda/inducida";
      
      await downloadReport(
        dateStartRadicado,
        dateEndRadicado,
        cupsCode,
        endPoint,
        headquarter,
        estadoCups,
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
        showSubmitButton={true}
      >
        {/* init-form */}
        <div className="px-4">
          <div className="flex items-center mt-4 mb-4">
            <Select
              label="Tipo de Reporte"
              options={[
                { value: "1", label: "Radicados" },
                { value: "2", label: "Gestion Servicios Radicados" },
                { value: "3", label: "Pausas Activas" },
                { value: "4", label: "Registros Biométricos" },
                { value: "5", label: "Cirugía" },
                { value: "6", label: "Tickets Mesa de Ayuda" },
                { value: "7", label: "Demanda Inducida" },
                { value: "8", label: "Equipos" },
                { value: "9", label: "Dispositivos de Red" },
                { value: "10", label: "Inventario General" },
                { value: "11", label: "Televisores" },
                { value: "12", label: "Teléfonos" },
              ]}
              name="reportType"
              onChange={(e) => setReportType(e.target.value)}

            />
          </div>
          {/* rango fecchas radicado */}
          <div className="mb-8">
            <h3 className="block mb-4 text-gray-700 dark:text-gray-300">
              Seleccione el rango del periodo de reporte:
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="Fecha Inicio"
                  type="date"
                  name="dateStartRadicado"
                  onChange={(e) => setDateStartRadicado(e.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Fecha Fin"
                  type="date"
                  name="dateEndRadicado"
                  onChange={(e) => setDateEndRadicado(e.target.value)}
                />
              </div>
              {reportType == "7" && [1,20].includes(Number(rol)) && (
                <InputAutocompletado
                  label="Lugar Radicación"
                  onInputChanged={(value) =>
                    setHeadquarter(Number(value))
                  }
                  apiRoute="lugares-radicacion-name"
                  placeholder="Ej: Calle 15"
                />
              )}
            </div>
          </div>
          {/* Código CUPS */}
          {reportType == "1" && (
            <div className="mb-6">
              <Input
                label="Ingrese el código CUPS"
                type="text"
                name="cupsCode"
                onChange={(e) => {
                  setCupsCode(e.target.value);
                }}
                placeholder="Ingrese código..."
              />
            </div>
          )}
          {/* estado de cups radicados */}
          {reportType == "1" && (
            <div className="mb-6">
              <Select
                label="Estado CUPS"
                options={dataEstados?.map((estado) => ({
                  value: estado.id,
                  label: estado.name,
                }))}
                name="estadoCups"
                onChange={(e) => {
                  setEstadoCups(e.target.value);
                }}
              />
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
