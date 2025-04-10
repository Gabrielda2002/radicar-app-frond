import { IStatusCup } from "@/models/IAuditar";
import useAnimation from "@/hooks/useAnimations";
import { programacion } from "@/models/ICirugias";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import { FormatDate } from "@/utils/FormatDate";
interface ModalMostrarDatosProps {
  isOpen: boolean;
  onClose: () => void;
  data: IStatusCup[] | null;
  cirugias: programacion | null;
  dateOrder: Date | null;
}

const ModalMostrarDatosCUPS: React.FC<ModalMostrarDatosProps> = ({
  isOpen,
  onClose,
  data,
  cirugias,
  dateOrder,
}) => {
  const { showAnimation, closing } = useAnimation(isOpen, onClose);

  useBlockScroll(isOpen);

  if (!isOpen || (!data && !cirugias)) return null;

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
          <div className="flex items-center justify-between p-2 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
            <h2 className="p-3 text-2xl font-semibold text-color dark:text-gray-200">
              {data ? "Tabla CUPS" : "Programación Cirugía"}
            </h2>
            <button
              onClick={onClose}
              className="text-xl text-gray-500 duration-200 rounded-md w-7 h-7 hover:text-gray-900 hover:bg-gray-300 dark:hover:text-gray-900"
            >
              &times;
            </button>
          </div>

          {cirugias ? (
            <div className="max-h-[78vh] overflow-auto px-2">
              <table className="min-w-[50%] text-sm mb-4">
                <thead className="">
                  <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300 ">
                    <th className="">Fecha ordenamiento</th>
                    <th className="">Fecha Cirugia</th>
                    <th className="">Hora</th>
                    <th className="">IPS remite</th>
                    <th>Fecha paraclinico</th>
                    <th>Fecha anestesiologia</th>
                    <th>Especialista</th>
                    <th className="">Observacion</th>
                  </tr>
                </thead>
                <tbody className="text-center dark:text-gray-200">
                  <tr key={cirugias.id}>
                    <td>{FormatDate(dateOrder, false)}</td>
                    <td>{FormatDate(cirugias.fechaCirugia, false)}</td>
                    <td>{cirugias.hora}</td>
                    <td>{cirugias.ipsRemite}</td>
                    <td>{FormatDate(cirugias.fechaParaclinoco, false)}</td>
                    <td>{FormatDate(cirugias.fechaAnesteciologia, false)}</td>
                    <td>{cirugias.especialista}</td>
                    <td>{cirugias.observacion}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : !data ? (
            <div className="p-2 text-center text-stone-400 dark:text-stone-500">
              No se han generado seguimientos...
            </div>
          ) : null}

          {/* Contenedor para las dos tablas en columnas */}
          {data && data.length > 0 ? (
            <div className="max-h-[78vh] overflow-auto p-2 mt-3">
              <table className="w-[800px] text-sm mb-4 hidden md:table">
                <thead className="">
                  <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300 ">
                    <th className="">Código</th>
                    <th className="">Descripción</th>
                    <th className="">Estado</th>
                    <th className="">Unidad Funcional CUPS</th>
                  </tr>
                </thead>

                {data &&
                  data.map((cups) => (
                    <tbody
                      className="text-center dark:text-gray-200"
                      key={cups.idRadicado}
                    >
                      <tr key={cups.idRadicado}>
                        <td className="">{cups.code}</td>
                        <td className="">{cups.description}</td>
                        <td className="">{cups.status}</td>
                        <td className="">{cups.unidadFuncional}</td>
                      </tr>
                    </tbody>
                  ))}
              </table>

              {/* responsive */}
              {data &&
                data.map((cups) => (
                  <div
                    className="grid grid-cols-[38%_59%] w-[400px] text-sm justify-between md:hidden dark:text-gray-200"
                    key={cups.idRadicado}
                  >
                    <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                      Codigo:
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">
                      {cups.code}
                    </div>
                    <div className="mt-4 font-semibold text-gray-600 dark:text-gray-400/90">
                      Descricion
                    </div>
                    <div className="mt-4 text-gray-800 dark:text-gray-100">
                      {cups.description}
                    </div>
                    <div className="mt-4 font-semibold text-gray-600 dark:text-gray-400/90">
                      Estado
                    </div>
                    <div className="mt-4 text-gray-800 dark:text-gray-100">
                      {cups.status}
                    </div>
                    <div className="mt-4 font-semibold text-gray-600 dark:text-gray-400/90">
                      Unidad Funcional CUPS
                    </div>
                    <div className="mt-4 text-gray-800 dark:text-gray-100">
                      {cups.unidadFuncional}
                    </div>
                  </div>
                ))}
            </div>
            
          ) : !cirugias ? (
            <div className="p-2 text-center text-stone-400 dark:text-stone-500">
              No se han generado seguimientos...
            </div>
          ) : null}

          {/* Botones */}
          <div className="flex items-center justify-end w-full px-4 py-4 text-sm font-medium bg-gray-200 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
            <button
              onClick={onClose}
              className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-400 rounded-md dark:hover:border-red-500 hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-600"
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
