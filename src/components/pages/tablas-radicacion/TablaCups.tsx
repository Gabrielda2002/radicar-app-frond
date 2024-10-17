//*Funciones y Hooks
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchCups } from "../../../hooks/useFetchUsers";

import Pagination from "../../Pagination";
import LoadingSpinner from "../../LoadingSpinner";
import usePagination from "../../../hooks/usePagination";
import useSearch from "../../../hooks/useSearch";

import ModalCups from "../modals/ModalCups";
import ModalActionCups from "../modals/ModalActionCups";

//*Iconos
import salir from "/assets/back.svg";

const ITEMS_PER_PAGE = 8; // Puedes ajustar el número de ítems por página

const TablaCups = () => {
  const { data, loading, error } = useFetchCups();
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } = useSearch(data, [
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
  if (error) return <h2>{error}</h2>;

  return (
    <>
      {/* nav-table */}
      <section className=" dark:bg-gray-900">
        <LoadingSpinner duration={500} />
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100 ">
          Módulo Cups
        </h1>
        <nav>
          <ol className="flex mb-2 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-2">Inicio</li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Cups
            </li>
          </ol>
          <div className="w-10 pb-2 ">
            <img
              src={salir}
              alt=""
              onClick={() => window.history.back()}
              className="cursor-pointer"
            />
          </div>
        </nav>
      </section>

      {/* container-table */}
      <section className="w-full p-5 overflow-hidden bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40 ">
        {/* header-tale */}

        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="container-filter">
            <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
              Buscar Cup :
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Consultar..."
              className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></input>
          </div>
          <div className="flex items-center pt-1 space-x-2">
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
            <ModalCups></ModalCups>
          </div>
        </section>

        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-300">
            No se encontraron resultados para la búsqueda.
          </div>
        ) : (
          <>
            <table className="w-full mx-auto ">
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
                  <tr key={cups.id}>
                    <td>{cups.id}</td>
                    <td>{cups.code}</td>
                    <td>{cups.name}</td>
                    <td>{cups.status ? "Activo" : "Inactivo"}</td>
                    <td>
                      <ModalActionCups id={cups.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
