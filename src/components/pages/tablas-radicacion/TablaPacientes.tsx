//*Funciones y Hooks
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import useSearch from "../../../hooks/useSearch";
import LoadingSpinner from "../../LoadingSpinner";
import ModalPaciente from "../modals/ModalPaciente";
import usePagination from "../../../hooks/usePagination";
import { useFetchPacientes } from "../../../hooks/useFetchPaciente";
//*Iconos
import salir from "/assets/back.svg";
import { useState } from "react";

const ITEMS_PER_PAGE = 8; // Puedes ajustar el número de ítems por página

const TablaPacientes = () => {
  const { pacientes, errorPacientes, loading } = useFetchPacientes();
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } = useSearch(pacientes, [
    "id",
    "documentNumber",
    "documentRelation",
    "name",
    "phoneNumber",
    "landline",
    "email",
    "convenioRelation",
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
  if (errorPacientes) return <h2>{errorPacientes}</h2>;

  return (
    <>
      {/* nav-table */}

      <section className=" dark:bg-gray-900">
        <LoadingSpinner duration={500} />;
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100 ">
          Módulo Pacientes
        </h1>
        <nav>
          <ol className="flex mb-2 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-4">Inicio</li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Pacientes
            </li>
          </ol>
          <div className="w-10 pb-2">
            <img
              src={salir}
              alt=""
              onClick={() => window.history.back()}
              className="cursor-pointer"
            />
          </div>
        </nav>
      </section>

      <section className="p-5 bg-white rounded-md shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/* header-tale */}

        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="container-filter">
            <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
              Buscar Paciente :
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
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
              className="border-2 h-[40px] w-[90px] focus:outline-none rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="10">10 Paginas</option>
              <option value="20">20 Paginas</option>
              <option value="30">30 Paginas</option>
            </select>
            <ModalPaciente
              id={null}
              update={false}
              tittle="Crear"
              paciente={null}
            />
          </div>
        </section>

        {/* Tabla de Pacientes */}
        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-300">
            No se encontraron resultados para la busqueda
          </div>
        ) : (
          <>
            <table className="w-full text-sm ">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                  <th className=" w-[70px]">ID</th>
                  <th className="">Identificación</th>
                  <th className="">Tipo de Documento</th>
                  <th className="">Nombre Completo</th>
                  <th className=" w-[120px]">Número Celular</th>
                  <th className=" w-[130px]">Teléfono Fijo</th>
                  <th className="">Correo</th>
                  <th className="">Convenio</th>
                  <th className=" w-[90px]">Estado </th>
                  <th className=" w-[80px]">Acciones</th>
                </tr>
              </thead>

              <tbody className="text-xs text-center dark:text-gray-200">
                {currentData().map((pacientes) => (
                  <tr key={pacientes.id}>
                    <td>{pacientes.id}</td>
                    <td>{pacientes.documentNumber}</td>
                    <td>{pacientes.documentRelation.name}</td>
                    <td>{pacientes.name}</td>
                    <td>{pacientes.phoneNumber}</td>
                    <td>{pacientes.landline}</td>
                    <td>{pacientes.email}</td>
                    <td>{pacientes.convenioRelation.name}</td>
                    <td>{pacientes.status ? "Activo" : "Inactivo"}</td>
                    <td>
                      <ModalPaciente
                        id={pacientes.id}
                        update={true}
                        tittle="Editar"
                        paciente={pacientes}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>‎ </div>
            {/* Controles de Paginacion */}
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

export default TablaPacientes;
