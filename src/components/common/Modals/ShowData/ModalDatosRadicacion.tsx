import { IRadicados } from "@/models/IRadicados";
import { useAuth } from "@/context/authContext";
import { FormatDate } from "@/utils/FormatDate";
import ModalDefault from "../../Ui/ModalDefault";

interface ModalMostrarDatosProps {
  isOpen: boolean;
  onClose: () => void;
  radicacion: IRadicados | null;
}

const ModalMostrarDatos: React.FC<ModalMostrarDatosProps> = ({
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[70vh] overflow-auto p-4">
          {/* Primera tabla */}
          <table className="mt-2 mb-8 text-sm border-2 rounded-lg">
            <tbody className="dark:text-gray-200">
              {/* estilo hacia "td(2)" */}
              <style>
                {`tbody tr td:nth-child(2) {
                text-align: center; 
              }`}
              </style>

              <tr className="">
                <td className="bg-gray-400 dark:bg-gray-600">
                  Lugar Radicacion
                </td>
                <td className="">{radicacion.radicacionPlace}</td>
              </tr>
              <tr className="">
                <td className="bg-gray-400 dark:bg-gray-600">Fecha Orden</td>
                <td className="">{FormatDate(radicacion.orderDate, false)}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">
                  Remisión de IPS
                </td>
                <td className="">{radicacion.ipsRemitente}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">Profesional</td>
                <td className="">{radicacion.profetional}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">Especialidad</td>
                <td className="">{radicacion.specialty}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">
                  Grupo Servicios
                </td>
                <td className="">{radicacion.groupServices}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">Tipo Servicios</td>
                <td className="">{radicacion.typeServices}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">
                  Auxiliar Radicador
                </td>
                <td className="">{radicacion.radicador}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">Auditora</td>
                <td className="">{radicacion.auditora}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">
                  Fecha Auditoría
                </td>
                <td className="">{FormatDate(radicacion.auditDate, false)}</td>
              </tr>
              {[1, 3].includes(Number(rol)) && (
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">
                    Justificación
                  </td>
                  <td className="">{radicacion.justify}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Segunda-tabla */}
          <table className="mt-2 mb-8 text-sm border-2">
            <tbody className="bg-white dark:bg-gray-800 dark:text-gray-200">
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">
                  Fecha - Hora del Radicado
                </td>
                <td className="">{FormatDate(radicacion.createdAt)}</td>
              </tr>
              <tr className="">
                <td className="bg-gray-400 dark:bg-gray-600">N.º Radicado</td>
                <td className="">{radicacion.id}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">
                  Nombre paciente
                </td>
                <td className="">{radicacion.namePatient}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">N.º Documento</td>
                <td className="">{radicacion.documentNumber}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">Celular</td>
                <td className="">{radicacion.phoneNumber}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">
                  Correo Electrónico
                </td>
                <td className="">{radicacion.email}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">Dirección</td>
                <td className="">{radicacion.address}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">Convenio</td>
                <td className="">{radicacion.convenioName}</td>
              </tr>
              <tr>
                <td className="bg-gray-400 dark:bg-gray-600">IPS Primaria</td>
                <td className="">{radicacion.ipsPrimaria}</td>
              </tr>
            </tbody>
          </table>

          {/* Tabla-cups */}
          <table className="mt-2 mb-8 text-sm border-2">
            {radicacion.cups.length > 0 ? (
              radicacion.cups.map((cups) => (
                <tbody key={cups.code} className="dark:text-gray-200">
                  <tr>
                    <td className="bg-gray-400 dark:bg-gray-600">
                      Código CUPS
                    </td>
                    <td className="">{cups.code}</td>
                  </tr>
                  <tr>
                    <td className="bg-gray-400 dark:bg-gray-600">
                      Descripción CUPS
                    </td>
                    <td className="">{cups.description}</td>
                  </tr>
                  <tr>
                    <td className="bg-gray-400 dark:bg-gray-600">
                      Estado CUPS
                    </td>
                    <td>{cups.status}</td>
                  </tr>
                  <tr>
                    <td className="bg-gray-400 dark:bg-gray-600">
                      Observiación CUPS
                    </td>
                    <td className="">{cups.observation}</td>
                  </tr>
                  <tr>
                    <td className="bg-gray-400 dark:bg-gray-600">
                      Unidad Funcional
                    </td>
                    <td className="">{cups.functionalUnit}</td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td className="p-2">Aun no se cargan CUPS.</td>
                </tr>
              </tbody>
            )}
          </table>

          {/* surgery table */}
          {radicacion.surgery.length > 0 ? (
            <table className=" mt-2 mb-8 text-sm border-2">
              {radicacion.surgery.map((cirugia) => (
                <tbody key={cirugia.id} className="dark:text-gray-200">
                  <tr>
                    <td className="bg-gray-400 dark:bg-gray-600">
                      Fecha Cirugía
                    </td>
                    <td>{FormatDate(cirugia.surgeryDate, false)}</td>
                  </tr>
                  <tr>
                    <td className="bg-gray-400 dark:bg-gray-600">Hora</td>
                    <td>{cirugia.surgeryTime}</td>
                  </tr>
                  <tr>
                    <td className="bg-gray-400 dark:bg-gray-600">
                      IPS Cirugia
                    </td>
                    <td>{cirugia.ipsSurgery}</td>
                  </tr>
                  <tr>
                    <td className="bg-gray-400 dark:bg-gray-600">
                      Fecha paraclinico
                    </td>
                    <td>{FormatDate(cirugia.dateParaclinico, false)}</td>
                  </tr>
                  <tr>
                    <td className="bg-gray-400 dark:bg-gray-600">
                      Fecha anestesiologia
                    </td>
                    <td>{FormatDate(cirugia.dateAnestesiology, false)}</td>
                  </tr>
                  <tr>
                    <td className="bg-gray-400 dark:bg-gray-600">
                      Especialista cirugia
                    </td>
                    <td>{cirugia.specialist}</td>
                  </tr>
                  <tr>
                    <td className="bg-gray-400 dark:bg-gray-600">
                      Observación
                    </td>
                    <td>{cirugia.observation}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          ) : null}
          
          {/* monitoring surgery table */}
          {radicacion.surgery[0] &&
            radicacion.surgery[0].seguimiento.length > 0 && (
              <table className="col-span-2 min-w-[50%] border-2 text-sm mb-4 dark:text-gray-200">
                <thead className="">
                  <tr className="bg-gray-400 dark:bg-gray-600 dark:textgray-300">
                    <th>Fecha Registro</th>
                    <th>Observacion</th>
                    <th>Estado</th>
                    <th>Responsable</th>
                  </tr>
                </thead>

                <tbody className="text-center dark:text-gray-200">
                  {radicacion.surgery[0].seguimiento.map((seguimiento) => (
                    <tr key={seguimiento.id}>
                      <td>{FormatDate(seguimiento.fechaCreacion)}</td>
                      <td>{seguimiento.observation}</td>
                      <td>{seguimiento.estado}</td>
                      <td>
                        {seguimiento.Nombre} {seguimiento.Apellido}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </ModalDefault>
    </div>
  );
};

export default ModalMostrarDatos;
