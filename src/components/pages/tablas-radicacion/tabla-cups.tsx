import { Link } from "react-router-dom";

import ModalCups from "../modals/modal-cups";
import ModalAction from "../modals/modal-action";


import salir from "/assets/back.svg";

import { useFetchCups } from "../../../hooks/useFetchUsers";

const TablaCups = () => {
  const { data, loading, error } = useFetchCups();

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      {/* nav-table */}
      <section className="p-4 dark:bg-gray-900">
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100 ">
          Módulo Cups
        </h1>
        <nav>
          <ol className="flex mb-2 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-4">Inicio</li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Servicio Cups
            </li>
          </ol>
          <div className="w-10 pb-2 ">
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
            ></input>
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
            {/*<button className="borde-2 w-[100px] h-[40px] rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800">
                        Agregar Cup
                    </button> */}
            <ModalCups></ModalCups>
          </div>
        </section>

            <table className="mx-auto divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr className="dark:bg-gray-700 dark:text-gray-200">
                        <th className=" w-[fit-content]">ID</th>
                        <th className="">Codigo</th>
                        <th className=" w-[fit-content]">Descripcion del Cup</th>
                        <th className="">Estado</th>
                        <th className="">Acciones</th>
                    </tr>
                </thead>
                    
                <tbody className="text-xs text-center divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-200">
                    {data.map((cups) => (
                        <tr key={cups.id}>
                            <td>{cups.id}</td>
                            <td>{cups.code}</td>
                            <td>{cups.name}</td>
                            <td>{cups.status ? "Activo" : "Inactivo"}</td>
                            <td>
                                <ModalAction 
                                nom="Cups"
                                />                                      
                            </td>
                        </tr>
                    ))}
                    <tr>

          <tbody className="text-xs text-center divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-200">
            {data.map((cups) => (
              <tr key={cups.id}>
                <td>{cups.id}</td>
                <td>{cups.code}</td>
                <td>{cups.name}</td>
                <td>{cups.status ? "Activo" : "Inactivo"}</td>
                <td>
                  <button>
                    <img src={onOff} alt="on-off" className="w-8 h-8" />
                  </button>
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default TablaCups;
