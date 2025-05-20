import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

//*Icons
import {
  ComputerDesktopIcon,
  CpuChipIcon,
  ServerIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { FormatDate } from "@/utils/FormatDate";
import { AnyItem, ItemStrategyFactory } from "../../strategies/ItemStrategy";
import useAnimation from "@/hooks/useAnimations";
import { useBlockScroll } from "@/hooks/useBlockScroll";
interface ModalItemsDetailsProps {
  item: AnyItem | null;
  tipoItem: string | null;
  // onClose: () => void;
}

const ModalItemsDetails: React.FC<ModalItemsDetailsProps> = ({
  item,
  // onClose,
  tipoItem,
}) => {
  const [activeTab, setActiveTab] = useState("general");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { showAnimation, closing } = useAnimation(
    isOpen,
    () => setIsOpen(false),
    300
  );

  useBlockScroll(isOpen);

  const [isMobile, setIsMobile] = useState(false);

  const strategy = tipoItem ? ItemStrategyFactory.getStrategy(tipoItem) : null;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // const openModal = () => {
  //   document.body.style.overflow = "hidden";
  // };
  // const closeModal = () => {
  //   document.body.style.overflow = "";
  //   onClose();
  // };

  // if (item) {
  //   openModal();
  // }

  const TableWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-y-auto rounded-lg shadow-md dark:shadow-md dark:shadow-indigo-800 max-h-[60vh]">
      <div className="inline-block min-w-full overflow-x-auto align-middle">
        {children}
      </div>
    </div>
  );
  // renderizado de perifericos
  const renderPerifericosTable = () => {
    return (
      <TableWrapper>
        <table className="w-full bg-white border-collapse rounded-lg shadow-md min-w-[600px]">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-900 dark:text-white">
            <tr>
              <th className="p-2">Nombre:</th>
              <th className="p-2">Marca:</th>
              <th className="p-2">Modelo:</th>
              <th className="p-2">Serial:</th>
              <th className="p-2">Otros Datos:</th>
              <th className="p-2">Estado:</th>
              <th className="p-2">Numero Inventario:</th>
            </tr>
          </thead>
          <tbody className="text-center dark:bg-gray-800">
            {item && "accessories" in item && item.accessories.length > 0 ? (
              <>
                {item.accessories.map((acc) => (
                  <tr key={acc.id} className="dark:text-white">
                    <td className="p-2">{acc.name}</td>
                    <td className="p-2">{acc.brand}</td>
                    <td className="p-2">{acc.model}</td>
                    <td className="p-2">{acc.serial}</td>
                    <td className="p-2">{acc.description}</td>
                    <td className="p-2">{acc.status}</td>
                    <td className="p-2">{acc.inventoryNumber}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center dark:text-white">
                  No hay Periféricos agregados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableWrapper>
    );
  };
  // renderizado de componentes
  const renderComponentesTable = () => {
    return (
      <TableWrapper>
        <table className="w-full overflow-auto bg-white border-collapse rounded-lg shadow-md min-w-[600px]">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-900 dark:text-white">
            <tr>
              <th className="p-2">Nombre:</th>
              <th className="p-2">Marca:</th>
              <th className="p-2">Capacidad:</th>
              <th className="p-2">Velocidad:</th>
              <th className="p-2">Otros Datos:</th>
              <th className="p-2">Modelo:</th>
              <th className="p-2">Serial:</th>
            </tr>
          </thead>
          <tbody className="text-center dark:bg-gray-800">
            {item && "components" in item && item.components.length > 0 ? (
              <>
                {item.components.map((comp) => (
                  <tr key={comp.id} className="dark:text-white">
                    <td className="p-2">{comp.name}</td>
                    <td className="p-2">{comp.brand}</td>
                    <td className="p-2">{comp.capacity}</td>
                    <td className="p-2">{comp.speed}</td>
                    <td className="p-2">{comp.otherData}</td>
                    <td className="p-2">{comp.model}</td>
                    <td className="p-2">{comp.serial}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center dark:text-white">
                  No hay Componentes agregados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableWrapper>
    );
  };
  // renderizado de software
  const renderSoftwareTable = () => {
    return (
      <TableWrapper>
        <table className="w-full bg-white border-collapse rounded-lg shadow-md overscroll-auto min-w-[600px]">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-900 dark:text-white">
            <tr>
              <th className="p-2">Nombre:</th>
              <th className="p-2">Version:</th>
              <th className="p-2">Licencia:</th>
              <th className="p-2">Otros datos:</th>
              <th className="p-2">Fecha Instalacion:</th>
              <th className="p-2">Estado:</th>
            </tr>
          </thead>
          <tbody className="text-center dark:bg-gray-800">
            {item && "software" in item && item.software.length > 0 ? (
              <>
                {item.software.map((soft) => (
                  <tr key={soft.id} className="dark:text-white">
                    <td className="p-2">{soft.name}</td>
                    <td className="p-2">{soft.versions}</td>
                    <td className="p-2">{soft.license}</td>
                    <td className="p-2">{soft.otherData}</td>
                    <td className="p-2">
                      {FormatDate(soft.installDate, false)}
                    </td>
                    <td className="p-2">{soft.status}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center dark:text-white">
                  No hay Software agregado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableWrapper>
    );
  };
  // tab navigation for mobile
  const renderTabNavigation = () => {
    if (isMobile) {
      return (
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          <select
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="general">Información General</option>
            <option value="perifericos">Periféricos</option>
            <option value="componentes">Hardware</option>
            <option value="software">Software</option>
          </select>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-2 p-2 mb-4 rounded">
        <button
          className={`flex items-center p-2 ${
            activeTab === "general"
              ? "bg-gray-200 dark:bg-gray-900 dark:text-white dark:shadow-md dark:shadow-indigo-800 shadow-md text-black"
              : "dark:bg-gray-900 dark:hover:bg-gray-800 duration-300 dark:text-white hover:bg-gray-300"
          } rounded`}
          onClick={() => setActiveTab("general")}
        >
          <ComputerDesktopIcon className="w-6 h-6 mr-2 dark:text-white" />
          <span>Información General</span>
        </button>
        {tipoItem === "equipos" && (
          <>
            <button
              className={`flex items-center p-2 ${
                activeTab === "perifericos"
                  ? "bg-gray-200 dark:bg-gray-900 dark:text-white dark:shadow-md dark:shadow-indigo-800 shadow-md text-black"
                  : "dark:bg-gray-900 dark:hover:bg-gray-800 duration-300 dark:text-white hover:bg-gray-300"
              } rounded`}
              onClick={() => setActiveTab("perifericos")}
            >
              <CpuChipIcon className="w-6 h-6 mr-2 dark:text-white" />
              <span>Periféricos</span>
            </button>
            <button
              className={`flex items-center p-2 ${
                activeTab === "componentes"
                  ? "bg-gray-200 dark:bg-gray-900 dark:text-white text-black dark:shadow-md dark:shadow-indigo-800 shadow-md"
                  : "dark:bg-gray-900 dark:hover:bg-gray-800 duration-300 dark:text-white hover:bg-gray-300"
              } rounded`}
              onClick={() => setActiveTab("componentes")}
            >
              <ServerIcon className="w-6 h-6 mr-2 dark:text-white" />
              <span>Hardware</span>
            </button>
            <button
              className={` flex items-center p-2 ${
                activeTab === "software"
                  ? "bg-gray-200 dark:bg-gray-900 dark:text-white text-black dark:shadow-md dark:shadow-indigo-800 shadow-md"
                  : "dark:bg-gray-900 dark:hover:bg-gray-800 duration-300 dark:text-white hover:bg-gray-300"
              } rounded `}
              onClick={() => setActiveTab("software")}
            >
              <Cog6ToothIcon className="w-6 h-6 mr-2 dark:text-white" />
              <span>Software</span>
            </button>
          </>
        )}
      </div>
    );
  };
  // renderizado de contenido dependiendo del tab activo
  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <motion.div
            key="general"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-[60vh] pb-4"
          >
            {item ? (
              <>
                {/* Información Básica */}
                <div className="p-4 rounded shadow-md dark:text-white dark:shadow-md dark:shadow-indigo-800 h-fit">
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Información Básica:
                  </h3>
                  <ul className="space-y-1">
                    {strategy?.renderBasicInfo(item)}
                  </ul>
                </div>

                {/* Detalles Técnicos */}
                <div className="p-4 rounded shadow-md dark:text-white dark:shadow-md dark:shadow-indigo-800 h-fit">
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Detalles Técnicos:
                  </h3>
                  <ul className="space-y-1">
                    {strategy?.renderTechnicalDetails(item)}
                  </ul>
                </div>

                {/* Información Adicional */}
                <div className="p-4 rounded shadow-md dark:text-white dark:shadow-md dark:shadow-indigo-800 h-fit">
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Información Adicional:
                  </h3>
                  <ul className="space-y-1">
                    {strategy?.renderAdditionalInfo(item)}
                  </ul>
                </div>
              </>
            ) : (
              <p className="dark:text-white">
                No hay Información General Disponible
              </p>
            )}
          </motion.div>
        );

      case "perifericos":
        return (
          <motion.div
            key="perifericos"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            {renderPerifericosTable()}
          </motion.div>
        );
      case "componentes":
        return (
          <motion.div
            key="componentes"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            {renderComponentesTable()}
          </motion.div>
        );
      case "software":
        return (
          <motion.div
            key="software"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            {renderSoftwareTable()}
          </motion.div>
        );
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 transition-colors duration-300 bg-gray-200 rounded-md text-pretty hover:text-white hover:bg-gray-700 dark:text-white dark:bg-color dark:hover:bg-teal-600"
      >
        Ver detalles
      </button>
      {isOpen && (
        <section
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`w-full max-w-6xl overflow-y-hidden transition-transform duration-300 transform bg-white rounded-md shadow-lg dark:bg-gray-600 ${
              showAnimation && !closing ? "translate-y-0" : "translate-y-10"
            }`}
          >
            <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 border-b-gray-900 dark:bg-gray-600 dark:border-b-white">
              <h3 className="text-2xl font-semibold text-color dark:text-gray-200">
                Detalles del Item
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xl text-gray-400 duration-300 rounded-md w-7 h-7 hover:bg-gray-400 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-900"
                aria-label="Cerrar"
              >
                &times;
              </button>
            </div>

            <div className="max-h-[74vh] md:max-h-[70vh] overflow-y-auto dark:bg-gray-800 dark:text-gray-200">
              {renderTabNavigation()}

              <div className="rounded md:p-4 dark:bg-gray-900">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {renderContent()}
                </motion.div>
              </div>

              <div className="flex items-center justify-end w-full gap-2 p-2 text-sm font-semibold bg-gray-200 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
                <button
                  className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-600 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ModalItemsDetails;
