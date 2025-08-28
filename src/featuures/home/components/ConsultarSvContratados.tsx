import { useState } from "react";
import { useFetchServicioContratado } from "../hooks/UseFetchServiciosContratados";
import { AnimatePresence } from "framer-motion";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";

const ConsultarSvContratados = () => {
  const [codigo, setCodigo] = useState("");

  const { servicios, errorServicios, getData, loadingServicios } =
    useFetchServicioContratado();

  return (
    <>
      <div className="p-1">
        <div className="p-1 rounded-lg ">
          <div className="flex flex-wrap w-full">
            <Input
              label="Código del Servicio"
              type="text"
              id="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ej: 78912"
              required
            />
            <Button
              onClick={() => getData(codigo)}
              variant="secondary"
              className="h-10 mt-6 ml-2 md:mt-8"
              isLoading={loadingServicios}
            >
              Consultar
            </Button>
          </div>
          <div className="hidden w-full mt-4 md:table justify-items-center dark:text-gray-200">
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
                                {servicio.Relations.map((servicio, index) => (
                                  <tr
                                    key={`${servicio.nameConvenio}-${servicio.nameSede}-${index}`}
                                    className="border-gray-400 border-y"
                                  >
                                    <td className="px-2 py-2 text-xs text-center sm:text-sm">
                                      {servicio.nameConvenio || "N/A"}
                                    </td>
                                    <td className="px-2 py-2 text-xs text-center sm:text-sm">
                                      {servicio.nameSede || "N/A"}
                                    </td>
                                    <td className="px-2 py-2 text-xs text-center sm:text-sm">
                                      {servicio.typeService || "N/A"}
                                    </td>
                                    <td className="px-2 py-2 text-xs text-center sm:text-sm">
                                      {servicio.nameContract || "N/A"}
                                    </td>
                                    <td className="px-2 py-2 text-center">
                                      <span
                                        className={`inline-flex rounded-full px-2
                                           py-1 text-xs font-semibold ${
                                             servicio.isContrated
                                               ? "bg-teal-500 text-gray-800 dark:bg-teal-600 dark:text-white"
                                               : "bg-red-500 text-gray-800 dark:bg-red-600 dark:text-white"
                                           }`}
                                      >
                                        {servicio.isContrated
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

          {/* // responsive */}
          <div className="grid grid-cols-1 gap-4 mt-4 md:hidden">
            {servicios?.map((servicio) => (
              <div
                key={servicio.id}
                className="p-3 w-[98%] place-self-center bg-gray-200 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600"
              >
                <div className="grid grid-cols-[36%_62%] gap-3 text-sm">
                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Codigo:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {servicio.code}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Descripción Servicio:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {servicio.description}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Eps:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {servicio.Relations.map((s) => s.nameConvenio).join("N/A")}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Sede:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {servicio.Relations.map((s) => s.nameSede).join("N/A")}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Tipo de Servicio:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {servicio.Relations.map((s) => s.typeService).join("N/A")}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Contrato:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    {servicio.Relations.map((s) => s.nameContract).join("N/A")}
                  </div>

                  <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                    Estado:
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        servicio.Relations[0].isContrated
                          ? "bg-teal-500 text-gray-800 dark:bg-teal-600 dark:text-white"
                          : "bg-red-500 text-gray-800 dark:bg-red-600 dark:text-white"
                      }`}
                    >
                      {servicio.Relations[0].isContrated
                        ? "Contratado"
                        : "No Contratado"}
                    </span>
                  </div>
                </div>
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
