//*Funciones y Hooks
import { useState } from "react";
import Pagination from "../common/PaginationTable/PaginationTable";
import ModalSection from "../common/HeaderPage/HeaderPage";
import useSearch from "../../hooks/useSearch";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";
import { IUsuarios } from "../../models/IUsuarios";
import usePagination from "../../hooks/usePagination";
import { useFetchUsuarios } from "../../hooks/useFetchUsers";
// import ModalActionUsuario from "../pages/modals/ModalActionUsuarios";

//*Properties
import ModalActionUsuario from "./modals/ModalActionUsuario";

const ITEMS_PER_PAGE = 10;

const Usuarios = () => {
  const { data, loading, error } = useFetchUsuarios();
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } = useSearch<IUsuarios>(data, [
    "id",
    "dniNumber",
    "name",
    "lastName",
    "documento",
    "email",
    "status",
    "roles",
    "municipio",
  ]);

  const { currentPage, totalPages, paginate, currentData } = usePagination(
    filteredData,
    itemsPerPage
  );

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error)
    return (
      <p className="flex justify-center text-lg dark:text-white">{error}</p>
    );

  return (
    <>
      <ModalSection
        title="Módulo Usuarios"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Usuarios", path: "" },
        ]}
      />
      <section className="p-5 bg-white rounded-md shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* header-table */}
        <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
          Buscar Usuarios:
        </label>
        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="flex items-center space-x-2 container-filter">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Consultar"
              className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex items-center space-x-2 pt-1-">
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border-2 h-[40px] w-[100px] rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Páginas</option>
              <option value="10">10 Páginas</option>
              <option value="20">20 Páginas</option>
              <option value="30">30 Páginas</option>
            </select>
          </div>
        </section>

        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-300">
            No se encontraron resultados para la búsqueda.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full mx-auto overflow-hidden text-sm text-center rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-gray-200 dark:text-gray-300 dark:bg-gray-700">
                    <th>ID</th>
                    <th>N.º Documento</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Tipo Documento</th>
                    <th>Mail</th>
                    <th>Estado</th>
                    <th>Rol</th>
                    <th>Municipio</th>
                    <th>Editar</th>
                    {/* <th className="px-4 py-2">Acciones</th> */}
                  </tr>
                </thead>
                <tbody className="text-xs text-center bg-white dark:bg-gray-800 dark:text-gray-200">
                  {currentData().map((usuario) => (
                    <tr
                      key={usuario.id}
                      className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                      <td className="p-3 border-b dark:border-gray-700">
                        {usuario.id}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {usuario.dniNumber}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {usuario.name}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {usuario.lastName}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {usuario.documento}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {usuario.email}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {usuario.status ? "Activo" : "Inactivo"}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {usuario.roles}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {usuario.municipio}
                      </td>
                      {/* RESERVA HACIA FUTURO ! NO BORAR ! */}
                      <td className="p-3 border-b dark:border-gray-700">
                        <ModalActionUsuario
                          id={usuario.id}
                          ususario={usuario}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>‎</div>
            {/* Controles de de Paginacion */}
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

export default Usuarios;
