//*Funciones y Hooks
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchAuditoria } from "../../hooks/useFetchUsers";

import Pagination from "../Pagination.tsx";
import usePagination from "../../hooks/usePagination.ts";
import useSearch from "../../hooks/useSearch.ts";
import ModalMostarDatos from "./modals/ModalMostrarDatos.tsx";
import ModalSoporte from "./modals/ModalSoporte.tsx";
import LoadingSpinner from "../LoadingSpinner";

import autorizar from "/assets/autorizar.svg";
import salir from "/assets/back.svg";

const ITEMS_PER_PAGE = 8;

const TablaAuditoria = () => {
  const { data, loading, error } = useFetchAuditoria();
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } = useSearch(data, [
    "documentNumber",
    "namePatient",
    "convenio",
    "ipsPrimary",
    "documentType",
    "place",
    "ipsRemitente",
    "profetional",
    "speciality",
    "typeServices",
    "radicador",
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
      <section className=" dark:bg-gray-900 ps-0">
        <LoadingSpinner duration={500}/>
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100">
          Módulo Auditoria
        </h1>
        <nav className="">
          <ol className="flex mb-2 text-gray-700 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-2 ">Inicio</li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Auditoria
            </li>
          </ol>
          <div className="w-10 pb-2">
            <Link to="/inicio">
              <img src={salir} alt=""></img>
            </Link>
          </div>
        </nav>
      </section>

      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
          Buscar registro Auditoria :
        </label>
        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="flex items-center space-x-2 container-filter">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Consultar..."
              className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-[10px] pt-1-">
            <select
              name=""
              id=""
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border-2 h-12 w-[90px] focus:outline-none rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="8">8 Páginas</option>
              <option value="16">16 Páginas</option>
              <option value="24">24 Páginas</option>
            </select>
            <button className="border-2 w-[150px] h-10 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800 dark:border-gray-200">
              Ver Autorizaciones
            </button>
            <Link to={"/tabla-registros-auditados"}>
              <button className="border-2 w-[100px] h-10 focus:outline-none rounded-md bg-color  text-white hover:bg-emerald-900 active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800">
                Auditados
              </button>{/* ! no se funciona | focus:outline-none | ! */}
            </Link>
          </div>
        </section>
        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-300">
            No se encontraron resultados para la búsqueda.
          </div>
        ) : (
          <>
            <table className="w-full text-center">
              <thead>
                <tr className="text-sm text-center bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                  <th className=" w-[90px]">Fecha Radicados</th>
                  <th className=" w-[90px]">Tipo Documento </th>
                  <th className=" w-[100px]">Identificacion</th>
                  <th className=" w-[90px]">Nombre Completo</th>
                  <th className=" w-[90px]">Convenio</th>
                  <th className=" w-[70px]">IPS Primaria</th>
                  <th className=" w-[90px]">Fecha Orden</th>
                  <th className=" w-[100px]">Lugar Radicacion</th>
                  <th className=" w-[100px]">IPS Remite</th>
                  <th className=" w-[90px]">Profesional</th>
                  <th className=" w-[90px]">Especialidad</th>
                  <th className=" w-[100px]">Tipo Servicio</th>
                  <th className=" w-[90px]">Quien Radica</th>
                  <th className=" w-[65px]">Soporte</th>
                  <th className=" w-[65px]">Ver Servicios</th>
                  <th className=" w-[65px]">Autorizar Servicios</th>
                </tr>
              </thead>

          <tbody className="text-xs text-center  dark:text-gray-200">
            {currentData().map((auditoria) => (
              <tr>
                <td>
                  {auditoria.radicadoDate
                    ? auditoria.radicadoDate.getTime()
                    : "N/A"}
                </td>
                <td>{auditoria.documentType}</td>
                <td>{auditoria.documentNumber}</td>
                <td>{auditoria.namePatient}</td>
                <td>{auditoria.convenio}</td>
                <td>{auditoria.ipsPrimary}</td>
                <td>
                  {auditoria.orderDate ? auditoria.orderDate.getTime() : "N/A"}
                </td>
                <td>{auditoria.place}</td>
                <td>{auditoria.ipsRemitente}</td>
                <td>{auditoria.profetional}</td>
                <td>{auditoria.speciality}</td>
                <td>{auditoria.typeServices}</td>
                <td>{auditoria.radicador}</td>
                <td>
                  <ModalSoporte></ModalSoporte>
                </td>
                <td>
                  <ModalMostarDatos
                      // wdCondic={true}
                      // gdCondic={true}
                      // Table Col 1
                      // numRadi={false}
                      // feRadi={false}
                      // nomCiru3=""
                      // tipoDoc={false}
                      // nomCiru4=""
                      // numDoc={false}
                      // nomCiru6=""
                      // nomPac={false}
                      // numCel={false}
                      // telFijo={false}
                      // email={false}
                      // direccion={false}
                      // convenio={false}
                      // ipsPri={false}
                      // nomCiru5=""
                      // feOrden={false}
                      // lugRadi={false}
                      // ipsRem={false}
                      // Table Col 2
                      obserAuditoria={true} //observacion cups |
                      nomCiru1="Obseracion Cups"
                      // justConcepto={false}
                      unidadFunciona={true} //estado cups
                      nomCiru2="Estado cups"
                      // feAuditoria={false}
                      // nomAuditor={false}
                      // auxiRadi={false}
                      descripCup={true} //
                      codCup={true} //
                      // tipoServicio={false}
                      // grupoServicio={false}
                      // descripDiagn={false}
                      // codDiagn={false}
                      // especialidad={false}
                      // profecional={false}
                  ></ModalMostarDatos>
                </td>
                <td>
                  <Link to="/tabla-autorizar-servicios">
                    <img className="dark:invert " src={autorizar} alt="autorizar-icon" />
                  </Link>{/* ! no se le puede colocar | focus:outline-none | ! */}
                </td>
              </tr>
            ))}
 
          </tbody>
        </table>

        {/* pagination */}
        <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
            />
        </>
      )}
    </div>
    </>
  );
};

export default TablaAuditoria;
