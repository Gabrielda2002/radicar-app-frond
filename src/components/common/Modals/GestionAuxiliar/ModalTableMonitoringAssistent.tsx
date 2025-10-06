import React, { useMemo } from "react";
import { Cup, Seguimiento } from "@/models/IRadicados";
import ModalGestionServicio from "./Components/ModalCreateMonitoringAssistent";
import {
  GestionAuxiliarCirugia,
  programacion,
  Cup as CupCirugia,
} from "@/models/ICirugias";
import { FormatDate } from "@/utils/FormatDate";
import ModalDefault from "../../Ui/ModalDefault";

interface ModalGestionAuxiliarProps {
  isOpen: boolean;
  onClose: () => void;
  cup: Cup | null;
  cirugias: programacion | null;
  cupsRadicado?: CupCirugia[] | null;
}

const ModalGestionAuxiliar: React.FC<ModalGestionAuxiliarProps> = ({
  isOpen,
  onClose,
  cup,
  cirugias,
  cupsRadicado,
}) => {
  // se hace una sobre carga para que la funcion reciba un array de seguimientos de cup o de cirugias
  function getUltimoEstado(seguimientos: Seguimiento[]): string | null;
  function getUltimoEstado(
    seguimientos: GestionAuxiliarCirugia[]
  ): string | null;
  function getUltimoEstado(
    seguimientos: Seguimiento[] | GestionAuxiliarCirugia[]
  ): string | null {
    if (seguimientos.length > 0) {
      const ultimoSeguimiento = seguimientos[seguimientos.length - 1];

      if ("estadoSeguimientoRelation" in ultimoSeguimiento) {
        return ultimoSeguimiento.estadoSeguimientoRelation
          ? ultimoSeguimiento.estado
          : null;
      }
      return ultimoSeguimiento.estado;
    }

    return null;
  }

  // obtener el ultimo estao de la cirugia y cup
  const ultimoEstadoCirugia = useMemo(
    () =>
      cup && cup.seguimiento
        ? getUltimoEstado(cup.seguimiento)
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
  if (!isOpen || (!cirugias && !cup)) return null;

  const seguimientos = cupsRadicado?.flatMap((c) => c.seguimiento) ?? [];

  return (
    <>
      <ModalDefault
        isOpen={isOpen}
        onClose={onClose}
        title="Gestión Auxiliar Radicación y Cirugías"
        size="lg"
        cancelText="Cerrar"
      >
        <div>
          <ModalGestionServicio
            idCups={cup?.id || null}
            idCirugias={cirugias?.id || null}
            disabledButton={isDisabled}
          />

          {cirugias && cirugias.gestionAuxiliarCirugia.length > 0 ? (
            <div className="flex flex-col justify-center items-center w-full p-2">
              <h3 className="text-lg font-semibold text-color dark:text-gray-200">
                Seguimiento de Cirugía
              </h3>
              <table className="max-h-[100vh] w-auto overflow-y-auto m-2">
                <thead className="text-center">
                  <tr className="bg-gray-200 dark:text-gray-300 dark:bg-gray-700 ">
                    <th className="">Observación</th>
                    <th className="">Estado</th>
                    <th className="">Fecha</th>
                    <th>Responsable</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-center break-words dark:text-gray-200">
                  {cirugias.gestionAuxiliarCirugia.map((c) => (
                    <tr key={c.id}>
                      <td>{c.observacion}</td>
                      <td>{c.estado}</td>
                      <td>{FormatDate(c.fechaCreacion)}</td>
                      <td>
                        {c.Nombre} {c.Apellido}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : !cup ? (
            // Mostrar mensaje solo si no hay ni cirugías ni radicaciones
            <div className="p-2 text-center text-stone-400 dark:text-stone-500">
              No se han generado seguimientos...
            </div>
          ) : null}

          {/* mostrar seguimiento de cups radicados en cirugias */}
          {cupsRadicado &&
          cupsRadicado.length > 0 &&
          seguimientos.length > 0 ? (
            <div className="flex flex-col justify-center items-center w-full p-2">
              <h3 className="text-lg font-semibold text-color dark:text-gray-200">
                Seguimiento de Auxiliar
              </h3>
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
                  {seguimientos.map((s) => (
                    <tr key={s.id}>
                      <td className="max-w-[400px]">{s.observacion}</td>
                      <td>{s.estado}</td>
                      <td>{FormatDate(s.fechaCreacion)}</td>
                      <td>
                        {s.Nombre} {s.Apellido}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {/* Segunda tabla: Radicaciones */}
          {cup && cup.seguimiento.length > 0 ? (
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
                  {cup.seguimiento.map((seguimiento) => (
                    <tr key={seguimiento.id}>
                      <td className="max-w-[400px]">
                        {seguimiento.observation}
                      </td>
                      <td className="">{seguimiento.estado}</td>
                      <td className="">
                        {FormatDate(seguimiento.fechaCreacion)}
                      </td>
                      <td className="">
                        {seguimiento.Nombre != null ? (
                          <div>
                            {seguimiento.Nombre} {seguimiento.Apellido}
                          </div>
                        ) : (
                          <span className="text-red-500">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : !cirugias ? (
            // Mostrar mensaje solo si no hay ni cirugías ni radicaciones
            <div className="p-12 text-center text-gray-400 dark:text-gray-100">
              No se han generado seguimientos...
            </div>
          ) : null}
        </div>
      </ModalDefault>
    </>
  );
};

export default ModalGestionAuxiliar;
