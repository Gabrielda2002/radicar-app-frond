import { Link } from "react-router-dom";

import salir from "/assets/back.svg";

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
                <div  className="pb-2">
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
                        className="block w-[280px] h-10 border-2 rounded-md focus:outline-none focus:ring"
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
                    <button className="borde-2 w-[90px] h-12 rounded-md bg-color text-white active:bg-emerald-900">
                        Agregar Lugar
                    </button>
                </div>
            </section>

            <table className="text-sm ">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Lugar</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                    
                <tbody>
                    <tr>
                        <td>...texto alusivo </td>
                        <td>...texto alusivowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww </td>
                        <td>...texto alusivo </td>
                        <td>"icon"</td>
                    </tr>
                    <tr>
                        <td>...texto alusivo </td>
                        <td>...texto alusivowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww </td>
                        <td>...texto alusivo </td>
                        <td>"icon"</td>
                    </tr>
                    <tr>
                        <td>...texto alusivo </td>
                        <td>...texto alusivowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww </td>
                        <td>...texto alusivo </td>
                        <td>"icon"</td>
                    </tr>
                    <tr>
                        <td>...texto alusivo </td>
                        <td>...texto alusivowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww </td>
                        <td>...texto alusivo </td>
                        <td>"icon"</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </>
  ); 

};

export default TablaLugarRadicacion;
