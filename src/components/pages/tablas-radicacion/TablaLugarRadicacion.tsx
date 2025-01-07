//*Funciones y Hooks
import { useState, lazy, Suspense } from "react";
import Pagination from "../../common/PaginationTable/PaginationTable";
// import ModalAction from "../modals/ModalAction";
import useSearch from "../../../hooks/useSearch";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import usePagination from "../../../hooks/usePagination";
// import ModalAgregarDato from "../modals/ModalAgregarDato";
import { useFetchLugarRadicado } from "../../../hooks/useFetchUsers";

//*Properties
import ModalSection from "../../common/HeaderPage/HeaderPage";
import { ILugarRadicacion } from "../../../models/ILugarRadicado";

const ModalAction = lazy(() => import("../../common/Modals/ActionTables/ModalAction"));
const ModalAgregarDato = lazy(() => import("../../common/Modals/CrearDataTables/ModalAgregarDato"));
const ITEMS_PER_PAGE = 8;

const TablaLugarRadicacion = () => {
  const { data, loading, error } = useFetchLugarRadicado();
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } = useSearch<ILugarRadicacion>(data, [
    "id",
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

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error)
    return (
      <h1 className="flex justify-center text-lg dark:text-white">{error}</h1>
    );

  return (
    <>
      <ModalSection
        title="Módulo Lugar Radicación"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Lugar Radicación", path: "" },
        ]}
      />

      <section className="p-5 bg-white rounded-md shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* header-tale */}
        <section className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold text-stone-600 dark:text-stone-300">
              Buscar Lugar Radicación :
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
              <ModalAgregarDato
                name="Lugar Radicacion"
                endPoint="lugares-radicacion"
              />
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
                    <th className=" w-[200px]">Nombre Lugar</th>
                    <th className=" w-[100px]">Estado</th>
                    <th className=" w-[80px]">Acciones</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-center dark:text-gray-200">
                  {currentData().map((lugar) => (
                    <tr
                      className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                      key={lugar.id}
                    >
                      <td className="p-3 border-b dark:border-gray-700">
                        {lugar.id}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {lugar.name}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {lugar.status ? "Activo" : "Inactivo"}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <Suspense fallback={<LoadingSpinner />}>
                          <ModalAction
                            name="Lugar Radicacion"
                            id={lugar.id}
                            endPoint="update-lugar-status"
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

export default TablaLugarRadicacion;
