import { Link } from "react-router-dom";

import salir from "/assets/back.svg";

const TablaPacientes = () => {
  return(
    <>
        {/* nav-table */}

        <section> 
            <h1 className="text-color text-4xl mb-4 ">Módulo Pacientes</h1>
            <nav>
                <ol className="mb-2 flex">
                    <li className="text-slate-400 after:mr-4">Inicio</li>
                    <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
                        Servicio Pacientes
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
                        Buscar Paciente :
                    </label> 
                   <input
                        placeholder=" Consultar Paciente..."
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
                        <option value="">Paginas</option>
                        <option value="10">10 Paginas</option>
                        <option value="20">20 Paginas</option>
                        <option value="30">30 Paginas</option>
                    </select>
                    <button className="borde-2 w-[150px] h-[40px] rounded-md bg-color text-white active:bg-emerald-900">
                        Agregar Paciente
                    </button>
                </div>
            </section>

            <table className="text-sm mx-auto">
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Identificación</th>
                        <th>Tipo de Documento</th>
                        <th>Nombre Completo</th>
                        <th>Número Celular</th>
                        <th>Telefono Fijo</th>
                        <th>Correo</th>
                        <th>Convenio</th>
                        <th>Estado </th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                    
                <tbody>
                    <tr className="text-center">
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>...texto alusivo </td>
                        <td>...texto alusivo </td>
                        <td>...texto alusivo </td>
                        <td>...texto alusivo </td>
                        <td>"icon"</td>
                    </tr>
                    <tr className="text-center">
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>...texto alusivo </td>
                        <td>...texto alusivo </td>
                        <td>...texto alusivo </td>
                        <td>...texto alusivo </td>
                        <td>"icon"</td>
                    </tr>
                    <tr className="text-center">
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>...texto alusivo </td>
                        <td>...texto alusivo </td>
                        <td>...texto alusivo </td>
                        <td>...texto alusivo </td>
                        <td>"icon"</td>
                    </tr>
                    <tr className="text-center">
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>....texto alusivo</td>
                        <td>...texto alusivo </td>
                        <td>...texto alusivo </td>
                        <td>...texto alusivo </td>
                        <td>...texto alusivo </td>
                        <td>"icon"</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </>
  ); 

};

export default TablaPacientes;
