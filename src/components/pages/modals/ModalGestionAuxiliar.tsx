//*Funciones y Hooks
import React, { useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
import { IRadicados } from "../../../models/IRadicados";
import ModalGestionServicio from "./ModalGestionServicio";

interface ModalGestionAuxiliarProps {
  isOpen: boolean;
  onClose: () => void;
  radicacion: IRadicados | null;
}

const ModalGestionAuxiliar: React.FC<ModalGestionAuxiliarProps> = ({
  isOpen,
  onClose,
  radicacion,
}) => {
  const [stadOpen, setStadOpen] = useState(false); // Estados Auxiliar
  const [openServicio, setOpenServicio] = useState(false); // Estados Servicios
  const { showAnimation, closing } = useAnimation(
    stadOpen,
    () => setStadOpen(false),
    300
  );

  if (!isOpen || !radicacion) return null;

  const EventServicio = () => {
    setStadOpen(false); // Cierra el primer modal
    setOpenServicio(true); // Abre el segundo modal
  };

  return (
    <>
      <div className="fixed z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
        <div className="z-10 w-[fit-content] p-4 bg-white rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-color">Tabla Gestion Servicios.</h2>
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
              {radicacion.seguimientoAuxiliarRelation.length > 0 ? (
              <>
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="p-2">Codigo CUPS</th>
                    <th className="p-2">Observacion</th>
                    <th className="p-2">Estado</th>
                    <th className="p-2">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {radicacion.seguimientoAuxiliarRelation.map((seguimiento) => (
                    <tr key={seguimiento.id}>
                      <td className="p-2">{seguimiento.codeCups}</td>
                      <td className="p-2">{seguimiento.observation}</td>
                      <td className="p-2">
                        {seguimiento.estadoSeguimientoRelation.name}
                      </td>
                      <td className="p-2">
                        {seguimiento.createdAt
                          ? new Date(seguimiento.createdAt).toLocaleString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
              ) : (
                <tbody>
                  <tr>
                    <td className="p-2" colSpan={4}>
                      No hay seguimientos
                    </td>
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
            <button
              onClick={EventServicio}
              className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Registrar Gestion.
            </button>
          </div>
        </div>
      </div>
      {openServicio && (
        <ModalGestionServicio onClose={() => setOpenServicio(false)} idRadicado={radicacion.id} />
      )}
    </>
  );
};

export default ModalGestionAuxiliar;
