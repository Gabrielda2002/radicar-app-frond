//*Funciones y Hooks
import { useState } from "react";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import LoadingSpinner from "../LoadingSpinner";
import ModalSoporte from "./modals/ModalSoporte.tsx";
import usePagination from "../../hooks/usePagination";
import ModalRadicacion from "./modals/ModalRadicacion";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import ModalMostarDatos from "./modals/ModalMostrarDatos.tsx";
import ModalGestionAuxiliar from "./modals/ModalGestionAuxiliar";
//*Iconos
import salir from "/assets/back.svg";

const ITEMS_PER_PAGE = 8;

const TablaRadicacion = () => {
  const { data, loading, error } = useFetchUsers();
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } = useSearch(data, [
    "createdAt",
    "id",
    "convenio",
    "document",
    "patientName",
    "auditDate",
    "management",
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
            <Link to="/inicio">
              <img src={salir} alt="" />
            </Link>
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
                      <td>{radicacion.convenio}</td>
                      <td>{radicacion.document}</td>
                      <td>{radicacion.patientName}</td>
                      <td>
                        {radicacion.auditDate
                          ? radicacion.auditDate.toISOString()
                          : "N/A"}
                      </td>
                      <td>{radicacion.management}</td>
                      <td>
                        <ModalSoporte></ModalSoporte>
                      </td>
                      <td>
                        <ModalGestionAuxiliar></ModalGestionAuxiliar>
                      </td>
                      <td>
                        <button>
                          <ModalMostarDatos
                            wdCondic={false}
                            gdCondic={false}
                            // Tabla Col 1
                            numRadi={true}
                            feRadi={true}
                            // nomCiru1=""
                            tipoDoc={true}
                            numDoc={true}
                            nomPac={true}
                            numCel={true}
                            // nomCiru2=""
                            telFijo={true}
                            email={true}
                            direccion={true}
                            // nomCiru3=""
                            convenio={true}
                            // nomCiru4=""
                            ipsPri={true}
                            // nomCiru5=""
                            feOrden={true}
                            // nomCiru6=""
                            lugRadi={true}
                            ipsRem={true}
                            // Tabla Col 2
                            obserAuditoria={true}
                            justConcepto={true}
                            unidadFunciona={true}
                            feAuditoria={true}
                            nomAuditor={true}
                            auxiRadi={true}
                            descripCup={true}
                            codCup={true}
                            tipoServicio={true}
                            grupoServicio={true}
                            descripDiagn={true}
                            codDiagn={true}
                            especialidad={true}
                            profecional={true}
                          ></ModalMostarDatos>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Controles de la Paginacion */}
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
