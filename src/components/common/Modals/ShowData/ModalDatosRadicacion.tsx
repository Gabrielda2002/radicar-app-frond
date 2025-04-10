import { IRadicados } from "@/models/IRadicados";
import useAnimation from "@/hooks/useAnimations";
import { useAuth } from "@/context/authContext";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import { FormatDate } from "@/utils/FormatDate";

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
  const { showAnimation, closing } = useAnimation(isOpen, onClose);
  const { rol } = useAuth();
  useBlockScroll(isOpen);
  if (!isOpen || !radicacion) return null;

  return (
    <div className="fixed z-50 flex justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
      <section>
        <div
          className={`z-10 w-[430px] md:w-[1000px] bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800 ${
            showAnimation && !closing
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* container-header */}
          <div className="flex items-center justify-between px-2 pt-4 pb-4 bg-gray-200 border-b-2 border-black dark:border-white dark:bg-gray-800">
            <h2 className="p-2 text-2xl font-semibold text-color dark:text-gray-200">
              Tabla Completa De Datos
            </h2>
            <button
              onClick={onClose}
              className="text-xl text-gray-500 duration-200 rounded-md hover:text-gray-900 dark:text-gray-100 hover:bg-gray-400 w-7 h-7 dark:hover:bg-gray-300 dark:hover:text-gray-800"
            >
              &times;
            </button>
          </div>

          {/* Contenedor para las dos tablas en columnas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[70vh] overflow-auto p-2">
            {/* Primera tabla */}
            <table className="mt-2 mb-8 text-sm border-2 rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300"></tr>
              </thead>

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
                  <td className="">
                    {FormatDate(radicacion.orderDate, false)}
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">
                    Remisión de IPS
                  </td>
                  <td className="">{radicacion.ipsPrimaria}</td>
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
                  <td className="bg-gray-400 dark:bg-gray-600">
                    Tipo Servicios
                  </td>
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
                  <td className="">
                    {FormatDate(radicacion.auditDate, false)}
                  </td>
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
              <thead></thead>

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
                  <td className="bg-gray-400 dark:bg-gray-600">
                    N.º Documento
                  </td>
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
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 dark:text-gray-300"></tr>
              </thead>

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

            {/* Segunda tabla */}
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

          {/* container-footer */}
          <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-medium bg-gray-200 border-t-2 border-black dark:border-white h-14 dark:bg-gray-800">
            <button
              onClick={onClose}
              className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModalMostrarDatos;
