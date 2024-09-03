import { Link } from "react-router-dom";

import ModalAction from "../modals/ModalAction";

import salir from "/assets/back.svg";

import { useFetchRadicador } from "../../../hooks/useFetchUsers";
import ModalRadicador from "../modals/ModalRadicador";
import LoadingSpinner from "../../loading-spinner";

const TablaRadicadores = () => {
  const { data, loading, error } = useFetchRadicador();

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      {/* nav-table */}

      <section className="p-4 dark:bg-gray-900">
        <LoadingSpinner duration={500} />
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100 ">
          Módulo Radicadores
        </h1>
        <nav>
          <ol className="flex mb-2 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-4">Inicio</li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Radicadores
            </li>
          </ol>
          <div className="w-10 pb-2">
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
              Buscar Radicador :
            </label>
            <input
              placeholder=" Consultar Radicador..."
              className="block w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></input>
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
            {/* <button className="borde-2 w-[150px] h-[40px] rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800">
              Agregar Radicador
            </button> */}
            <ModalRadicador></ModalRadicador>
          </div>
        </section>

        <table className="w-full mx-auto text-sm divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="dark:bg-gray-700 dark:text-gray-200 bg-gray-50">
              <th className=" w-[80px]">ID</th>
              <th className=" w-[600px] ">Nombre Prestador</th>
              <th className=" w-[150px]">Estado</th>
              <th className=" w-[150px]">Acciones</th>
            </tr>
          </thead>

          <tbody className="text-xs text-center divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-200">
            {data.map((radicador) => (
              <tr>
                <td>{radicador.id}</td>
                <td>{radicador.name}</td>
                <td>{radicador.status ? "Activo" : "Inactivo"}</td>
                <td>
                  <ModalAction nom="Radicadores" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default TablaRadicadores;
