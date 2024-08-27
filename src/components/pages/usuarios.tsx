import { Link } from "react-router-dom";

import mostrar from "/assets/mostrar.svg";
import salir from "/assets/back.svg";

const Usuarios = () => {
  return (
    <>
      <section className="">
        <h1 className="text-color text-4xl mb-4">Módulo Usuarios</h1>
        <nav className="">
          <ol className="mb-2 flex">
            <li className="text-slate-400 after:mr-2 ">Inicio</li>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Usuarios
            </li>
          </ol>
          <div className="pb-2">
            <Link to="/inicio">
              <img src={salir} alt=""></img>
            </Link>
          </div>
        </nav>
      </section>
      <section className="container-table bg-white p-5 mb-11 shadow-lg shadow-indigo-500/40  rounded-md">
        {/* header-table */}
        <label className="font-bold text-lg text-stone-600">
          Buscar Usuarios:
        </label>
        <section className="header-tabla pb-6 flex justify-between items-center">
          <div className="container-filter flex items-center space-x-2">
            <input
              placeholder="Consultar Usuarios"
              className="block w-[280px] h-10 border-2 rounded-md focus:outline-none focus:ring"
            />
          </div>

          <div className="flex items-center space-x-2 pt-1-">
            <select
              name=""
              id=""
              className="border-2 h-[40px] w-[100px] rounded-md"
            >
              <option value="">Paginas</option>
              <option value="1">10 Paginas</option>
              <option value="2">20 Paginas</option>
              <option value="3">30 Paginas</option>
            </select>
          </div>
        </section>

        {/*Users Table Body */}

        <table className="text-sm mx-auto">
          <thead>
            <tr className="text-center">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">N.º Documento</th>
              <th className="px-4 py-2">Nombres</th>
              <th className="px-4 py-2">Apellidos</th>
              <th className="px-4 py-2">Tipo Documento</th>
              <th className="px-4 py-2">Mail</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Municipio</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td>
                <button>
                  {/*icon mostrar*/}
                  <img src={mostrar}></img>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td>
                <button>
                  {/*icon mostrar*/}
                  <img src={mostrar}></img>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td>
                <button>
                  {/*icon mostrar*/}
                  <img src={mostrar}></img>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td>
                <button>
                  {/*icon mostrar*/}
                  <img src={mostrar}></img>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td>
                <button>
                  {/*icon mostrar*/}
                  <img src={mostrar}></img>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td>
                <button>
                  {/*icon mostrar*/}
                  <img src={mostrar}></img>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td>
                <button>
                  {/*icon mostrar*/}
                  <img src={mostrar}></img>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td>
                <button>
                  {/*icon mostrar*/}
                  <img src={mostrar}></img>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td className="px-4 py-2">....texto alussivo</td>
              <td>
                <button>
                  {/*icon mostrar*/}
                  <img src={mostrar}></img>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/*posible pagination*/}
      </section>
    </>
  );
};

export default Usuarios;
