import { IStatusCup } from "@/models/IAuditar";
import { programacion } from "@/models/ICirugias";
import { FormatDate } from "@/utils/FormatDate";
import ModalDefault from "../../Ui/ModalDefault";
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
  return (
    <>
      <ModalDefault
        isOpen={isOpen}
        onClose={onClose}
        title="Mostrar Datos"
        size="lg"
        cancelText="Cerrar"
      >
        <div className="flex items-center flex-col gap-4">
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
        </div>
      </ModalDefault>
    </>
  );
};

export default ModalMostrarDatosCUPS;
