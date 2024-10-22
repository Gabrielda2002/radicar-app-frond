import { IRadicados } from "../../../models/IRadicados";
import useAnimation from "../../../hooks/useAnimations";

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
  if (!isOpen || !radicacion) return null;

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
          <div className="flex items-center justify-between px-2 pt-2 pb-4 dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-color dark:text-gray-200 ">
              Tabla Completa
            </h2>
            <button
              onClick={onClose}
              className="pr-2 text-xl text-gray-500 hover-gray-700"
            >
              &times;
            </button>
          </div>

          {/* Contenedor para las dos tablas en columnas */}
          <div className="grid grid-cols-2 gap-x-6 max-h-[70vh] overflow-auto px-4">
            {/* Primera tabla */}
            <table className="mt-2 mb-8 text-sm">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
                  <th className="">Campo</th>
                  <th className="">Valor</th>
                </tr>
              </thead>

              <tbody className="dark:text-gray-200 ">
                {/* estilo hacia "td(2)" */}
                <style>
                  {`tbody tr td:nth-child(2) {
                text-align: center; 
              }`}
                </style>

                <tr className="">
                  <td className="">Lugar Radicacion</td>
                  <td className="">{radicacion.placeRelation.name}</td>
                </tr>
                <tr>
                  <td className="">Remisión de IPS</td>
                  <td className="">{radicacion.ipsRemiteRelation.name}</td>
                </tr>
                <tr>
                  <td className="">Profesional</td>
                  <td className="">{radicacion.profetional}</td>
                </tr>
                <tr>
                  <td className="">Especialidad</td>
                  <td className="">{radicacion.specialtyRelation.name}</td>
                </tr>
                <tr>
                  <td className="">Grupo Servicios</td>
                  <td className="">{radicacion.servicesGroupRelation.name}</td>
                </tr>
                <tr>
                  <td className="">Tipo Servicios</td>
                  <td className="">{radicacion.servicesRelation.name}</td>
                </tr>
                <tr>
                  <td className="">Auxiliar Radicador</td>
                  <td className="">{radicacion.usuarioRelation.name}</td>
                </tr>
                <tr>
                  <td className="">Auditora</td>
                  <td className="">{radicacion.auditora}</td>
                </tr>
                <tr>
                  <td className="">Fecha Auditoría</td>
                  <td className="">
                    {radicacion.auditDate
                      ? new Date(radicacion.auditDate).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="">Justificación</td>
                  <td className="">{radicacion.justify}</td>
                </tr>
              </tbody>
            </table>

            {/* Segunda-tabla */}
            <table className="mt-2 mb-8 text-sm">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
                  <th className="">Campo</th>
                  <th className="">Valor</th>
                </tr>
              </thead>

              <tbody className="dark:text-gray-200">
                <tr>
                  <td className="">Fecha - Hora del Radicado</td>
                  <td className="">
                    {radicacion.createdAt
                      ? new Date(radicacion.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="">N.º Radicado</td>
                  <td className="">{radicacion.id}</td>
                </tr>
                <tr>
                  <td className="">Nombre paciente</td>
                  <td className="">{radicacion.patientRelation.name}</td>
                </tr>
                <tr>
                  <td className="">N.º Documento</td>
                  <td className="">
                    {radicacion.patientRelation.documentNumber}
                  </td>
                </tr>
                <tr>
                  <td className="">Celular</td>
                  <td className="">{radicacion.patientRelation.phoneNumber}</td>
                </tr>
                <tr>
                  <td className="">Correo Electrónico</td>
                  <td className="">{radicacion.patientRelation.email}</td>
                </tr>
                <tr>
                  <td className="">Dirección</td>
                  <td className="">{radicacion.patientRelation.address}</td>
                </tr>
                <tr>
                  <td className="">Convenio</td>
                  <td className="">
                    {radicacion.patientRelation.convenioRelation.name}
                  </td>
                </tr>
                <tr>
                  <td className="">IPS Primaria</td>
                  <td className="">
                    {radicacion.patientRelation.ipsPrimariaRelation.name}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Tabla-cups */}
            <table className="mt-2 mb-8 text-sm">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
                  <th className="">Campo</th>
                  <th className="">Valor</th>
                </tr>
              </thead>

              {radicacion.cupsRadicadosRelation.length > 0 ? (
                radicacion.cupsRadicadosRelation.map((cups) => (
                  <tbody key={cups.code} className="dark:text-gray-200">
                    <tr>
                      <td className="">Código CUPS</td>
                      <td className="">{cups.code}</td>
                    </tr>
                    <tr>
                      <td className="">Descripción CUPS</td>
                      <td className="">{cups.DescriptionCode}</td>
                    </tr>
                    <tr>
                      <td>Estado CUPS</td>
                      <td>{cups.statusRelation.name}</td>
                    </tr>
                    <tr>
                      <td className="">Observiación CUPS</td>
                      <td className="">{cups.observation}</td>
                    </tr>
                    <tr>
                      <td className="">Unidad Funcional</td>
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
          </div>

          {/* container-footer */}
          <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-medium bg-white h-14 dark:bg-gray-800">
            <button
              onClick={onClose}
              className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-600"
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
