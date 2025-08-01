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
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";

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
          <div>
            <Input
              label="Buscar Cups"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar"
            />
          </div>
          <div className="flex items-center pt-3 space-x-2">
            <Select
              options={[
                { value: "10", label: "10 Items" },
                { value: "20", label: "20 Items" },
                { value: "30", label: "30 Items" },
              ]}
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
            />
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
