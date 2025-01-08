//*Funciones y Hooks
import { useState, lazy, Suspense } from "react";
import Pagination from "@/components/common/PaginationTable/PaginationTable";
import useSearch from "@/hooks/useSearch";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import usePagination from "@/hooks/usePagination";

import { useFetchMunicipio } from "@/hooks/UseFetchMunicipio";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { IMunicipios } from "@/models/IMunicipios";

const ModalAction = lazy(() => import("@/components/common/Modals/ActionTables/ModalAction"));
const ModalMunicipios = lazy(() => import("../Components/ModalMunicipios"));
const ITEMS_PER_PAGE = 10;

const TablaMunicipios = () => {
  const load = true;
  const { municipios, loading, errorMunicipios } = useFetchMunicipio(load);
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const { query, setQuery, filteredData } = useSearch<IMunicipios>(municipios, [
    "id",
    "name",
    "nitMunicipio",
    "status",
  ]);
  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, itemsPerPage);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  if (loading) return <LoadingSpinner duration={100000} />;
  if (errorMunicipios)
    return (
      <h1 className="flex justify-center text-lg dark:text-white">
        {errorMunicipios}
      </h1>
    );

  return (
    <>
      <ModalSection
        title="Móddulo Municipios"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Municipios", path: "" },
        ]}
      />

      <section className="p-5 bg-white rounded-md shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* header-tale */}
        <section className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold text-stone-600 dark:text-stone-300">
              Buscar Municipios:
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
              <ModalMunicipios></ModalMunicipios>
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
                    <th className=" w-[70px]">ID</th>
                    <th className="">Nombre Municipio</th>
                    <th className="">Nit Municipio</th>
                    <th className=" w-[150px]">Estado</th>
                    <th className=" w-[150px]">Acciones</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-center dark:text-gray-200">
                  {currentData().map((municipio) => (
                    <tr className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                      <td className="p-3 border-b dark:border-gray-700">
                        {municipio.id}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {municipio.name}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {municipio.nitMunicipio}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {municipio.status ? "Activo" : "Inactivo"}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <Suspense fallback={<LoadingSpinner />}>
                          <ModalAction
                            name="Municipio"
                            id={municipio.id}
                            endPoint="update-status-municipio"
                          />
                        </Suspense>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>‎</div>
            <Pagination
              totalPages={totalPages}
              onPageChange={paginate}
              currentPage={currentPage}
            />
          </>
        )}
      </section>
    </>
  );
};

export default TablaMunicipios;
