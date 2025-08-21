//*Funciones y Hooks
import { useState, lazy, Suspense, useCallback } from "react";

import { Link } from "react-router-dom";
import Pagination from "@/components/common/PaginationTable/PaginationTable.tsx";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner.tsx";
import useSearch from "@/hooks/useSearch.ts";
import { IAuditar, IStatusCup } from "@/models/IAuditar.ts";
import usePagination from "@/hooks/usePagination.ts";
import { useFetchAuditoria } from "../Hooks/UseFetchAuditar";

//*Icons
import mostrar from "/assets/mostrar.svg";
import soporte from "/assets/soporte.svg";
import autorizar from "/assets/autorizar.svg";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage.tsx";
import { FormatDate } from "@/utils/FormatDate";
import { useSecureFileAccess } from "@/featuures/SystemGC/Hooks/useSecureFileAccess";


const ModalMostrarDatosCUPS = lazy(
  () => import("@/components/common/Modals/MostrarCUPS/ModalMostrarDatos.tsx")
);
const ITEMS_PER_PAGE = 8;

const TablaAuditoria = () => {
  const { data, loading, error } = useFetchAuditoria();
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const [selectedCups, setSelectedCups] = useState<IStatusCup[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const { openSecureFile } = useSecureFileAccess();

  const { query, setQuery, filteredData } = useSearch<IAuditar>(data, [
    "documentNumber",
    "namePatient",
    "convenio",
    "ipsPrimary",
    "documentType",
    "place",
    "ipsRemitente",
    "profetional",
    "speciality",
    "typeServices",
    "radicador",
  ]);

  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, ITEMS_PER_PAGE);

  const handleItemsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(e.target.value));
    },
    [setItemsPerPage]
  );

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error)
    return <h2 className="flex justify-center dark:text-white">{error}</h2>;

  const handleShowServicios = (statusCups: IStatusCup[]) => {
    setSelectedCups(statusCups);
    setIsOpen(true);
  };

  return (
    <>
      <ModalSection
        title="Módulo Auditoría"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Auditoría", path: "" },
        ]}
      />

      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
          Buscar registro Auditoría :
        </label>
        <div className="grid items-center justify-between w-[98%] grid-cols-2 pb-6 md:flex header-tabla">
          <div className="flex items-center w-[120%] sm:w-[115%] md:w-[90%] space-x-2 container-filter">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Consultar..."
              className="block ps-2 w-full h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-[10px] ml-12 md:ml-4">
            <select
              name=""
              id=""
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="h-10 border border-gray-300 rounded-md w-28 md:w-24 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="10">10 Paginas</option>
              <option value="20">20 Paginas</option>
              <option value="30">30 Paginas</option>
            </select>
          </div>

          <div className="flex items-center mt-4 ml-0 space-x-2 md:ml-4 md:mt-0">
            <Link to={"/tabla-radicacion"}>
              <button className="border-2 w-[170px] md:w-[150px] h-10 rounded-md focus:outline-none bg-color text-white hover:bg-teal-800 active:bg-teal-900">
                Ver Autorizaciones
              </button>
            </Link>
          </div>
          <div className="flex items-center mt-4 ml-0 space-x-2 md:ml-3 md:mt-0">
            <Link to={"/tabla-registros-auditados"}>
              <button className="border-2 w-[130px] md:w-[100px] h-10 focus:outline-none rounded-md bg-color  text-white hover:bg-teal-800 active:bg-teal-900 ">
                Auditados
              </button>
              {/* ! no se funciona | focus:outline-none | ! */}
            </Link>
          </div>
        </div>
        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-300">
            No se encontraron resultados para la búsqueda.
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full overflow-hidden text-sm text-center rounded-lg shadow-lg">
                <thead>
                  <tr className="text-sm text-center bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                    <th>Fecha</th>
                    <th>N. Documento</th>
                    <th>N. Identidad</th>
                    <th>Nombre Completo</th>
                    <th>Convenio</th>
                    <th>IPS Primaria</th>
                    <th>Fecha Orden</th>
                    <th>Lugar Radicación</th>
                    <th>IPS Remite</th>
                    <th>Profesional</th>
                    <th>Especialidad</th>
                    <th>Servicio</th>
                    <th>Radicador</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-center dark:text-gray-200">
                  {currentData().map((auditoria) => (
                    <tr
                      className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                      key={auditoria.id}
                    >
                      <td className="p-3 border-b dark:border-gray-700">
                        {FormatDate(auditoria.radicadoDate)}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.documentType}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.documentNumber}
                      </td>
                      <td
                        className="p-3 truncate border-b max-w-[100px] dark:border-gray-700"
                        title={auditoria.namePatient}
                      >
                        {auditoria.namePatient}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.convenio}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.ipsPrimary}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {FormatDate(auditoria.orderDate, false)}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.place}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.ipsRemitente}
                      </td>
                      <td
                        className="p-3 truncate border-b max-w-[100px] dark:border-gray-700"
                        title={auditoria.profetional}
                      >
                        {auditoria.profetional}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.speciality}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.typeServices}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.radicador}
                      </td>
                      <td className="p-2 border-b dark:border-gray-700">
                        <div className="grid items-center justify-center grid-cols-1 gap-1 2xl:grid-cols-3 sm:gap-1">
                          {/* Botón Ver Soporte */}
                          <button
                            onClick={() =>
                              openSecureFile(auditoria.supportId.toString(), "VIEW", "soporte")
                            }
                            className="p-2 duration-300 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-600"
                            title="Ver Soporte"
                          >
                            <img
                              src={soporte}
                              alt="soporte-icon"
                              className="w-7 h-7 dark:invert"
                            />
                          </button>

                          {/* Botón Mostrar Servicios */}
                          <button
                            onClick={() =>
                              handleShowServicios(auditoria.statusCups)
                            }
                            className="p-2 duration-300 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-600"
                            title="Mostrar Servicios"
                          >
                            <img
                              src={mostrar}
                              alt="mostrar-icon"
                              className="w-7 h-7 dark:invert"
                            />
                          </button>

                          {/* Enlace Autorizar Servicios */}
                          <Link
                            to="/tabla-autorizar-servicios"
                            state={{
                              CUPS: auditoria.statusCups,
                              id: auditoria.id,
                            }}
                            className="p-2 duration-300 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-600"
                            title="Autorizar Servicios"
                          >
                            <img
                              className="w-7 h-7 dark:invert"
                              src={autorizar}
                              alt="autorizar-icon"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Responsive */}
            <div className="grid w-full grid-cols-1 gap-4 md:hidden">
              {currentData().map((auditoria) => (
                <div
                  key={auditoria.id}
                  className="p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600"
                >
                  <div className="grid grid-cols-[40%_60%] gap-2 text-sm">
                    <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                      Fecha:
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">
                      {FormatDate(auditoria.radicadoDate)}
                    </div>

                    <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                      N* Documento:
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">
                      {auditoria.documentNumber}
                    </div>

                    <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                      Nombre:
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">
                      {auditoria.namePatient}
                    </div>

                    <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                      Convenio:
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">
                      {auditoria.convenio}
                    </div>

                    <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                      IPS Primaria:
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">
                      {auditoria.ipsPrimary}
                    </div>

                    <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                      Fecha Orden:
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">
                      {FormatDate(auditoria.orderDate, false)}
                    </div>

                    <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                      Lugar Radicación:
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">
                      {auditoria.place}
                    </div>

                    <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                      IPS Remite:
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">
                      {auditoria.ipsRemitente}
                    </div>

                    <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                      Profesional:
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">
                      {auditoria.profetional}
                    </div>

                    <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                      Especialidad:
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">
                      {auditoria.speciality}
                    </div>

                    <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                      Servicio:
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">
                      {auditoria.typeServices}
                    </div>

                    <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                      Radicador:
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">
                      {auditoria.radicador}
                    </div>

                    <div className="font-semibold text-gray-600 dark:text-gray-400/90">
                      Acciones:
                    </div>
                    <div className="grid items-center grid-cols-[20%_20%_20%] gap-2">
                      {/* Botón Ver Soporte */}
                      <button
                        onClick={() =>
                          openSecureFile(auditoria.supportId.toString(), "VIEW", "soporte")
                        }
                        className="p-2 duration-300 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-600"
                        title="Ver Soporte"
                      >
                        <img
                          src={soporte}
                          alt="soporte-icon"
                          className="w-7 h-7 dark:invert"
                        />
                      </button>

                      {/* Botón Mostrar Servicios */}
                      <button
                        onClick={() =>
                          handleShowServicios(auditoria.statusCups)
                        }
                        className="p-2 duration-300 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-600"
                        title="Mostrar Servicios"
                      >
                        <img
                          src={mostrar}
                          alt="mostrar-icon"
                          className="w-7 h-7 dark:invert"
                        />
                      </button>

                      {/* Enlace Autorizar Servicios */}
                      <Link
                        to="/tabla-autorizar-servicios"
                        state={{
                          CUPS: auditoria.statusCups,
                          id: auditoria.id,
                        }}
                        className="p-2 duration-300 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-600"
                        title="Autorizar Servicios"
                      >
                        <img
                          className="w-7 h-7 dark:invert"
                          src={autorizar}
                          alt="autorizar-icon"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Suspense fallback={<LoadingSpinner />}>
              <ModalMostrarDatosCUPS
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                data={selectedCups}
                cirugias={null}
                dateOrder={null}
              />
            </Suspense>
            <div>‎</div>
            {/* pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TablaAuditoria;
