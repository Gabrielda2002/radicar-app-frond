import { Link } from "react-router-dom";

import salir from "/assets/back.svg";
import onOff from "/assets/on-off.svg";

const TablaCups = () => {
  return(
    <>
        {/* nav-table */}

        <section className="p-4 dark:bg-gray-900"> 
            <h1 className="mb-4 text-4xl text-color dark:text-gray-100 ">Módulo Cups</h1>
            <nav>
                <ol className="flex mb-2 dark:text-gray-300">
                    <li className="text-slate-400 after:mr-4">Inicio</li>
                    <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
                        Servicio Cups
                    </li>
                </ol>
                <div  className="w-10 pb-2 ">
                    <Link to="/inicio">
                        <img src={salir} alt="" />
                    </Link>
                </div>
            </nav>
        </section>
        
        {/* container-table */}
        <section className="w-full p-5 overflow-hidden bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
            {/* header-tale */}

            <section className="flex items-center justify-between pb-6 header-tabla">
                <div className="container-filter">
                    <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
                        Buscar Cup :
                    </label> 
                   <input
                        placeholder=" Buscar..."
                        className="block w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                   >
                   </input>
                </div>
                <div className="flex items-center pt-1 space-x-2">
                    <select
                        name=""
                        id=""
                        className="border-2 border-stone-300 h-[40px] w-[100px] rounded-md  focus:outline-none text-stone-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">PAGES</option>
                        <option value="10">10 PAGES</option>
                        <option value="20">20 PAGES</option>
                        <option value="30">30 PAGES</option>
                    </select>
                    <button className="borde-2 w-[100px] h-[40px] rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800">
                        Agregar Cup
                    </button>
                </div>
            </section>

            <table className="mx-auto divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr className="dark:bg-gray-700 dark:text-gray-200">
                        <th className=" w-[70px]">ID</th>
                        <th className="">Codigo</th>
                        <th className=" w-[600px]">Descripcion del Cup</th>
                        <th className="">Estado</th>
                        <th className="">Acciones</th>
                    </tr>
                </thead>
                    
                <tbody className="text-center divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-200">
                    <tr>
                        <td className="break-words ">9</td>
                        <td className="break-words ">5725528</td>
                        <td className="break-words ">EXPLORACION Y DESCOMPRESION DEL CANAL RAQUIDEO Y RAICES ESPINAL...</td>
                        <td className="break-words ">INACTIVO</td>
                        <td className="break-words ">
                            <button>
                                <img src={onOff} alt="" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="break-words ">17 </td>
                        <td className="break-words ">09756272 </td>
                        <td className="break-words ">MANOMETRIA DE LIQUIDO CEFALORRAQUIDEO</td>
                        <td className="break-words ">ACTIVO </td>
                        <td className="break-words ">
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

export default TablaCups;
