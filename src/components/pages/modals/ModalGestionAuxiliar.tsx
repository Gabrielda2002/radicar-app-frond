//*Funciones y Hooks
import React, { useState } from "react";
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
  const [openServicio, setOpenServicio] = useState(false); // Estados Servicios


  if (!isOpen || !radicacion) return null;

  const EventServicio = () => {
    setOpenServicio(true); // Abre el segundo modal
  };

  return (
    <>
      <div className="fixed z-50 flex py-20 justify-center transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
        <section>
          <div className="z-10 w-[fit-content] bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800">
            <div className="flex items-center justify-between p-2 mb-4">
              <h2 className="text-xl font-semibold text-color dark:text-gray-200  ">
                Tabla Gestión Servicios.
              </h2>
              <button
                onClick={onClose}
                className="text-xl text-gray-500 hover-gray-700 pr-2"
              >
                &times;
              </button>
            </div>

            {/* Primera tabla */}

            <table className="max-h-[70vh] w-auto overflow-y-auto mb-4 mx-4">
              {radicacion.seguimientoAuxiliarRelation.length > 0 ? (
                <>
                  <thead className="text-center">
                    <tr className="bg-gray-200 dark:text-gray-300 dark:bg-gray-700 ">
                      <th className="ps-2">Codigo CUPS</th>
                      <th className="">Observación</th>
                      <th className="">Estado</th>
                      <th className="">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="text-center text-sm break-words dark:text-gray-200">
                    {radicacion.seguimientoAuxiliarRelation.map(
                      (seguimiento) => (
                        <tr key={seguimiento.id}>
                          <td className="">{seguimiento.codeCups}</td>
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
                        </tr>
                      )
                    )}
                  </tbody>
                </>
              ) : (
                <tbody className=" w-[400px] ">
                  <tr className="border-none hover:bg-transparent dark:hover:bg-transparent">
                    <td className="p-2 text-stone-400 dark:text-stone-500"colSpan={4} >
                      No sean generado seguimientos... 
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
            {/* Segunda tabla */}

            {/* Botones */}
            <div className="flex items-center justify-end w-full px-2 py-4 text-sm font-semibold bg-white gap-x-2 h-14 dark:bg-gray-800">
              <button
                onClick={onClose}
                className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200  dark:hover:bg-gray-700"
              >
                Cerrar
              </button>
              <button
                onClick={EventServicio}
                className="w-32 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover-gray-600  dark:hover:bg-gray-700"
              >
                Registrar Gestión.
              </button>
            </div>
          </div>
        </section>
      </div>
      {openServicio && (
        <ModalGestionServicio
          onClose={() => setOpenServicio(false)}
          idRadicado={radicacion.id}
        />
      )}
    </>
  );
};

export default ModalGestionAuxiliar;
