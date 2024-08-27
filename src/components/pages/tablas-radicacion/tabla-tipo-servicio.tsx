import { Link } from "react-router-dom";

import salir from "/assets/back.svg";
import onOff from "/assets/on-off.svg";
const TablaTipoServicio = () => {
  return(
    <>
        {/* nav-table */}

        <section className="dark:bg-gray-900 p-4"> 
            <h1 className="text-color dark:text-gray-100 text-4xl mb-4 ">Módulo Tipo Servicio</h1>
            <nav>
                <ol className="mb-2 flex dark:text-gray-300">
                    <li className="text-slate-400 after:mr-4">Inicio</li>
                    <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
                        Servicio Tipo Servicio
                    </li>
                </ol>
                <div  className="pb-2 w-10">
                    <Link to="/inicio">
                        <img src={salir} alt="" />
                    </Link>
                </div>
            </nav>
        </section>

        <section className="container-table dark:bg-gray-800 bg-white p-5 mb-11 shadow-lg shadow-indigo-500/40 rounded-md">
            {/* header-tale */}

            <section className="header-tabla pb-6 flex justify-between items-center">
                <div className="container-filter">
                    <label className="font-bold text-lg text-stone-600 dark:text-stone-300">
                        Buscar Tipo Servicio :
                    </label> 
                   <input
                        placeholder=" Consultar Tipo Servicio..."
                        className="block w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                   >
                   </input>
                </div>
                <div className="flex items-center space-x-2 pt-1">
                    <select
                        name=""
                        id=""
                        className="border-2 h-[40px] w-[90px] rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Paginas</option>
                        <option value="10">10 Paginas</option>
                        <option value="20">20 Paginas</option>
                        <option value="30">30 Paginas</option>
                    </select>
                    <button className="borde-2 w-[100px] h-12 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800">
                        Agregar Tipo Servicio
                    </button>
                </div>
            </section>

            <table className="text-sm mx-auto divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr className="dark:bg-gray-700 dark:text-gray-200">
                        <th className=" w-[60px]">ID</th>
                        <th className=" w-[200px]">Nombre Tipo Servicio</th>
                        <th className=" w-[100px]">Estado</th>
                        <th className=" w-[80px]">Acciones</th>
                    </tr>
                </thead>
                    
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-200">
                    <tr>
                        <td className="break-words">4 </td>
                        <td className="break-words">PARTICULAR </td>
                        <td className="break-words">ACTIVO </td>
                        <td className="break-words">
                            <button>
                                <img src={onOff} alt="" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="break-words">3 </td>
                        <td className="break-words">PGP </td>
                        <td className="break-words">INACTIVO </td>
                        <td className="break-words">
                            <button>
                                <img src={onOff} alt="" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </>
  ); 

};

export default TablaTipoServicio;
