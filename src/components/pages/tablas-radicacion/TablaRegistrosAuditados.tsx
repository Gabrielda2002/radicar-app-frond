//*Funciones y Hooks
import { Link } from "react-router-dom";
import ModalActualizarCupsAuditoria from "../modals/ModalActualizarCupsAuditados";
import LoadingSpinner from "../../LoadingSpinner";
//*Icons
import salir from "/assets/back.svg";

const TablaRegistrosAuditados = () => {
  return (
    <>
      {/* nav-container */}
      <section className="p-4 dark:bg-gray-900 ps-0">
        <LoadingSpinner duration={500} />
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100">
          Modulo Registro Auditados
        </h1>
        <nav>
          <ol className="flex mb-3 text-gray-700 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-2">Inicio</li>
            </Link>
            <Link to="/tabla-auditoria">
              <li className="text-slate-400 before:content-['/'] before:mr-2 after:mr-2 before:text-slate-400">
                Servicio Auditoria
              </li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Registros Auditados
            </li>
          </ol>
        </nav>
        <div className="w-10 ">
          <Link to="/inicio">
            <img src={salir} alt="icon-salir" />
          </Link>
        </div>
      </section>

      {/* header-tabla"container" */}
      <section className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        <label
          htmlFor=""
          className="text-lg font-bold text-stone-600 dark:text-stone-300"
        >
          Buscar registos Auditados:
        </label>
        <section className="flex justify-between pb-6 ">
          <div className="flex items-center ">
            <input
              type="text"
              className="block w-[280px] h-10 border-2 rounded-md focus:outline-none focus:ring dark:border-gray-600 text-stone-700 dark-text-white dark:bg-gray-700 "
              placeholder=" Consultar..."
            />
          </div>

          <div className="flex items-center">
            <select
              name=""
              id=""
              className="border-2 h-12 w-[100px] rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white "
            >
              <option value="">- SELECT -</option>
              <option value="1">10</option>
              <option value="2">20</option>
              <option value="3">30</option>
            </select>
          </div>
        </section>

        {/* init-tabla */}
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-100">
          <thead>
            <tr className="text-sm text-center bg-gray-50 dark:bg-gray-700">
              <th>ID CUP</th>
              <th>ID Radicación</th>
              <th>Número Documento</th>
              <th>Nombre Paciente</th>
              <th>Codigo CUP</th>
              <th>Descripción CUP</th>
              <th>Estado CUP</th>
              <th>Ultima Modificación</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-xs text-center divide-y divide-gray-200 dark:divide-gray-700">
              <td>..texto alusivo</td>
              <td>..texto alusivo</td>
              <td>..texto alusivo</td>
              <td>..texto alusivo</td>
              <td>..texto alusivo</td>
              <td>..texto alusivo</td>
              <td>..texto alusivo</td>
              <td>..texto alusivo</td>
              <td>
                <ModalActualizarCupsAuditoria />
              </td>
            </tr>
          </tbody>
        </table>

        {/* pagination */}
      </section>
    </>
  );
};

export default TablaRegistrosAuditados;
