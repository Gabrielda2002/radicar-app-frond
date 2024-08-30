import { Link } from "react-router-dom";

import salir from "/assets/back.svg";
import onOff from "/assets/on-off.svg";
import { useFetchIpsPrimaria } from "../../../hooks/useFetchUsers";
import ModalIpsPrimaria from "../modals/modal-ips-primaria";

const TablaIpsPrimaria = () => {

    const {data, loading, error} = useFetchIpsPrimaria();

    if(loading) return <h1>Cargando...</h1>;
    if(error) return <h1>{error}</h1>;

  return(
    <>
        {/* nav-table */}

        <section className="dark:bg-gray-900"> 
            <h1 className="mb-4 text-4xl text-color dark:text-gray-100 ">Módulo IPS Primaria</h1>
            <nav>
                <ol className="flex mb-2 dark:text-gray-300">
                    <li className="text-slate-400 after:mr-4">Inicio</li>
                    <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
                        Servicio IPS Primaria
                    </li>
                </ol>
                <div  className="w-10 pb-2">
                    <Link to="/inicio">
                        <img src={salir} alt="" />
                    </Link>
                </div>
            </nav>
        </section>

        <section className="p-5 bg-white rounded-md shadow-lg container-table dark:bg-gray-800 mb-11 shadow-indigo-500/40">
            {/* header-tale */}

            <section className="flex items-center justify-between pb-6 header-tabla">
                <div className="container-filter">
                    <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
                        Buscar IPS Primaria :
                    </label> 
                   <input
                        placeholder=" Consultar IPS Primaria..."
                        className="block w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                   >
                   </input>
                </div>
                <div className="flex items-center pt-1 space-x-2">
                    <select
                        name=""
                        id=""
                        className="border-2 h-[40px] w-[90px] rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">PAGES</option>
                        <option value="10">10 PAGES</option>
                        <option value="20">20 PAGES</option>
                        <option value="30">30 PAGES</option>
                    </select>
                    {/* <button className="borde-2 w-[150px] h-12 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900 active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800">
                        Agregar IPS Primaria
                    </button> */}

                    <ModalIpsPrimaria></ModalIpsPrimaria>
                </div>
            </section>

            <table className="mx-auto text-sm divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr className="dark:bg-gray-700 dark:text-gray-200 bg-gray-50">
                        <th className=" w-[60px]">ID</th>
                        <th className=" w-[200px]">Nombre IPS Primaria</th>
                        <th className=" w-[100px]">Estado</th>
                        <th className=" w-[80px]">Acciones</th>
                    </tr>
                </thead>
                    
                <tbody className="text-center text-xs divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-200">
                    {data.map((ips) => (
                        <tr key={ips.id}>
                            <td className="py-2">{ips.id}</td>
                            <td className="py-2">{ips.name}</td>
                            <td className="py-2">{ips.status ? "Activo" : "Inactivo"}</td>
                            <td className="py-2">
                                <img src={onOff} alt="on-off" className="w-8 h-8 mx-auto"/>
                            </td>
                        </tr>
                    ))}
                    <tr>
                    </tr>
                </tbody>
            </table>
        </section>
    </>
  ); 

};

export default TablaIpsPrimaria;
