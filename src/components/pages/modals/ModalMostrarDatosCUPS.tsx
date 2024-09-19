import { IStatusCup } from "../../../models/IAuditar";


interface ModalMostrarDatosProps {
  isOpen: boolean;
  onClose: () => void;
  data: IStatusCup[] | null;
}

const ModalMostrarDatosCUPS: React.FC<ModalMostrarDatosProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
      <div className="z-10 w-[fit-content] p-4 bg-white rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-color">CUPS</h2>
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
                <th className="p-2">Codigo</th>
                <th className="p-2">Descripcion</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Unidad Funcional CUPS</th>
              </tr>
            </thead>

            {data.map((cups) => (
            <tbody>
              <tr>
                <td className="p-2">{cups.code}</td>
                <td className="p-2">{cups.description}</td>
                <td className="p-2">{cups.status}</td>
                <td className="p-2">{cups.unidadFuncional}</td>
              </tr>
              
            </tbody>

            ))}

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

export default ModalMostrarDatosCUPS;
