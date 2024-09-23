import { useState } from "react";

import onOff from "/assets/on-off.svg";

interface PropsEvent {
  tab?: string;
}

const ModalActionUsuario: React.FC<PropsEvent> = () => {
  // Tipos de pestañas
  type TabType = "estado" | "cambiar" | "agregar" | "eliminar";

  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState<TabType>("estado");
  const [stadopen, setStadopen] = useState(false);

  // Función para cambiar de pestaña
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <>
      <button className="text-bold text-xl" onClick={() => setStadopen(true)}>
        <img src={onOff} alt="" className="dark:invert" />
      </button>

      {stadopen && (
        <section className="fixed inset-0 z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ">
          <section>
            <div className="w-auto bg-white shadow-lg transform transition-transform duration-300  dark:bg-gray-800 overflow-hidden rounded ">
              {/* container-header */}
              <div className="flex items-center justify-between px-2 py-2  ">
                <h2 className="text-xl font-semibold text-color dark:text-gray-200">
                  Activar o desactivar usuario
                </h2>
                <button
                  onClick={() => setStadopen(false)}
                  className="text-xl text-gray-500 hover:text-gray-700 pr-2"
                >
                  &times;
                </button>
              </div>

              {/* Pestañas */}
              <section className="px-4 max-h-[70Vh] overflow-y-auto dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                <ul className="flex space-x-6 pb-4 px-4 text-lg ">
                  <li
                    className={` cursor-pointer hover:text-blue-400 dark:hover:text-gray-500  ${
                      activeTab === "estado"
                        ? "border-b border-blue-400 text-blue-400 dark:border-gray-500 dark:text-gray-500 "
                        : ""
                    } `}
                    onClick={() => handleTabChange("estado")}
                  >
                    Estado
                  </li>
                  <li
                    className={`cursor-pointer hover:text-blue-400 dark:hover:text-gray-500 ${
                      activeTab === "cambiar"
                        ? "border-b border-blue-400 text-blue-400  dark:border-gray-500 dark:text-gray-500 "
                        : ""
                    }`}
                    onClick={() => handleTabChange("cambiar")}
                  >
                    Cambiar Contraseña
                  </li>
                  <li
                    className={`cursor-pointer hover:text-blue-400 dark:hover:text-gray-500 ${
                      activeTab === "agregar"
                        ? "border-b border-blue-400 text-blue-400  dark:border-gray-500 dark:text-gray-500 "
                        : ""
                    }`}
                    onClick={() => handleTabChange("agregar")}
                  >
                    Agregar Permiso
                  </li>
                  <li
                    className={`cursor-pointer hover:text-blue-400 dark:hover:text-gray-500 ${
                      activeTab === "eliminar"
                        ? "border-b border-blue-400 text-blue-400  dark:border-gray-500 dark:text-gray-500 "
                        : ""
                    }`}
                    onClick={() => handleTabChange("eliminar")}
                  >
                    Eliminar Permisos
                  </li>
                </ul>

                {/* ! CONTENIDO DE CADA SECCION ! */}
                <div className="">
                  {/* Estado */}
                  {activeTab === "estado" && (
                    <div className="">
                      <h3 className="flex text-base pb-2 text-blue-500 dark:text-gray-300">
                        Estado del usuario
                      </h3>
                      {/* Elementos */}
                      <section className="grid grid-cols-2 gap-x-16 px-8 py-2">
                        <div>
                          <label htmlFor="">
                            <span className="flex mb-2 font-bold text-gray-700 dark:text-white ">
                              ID user
                            </span>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 cursor-not-allowed"
                              disabled
                            />
                          </label>
                        </div>
                        <div>
                          <label htmlFor="">
                            <span className="flex mb-2 font-bold text-gray-700 dark:text-white after:content-['*'] after:ml-2 after:text-red-600 ">
                              Estado
                            </span>
                            <select className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800">
                              <option value=""> - SELECT - </option>
                              <option value="1">INACTIVP</option>
                              <option value="2">ACTIVO</option>
                            </select>
                          </label>
                        </div>
                      </section>
                    </div>
                  )}

                  {/* Cambio contaseña */}
                  {activeTab === "cambiar" && (
                    <div className="">
                      <h3 className="flex text-base pb-3 text-blue-500 dark:text-gray-300">
                        Cambiar contraseña usuario
                      </h3>
                      {/* Elementos */}
                      <form className="">
                        <section className="grid grid-cols-2 gap-x-16 px-8">
                          <div className="">
                            <label>
                              <span className="flex mb-2 font-bold text-gray-700 dark:text-white">
                                ID user
                              </span>
                              <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 cursor-not-allowed"
                                disabled
                              />
                            </label>
                          </div>

                          <div className="">
                            <label className="flex mb-2 font-bold text-gray-700 dark:text-white after:content-['*'] after:ml-2 after:text-red-600 ">
                              Nueva contraseña
                            </label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                              placeholder="Ingrese nueva contraseña"
                            />
                          </div>
                        </section>

                        <div className="flex justify-end px-4 text-sm">
                          <button
                            className="w-20 h-10 mt-4 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover-gray-600  dark:hover:bg-gray-700"
                          >
                            Actualizar
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Asignacion de accesos */}
                  {activeTab === "agregar" && (
                    <div className="">
                      <h3 className="flex text-base pb-2 text-blue-500 dark:text-gray-300">
                        Asignar permisos usuario
                      </h3>
                      {/* Elementos */}
                      <form className="">
                        <section className="grid grid-cols-2 gap-x-16 px-8">
                          <div className="flex">
                            <label htmlFor="">
                              <input type="checkbox" />
                              <span className="ps-2 font-bold text-gray-700 dark:text-white">
                                Servicios reportes
                              </span>
                            </label>
                          </div>

                          <div className="flex">
                            <label htmlFor="">
                              <input type="checkbox" />
                              <span className="ps-2 font-bold text-gray-700 dark:text-white">
                                Descargar - Sistema Gestión Calidad
                              </span>
                            </label>
                          </div>

                          <div className="flex">
                            <label htmlFor="">
                              <input type="checkbox" />
                              <span className="ps-2 font-bold text-gray-700 dark:text-white">
                                Tablas Radicación
                              </span>
                            </label>
                          </div>

                          <div className="flex">
                            <label htmlFor="">
                              <input type="checkbox" />
                              <span className="ps-2 font-bold text-gray-700 dark:text-white">
                                Módulo Auditoría
                              </span>
                            </label>
                          </div>

                          <div className="flex">
                            <label htmlFor="">
                              <input type="checkbox" />
                              <span className="ps-2 font-bold text-gray-700 dark:text-white">
                                Servicio Campos Tablas Radicación
                              </span>
                            </label>
                          </div>

                          <div className="flex">
                            <label htmlFor="">
                              <input type="checkbox" />
                              <span className="ps-2 font-bold text-gray-700 dark:text-white">
                                Módulo Cirugías
                              </span>
                            </label>
                          </div>

                          <div className="flex">
                            <label htmlFor="">
                              <input type="checkbox" />
                              <span className="ps-2 font-bold text-gray-700 dark:text-white">
                                Módulo Radicación
                              </span>
                            </label>
                          </div>

                          <div className="flex">
                            <label htmlFor="">
                              <input type="checkbox" />
                              <span className="ps-2 font-bold text-gray-700 dark:text-white">
                                Vista Admin
                              </span>
                            </label>
                          </div>

                          <div className="flex">
                            <label htmlFor="">
                              <input type="checkbox" />
                              <span className="ps-2 font-bold text-gray-700 dark:text-white">
                                Módulo Reporte Excel
                              </span>
                            </label>
                          </div>

                          <div className="flex">
                            <label htmlFor="">
                              <input type="checkbox" />
                              <span className="ps-2 font-bold text-gray-700 dark:text-white">
                                Ver - Sistema Gestion de Calidad
                              </span>
                            </label>
                          </div>
                        </section>
                        <div className="flex justify-end px-4 text-sm">
                          <button
                            className="w-20 h-10 mt-4 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover-gray-600  dark:hover:bg-gray-700"
                          >
                            Agregar
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {activeTab === "eliminar" && (
                    <div className="">
                      <h3 className="flex text-base pb-2 text-blue-500 dark:text-gray-300">
                        Permisos del usuario
                      </h3>
                      {/* Elementos */}
                      <form className="">
                        {/* container de elementos atraer */}
                        <section className="grid grid-cols-2 gap-x-16 px-8">
                          <h3>No se encuentra con permisos actualmente</h3>
                        </section>

                        <div className="flex justify-end px-4 text-sm">
                          <button
                            className="w-20 h-10 mt-4 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover-gray-600  dark:hover:bg-gray-700"
                          >
                            Eliminar
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </section>

              {/* container-footer */}
              <div className="flex items-center justify-end w-full mt-2 text-sm font-semibold bg-white px-2 h-14 dark:bg-gray-800">
                <button
                  className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:hover:bg-gray-700 "
                  onClick={() => setStadopen(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ModalActionUsuario;
