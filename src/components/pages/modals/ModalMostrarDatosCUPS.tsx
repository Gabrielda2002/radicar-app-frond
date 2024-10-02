import { IStatusCup } from "../../../models/IAuditar";
import useAnimation from "../../../hooks/useAnimations";
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
  const { showAnimation, closing } = useAnimation(isOpen, onClose);
  if (!isOpen || !data) return null;

  return (
    <div className="fixed z-50 flex justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
      <section>
        <div
          className={`z-10 w-[fit-content] bg-white rounded  overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800 ${
            showAnimation && !closing
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* container-header */}
          <div className="flex items-center justify-between px-2 py-2 dark:bg-gray-800 ">
            <h2 className="text-xl font-semibold text-color dark:text-gray-200 ">
              CUPS
            </h2>
            <button
              onClick={onClose}
              className="pr-2 text-xl text-gray-500 hover-gray-700"
            >
              &times;
            </button>
          </div>

          {/* Contenedor para las dos tablas en columnas */}
          <div className="max-h-[78vh] overflow-auto px-2">
            {/* Primera tabla */}

            <table className="min-w-[50%] text-sm mb-4">
              <thead className="">
                <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300 ">
                  <th className="">Código</th>
                  <th className="">Descripción</th>
                  <th className="">Estado</th>
                  <th className="">Unidad Funcional CUPS</th>
                </tr>
              </thead>

              {data.map((cups) => (
                <tbody className="text-center dark:text-gray-200">
                  <tr>
                    <td className="">{cups.code}</td>
                    <td className="">{cups.description}</td>
                    <td className="">{cups.status}</td>
                    <td className="">{cups.unidadFuncional}</td>
                  </tr>
                </tbody>
              ))}
            </table>

            {/* Segunda tabla */}
          </div>

          {/* Botones */}
          <div className="flex items-center justify-end w-full px-4 py-4 text-sm font-medium bg-white h-14 dark:bg-gray-800">
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

export default ModalMostrarDatosCUPS;
