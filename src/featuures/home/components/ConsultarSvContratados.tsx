import { useState } from "react";
import { useFetchServicioContratado } from "../hooks/UseFetchServiciosContratados";
import { AnimatePresence } from "framer-motion";

const ConsultarSvContratados = () => {

      const [codigo, setCodigo] = useState("");

        const { servicios, errorServicios, getData } = useFetchServicioContratado();
    

  return (
    <>
      <div className="p-1">
       
        <div className="p-1 ml-4 rounded-lg ">
          <label
            htmlFor=""
            className="w-5/6 dark:text-gray-200 text-[19px] md:text-[24px]"
          >
            Ingrese el código del servicio:
            <div>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="p-2 mt-3 mr-4 border-2 border-gray-400 rounded-lg b-2 w-44 md:w-56 dark:text-gray-700 text-[17px]"
                placeholder="Código del servicio"
              />
              <button
                className="px-5 font-bold text-white bg-teal-500 rounded-md shadow-md mt-23 py-2 hover:bg-teal-600 hover:shadow-teal-600 dark:hover:shadow-teal-500 text-[16px]"
                onClick={() => getData(codigo)}
              >
                Consultar
              </button>
            </div>
          </label>
          <div className="flex flex-col w-full mt-4 justify-items-center dark:text-gray-200">
            {servicios?.map((servicio) => (
              <div
                key={servicio.code}
                className="mb-4 overflow-x-auto border rounded-lg"
              >
                <table className="w-full min-w-full table-auto">
                  <thead>
                    <tr className="text-gray-700 bg-gray-400 dark:bg-gray-800 dark:text-gray-200">
                      <th className="px-2 py-3 text-center">Código</th>
                      <th className="px-2 py-3 text-center">
                        Descripción Servicio
                      </th>
                      <th className="px-2 py-3 text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-200 border-teal-700 dark:bg-gray-700">
                      <td className="px-3 py-3 font-medium text-center">
                        {servicio.code}
                      </td>
                      <td className="px-1 py-3 text-[12px] center md:text-lg">
                        {servicio.description}
                      </td>
                      {servicio.Relations.length > 0 ? (
                        <td colSpan={3} className="p-0 px-2 py-3">
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-full">
                              <thead>
                                <tr className="text-gray-700 bg-gray-400 dark:bg-gray-800 dark:text-gray-200">
                                  <th className="px-3 py-2 text-center">Eps</th>
                                  <th className="px-3 py-2 text-center">
                                    Sede
                                  </th>
                                  <th className="px-3 py-2 text-center">
                                    Tipo de Servicio
                                  </th>
                                  <th className="px-3 py-2 text-center">
                                    Contrato
                                  </th>
                                  <th className="px-3 py-2 text-center">
                                    Estado
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {servicio.Relations.map((r, index) => (
                                  <tr
                                    key={`${r.nameConvenio}-${r.nameSede}-${index}`}
                                    className="border-gray-400 border-y"
                                  >
                                    <td className="px-2 py-2 text-xs text-center sm:text-sm">
                                      {r.nameConvenio || "N/A"}
                                    </td>
                                    <td className="px-2 py-2 text-xs text-center sm:text-sm">
                                      {r.nameSede || "N/A"}
                                    </td>
                                    <td className="px-2 py-2 text-xs text-center sm:text-sm">
                                      {r.typeService || "N/A"}
                                    </td>
                                    <td className="px-2 py-2 text-xs text-center sm:text-sm">
                                      {r.nameContract || "N/A"}
                                    </td>
                                    <td className="px-2 py-2 text-center">
                                      <span
                                        className={`inline-flex rounded-full px-2
                                           py-1 text-xs font-semibold ${
                                             r.isContrated
                                               ? "bg-teal-500 text-gray-800 dark:bg-teal-600 dark:text-white"
                                               : "bg-red-500 text-gray-800 dark:bg-red-600 dark:text-white"
                                           }`}
                                      >
                                        {r.isContrated
                                          ? "Contratado"
                                          : "No Contratado"}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      ) : (
                        <td className="px-2 py-3 text-center">N/A</td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {errorServicios && (
              <div className="text-red-500">{errorServicios}</div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default ConsultarSvContratados;
