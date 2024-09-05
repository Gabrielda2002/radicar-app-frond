//*Funciones y Hooks
import { Link } from "react-router-dom";

import ModalCirugias from "./modals/ModalCirugias";
import ModalMostarDatos from "./modals/ModalMostrarDatos.tsx";

//iconos
import salir from "/assets/back.svg";

const TablaCirugias = () => {
 
  return (
    <>
      {/*nav-auditoria*/}
      <section className="dark:bg-gray-900">
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100">
          Módulo Cirugias
        </h1>
        <nav className="">
          <ol className="flex mb-2 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-2 ">Inicio</li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Cirugias
            </li>
          </ol>
          <div className="w-10 pb-2">
            <Link to="/inicio">
              <img src={salir} alt=""></img>
            </Link>
          </div>
        </nav>
      </section>

      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/*header-table*/}

        <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
          Buscar registro Cirugia :
        </label>
        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="flex items-center space-x-2 container-filter">
            <input
              placeholder="Consultar..."
              className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></input>
          </div>
          <div className="flex items-center space-x-2 pt-1-">
            <select
              name=""
              id=""
              className="border-2 h-[40px] w-[100px] focus:outline-none rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="1">10 Paginas</option>
              <option value="2">20 Paginas</option>
              <option value="3">30 Paginas</option>
            </select>
          </div>
        </section>
        
        <table className="min-w-full mx-auto text-sm ">
          <thead>
            <tr className="text-center bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
              <th className="px-4 py-2">Fecha - Hora del Radicado</th>
              <th className="px-4 py-2">N.º Radicado</th>
              <th className="px-4 py-2">N.º Documento</th>
              <th className="px-4 py-2">Nombre Completo</th>
              <th className="px-4 py-2">Nombre Paciente</th>
              <th className="px-4 py-2">Servicio de Radicado</th>
              <th className="px-4 py-2">Fecha Auditoria</th>
              <th className="px-4 py-2">Justificación Auditoria</th>
              <th className="px-4 py-2">Especialidad</th>
              <th className="px-4 py-2">Mostrar</th>
              <th className="px-4 py-2">Servicio Solicitado</th>
            </tr>
          </thead>

          <tbody className="text-xs text-center bg-white dark:bg-gray-800 dark:text-gray-200">
            <tr>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td>....texto alussivo</td>
              <td className="">
                <ModalMostarDatos
                    // Table Col 1 (6)
                    numRadi={true}//
                    feRadi={true}//fecha paraclinicos
                    nomCiru1="Paraclinicos"
                    tipoDoc={true}//Numero programacion
                    nomCiru7="Numero Programacion"
                    numDoc={true}//
                    nomPac={true}//
                    numCel={true}//hora programada
                    nomCiru2="Hora Programada"
                    // telFijo={false}
                    // email={false}
                    direccion={true}//observaciones
                    nomCiru3="Observaciones"
                    convenio={true}//fecha valoracion
                    nomCiru4="Fecha Valoracion"
                    ipsPri={true}//fecha cirugia
                    nomCiru5="Fecha Cirugia"
                    feOrden={true}//fecha ordenamiento
                    nomCiru6="Ordenamiento"
                    // lugRadi={false}
                    ipsRem={true}//dejaste esta ips
                    // Table Col 2 (5)
                    // obserAuditoria={false}
                    // justConcepto={false}
                    // unidadFunciona={false}
                    // feAuditoria={false}
                    // nomAuditor={false}
                    // auxiRadi={false}
                    // descripCup={false}
                    // codCup={false}
                    // tipoServicio={false}
                    // grupoServicio={false}
                    // descripDiagn={false}
                    // codDiagn={false}
                    // especialidad={false}
                    // profecional={false}
                ></ModalMostarDatos>
              </td>
              <td className="px-4 py-2">
                <ModalCirugias />
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
