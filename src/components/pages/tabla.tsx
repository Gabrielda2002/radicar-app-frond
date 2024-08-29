import { Link } from "react-router-dom";
import ModalRadicacion from "./modals/modal-radicacion";

/* <-- ICONS TABLE --> */
import soporte from "/assets/soporte.svg";
import gestion from "/assets/gestion.svg";
import mostrar from "/assets/mostrar.svg";
import servicio from "/assets/servicio.svg";
import salir from "/assets/back.svg";
import { useFetchUsers } from "../../hooks/useFetchUsers";

const Tabla = () => {
  const { data, loading, error } = useFetchUsers();

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      {/* nav-table */}
      <section className="dark:bg-gray-900">
        <h1 className="mb-4 text-4xl text-color dark:text-gray-200">
          Módulo Radicación
        </h1>
        <nav>
          <ol className="flex mb-2 dark:text-gray-300">
            <li className="text-slate-400 after:mr-2">Inicio</li>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Radicación
            </li>
          </ol>
          <div className="pb-2">
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
              Buscar registro Radicacion :
            </label>
            <input
              placeholder=" Consultar registro..."
              className="block w-[280px] h-10 border-2 rounded-md focus:outline-none focus:ring dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
            />
          </div>
          <div className="flex items-center space-x-2 pt-1-">
            <select
              name=""
              id=""
              className="border-2 h-[40px] w-[90px] rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">PAGES</option>
              <option value="1">10 PAGES</option>
              <option value="2">20 PAGES</option>
              <option value="3">30 PAGES</option>
            </select>
            <ModalRadicacion />
          </div>
        </section>

        {/* Contenedor para la tabla con overflow-x-auto */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="dark:text-gray-300 dark:bg-gray-700 bg-gray-50">
                <th>Fecha - Hora del Radicado</th>
                <th>N.º Radicado</th>
                <th>Convenio</th>
                <th>N.º Documento</th>
                <th>Nombre Paciente</th>
                <th>Fecha Auditoria</th>
                <th>Nombre Auditora</th>
                <th>Soporte</th>
                <th>Gestión Auxiliar</th>
                <th>Mostrar</th>
                <th>Servicio Solicitado</th>
              </tr>
            </thead>

            <tbody className="text-sm divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-200">
              {data.map((radicacion) => (
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
                    <img src={soporte} alt="Soporte" />
                  </td>
                  <td>
                    <img src={gestion} alt="Gestión Auxiliar" />
                  </td>
                  <td>
                    <img src={mostrar} alt="Mostrar" />
                  </td>
                  <td>
                    <img src={servicio} alt="Servicio Solicitado" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* posible paginación */}
      </section>
    </>
  );
};

export default Tabla;
