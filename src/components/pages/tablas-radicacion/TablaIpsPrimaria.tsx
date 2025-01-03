//*Funciones y Hooks
import { useState, lazy, Suspense } from "react";

import Pagination from "../../common/PaginationTable/PaginationTable";
import useSearch from "../../../hooks/useSearch";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import usePagination from "../../../hooks/usePagination";
import { useFetchIpsPrimaria } from "../../../hooks/useFetchUsers";

//*Properties
import ModalSection from "../../common/HeaderPage/HeaderPage";
import { IIPSPrimaria } from "../../../models/IIpsPrimaria";

const ModalAction = lazy(() => import("../modals/ModalAction"));
const ModalAgregarDato = lazy(() => import("../modals/ModalAgregarDato"));

const ITEMS_PER_PAGE = 10;

const TablaIpsPrimaria = () => {
  const load = true;
  const { dataIpsPrimaria, loading, errorIpsPrimaria } =
    useFetchIpsPrimaria(load);
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } = useSearch<IIPSPrimaria>(
    dataIpsPrimaria,
    ["id", "name", "status"]
  );
  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, itemsPerPage);
  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  if (loading) return <LoadingSpinner duration={100000} />;
  if (errorIpsPrimaria)
    return (
      <h1 className="flex justify-center text-lg dark:text-white">
        {errorIpsPrimaria}
      </h1>
    );

  return (
    <>
      <ModalSection
        title="Módulo IPS Primaria"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio IPS Primaria", path: "" },
        ]}
      />

      <section className="p-5 bg-white rounded-md shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* header-tale */}
        <section className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold text-stone-600 dark:text-stone-300">
              Buscar Ips Primaria:
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Consultar..."
              className="w-64 h-10 pl-3 border rounded-md border-stone-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="w-24 h-10 border border-gray-300 rounded-md focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="10">10 Paginas</option>
              <option value="20">20 Paginas</option>
              <option value="30">30 Paginas</option>
            </select>
            <Suspense fallback={<LoadingSpinner />}>
              <ModalAgregarDato name="IPS Primaria" endPoint="ips-primaria" />
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
                    <th className=" w-[60px]">ID</th>
                    <th className=" w-[200px]">Nombre IPS Primaria</th>
                    <th className=" w-[100px]">Estado</th>
                    <th className=" w-[80px]">Acciones</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-center dark:text-gray-200">
                  {currentData().map((ips) => (
                    <tr
                      className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                      key={ips.id}
                    >
                      <td className="p-3 border-b dark:border-gray-700">
                        {ips.id}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {ips.name}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {ips.status ? "Activo" : "Inactivo"}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <Suspense fallback={<LoadingSpinner />}>
                          <ModalAction
                            id={ips.id}
                            name={ips.name}
                            endPoint="update-status-ips-primaria"
                          />
                        </Suspense>
                      </td>
                    </tr>
                  ))}
                  <tr></tr>
                </tbody>
              </table>
            </div>
            <div>‎ </div>
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

export default TablaIpsPrimaria;
