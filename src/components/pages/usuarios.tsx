//*Funciones y Hooks
import { useState } from "react";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import LoadingSpinner from "../LoadingSpinner";
import usePagination from "../../hooks/usePagination";
import { useFetchUsuarios } from "../../hooks/useFetchUsers";
// import ModalActionUsuario from "../pages/modals/ModalActionUsuarios";

//*Icons
import salir from "/assets/back.svg";
import ModalActionUsuario from "./modals/ModalActionUsuario";
import { IUsuarios } from "../../models/IUsuarios";

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
  if (error) return <p className="flex justify-center text-lg dark:text-white">{error}</p>;

  return (
    <>
      <section className="dark:bg-gray-900">
        <LoadingSpinner duration={500} />
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100">
          Módulo Usuarios
        </h1>
        <nav>
          <ol className="flex mb-2">
            <li className="text-slate-400 after:mr-2">Inicio</li>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Usuarios
            </li>
          </ol>
          <div className="w-10 pb-2">
            <Link to="/inicio">
              <img src={salir} alt="Salir" className="" />
            </Link>
          </div>
        </nav>
      </section>
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
              name=""
              id=""
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border-2 h-[40px] w-[100px] rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Páginas</option>
              <option value="1">10 Páginas</option>
              <option value="2">20 Páginas</option>
              <option value="3">30 Páginas</option>
            </select>
          </div>
        </section>

        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-300">
            No se encontraron resultados para la búsqueda.
          </div>
        ) : (
          <>
            <div>
              <table className="w-full mx-auto text-xs text-center dark:bg-gray-800 dark:text-gray-300">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">N.º Documento</th>
                    <th className="px-4 py-2">Nombres</th>
                    <th className="px-4 py-2">Apellidos</th>
                    <th className="px-4 py-2">Tipo Documento</th>
                    <th className="px-4 py-2">Mail</th>
                    <th className="px-4 py-2">Estado</th>
                    <th className="px-4 py-2">Rol</th>
                    <th className="px-4 py-2">Municipio</th>
                    <th className="px-4 py-2">Editar</th>
                    {/* <th className="px-4 py-2">Acciones</th> */}
                  </tr>
                </thead>
                <tbody>
                  {currentData().map((usuario) => (
                    <tr>
                      <td>{usuario.id}</td>
                      <td>{usuario.dniNumber}</td>
                      <td>{usuario.name}</td>
                      <td>{usuario.lastName}</td>
                      <td>{usuario.documento}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.status ? "Activo" : "Inactivo"}</td>
                      <td>{usuario.roles}</td>
                      <td>{usuario.municipio}</td>
                      {/* RESERVA HACIA FUTURO ! NO BORAR ! */}
                      <td>
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
