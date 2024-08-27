import { Link } from "react-router-dom";

import salir from "/assets/back.svg";
import onOff from "/assets/on-off.svg";

const TablaLugarRadicacion = () => {
  return(
    <>
        {/* nav-table */}

        <section> 
            <h1 className="text-color text-4xl mb-4 ">Módulo Lugar Radicacion</h1>
            <nav>
                <ol className="mb-2 flex">
                    <li className="text-slate-400 after:mr-4">Inicio</li>
                    <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
                        Servicio Lugar Radicacion
                    </li>
                </ol>
                <div  className="pb-2 w-10">
                    <Link to="/inicio">
                        <img src={salir} alt="" />
                    </Link>
                </div>
            </nav>
        </section>

        <section className="container-table bg-white p-5 mb-11 shadow-lg shadow-indigo-500/40 rounded-md">
            {/* header-tale */}

            <section className="header-tabla pb-6 flex justify-between items-center">
                <div className="container-filter">
                    <label className="font-bold text-lg text-stone-600">
                        Buscar Lugar Radicacion :
                    </label> 
                   <input
                        placeholder=" Consultar Lugar Radicacion..."
                        className="block w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100"
                   >
                   </input>
                </div>
                <div className="flex items-center space-x-2 pt-1">
                    <select
                        name=""
                        id=""
                        className="border-2 h-[40px] w-[90px] rounded-md"
                    >
                        <option value="">Paginas</option>
                        <option value="10">10 Paginas</option>
                        <option value="20">20 Paginas</option>
                        <option value="30">30 Paginas</option>
                    </select>
                    <button className="borde-2 w-[100px] h-12 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 ">
                        Agregar Lugar
                    </button>
                </div>
            </section>

            <table className="text-sm mx-auto">
                <thead>
                    <tr>
                        <th className=" w-[60px]">ID</th>
                        <th className=" w-[200px]">Nombre Lugar</th>
                        <th className=" w-[100px]">Estado</th>
                        <th className=" w-[80px]">Acciones</th>
                    </tr>
                </thead>
                    
                <tbody>
                    <tr>
                        <td className="break-words">45 </td>
                        <td className="break-words">Cúcuta/Torre Compensar  </td>
                        <td className="break-words">ACTIVO </td>
                        <td className="break-words">
                            <button>
                                <img src={onOff} alt="" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="break-words">9 </td>
                        <td className="break-words">Cúcuta/Call Center </td>
                        <td className="break-words"> INACTIVO </td>
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

export default TablaLugarRadicacion;
