import { Link } from "react-router-dom";

import ModalCups from "../modals/modal-cups";

import salir from "/assets/back.svg";
import onOff from "/assets/on-off.svg";

const TablaCups = () => {
  return(
    <>
        {/* nav-table */}

        <section> 
            <h1 className="text-color text-4xl mb-4 ">Módulo Cups</h1>
            <nav>
                <ol className="mb-2 flex">
                    <li className="text-slate-400 after:mr-4">Inicio</li>
                    <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
                        Servicio Cups
                    </li>
                </ol>
                <div  className="pb-2 w-10 ">
                    <Link to="/inicio">
                        <img src={salir} alt="" />
                    </Link>
                </div>
            </nav>
        </section>
        
        {/* container-table */}
        <section className=" bg-white p-5 mb-11 shadow-lg shadow-indigo-500/40 rounded-md w-full overflow-hidden">
            {/* header-tale */}

            <section className="header-tabla pb-6 flex justify-between items-center">
                <div className="container-filter">
                    <label className="font-bold text-lg text-stone-600">
                        Buscar Cup :
                    </label> 
                   <input
                        placeholder=" Buscar..."
                        className="block w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100 "
                   >
                   </input>
                </div>
                <div className="flex items-center space-x-2 pt-1">
                    <select
                        name=""
                        id=""
                        className="border-2 border-stone-300 h-[40px] w-[100px] rounded-md  focus:outline-none text-stone-600 "
                    >
                        <option value="">PAGES</option>
                        <option value="10">10 PAGES</option>
                        <option value="20">20 PAGES</option>
                        <option value="30">30 PAGES</option>
                    </select>
                    {/* <button className="borde-2 w-[90px] h-12 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 ">
                        Agregar Cup
                    </button> */}
                    <ModalCups></ModalCups>
                </div>
            </section>

            <table>
                <thead>
                    <tr>
                        <th className=" w-[70px]">ID</th>
                        <th className=" ">Codigo</th>
                        <th className=" w-[600px]">Descripcion del Cup</th>
                        <th className=" ">Estado</th>
                        <th className=" ">Acciones</th>
                    </tr>
                </thead>
                    
                <tbody>
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
