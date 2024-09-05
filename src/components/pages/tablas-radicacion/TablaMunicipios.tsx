//*Funciones y Hooks
import { Link } from "react-router-dom";
import ModalAction from "../modals/ModalAction";
import useSearch from "../../../hooks/useSearch";
import Pagination from "../../Pagination";
import usePagination from "../../../hooks/usePagination";
import LoadingSpinner from "../../LoadingSpinner";
import ModalMunicipios from "../modals/ModalMunicipios";
import { useFetchMunicipio } from "../../../hooks/useFetchUsers";
//*Icons
import salir from "/assets/back.svg";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

const TablaMunicipios = () => {
  const { data, loading, error } = useFetchMunicipio();
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const { query, setQuery, filteredData } = useSearch(data, [
    "id",
    "name",
    "nitMunicipio",
    "status",
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
  if (error) return <h1>{error}</h1>;

  return (
    <>
      {/* nav-table */}

      <section className="p-4 dark:bg-gray-900">
        <LoadingSpinner duration={500} />
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100 ">
          Módulo Municipios
        </h1>
        <nav>
          <ol className="flex mb-2 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-4">Inicio</li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Municipios
            </li>
          </ol>
          <div className="w-10 pb-2">
            <Link to="/inicio">
              <img src={salir} alt="" />
            </Link>
          </div>
        </nav>
      </section>

      <section className="p-5 bg-white rounded-md shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* header-tale */}

        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="container-filter">
            <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
              Buscar Municipio :
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder=" Consultar Municipio..."
              className="block w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></input>
          </div>
          <div className="flex items-center pt-1 space-x-2">
            <select
              name=""
              id=""
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
              className="border-2 h-[40px] w-[100px] rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">PAGES</option>
              <option value="10">10 PAGES</option>
              <option value="20">20 PAGES</option>
              <option value="30">30 PAGES</option>
            </select>
            <ModalMunicipios></ModalMunicipios>
          </div>
        </section>

        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-300">
            No se encontraron resultados para la búsqueda.
          </div>
        ) : (
          <>
            <table className="w-full mx-auto text-sm divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                  <th className=" w-[70px]">ID</th>
                  <th className="">Nombre Municipio</th>
                  <th className="">Nit Municipio</th>
                  <th className=" w-[150px]">Estado</th>
                  <th className=" w-[150px]">Acciones</th>
                </tr>
              </thead>

              <tbody className="text-xs text-center divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-200">
                {currentData().map((municipio) => (
                  <tr>
                    <td>{municipio.id}</td>
                    <td>{municipio.name}</td>
                    <td>{municipio.nitMunicipio}</td>
                    <td>{municipio.status ? "Activo" : "Inactivo"}</td>
                    <td>
                      <ModalAction nom="Municipios" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
