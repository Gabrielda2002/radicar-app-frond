//*Fuctions and Hooks
import { NavLink } from "react-router-dom";
import ModalSection from "../../../ModalSection";

//*Icons
import { MapPinIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

//*Images
import Sede01 from "../Images/SEDE-01-amazonas.webp";
const Amazonas = () => {
  return (
    <>
      <>
        <ModalSection
          title="Módulo Inventario - Amazonas"
          breadcrumb={[
            { label: "Inicio", path: "/Inicio" },
            { label: "/ Sistema de Inventario", path: "/SistemaDeInventario" },
            { label: "/ Amazonas", path: "" },
          ]}
        />
        <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
          {/* Barra de Busqueda */}
          <div className="relative mb-3">
            <label>
              <span className="text-xl dark:text-white">Buscar Item:</span>
            </label>
            <section className="flex items-center mt-4">
              <div className="relative w-full">
                <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full p-2 pl-10 border-2 border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
            </section>
          </div>

          {/* Sedes Amazonas 01*/}
          <div className="grid grid-cols-1">
            <NavLink to="/SistemaDeInventario/Amazonas/Sede01A">
              <div className="relative w-full p-8 mx-auto overflow-hidden text-gray-900 duration-300 ease-in-out bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-900 dark:text-gray-100 hover:-translate-y-1">
                {/* Imagen de fondo */}
                <div className="absolute top-0 left-0 h-full w-72">
                  <img
                    src={Sede01}
                    alt=""
                    className="absolute top-0 left-0 w-72 -z-0 opacity-30 "
                  />
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-transparent to-gray-200 dark:to-gray-900"></div>
                </div>
                {/* Contenido principal con z-index positivo */}
                <div className="relative">
                  <div className="flex justify-between space-x-8">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-gray-500 rounded-full dark:bg-teal-600">
                        <MapPinIcon className="text-gray-100 dark:text-gray-100 w-9 h-9" />
                      </div>
                      <div>
                        <h1 className="pl-3 text-3xl font-semibold">Sede 01</h1>
                        <span className="ml-3">Leticia</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button className="flex p-2 text-sm text-white bg-gray-700 rounded-full dark:bg-teal-600">
                        <div className="flex items-center">
                          <h2 title="Click para ver las categorias completas">
                            3 Categorias
                          </h2>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </>
    </>
  );
};

export default Amazonas;
