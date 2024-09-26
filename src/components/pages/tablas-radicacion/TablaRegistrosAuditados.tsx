//*Funciones y Hooks
import { Link } from "react-router-dom";
import ModalActualizarCupsAuditoria from "../modals/ModalActualizarCupsAuditados";
import LoadingSpinner from "../../LoadingSpinner";
//*Icons
import salir from "/assets/back.svg";
import { useFetchAuditados } from "../../../hooks/useFetchUsers";

const TablaRegistrosAuditados = () => {
  const { data, loading, error } = useFetchAuditados();

  if (loading) return <LoadingSpinner />;
  if (error) return <h2>Error al cargar {error}</h2>;

  return (
    <>
      {/* nav-container */}
      <section className="p-4 dark:bg-gray-900 ps-0">
        <LoadingSpinner duration={500} />
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100">
          Módulo Registro Auditados
        </h1>
        <nav>
          <ol className="flex mb-3 text-gray-700 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-2">Inicio</li>
            </Link>
            <Link to="/tabla-auditoria">
              <li className="text-slate-400 before:content-['/'] before:mr-2 after:mr-2 before:text-slate-400">
                Servicio Auditoría
              </li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Registros Auditados
            </li>
          </ol>
        </nav>
        <div className="w-10 ">
          <img
            src={salir}
            alt="icon-salir"
            onClick={() => window.history.back()}
            className="cursor-pointer"
          />
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
          <div className="flex items-center">
            <input
              type="text"
              className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
        <table className="min-w-full  dark:text-gray-100">
          <thead className="">
            <tr className="text-sm text-center bg-gray-50 dark:bg-gray-700 ">
              <th>ID Radicación</th>
              <th>Número Documento</th>
              <th>Nombre Paciente</th>
              <th>CUPS</th>
            </tr>
          </thead>

          <tbody>
            {data.map((auditado) => (
              <tr className="text-xs text-center mt-2" key={auditado.id}>
                <td>{auditado.id}</td>
                <td>{auditado.document}</td>
                <td>{auditado.patientName}</td>
                <table>
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Descripción</th>
                      <th>Estado</th>
                      <th>Observación</th>
                      <th>Última modificación</th>
                      <th>Editar</th>
                    </tr>
                  </thead>
                  {auditado.CUPS.map((cups) => (
                    <tbody>
                      <tr key={cups.code}>
                        <td>{cups.code}</td>
                        <td>{cups.description}</td>
                        <td>{cups.status}</td>
                        <td>{cups.observation}</td>
                        <td>
                          {cups.modifyDate
                            ? cups.modifyDate.toISOString()
                            : "N/A"}
                        </td>
                        <td>
                          <ModalActualizarCupsAuditoria
                            cup={cups}
                          />
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination */}
      </section>
    </>
  );
};

export default TablaRegistrosAuditados;
