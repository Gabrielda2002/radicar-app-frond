//*Funciones y Hooks
import { useState } from "react";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import LoadingSpinner from "../LoadingSpinner";
import ModalCirugias from "./modals/ModalCirugias";
import usePagination from "../../hooks/usePagination";
import { useFetchCirugias } from "../../hooks/useFetchUsers";
//*iconos
import salir from "/assets/back.svg";

const ITEMS_PER_PAGE = 8;

const TablaCirugias = () => {
  const { dataCirugias, loadingCirugias, errorCirugias } = useFetchCirugias();
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const { query, setQuery, filteredData } = useSearch(dataCirugias, [
    "fechaRadicado",
    "id",
    "convenio",
    "numeroDocumento",
    "nombrePaciente",
  ]);
  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, ITEMS_PER_PAGE);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value)); // Cambia el número de ítems por página
  };

  if (loadingCirugias) return <LoadingSpinner />;
  if (errorCirugias) return <div className="flex justify-center dark:text-white">{errorCirugias}</div>;
 
  return (
    <>
      {/*nav-auditoria*/}
      <section className="dark:bg-gray-900">
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100">
          Módulo Cirugías
        </h1>
        <nav className="">
          <ol className="flex mb-2 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-2 ">Inicio</li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Cirugías
            </li>
          </ol>
          <div className="w-10 pb-2">
            <img
              src={salir}
              alt=""
              onClick={() => window.history.back()}
              className="cursor-pointer"
            ></img>
          </div>
        </nav>
      </section>

      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/*header-table*/}

        <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
          Buscar registro Cirugía :
        </label>
        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="flex items-center space-x-2 container-filter">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Consultar..."
              className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></input>
          </div>
          <div className="flex items-center space-x-2 pt-1-">
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border-2 h-[40px] w-[100px] focus:outline-none rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="10">10 Paginas</option>
              <option value="20">20 Paginas</option>
              <option value="30">30 Paginas</option>
            </select>
          </div>
        </section>

        {filteredData.length === 0 ? (
          <div>
            <p className="text-center text-red-500 dark:text-red-300">
              No se encontraron resultados para la busqueda.
            </p>
          </div>
        ) : (
          <>
            <table className="min-w-full mx-auto text-sm ">
              <thead>
                <tr className="bg-gray-200 dark:text-gray-300 dark:bg-gray-700">
                  <th>Fecha - Hora del Radicado</th>
                  <th>N.º Radicado</th>
                  <th>Convenio</th>
                  <th>N.º Documento</th>
                  <th>Nombre Paciente</th>
                  <th>Gestión Auxiliar</th>
                  <th>Mostrar</th>
                </tr>
              </thead>

              <tbody className="text-xs text-center bg-white dark:bg-gray-800 dark:text-gray-200">
                {currentData().map((cirugia) => (
                  <tr key={cirugia.id}>
                    <td>
                      {cirugia.fechaRadicado
                        ? cirugia.fechaRadicado.toISOString()
                        : "N/A"}
                    </td>
                    <td>{cirugia.id}</td>
                    <td>{cirugia.convenio}</td>
                    <td>{cirugia.numeroDocumento}</td>
                    <td>{cirugia.nombrePaciente}</td>
                    <td>
                      <button className="w-20 h-8 text-white bg-blue-500 rounded-md">
                        Gestión
                      </button>
                    </td>
                    <td>
                      <ModalCirugias
                        name={cirugia.nombrePaciente}
                        phonneNumber={cirugia.numeroPaciente}
                        email={cirugia.email}
                        landline={cirugia.telefonoFijo}
                        cups={cirugia.cups}
                        speciality={cirugia.especialidad}
                        diagnostic={cirugia.diagnostico}
                        idGroupService={cirugia.idGrupoServicios}
                        idRadicado={cirugia.id}
                        idCirugia={cirugia.programacionCirugia.map(
                          (programacion) => programacion.id
                        )}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* pagination */}
        <div>‎ </div>
        <Pagination
          totalPages={totalPages}
          onPageChange={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default TablaCirugias;
