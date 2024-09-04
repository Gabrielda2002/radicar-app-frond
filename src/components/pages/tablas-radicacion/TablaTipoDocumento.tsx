//*Funciones y Hooks
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import ModalAction from "../modals/ModalAction";
import useSearch from "../../../hooks/useSearch";
import LoadingSpinner from "../../LoadingSpinner";
import usePagination from "../../../hooks/usePagination";
import ModalTipoDocumento from "../modals/ModalTipoDocumento";
import { useFetchDocumento } from "../../../hooks/useFetchUsers";
//*Icons
import salir from "/assets/back.svg";

const ITEMS_PER_PAGE = 8;

const TablaTipoDocumento = () => {
  const { data, loading, error } = useFetchDocumento();
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } = useSearch(data, [
    "id",
    "name",
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
          Módulo Tipo Documento
        </h1>
        <nav>
          <ol className="flex mb-2 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-4">Inicio</li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Tipo Documento
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
              Buscar Tipo Documento :
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder=" Consultar Tipo Documento..."
              className="block w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></input>
          </div>
          <div className="flex items-center pt-1 space-x-2">
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              name=""
              id=""
              className="border-2 h-[40px] w-[90px] rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="10">10 Paginas</option>
              <option value="20">20 Paginas</option>
              <option value="30">30 Paginas</option>
            </select>
            {/* <button className="borde-2 w-[200px] h-[40px] rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800">
              Agregar Tipo Documento
            </button> */}
            <ModalTipoDocumento></ModalTipoDocumento>
          </div>
        </section>

        <table className="w-full mx-auto text-sm divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="dark:bg-gray-700 dark:text-gray-200 bg-gray-50">
              <th className=" w-[60px]">ID</th>
              <th className=" w-[200px]">Tipo Documento</th>
              <th className=" w-[100px]">Estado</th>
              <th className=" w-[80px]">Acciones</th>
            </tr>
          </thead>

          <tbody className="text-xs text-center divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-200">
            {currentData().map((documento) => (
              <tr>
                <td className="py-3">{documento.id}</td>
                <td className="py-3">{documento.name}</td>
                <td>{documento.status ? "Activo" : "Inactivo"}</td>
                <td className="py-3">
                  <ModalAction nom="Tipo Documento" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
        />
      </section>
    </>
  );
};

export default TablaTipoDocumento;
