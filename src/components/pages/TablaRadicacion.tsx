//*Funciones y Hooks
import { useState } from "react";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import LoadingSpinner from "../LoadingSpinner";

import usePagination from "../../hooks/usePagination";
import ModalRadicacion from "./modals/ModalRadicacion";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import ModalGestionAuxiliar from "./modals/ModalGestionAuxiliar";

//*Iconos
import gestion from "/assets/gestion.svg"
import mostrar from "/assets/mostrar.svg";
import soporte from "/assets/soporte.svg";
import salir from "/assets/back.svg";
import ModalMostrarDatos from "./modals/ModalMostrarDatos.tsx";

const ITEMS_PER_PAGE = 8;

const TablaRadicacion = () => {
  //  se traen los datos de la api
  const { data, loading, error } = useFetchUsers();

  //  se inicializan los estados para el paginado y la busqueda
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } = useSearch(data, [
    "createdAt",
    "id",
    "auditDate",
  ]);
  const { currentPage, totalPages, paginate, currentData } = usePagination(
    filteredData,
    itemsPerPage
  );

  // estado para controlar la apertura del modal
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenGestionAuxiliar, setIsOpenGestionAuxiliar] = useState(false);
  const [selectedRadicacion, setSelectedRadicacion] = useState(null);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  const handleShowData = (radicacion) => {
    setSelectedRadicacion(radicacion);
    setIsOpen(true);
  };

  const handleShowGestionAuxiliar = (radicacion) => {
    setSelectedRadicacion(radicacion);
    setIsOpenGestionAuxiliar(true);
  }

const handleOpenSoporte = (nombreSoporte: string | null) => {

  if (!nombreSoporte) {
    alert("No hay soporte para mostrar.");
    return;
  }

  window.open(
    `http://localhost:3600/api/v1/uploads/Soportes/${nombreSoporte}`,
    "_blank"
  );
  return;
}

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      {/* nav-table */}
      <section className="dark:bg-gray-900">
        <LoadingSpinner duration={500} />
        <h1 className="mb-4 text-4xl text-color dark:text-gray-200">
          Módulo Radicación
        </h1>
        <nav>
          <ol className="flex mb-2 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-2">Inicio</li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Radicación
            </li>
          </ol>
          <div className="w-10 pb-2">
              <img src={salir} alt=""  onClick={() => window.history.back()} className="cursor-pointer"/>
          </div>
        </nav>
      </section>

      <section className="p-5 bg-white rounded-md shadow-lg dark:bg-gray-800 container-tabla mb-11 shadow-indigo-500/40">
        {/* header-table */}
        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="container-filter">
            <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
              Buscar registro Radicación :
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Consultar..."
              className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50  focus:outline-none focus:ring-2  focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2 pt-1-">
            <select
              name=""
              id=""
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border-2 h-[40px] w-[90px] focus:outline-none rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">PAGES</option>
              <option value="1">10 PAGES</option>
              <option value="2">20 PAGES</option>
              <option value="3">30 PAGES</option>
            </select>
            <ModalRadicacion />
          </div>
        </section>

        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-300">
            No se encontraron resultados para la busqueda.
          </div>
        ) : (
          <>
            {/* Contenedor para la tabla con overflow-x-auto */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-200 dark:text-gray-300 dark:bg-gray-700">
                    <th>Fecha - Hora del Radicado</th>
                    <th>N.º Radicado</th>
                    <th>Convenio</th>
                    <th>N.º Documento</th>
                    <th>Nombre Paciente</th>
                    <th>Fecha Auditoría</th>
                    <th className="w-[150px]">Nombre Auditora</th>
                    <th>Soporte</th>
                    <th>Gestión Auxiliar</th>
                    <th>Mostrar</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-center dark:text-gray-200">
                  {currentData().map((radicacion) => (
                    <tr className="text-center" key={radicacion.id}>
                      <td>
                        {radicacion.createdAt
                          ? radicacion.createdAt.toISOString()
                          : "N/A"}
                      </td>
                      <td>{radicacion.id}</td>
                      <td>{radicacion.patientRelation.convenioRelation.name}</td>
                      <td>{radicacion.patientRelation.documentRelation.name}</td>
                      <td>{radicacion.patientRelation.name}</td>
                      <td>
                        {radicacion.auditDate
                          ? radicacion.auditDate.toISOString()
                          : "N/A"}
                      </td>
                      <td>{radicacion.auditora}</td>
                      <td>
                        <button
                          onClick={() => radicacion.soportesRelation && handleOpenSoporte(radicacion.soportesRelation.nameSaved)}
                        >
                          <img className="dark:invert" src={soporte} alt="" />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleShowGestionAuxiliar(radicacion)}
                        >
                          <img className="dark:invert" src={gestion} alt="" />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleShowData(radicacion)}
                        >
                          <img className="dark:invert" src={mostrar} alt="" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* modal mostrar datos */}

            <ModalMostrarDatos
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              radicacion={selectedRadicacion}
            />

            <ModalGestionAuxiliar
              isOpen={isOpenGestionAuxiliar}
              onClose={() => setIsOpenGestionAuxiliar(false)}
              radicacion={selectedRadicacion}
            />

            {/* Controles de la Paginacion */}
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
export default TablaRadicacion;
