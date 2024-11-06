import { IRadicados } from "../../../models/IRadicados";
import useAnimation from "../../../hooks/useAnimations";
import { format  } from "date-fns";
import { toZonedTime } from "date-fns-tz";

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
  console.log(radicacion)
  const { showAnimation, closing } = useAnimation(isOpen, onClose);
  if (!isOpen || !radicacion) return null;

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    const utcDate = toZonedTime(date, 'America/Bogota'); // Reemplaza con la zona horaria deseada
    return format(utcDate, 'dd/MM/yyyy');
  };

  return (
    <div className="fixed z-50 flex justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
      <section>
        <div
          className={`z-10 w-[1200px]  bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800 ${
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
          <div className="grid grid-cols-2 gap-x-6 max-h-[70vh] overflow-auto px-4 gap-y-6">
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
                  <td className="">{radicacion.placeRelation.name}</td>
                </tr>
                <tr className="">
                  <td className="bg-gray-400 dark:bg-gray-600">
                    Fecha Orden
                  </td>
                  <td className="">{formatDate(radicacion.orderDate)}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">
                    Remisión de IPS
                  </td>
                  <td className="">{radicacion.ipsRemiteRelation.name}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">Profesional</td>
                  <td className="">{radicacion.profetional}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">Especialidad</td>
                  <td className="">{radicacion.specialtyRelation.name}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">
                    Grupo Servicios
                  </td>
                  <td className="">{radicacion.servicesGroupRelation.name}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">
                    Tipo Servicios
                  </td>
                  <td className="">{radicacion.servicesRelation.name}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">
                    Auxiliar Radicador
                  </td>
                  <td className="">{radicacion.usuarioRelation.name}</td>
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
                    {formatDate(radicacion.auditDate)}
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">
                    Justificación
                  </td>
                  <td className="">{radicacion.justify}</td>
                </tr>
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
                  <td className="">
                    {formatDate(radicacion.createdAt)}
                  </td>
                </tr>
                <tr className="">
                  <td className="bg-gray-400 dark:bg-gray-600">N.º Radicado</td>
                  <td className="">{radicacion.id}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">
                    Nombre paciente
                  </td>
                  <td className="">{radicacion.patientRelation.name}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">
                    N.º Documento
                  </td>
                  <td className="">
                    {radicacion.patientRelation.documentNumber}
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">Celular</td>
                  <td className="">{radicacion.patientRelation.phoneNumber}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">
                    Correo Electrónico
                  </td>
                  <td className="">{radicacion.patientRelation.email}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">Dirección</td>
                  <td className="">{radicacion.patientRelation.address}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">Convenio</td>
                  <td className="">
                    {radicacion.patientRelation.convenioRelation.name}
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">IPS Primaria</td>
                  <td className="">
                    {radicacion.patientRelation.ipsPrimariaRelation.name}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Tabla-cups */}
            <table className="mt-2 mb-8 text-sm border-2">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 dark:text-gray-300"></tr>
              </thead>

              {radicacion.cupsRadicadosRelation.length > 0 ? (
                radicacion.cupsRadicadosRelation.map((cups) => (
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
                      <td className="">{cups.DescriptionCode}</td>
                    </tr>
                    <tr>
                      <td className="bg-gray-400 dark:bg-gray-600">
                        Estado CUPS
                      </td>
                      <td>{cups.statusRelation.name}</td>
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
                      <td className="">{cups.functionalUnitRelation.name}</td>
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

            {radicacion.cirugiasRelation.length > 0 ? (
            <table className="mt-2 mb-8 text-sm border-2">
              {radicacion.cirugiasRelation.map((cirugia) => (
              <tbody key={cirugia.id} className="dark:text-gray-200">
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">Fecha Cirugía</td>
                  <td>{formatDate(cirugia.surgeryDate)}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">Hora</td>
                  <td>{cirugia.scheduledTime}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">IPS Cirugia</td>
                  <td>{cirugia.ipsRemite}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">Fecha paraclinico</td>
                  <td>{formatDate(cirugia.paraclinicalDate)}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">Fecha anestesiologia</td>
                  <td>{formatDate(cirugia.anesthesiologyDate)}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">Especialista cirugia</td>
                  <td>{cirugia.specialist}</td>
                </tr>
                <tr>
                  <td className="bg-gray-400 dark:bg-gray-600">Observación</td>
                  <td>{cirugia.observation}</td>
                </tr>
              </tbody>
              ))}
              </table>
            ): null}

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
