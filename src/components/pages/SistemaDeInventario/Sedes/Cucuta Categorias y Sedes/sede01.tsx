//*Fuctions and Hooks
import { useState } from "react";
import DeviceCard from "../../../../DevicesCard";
import ModalSection from "../../../../ModalSection";

//*Icons
import { SignalIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";

//*Images
import COMPUTO from "/src/components/pages/SistemaDeInventario/Images/COMPUTOS.jpg";
import TELECO from "/src/components/pages/SistemaDeInventario/Images/TELECOMUNICACIONES.webp";
import { NavLink } from "react-router-dom";

const sede01 = () => {
  //*States for Open and Close Components and tables
  // Estado para manejar qué tabla mostrar
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // const [activeTable, setActiveTable] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category === activeCategory ? null : category); // Alternar la categoría activa
  };

  // const handleTableClick = (table: string) => {
  //   setActiveTable(table === activeTable ? null : table); // Alternar la tabla activa
  // };

  return (
    <>
      <ModalSection
        title="Sede Cúcuta - Sede 01"
        breadcrumb={[
          { label: "Inicio", path: "/inicio" },
          { label: "/ Sistema De Inventario", path: "/SistemaDeInventario" },
          { label: "/ Cúcuta", path: "/SistemaDeInventario/Cucuta" },
          { label: "/ Sede 01", path: "" },
        ]}
      />
      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg mb-11 dark:bg-gray-800 shadow-indigo-500/40">
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
        <div className="grid grid-cols-2 gap-4">
          {/* Secciones de Contenidos */}

          <NavLink to="/SistemaDeInventario/Cucuta/Sede01/computadores">
            <DeviceCard
              title="Computadores"
              description="Contenido de la Sección"
              image={COMPUTO}
              icon={<ComputerDesktopIcon className="w-8 h-8 text-gray-200" />}
              onClick={() => handleCategoryClick("computo")}
            />
          </NavLink>

          <NavLink to="/SistemaDeInventario/Cucuta/Sede01/perifericos">
            <DeviceCard
              title="Telecomunicaciones"
              description="Contenido de la Sección"
              image={TELECO}
              icon={<SignalIcon className="w-8 h-8 text-gray-200" />}
              onClick={() => handleCategoryClick("telecomuniciones")}
            />
          </NavLink>
        </div>
        {/* <AnimatePresence>
          {activeCategory === "computo" && (
            <motion.div
              key="computo" // Agregar una clave única para la animación
              initial={{ opacity: 0, y: -0 }} // Estado inicial
              animate={{ opacity: 2, y: 0 }} // Estado de animación
              exit={{ opacity: 0, y: -0 }} // Estado al salir
              transition={{ duration: 0.2 }} // Duración de la animación
              className="grid grid-cols-3 gap-2 pt-8 overflow-x-auto"
            >
              <div
                onClick={() => handleTableClick("computadores")}
                className="relative w-full p-8 mx-auto overflow-hidden text-gray-900 duration-300 ease-in-out bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-900 dark:text-gray-100 hover:-translate-y-1"
              >
                <div>
                  <h1 className="text-xl">Computadores</h1>
                  <span>Descripción</span>
                </div>
              </div>

              <div
                onClick={() => handleTableClick("impresoras")}
                className="relative w-full p-8 mx-auto overflow-hidden text-gray-900 duration-300 ease-in-out bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-900 dark:text-gray-100 hover:-translate-y-1"
              >
                <div>
                  <h1 className="text-xl">Impresoras</h1>
                  <span>Descripción</span>
                </div>
              </div>

              <div
                onClick={() => handleTableClick("Tablets")}
                className="relative w-full p-8 mx-auto overflow-hidden text-gray-900 duration-300 ease-in-out bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-900 dark:text-gray-100 hover:-translate-y-1"
              >
                <div>
                  <h1 className="text-xl">Tablets</h1>
                  <span>Descripción</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeCategory === "telecomuniciones" && (
            <motion.div
              key="telecomuniciones"
              initial={{ opacity: 0, y: -0 }} // Estado inicial
              animate={{ opacity: 2, y: 0 }} // Estado de animación
              exit={{ opacity: 0, y: -0 }} // Estado al salir
              transition={{ duration: 0.2 }} // Duración de la animación
              className="grid grid-cols-5 gap-2 pt-8 overflow-x-auto"
            >
              <div className="relative w-full p-8 mx-auto overflow-hidden text-gray-900 duration-300 ease-in-out bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-900 dark:text-gray-100 hover:-translate-y-1">
                <div>
                  <h1 className="text-xl">Biometricos</h1>
                  <span>Descripción</span>
                </div>
              </div>

              <div className="relative w-full p-8 mx-auto overflow-hidden text-gray-900 duration-300 ease-in-out bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-900 dark:text-gray-100 hover:-translate-y-1">
                <div>
                  <h1 className="text-xl">Telefonos</h1>
                  <span>Descripción</span>
                </div>
              </div>

              <div className="relative w-full p-8 mx-auto overflow-hidden text-gray-900 duration-300 ease-in-out bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-900 dark:text-gray-100 hover:-translate-y-1">
                <div>
                  <h1 className="text-xl">Routers</h1>
                  <span>Descripción</span>
                </div>
              </div>

              <div className="relative w-full p-8 mx-auto overflow-hidden text-gray-900 duration-300 ease-in-out bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-900 dark:text-gray-100 hover:-translate-y-1">
                <div>
                  <h1 className="text-xl">Camaras de Seguridad</h1>
                  <span>Descripción</span>
                </div>
              </div>

              <div className="relative w-full p-8 mx-auto overflow-hidden text-gray-900 duration-300 ease-in-out bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-900 dark:text-gray-100 hover:-translate-y-1">
                <div>
                  <h1 className="text-xl">Testers</h1>
                  <span>Descripción</span>
                </div>
              </div>
            </motion.div>
          )}
          {activeTable === "computadores" && (
            <motion.div
              key="tabla_computadores"
              initial={{ opacity: 0, y: -0 }} // Estado inicial
              animate={{ opacity: 2, y: 0 }} // Estado de animación
              exit={{ opacity: 0, y: -0 }} // Estado al salir
              transition={{ duration: 0.2 }} // Duración de la animación
            >
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg">
                  <thead className="bg-gray-200 dark:bg-gray-700">
                    <tr className="shadow-md dark:text-gray-300 rounded-t-md">
                      <th>Computador Escritorio</th>
                      <th>Laptop</th>
                      <th>Computador 2 en 1</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-center dark:text-gray-200">
                    <tr className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                    </tr>
                    <tr className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                    </tr>
                    <tr className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                    </tr>
                    <tr className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
          {activeTable === "impresoras" && (
            <motion.div
              key="tabla_impresoras"
              initial={{ opacity: 0, y: -0 }} // Estado inicial
              animate={{ opacity: 2, y: 0 }} // Estado de animación
              exit={{ opacity: 0, y: -0 }} // Estado al salir
              transition={{ duration: 0.2 }} // Duración de la animación
            >
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg">
                  <thead className="bg-gray-200 dark:bg-gray-700">
                    <tr className="shadow-md dark:text-gray-300 rounded-t-md">
                      <th>Impresora</th>
                      <th>Scanner</th>
                      <th>Scanner De Tickets</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-center dark:text-gray-200">
                    <tr className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                    </tr>
                    <tr className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                    </tr>
                    <tr className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
          {activeTable === "Tablets" && (
            <motion.div
              key="tabla_tablets"
              initial={{ opacity: 0, y: -0 }} // Estado inicial
              animate={{ opacity: 2, y: 0 }} // Estado de animación
              exit={{ opacity: 0, y: -0 }} // Estado al salir
              transition={{ duration: 0.2 }} // Duración de la animación
            >
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg">
                  <thead className="bg-gray-200 dark:bg-gray-700">
                    <tr className="shadow-md dark:text-gray-300 rounded-t-md">
                      <th>Tablet</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-center dark:text-gray-200">
                    <tr className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                      <td>1</td>
                    </tr>
                    <tr className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                      <td>1</td>
                    </tr>
                    <tr className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                      <td>1</td>
                    </tr>
                    <tr className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}
      </div>
    </>
  );
};

export default sede01;
