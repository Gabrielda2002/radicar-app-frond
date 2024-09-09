//*Funciones y Hooks
import { Link } from "react-router-dom";
import ModalAction from "../modals/ModalAction";
import ModalPaciente from "../modals/ModalPaciente";
//*Iconos
import salir from "/assets/back.svg";

//! NO BORRAR
/*
Componentes para la paginacion y busqueda y filtrado

import usePagination from "../../../hooks/usePagination";
import useSearch from "../../../hooks/useSearch";
import Pagination from "../../Pagination";

const ITEMS_PER_PAGE = 10;
const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
const {query, setQuery, filteredData} = useSearch(data,[
  "id",
  "document",
  "TypeDocument",
  "full name",
  "phone",
  "mail",
  "convenio",
  "Status"
  ] '

  const {currentPage, totalPages, paginate, currentData} = usePagination(
    filteredData,
    itemsPerPage
  )
*/
//! NO BORRAR

const TablaPacientes = () => {
  return (
    <>
      {/* nav-table */}

      <section className=" dark:bg-gray-900">
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
              Buscar Paciente :
            </label>
            <input
              placeholder="Consultar..."
              className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></input>
          </div>
          <div className="flex items-center pt-1 space-x-2">
            <select
              name=""
              id=""
              className="border-2 h-[40px] w-[90px] focus:outline-none rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="10">10 Paginas</option>
              <option value="20">20 Paginas</option>
              <option value="30">30 Paginas</option>
            </select>
            {/* <button className="borde-2 w-[150px] h-[40px] rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800">
                        Agregar Paciente
                    </button> */}
            <ModalPaciente></ModalPaciente>
          </div>
        </section>

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

          <tbody className="text-xs text-center  dark:text-gray-200">
            <tr>
              <td className="break-words">222</td>
              <td className="break-words">1045256363</td>
              <td className="break-words">CC</td>
              <td className="break-words">LAURA ANDREA CASTRO BARBOSA</td>
              <td className="break-words">30420192872</td>
              <td className="break-words">30420197582222</td>
              <td className="break-words">noregistra@notiene.com</td>
              <td className="break-words">Compensar EPS</td>
              <td className="break-words">INACTIVO2</td>
              <td className="break-words">
                <ModalAction nom="Paciente" />
              </td>
            </tr>
            <tr>
              <td className="break-words">10</td>
              <td className="break-words">2782665572</td>
              <td className="break-words">CC</td>
              <td className="break-words">JESSICA LIZBETH BRICE O AGUIN</td>
              <td className="break-words">30287662778</td>
              <td className="break-words"> 092767276662</td>
              <td className="break-words">noregistra@notiene.com</td>
              <td className="break-words">Ferrocarriles </td>
              <td className="break-words">INACTIVO2 </td>
              <td className="break-words">
                <ModalAction nom="Pacientes" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default TablaPacientes;
