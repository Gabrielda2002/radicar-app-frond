//*Funciones y Hooks
import { useState, lazy, Suspense } from "react";

import Pagination from "@/components/common/PaginationTable/PaginationTable";
import useSearch from "@/hooks/useSearch";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import usePagination from "@/hooks/usePagination";
import { useFetchCups } from "@/hooks/UseFetchCup";
import { ICups } from "@/models/ICups";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";

const ModalUpdateCupsDiagnostico = lazy(() => import("@/components/common/Modals/UpdateDiagCUPS/ModalUpdateCupsDiagnostico"));
const ModalCrearCupsDiagnostico = lazy(() => import("@/components/common/Modals/CreateDiagCUPS/ModalCrearCupsDiagnostico"));
const ITEMS_PER_PAGE = 8; // Puedes ajustar el número de ítems por página

const TablaCups = () => {
  const { data, loading, error } = useFetchCups();
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } = useSearch<ICups>(data, [
    "id",
    "code",
    "name",
    "status",
  ]);

  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, itemsPerPage);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  if (loading) return <LoadingSpinner duration={500} />;
  if (error)
    return (
      <h2 className="flex justify-center text-lg dark:text-white">{error}</h2>
    );

  return (
    <>
      <ModalSection
        title="Modulo Cups"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Cups", path: "" },
        ]}
      />

      {/* container-table */}
      <section className="w-full p-5 overflow-hidden bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40 ">
        {/* header-tale */}

        <section className="grid items-center justify-between grid-cols-1 pb-6 md:flex header-tabla">
          <div className="container-filter">
            <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
              Buscar Cups:
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Consultar..."
              className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></input>
          </div>
          <div className="flex items-center pt-3 space-x-2">
            <select
              name=""
              id=""
              className="border-2 border-stone-300 h-[40px] w-[100px] rounded-md  focus:outline-none text-stone-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
            >
              <option value="">Paginas</option>
              <option value="10">10 Paginas</option>
              <option value="20">20 Paginas</option>
              <option value="30">30 Paginas</option>
            </select>
            <Suspense fallback={<LoadingSpinner />}>
              <ModalCrearCupsDiagnostico modulo="cups" />
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
                    <th className="w-[fit-content]">ID</th>
                    <th className="">Código</th>
                    <th className="w-[fit-content]">Descripción CUPS</th>
                    <th className="">Estado</th>
                    <th className="">Acciones</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-center dark:text-gray-200">
                  {currentData().map((cups) => (
                    <tr
                      className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                      key={cups.id}
                    >
                      <td className="p-3 border-b dark:border-gray-700">
                        {cups.id}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {cups.code}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {cups.name}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {cups.status ? "Activo" : "Inactivo"}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <Suspense fallback={<LoadingSpinner />}>
                          <ModalUpdateCupsDiagnostico id={cups.id} modulo="cups" />
                        </Suspense>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>‎ </div>
            {/* Controles de paginación */}
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

export default TablaCups;
