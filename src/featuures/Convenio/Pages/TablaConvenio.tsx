//*Funciones y Hooks
import { useState, lazy, Suspense } from "react";
import Pagination from "@/components/common/PaginationTable/PaginationTable";
// import ModalAction from "../modals/ModalAction";
import useSearch from "@/hooks/useSearch";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import usePagination from "@/hooks/usePagination";
// import ModalAgregarDato from "../modals/ModalAgregarDato";
import { useFetchConvenio } from "@/hooks/UseFetchConvenio";
import { IConvenios } from "@/models/IConvenios";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import Select from "@/components/common/Ui/Select";
import Input from "@/components/common/Ui/Input";
const ModalAction = lazy(() => import("@/components/common/Modals/ActionTables/ModalAction"));
const ModalAgregarDato = lazy(() => import("@/components/common/Modals/CrearDataTables/ModalAgregarDato"));

const ITEMS_PER_PAGE = 10;

const TablaConvenios = () => {
  const load = true;
  const { dataConvenios, loading, errorConvenio, refetch } = useFetchConvenio(load);
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } = useSearch<IConvenios>(
    dataConvenios,
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
  if (errorConvenio)
    return (
      <h1 className="flex justify-center text-lg dark:text-white">
        {errorConvenio}
      </h1>
    );

  return (
    <>
      <ModalSection
        title="Módulo Convenio"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Convenios", path: "" },
        ]}
      />

      <section className="p-5 bg-white rounded-md shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* header-tale */}
        <section className="items-center justify-between mb-4 md:flex">
          <div className="flex flex-col">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar"
            />
          </div>
          <div className="flex items-center mt-3 space-x-4 md:mt-4">
            <Select
              options={[
                { value: "10", label: "10 Paginas" },
                { value: "20", label: "20 Paginas" },
                { value: "30", label: "30 Paginas" },
              ]}
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            />
            <Suspense fallback={<LoadingSpinner />}>
              <ModalAgregarDato name="Convenio" endPoint="convenio" onSuccess={refetch} />
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
                  <tr className="text-center bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                    <th className=" w-[60px]">ID</th>
                    <th className=" w-[200px]">Nombre Convenio</th>
                    <th className=" w-[100px]">Estado</th>
                    <th className=" w-[80px]">Acciones</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-center dark:text-gray-200">
                  {currentData().map((convenio) => (
                    <tr
                      className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                      key={convenio.id}
                    >
                      <td className="p-3 border-b dark:border-gray-700">
                        {convenio.id}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {convenio.name}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {convenio.status ? "Activo" : "Inactivo"}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <Suspense fallback={<LoadingSpinner />}>
                          <ModalAction
                            name="Convenio"
                            item={convenio}
                            endPoint="update-status-convenio"
                            onSuccess={refetch}
                          />
                        </Suspense>
                      </td>
                    </tr>
                  ))}
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

export default TablaConvenios;
