//*Funciones y Hooks
import { useState, lazy, Suspense } from "react";

import Pagination from "../../common/PaginationTable/PaginationTable";
import useSearch from "../../../hooks/useSearch";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import usePagination from "../../../hooks/usePagination";
import { useFetchRadicador } from "../../../hooks/useFetchUsers";

//*Properties
import ModalSection from "../../common/HeaderPage/HeaderPage";
import { IRadicador } from "../../../models/IRadicador";
const ModalAction = lazy(() => import("../../common/Modals/ActionTables/ModalAction"));
const ModalAgregarDato = lazy(() => import("../../common/Modals/CrearDataTables/ModalAgregarDato"));
const ITEMS_PER_PAGE = 10;

const TablaRadicadores = () => {
  const { dataRadicador, loading, errorRadicador } = useFetchRadicador();
  const [itemPerPage] = useState(ITEMS_PER_PAGE);
  const { query, setQuery, filteredData } = useSearch<IRadicador>(
    dataRadicador,
    ["id", "name", "status"]
  );
  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, itemPerPage);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  if (loading) return <LoadingSpinner duration={100000} />;
  if (errorRadicador)
    return (
      <h1 className="flex justify-center text-lg dark:text-white">
        {errorRadicador}
      </h1>
    );

  return (
    <>
      <ModalSection
        title="Módulo Radicadores"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Radicadores", path: "" },
        ]}
      />

      <section className="p-5 bg-white rounded-md shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* header-tale */}
        <section className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
              Buscar Radicador :
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Consultar..."
              className="w-64 h-10 pl-3 border rounded-md border-stone-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></input>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={itemPerPage}
              onChange={handleItemsPerPageChange}
              className="w-24 h-10 border border-gray-300 rounded-md focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="10">10 Paginas</option>
              <option value="20">20 Paginas</option>
              <option value="30">30 Paginas</option>
            </select>
            <Suspense fallback={<LoadingSpinner />}>
              <ModalAgregarDato name="Radicador" endPoint="radicador" />
            </Suspense>
          </div>
        </section>

        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-300">
            No se encontraron resultados para la búsqueda.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                    <th className=" w-[80px]">ID</th>
                    <th className=" w-[600px] ">Nombre Prestador</th>
                    <th className=" w-[150px]">Estado</th>
                    <th className=" w-[150px]">Acciones</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-center dark:text-gray-200">
                  {currentData().map((radicador) => (
                    <tr
                      className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                      key={radicador.id}
                    >
                      <td className="p-3 border-b dark:border-gray-700">
                        {radicador.id}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {radicador.name}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {radicador.status ? "Activo" : "Inactivo"}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <Suspense fallback={<LoadingSpinner />}>
                          <ModalAction
                            id={radicador.id}
                            name="Radicador"
                            endPoint="update-status-radicador"
                          />
                        </Suspense>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>‎</div>
            {/* Controles de Paginacion */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
            />
          </>
        )}
      </section>
    </>
  );
};

export default TablaRadicadores;
