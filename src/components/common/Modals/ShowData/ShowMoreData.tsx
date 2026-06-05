import { IRadicados } from "@/models/IRadicados";
import { useAuth } from "@/context/authContext";
import { FormatDate } from "@/utils/FormatDate";
import ModalDefault from "../../Ui/ModalDefault";
import { getColorStatus } from "@/featuures/Radicacion/utils/getColorStatus";

interface ShowMoreDataProps {
  isOpen: boolean;
  onClose: () => void;
  radicacion: IRadicados | null;
}

const infoRow = (label: string, value: React.ReactNode) => (
  <tr>
    <td className="px-3 py-2 text-sm font-semibold text-gray-700 bg-gray-300 dark:bg-gray-600 dark:text-gray-300 whitespace-nowrap">
      {label}
    </td>
    <td className="px-3 py-2 text-sm text-gray-800 bg-white dark:text-gray-200 dark:bg-gray-800">
      {value}
    </td>
  </tr>
);

const ShowMoreData: React.FC<ShowMoreDataProps> = ({
  isOpen,
  onClose,
  radicacion,
}) => {
  const { rol } = useAuth();
  if (!isOpen || !radicacion) return null;

  return (
    <div>
      <ModalDefault
        isOpen={isOpen}
        onClose={onClose}
        title="Datos completos de Radicación"
        size="lg"
        cancelText="Cerrar"
      >
        <div className="max-h-[70vh] overflow-y-auto p-4 space-y-6">
          {/* Section: Radicación + Paciente */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <table className="self-start w-full text-sm border-2 border-gray-300 rounded-lg overflow-hidden dark:border-gray-700">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="px-3 py-2 text-left text-white bg-gray-600 dark:bg-gray-700"
                  >
                    Datos de Radicación
                  </th>
                </tr>
              </thead>
              <tbody className="dark:text-gray-200">
                {infoRow("Lugar Radicación", radicacion.radicacionPlace)}
                {infoRow("Fecha Orden", FormatDate(radicacion.orderDate, false))}
                {infoRow("Remisión de IPS", radicacion.ipsRemitente)}
                {infoRow("Profesional", radicacion.professionalName)}
                {infoRow("Especialidad", radicacion.specialty)}
                {infoRow("Grupo Servicios", radicacion.groupServices)}
                {infoRow("Tipo Servicios", radicacion.typeServices)}
                {infoRow("Auxiliar Radicador", radicacion.radicador)}
                {infoRow("Auditora", radicacion.auditNotes)}
                {infoRow("Fecha Auditoría", FormatDate(radicacion.auditDate, false))}
                {[1, 3].includes(Number(rol)) &&
                  infoRow("Justificación", radicacion.justification)}
              </tbody>
            </table>

            <table className="self-start w-full text-sm border-2 border-gray-300 rounded-lg overflow-hidden dark:border-gray-700">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="px-3 py-2 text-left text-white bg-gray-600 dark:bg-gray-700"
                  >
                    Datos del Paciente
                  </th>
                </tr>
              </thead>
              <tbody className="dark:text-gray-200">
                {infoRow("Fecha - Hora Radicado", FormatDate(radicacion.createdAt))}
                {infoRow("N.º Radicado", radicacion.id)}
                {infoRow("Nombre paciente", radicacion.namePatient)}
                {infoRow("N.º Documento", radicacion.documentNumber)}
                {infoRow("Celular", radicacion.phoneNumber)}
                {infoRow("Correo Electrónico", radicacion.email)}
                {infoRow("Dirección", radicacion.address)}
                {infoRow("Convenio", radicacion.convenioName)}
                {infoRow("IPS Primaria", radicacion.ipsPrimaria)}
              </tbody>
            </table>
          </div>

          {/* Section: CUPS */}
          {radicacion.cups.length > 0 && (
            <div>
              <h4 className="mb-3 text-lg font-semibold text-gray-700 dark:text-white">
                CUPS Autorizados
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-h-[40vh] overflow-y-auto pr-1">
                {radicacion.cups.map((cup) => (
                  <div
                    key={cup.code}
                    className="flex flex-col border-l-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-blue-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold tracking-wide uppercase rounded bg-blue-600 text-white shrink-0">
                          CUPS
                        </span>
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                          {cup.code}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full shrink-0 ${
                          getColorStatus(cup.status)
                        }`}
                      >
                        {cup.status}
                      </span>
                    </div>

                    <p className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800">
                      {cup.description}
                    </p>

                    <div className="px-4 py-2.5 space-y-1.5">
                      {cup.observation && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Obs:</span> {cup.observation}
                        </p>
                      )}
                      {cup.functionalUnit && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">U. Funcional:</span> {cup.functionalUnit}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {radicacion.cups.length === 0 && (
            <div className="p-3 text-sm text-center text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400">
              Aún no se han cargado CUPS.
            </div>
          )}

          {/* Section: Cirugía */}
          {radicacion.surgery.length > 0 && (
            <div>
              <h4 className="mb-3 text-lg font-semibold text-blue-600 dark:text-blue-400">
                Datos de Cirugía
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {radicacion.surgery.map((cirugia) => (
                  <table
                    key={cirugia.id}
                    className="self-start w-full text-sm border-2 border-gray-300 rounded-lg overflow-hidden dark:border-gray-700"
                  >
                    <thead>
                      <tr>
                        <th
                          colSpan={2}
                          className="px-3 py-2 text-left text-white bg-blue-600 dark:bg-blue-700"
                        >
                          Cirugía
                        </th>
                      </tr>
                    </thead>
                    <tbody className="dark:text-gray-200">
                      {infoRow("Fecha Cirugía", FormatDate(cirugia.surgeryDate, false))}
                      {infoRow("Hora", cirugia.surgeryTime)}
                      {infoRow("IPS Cirugía", cirugia.ipsSurgery)}
                      {infoRow("Fecha paraclinico", FormatDate(cirugia.dateParaclinico, false))}
                      {infoRow("Fecha anestesiología", FormatDate(cirugia.dateAnestesiology, false))}
                      {infoRow("Especialista cirugía", cirugia.specialist)}
                      {infoRow("Observación", cirugia.observation)}
                    </tbody>
                  </table>
                ))}
              </div>
            </div>
          )}

          {/* Section: Seguimiento */}
          {radicacion.surgery[0]?.seguimiento.length > 0 && (
            <div>
              <h4 className="mb-3 text-lg font-semibold text-blue-600 dark:text-blue-400">
                Seguimiento de Cirugía
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-2 border-gray-300 rounded-lg overflow-hidden dark:border-gray-700">
                  <thead>
                    <tr className="bg-gray-500 dark:bg-gray-600">
                      <th className="px-4 py-2 text-sm font-semibold text-left text-white">Fecha Registro</th>
                      <th className="px-4 py-2 text-sm font-semibold text-left text-white">Observación</th>
                      <th className="px-4 py-2 text-sm font-semibold text-left text-white">Estado</th>
                      <th className="px-4 py-2 text-sm font-semibold text-left text-white">Responsable</th>
                    </tr>
                  </thead>
                  <tbody className="dark:text-gray-200">
                    {radicacion.surgery[0].seguimiento.map((seguimiento) => (
                      <tr key={seguimiento.id} className="border-t border-gray-200 dark:border-gray-700 even:bg-gray-50 dark:even:bg-gray-800">
                        <td className="px-4 py-2">{FormatDate(seguimiento.fechaCreacion)}</td>
                        <td className="px-4 py-2">{seguimiento.observation}</td>
                        <td className="px-4 py-2">{seguimiento.estado}</td>
                        <td className="px-4 py-2">{seguimiento.Nombre} {seguimiento.Apellido}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </ModalDefault>
    </div>
  );
};

export default ShowMoreData;