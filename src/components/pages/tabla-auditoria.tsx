import { Link } from "react-router-dom";

import soporte from "/assets/soporte.svg";
import mostrar from "/assets/mostrar.svg";
import autorizar from "/assets/autorizar.svg";
import salir from "/assets/back.svg";


const TablaAuditoria = () => {
  return (
    <>
      {/*nav-auditoria*/}

      <section className="p-4 dark:bg-gray-900">
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100">Módulo Auditoria</h1>
        <nav className="">
          <ol className="flex mb-2 text-gray-700 dark:text-gray-300">
            <li className="text-slate-400 after:mr-2 ">Inicio</li>
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
        {/*header-table*/}
        <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
          Buscar registro Auditoria :
        </label>
        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="flex items-center space-x-2 container-filter">
            <input
              placeholder=" Consultar Auditoria..."
              className="block  w-[280px] h-10  border-2 rounded-md focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></input>
          </div>
          <div className="flex items-center space-x-2 pt-1-">
            <select
              name=""
              id=""
              className="border-2 h-[40px] w-[90px] rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="1">10 Paginas</option>
              <option value="2">20 Paginas</option>
              <option value="3">30 Paginas</option>
            </select>
            <button className="borde-2 w-[90px] h-12 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800">
              Ver Autorizaciones
            </button>
          </div>
        </section>

        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="text-center bg-gray-50 dark:bg-gray-700">
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

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-200">
          <tr>
              <td className="break-words">2024-05-31 11:36:15</td>
              <td className="break-words">CC</td>
              <td className="break-words">1149456844</td>
              <td className="break-words">CARLOS ALONSO GALVIS BRICE?O</td>
              <td className="break-words">Compensar EPS</td>
              <td className="break-words">LA CALERA</td>
              <td className="break-words">2024-04-12</td>
              <td className="break-words">Cúcuta/Torre Compensar</td>
              <td className="break-words">Fundación el Principio de una Esperanza</td>
              <td className="break-words">CARLOS ALONSO GALVIS BRICE?O</td>
              <td className="break-words">Dolor y cuidados paliativos</td>
              <td className="break-words">PARTICULAR</td>
              <td className="break-words">CARLOS ALONSO GALVIS BRICE?O</td>
              <td >
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={mostrar}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={autorizar}></img>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={mostrar}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={autorizar}></img>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={mostrar}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={autorizar}></img>
                </button>
              </td>
            </tr>

          </tbody>
        </table>

        {/* pagination */}
      </div>
    </>
  );
};

export default TablaAuditoria;
