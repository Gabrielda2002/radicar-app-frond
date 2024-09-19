import { IRadicados } from "../../../models/IRadicados";


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
  if (!isOpen || !radicacion) return null;

  return (
    <div className="fixed z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
      <div className="z-10 w-[fit-content] p-4 bg-white rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-color">Crear Carpeta</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {/* Contenedor para las dos tablas en columnas */}
        <div className="flex space-x-4">
          {/* Primera tabla */}

          <table className="min-w-[50%] text-sm mb-4">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2">Campo</th>
                <th className="p-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Lugar Radicacion</td>
                <td className="p-2">{radicacion.placeRelation.name}</td>
              </tr>
              <tr>
                <td className="p-2">Remisión de IPS</td>
                <td className="p-2">{radicacion.ipsRemiteRelation.name}</td>
              </tr>
              <tr>
                <td className="p-2">Profesional</td>
                <td className="p-2">{radicacion.profetional}</td>
              </tr>
              <tr>
                <td className="p-2">Especialidad</td>
                <td className="p-2">{radicacion.specialtyRelation.name}</td>
              </tr>
              <tr>
                <td className="p-2">Grupo Servicios</td>
                <td className="p-2">{radicacion.servicesGroupRelation.name}</td>
              </tr>
              <tr>
                <td className="p-2">Tipo Servicios</td>
                <td className="p-2">{radicacion.servicesRelation.name}</td>
              </tr>
              <tr>
                <td className="p-2">Auxiliar Radicador</td>
                <td className="p-2">{radicacion.radicadorRelation.name}</td>
              </tr>
              <tr>
                <td className="p-2">Auditora</td>
                <td className="p-2">{radicacion.auditora}</td>
              </tr>
              <tr>
                <td className="p-2">Fecha Auditoría</td>
                <td className="p-2">
                  {radicacion.auditDate
                    ? new Date(radicacion.auditDate).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td className="p-2">Justificación</td>
                <td className="p-2">{radicacion.justify}</td>
              </tr>
            </tbody>
          </table>

          <table className="min-w-[50%] text-sm mb-4">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2">Campo</th>
                <th className="p-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Fecha - Hora del Radicado</td>
                <td className="p-2">
                  {radicacion.createdAt
                    ? new Date(radicacion.createdAt).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td className="p-2">N.º Radicado</td>
                <td className="p-2">{radicacion.id}</td>
              </tr>
              <tr>
                <td className="p-2">Nombre paciente</td>
                <td className="p-2">{radicacion.patientRelation.name}</td>
              </tr>
              <tr>
                <td className="p-2">N.º Documento</td>
                <td className="p-2">
                  {radicacion.patientRelation.documentNumber}
                </td>
              </tr>
              <tr>
                <td className="p-2">Celular</td>
                <td className="p-2">
                  {radicacion.patientRelation.phoneNumber}
                </td>
              </tr>
              <tr>
                <td className="p-2">Correo Electrónico</td>
                <td className="p-2">{radicacion.patientRelation.email}</td>
              </tr>
              <tr>
                <td className="p-2">Dirección</td>
                <td className="p-2">{radicacion.patientRelation.address}</td>
              </tr>
              <tr>
                <td className="p-2">Convenio</td>
                <td className="p-2">
                  {radicacion.patientRelation.convenioRelation.name}
                </td>
              </tr>
              <tr>
                <td className="p-2">IPS Primaria</td>
                <td className="p-2">
                  {radicacion.patientRelation.ipsPrimariaRelation.name}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="min-w-[50%] text-sm mb-4">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2">Campo</th>
                <th className="p-2">Valor</th>
              </tr>
            </thead>

            {radicacion.cupsRadicadosRelation.length > 0 ? (
              radicacion.cupsRadicadosRelation.map((cups) => (
                <tbody key={cups.code}>
                  <tr>
                    <td className="p-2">Codigo CUPS</td>
                    <td className="p-2">{cups.code}</td>
                  </tr>
                  <tr>
                    <td className="p-2">Descripcion CUPS</td>
                    <td className="p-2">{cups.DescriptionCode}</td>
                  </tr>
                  <tr>
                    <td className="p-2">Observiacion CUPS</td>
                    <td className="p-2">{cups.observation}</td>
                  </tr>
                  <tr>
                    <td className="p-2">Unidad Funcional</td>
                    <td className="p-2">{cups.functionalUnitRelation.name}</td>
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

        {/* Botones */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMostrarDatos;
