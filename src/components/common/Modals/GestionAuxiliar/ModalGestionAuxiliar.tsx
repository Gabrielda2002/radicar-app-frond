import React, { useState, useMemo } from "react";
import useAnimation from "@/hooks/useAnimations";
import {
  CupsRadicadosRelation,
  SeguimientoAuxiliarRelation,
} from "@/models/IRadicados";
import ModalGestionServicio from "./Components/ModalGestionServicio";
import {
  GestionAuxiliarCirugia,
  programacion,
} from "@/models/ICirugias";
import { format } from "date-fns";
import { useBlockScroll } from "@/hooks/useBlockScroll";

interface ModalGestionAuxiliarProps {
  isOpen: boolean;
  onClose: () => void;
  radicacion: CupsRadicadosRelation | null;
  cirugias: programacion | null;
}

const ModalGestionAuxiliar: React.FC<ModalGestionAuxiliarProps> = ({
  isOpen,
  onClose,
  radicacion,
  cirugias,
}) => {
  const [openServicio, setOpenServicio] = useState(false); // Estados Servicios
  const { showAnimation, closing } = useAnimation(isOpen, onClose);

  useBlockScroll(isOpen);
  
  // se hace una sobre carga para que la funcion reciba un array de seguimientos de radicacion o de cirugias
  function getUltimoEstado(
    seguimientos: SeguimientoAuxiliarRelation[]
  ): string | null;
  function getUltimoEstado(
    seguimientos: GestionAuxiliarCirugia[]
  ): string | null;
  function getUltimoEstado(
    seguimientos: SeguimientoAuxiliarRelation[] | GestionAuxiliarCirugia[]
  ): string | null {
    if (seguimientos.length > 0) {
      const ultimoSeguimiento = seguimientos[seguimientos.length - 1];

      if ("estadoSeguimientoRelation" in ultimoSeguimiento) {
        return ultimoSeguimiento.estadoSeguimientoRelation
          ? ultimoSeguimiento.estadoSeguimientoRelation.name
          : null;
      }
      return ultimoSeguimiento.estado;
    }

    return null;
  }

  // obtener el ultimo estao de la cirugia y radicacion
  const ultimoEstadoCirugia = useMemo(
    () =>
      radicacion &&
      radicacion.seguimientoAuxiliarRelation
        ? getUltimoEstado(
            radicacion.seguimientoAuxiliarRelation
          )
        : null,
    []
  );

  const ultimoEstadoRadicacion = useMemo(
    () =>
      cirugias && cirugias.gestionAuxiliarCirugia
        ? getUltimoEstado(cirugias.gestionAuxiliarCirugia)
        : null,
    []
  );

  // deshabilitar el boton de registrar gestion si el estado es Cerraado o Cancelado
  const isDisabled =
    ultimoEstadoCirugia === "Cerrado" ||
    ultimoEstadoCirugia === "Cancelado" ||
    ultimoEstadoRadicacion === "Cerrado" ||
    ultimoEstadoRadicacion === "Cancelado";

  // Si el modal no está abierto o no hay datos de radicación ni cirugías, no renderiza nada.
  if (!isOpen || (!cirugias && !radicacion)) return null;

  const EventServicio = () => {
    setOpenServicio(true); // Abre el segundo modal
  };

  // * funcion para formatear la fecha
  const formatDate = (date: Date | null) => {
    return date ? format(date, "dd/MM/yyyy HH:mm") : "N/A";
  };

  return (
    <>
      <div className="fixed z-50 flex justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
        <section>
          <div
            className={`z-10 w-[1000px] bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800 ${
              showAnimation && !closing
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between p-4 bg-gray-200 border-b-2 border-b-gray-900 dark:border-b-white dark:bg-gray-700">
              <h2 className="text-xl font-semibold text-color dark:text-gray-200">
                Tabla Gestión Servicios.
              </h2>
              <button
                onClick={onClose}
                className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
              >
                &times;
              </button>
            </div>

            {/* Primera tabla: Cirugías */}
            {cirugias && cirugias.gestionAuxiliarCirugia.length > 0 ? (
              <table className="max-h-[70vh] w-auto overflow-y-auto mb-4 mx-4">
                <thead className="text-center">
                  <tr className="bg-gray-200 dark:text-gray-300 dark:bg-gray-700 ">
                    <th className="">Observación</th>
                    <th className="">Estado</th>
                    <th className="">Fecha</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-center break-words dark:text-gray-200">
                  {cirugias.gestionAuxiliarCirugia.map((c) => (
                    <tr key={c.id}>
                      <td>{c.observacion}</td>
                      <td>{c.estado}</td>
                      <td>{formatDate(c.fechaCreacion)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : !radicacion ? (
              // Mostrar mensaje solo si no hay ni cirugías ni radicaciones
              <div className="p-2 text-center text-stone-400 dark:text-stone-500">
                No se han generado seguimientos...
              </div>
            ) : null}

            {/* Segunda tabla: Radicaciones */}
            {radicacion &&
            radicacion.seguimientoAuxiliarRelation
              .length > 0 ? (
              <div className="flex justify-center w-full p-2">
                <table className="max-h-[100vh] w-auto overflow-y-auto m-2">
                  <thead className="text-center">
                    <tr className="bg-gray-200 dark:text-gray-300 dark:bg-gray-700 ">
                      <th className="p-2">Observación</th>
                      <th className="p-2">Estado</th>
                      <th className="p-2">Fecha</th>
                      <th className="p-2">Responsable</th>
                    </tr>
                  </thead>
                  <tbody className="mt-2 text-sm text-center break-words dark:text-gray-200">
                    {radicacion.seguimientoAuxiliarRelation.map(
                      (seguimiento) => (
                        <tr key={seguimiento.id}>
                          <td className="max-w-[400px]">
                            {seguimiento.observation}
                          </td>
                          <td className="">
                            {seguimiento.estadoSeguimientoRelation.name}
                          </td>
                          <td className="">
                            {seguimiento.createdAt
                              ? new Date(seguimiento.createdAt).toLocaleString()
                              : "N/A"}
                          </td>
                          <td className="">
                            {seguimiento.usuarioRelation != null ? (
                              <div>
                                {seguimiento.usuarioRelation.name}{" "}
                                {seguimiento.usuarioRelation.lastName}
                              </div>
                            ) : (
                              <span className="text-red-500">N/A</span>
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : !cirugias ? (
              // Mostrar mensaje solo si no hay ni cirugías ni radicaciones
              <div className="p-12 text-center text-gray-400 dark:text-gray-100">
                No se han generado seguimientos...
              </div>
            ) : null}

            {/* Botones */}
            <div className="flex items-center justify-end w-full px-2 py-4 text-sm font-semibold bg-gray-200 border-t-2 gap-x-2 h-14 dark:bg-gray-700 border-t-gray-900 dark:border-t-white">
              <button
                onClick={onClose}
                className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-400 rounded-md dark:bg-gray-900 hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Cerrar
              </button>
              <button
                onClick={EventServicio}
                disabled={isDisabled}
                className={`w-32 h-10 text-white rounded-md ${
                  isDisabled
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover-gray-600 dark:hover:bg-gray-700 border-2 hover:border-gray-900 duration-200"
                }`}
              >
                Registrar Gestión.
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Modal de gestión de servicio */}
      {openServicio && (
        <ModalGestionServicio
          onClose={() => setOpenServicio(false)}
          idRadicado={radicacion?.id || null}
          idCirugias={cirugias?.id || null}
        />
      )}
    </>
  );
};

export default ModalGestionAuxiliar;
