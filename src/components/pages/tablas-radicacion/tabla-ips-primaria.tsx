import { Link } from "react-router-dom";

import salir from "/assets/back.svg";
import onOff from "/assets/on-off.svg";

const TablaIpsPrimaria = () => {
  return(
    <>
        {/* nav-table */}

        <section> 
            <h1 className="text-color text-4xl mb-4 ">Módulo IPS Primaria</h1>
            <nav>
                <ol className="mb-2 flex">
                    <li className="text-slate-400 after:mr-4">Inicio</li>
                    <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
                        Servicio IPS Primaria
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
                        Buscar IPS Primaria :
                    </label> 
                   <input
                        placeholder=" Consultar IPS Primaria..."
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
                        <option value="">PAGES</option>
                        <option value="10">10 PAGES</option>
                        <option value="20">20 PAGES</option>
                        <option value="30">30 PAGES</option>
                    </select>
                    <button className="borde-2 w-[150px] h-12 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 ">
                        Agregar IPS Primaria
                    </button>
                </div>
            </section>

            <table className="text-sm mx-auto">
                <thead>
                    <tr>
                        <th className=" w-[60px]">ID</th>
                        <th className=" w-[200px]">Nombre IPS Primaria</th>
                        <th className=" w-[100px]">Estado</th>
                        <th className=" w-[80px]">Acciones</th>
                    </tr>
                </thead>
                    
                <tbody>
                    <tr>
                        <td className="break-words">4 </td>
                        <td className="break-words">La Calera </td>
                        <td className="break-words">ACTIVO </td>
                        <td className="break-words">
                            <button>
                                <img src={onOff} alt="" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="break-words"> 6 </td>
                        <td className="break-words">CAJICA </td>
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

export default TablaIpsPrimaria;
