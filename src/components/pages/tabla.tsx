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

  const {data, loading, error} = useFetchUsers();

  if(loading) return <h2>Cargando...</h2>
  if(error) return <h2>{error}</h2>

  return (
    <>
      {/* nav-table */}

      <section className="">
        <h1 className="text-color text-4xl mb-4">Módulo Radicación</h1>
        <nav className="">
          <ol className="mb-2 flex">
            <li className="text-slate-400 after:mr-2 ">Inicio</li>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Radicación
            </li>
          </ol>
          <div className="pb-2">
            <Link to="/inicio">
              <img src={salir} alt=""></img>
            </Link>
          </div>
        </nav>
      </section>

      <section className="container-tabla bg-white p-5 mb-11 shadow-lg shadow-indigo-500/40  rounded-md">
        {/* header-table */}

        <section className="header-tabla pb-6 flex justify-between items-center">
          <div className="container-filter">
            <label className="font-bold text-lg text-stone-600">
              Buscar registro Radicacion :
            </label>
            <input
              placeholder=" Consultar registro..."
              className="block  w-[280px] h-10  border-2 rounded-md focus:outline-none focus:ring"
            ></input>
          </div>
          <div className="flex items-center space-x-2 pt-1-">
            <select
              name=""
              id=""
              className="border-2 h-[40px] w-[90px] rounded-md"
            >
              <option value="">PAGES</option>
              <option value="1">10 PAGES</option>
              <option value="2">20 PAGES</option>
              <option value="3">30 PAGES</option>
            </select>
            {/* <button className="border-2  w-[90px] h-11 rounded-md bg-color text-white active:bg-emerald-900 ">
              Radicar
            </button> */}
            <ModalRadicacion></ModalRadicacion>
          </div>
        </section>

        <table className="text-sm">
          <thead>
            <tr className="">
              <th>Fecha - Hora del Radicado</th>
              <th>N.º Radicado</th>
              <th>Convenio</th>
              <th>N.º Documento</th>
              <th>Nombre Paciente</th>
              <th>Fecha Auditoria</th>
              {/* <th>    </th> */}
              <th>Nombre Auditora</th>
              <th>Soporte</th>
              <th>Gestión Auxiliar</th>
              <th>Mostrar</th>
              <th>Servicio Solicitado</th>
            </tr>
          </thead>
            
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-200">
            {data.map((radicacion) => (
              <tr className="text-center" key={radicacion.id}>
                <td>{radicacion.createdAt ? radicacion.createdAt.toISOString() : "N/A"}</td>
                <td>{radicacion.id}</td>
                <td>{radicacion.convenio}</td>
                <td>{radicacion.document}</td>
                <td>{radicacion.patientName}</td>
                <td>{radicacion.auditDate ? radicacion.auditDate.toISOString() : "N/A"}</td>
                <td>{radicacion.management}</td>
                <td>
                  <img src={soporte} alt="" />
                </td>
                <td>
                  <img src={gestion} alt="" />
                </td>
                <td>
                  <img src={mostrar} alt="" />
                </td>
                <td>
                  <img src={servicio} alt="" />
                </td>
              </tr>
            ))}

          </tbody>
        </table>

        {/*posible pagination*/}
      </section>
    </>
  );
};
export default Tabla;
