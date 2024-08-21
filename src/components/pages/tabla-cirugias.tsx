import { Link } from "react-router-dom";

import soporte from "/assets/soporte.svg";
import salir from "/assets/back.svg";

const TablaCirugias = () => {
  return (
    <>
      {/*nav-auditoria*/}

      <section>
        <h1 className="text-color text-4xl mb-4">Módulo Cirugias</h1>
        <nav className="">
          <ol className="mb-2 flex">
            <li className="text-slate-400 after:mr-2 ">Inicio</li>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Cirugias
            </li>
          </ol>
          <div className="pb-2">
            <Link to="/inicio">
              <img src={salir} alt=""></img>
            </Link>
          </div>
        </nav>
      </section>

      <div className=" bg-white p-5 ml-0  mb-11 shadow-lg shadow-indigo-500/40  rounded-md">
        {/*header-table*/}

        <section className="header-tabla pb-6 flex justify-between items-center">
          <div className="container-filter">
            <label className="font-bold text-lg text-stone-600">
              Buscar registro Cirugia :
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
          </div>
        </section>

        <table className="text-sm ">
          <thead>
            <tr>
              <th>Fecha - Hora del Radicado</th>
              <th>N.º Radicado</th>
              <th>N.º Documento</th>
              <th>Nombre Completo</th>
              <th>Nombre Paciente</th>
              <th>Servicio de Radicado</th>
              <th>Fecha Auditoria</th>
              <th>Justificacion Auditoria</th>
              <th>Especialidad</th>
              <th>Mostrar</th>
              <th>Servicio Solicitado</th>
            </tr>
          </thead>

          <tbody>
            <tr>
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
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={soporte}></img>
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
              <td>
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={soporte}></img>
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
              <td>
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={soporte}></img>
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
              <td>
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={soporte}></img>
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
              <td>
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={soporte}></img>
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
              <td>
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={soporte}></img>
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
              <td>
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={soporte}></img>
                </button>
              </td>
              <td>
                <button>
                  <img src={soporte}></img>
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

export default TablaCirugias;
