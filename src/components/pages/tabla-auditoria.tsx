import { Link } from "react-router-dom";

import soporte from "/assets/soporte.svg";
import mostrar from "/assets/mostrar.svg";
import autorizar from "/assets/autorizar.svg";
import salir from "/assets/back.svg";

const TablaAuditoria = () => {
  return (
    <>
      {/*nav-auditoria*/}

      <section>
      <h1 className="text-color text-4xl mb-4">Módulo Auditoria</h1>
        <nav className="">
          <ol className="mb-2 flex">
            <li className="text-slate-400 after:mr-2 ">Inicio</li>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Auditoria
            </li>
          </ol>
          <div className="pb-2 w-10">
            <Link to="/inicio">
              <img src={salir} alt=""></img>
            </Link>
          </div>
        </nav>
      </section>

      <div className="container-tabla bg-white p-5 ml-0  mb-11 shadow-lg shadow-indigo-500/40  rounded-md w-[1450px]">
        {/*header-table*/}

        <section className="header-tabla pb-6 flex justify-between items-center">
          <div className="container-filter">
            <label className="font-bold text-lg text-stone-600">
              Buscar registro Auditoria :
            </label>
            <input
              placeholder=" Consultar registro..."
              className="block w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100"
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
            <button className="borde-2 w-[90px] h-12 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 ">
              Ver Autorizaciones
            </button>
          </div>
        </section>

        <table className="">
          <thead>
            <tr>
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

          <tbody>
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
          <tr>
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
          <tr>
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
