import { format } from "date-fns";
import React, { useState } from "react";
import { toZonedTime } from "date-fns-tz";
import { IItems } from "../../../models/IItems";
import { motion } from "framer-motion";
import { IItemsNetworking } from "../../../models/IItemsNetworking";

//*Icons
import {
  ComputerDesktopIcon,
  CpuChipIcon,
  ServerIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
interface ModalItemsDetailsProps {
  item: IItems | IItemsNetworking | null;
  onClose: () => void;
}

const ModalItemsDetails: React.FC<ModalItemsDetailsProps> = ({
  item,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("general");
  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    const utcDate = toZonedTime(date, "America/Bogota"); // Reemplaza con la zona horaria deseada
    return format(utcDate, "dd/MM/yyyy");
  };
  // * Se crea logica para evitar el desplazamiento del scroll dentro del modal
  // * Se implementa eventos del DOM para distribucion en demas propiedades anteiormente establecidas
  const openModal = () => {
    document.body.style.overflow = "hidden";
  }
  const closeModal = () => {
    document.body.style.overflow = "";
    onClose();
  }
  if (item){
    openModal();
  }

  const TableWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="max-h-[calc(100vh-400px)] overflow-y-auto rounded-lg shadow-md dark:shadow-md dark:shadow-indigo-800">
      <div className="inline-block min-w-full align-middle">{children}</div>
    </div>
  );

  const renderPerifericosTable = () => {
    return (
      <TableWrapper>
        <table className="w-full bg-white border-collapse rounded-lg shadow-md">
          <thead className="bg-gray-100 dark:bg-gray-900 dark:text-white">
            <tr>
              <th>Nombre:</th>
              <th>Marca:</th>
              <th>Modelo:</th>
              <th>Serial:</th>
              <th>Otros Datos:</th>
              <th>Estado:</th>
              <th>Numero Inventario:</th>
            </tr>
          </thead>
          <tbody className="text-center dark:bg-gray-800">
            {item &&
            "accessoriesRelation" in item &&
            item.accessoriesRelation.length > 0 ? (
              <>
                {item.accessoriesRelation.map((acc) => (
                  <tr key={acc.id} className="dark:text-white">
                    <td>{acc.name}</td>
                    <td>{acc.brand}</td>
                    <td>{acc.model}</td>
                    <td>{acc.serial}</td>
                    <td>{acc.otherData}</td>
                    <td>{acc.status}</td>
                    <td>{acc.inventoryNumber}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={7} className="text-center dark:text-white">
                  No hay Periféricos agregados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableWrapper>
    );
  };

  const renderComponentesTable = () => {
    return (
      <TableWrapper>
        <table className="w-full overflow-auto bg-white border-collapse rounded-lg shadow-md ">
          <thead className="bg-gray-100 dark:bg-gray-900 dark:text-white">
            <tr>
              <th>Nombre:</th>
              <th>Marca:</th>
              <th>Capacidad:</th>
              <th>Velocidad:</th>
              <th>Otros Datos:</th>
              <th>Modelo:</th>
              <th>Serial:</th>
            </tr>
          </thead>
          <tbody className="text-center dark:bg-gray-800">
            {item &&
            "componentRelation" in item &&
            item.componentRelation.length > 0 ? (
              <>
                {item.componentRelation.map((comp) => (
                  <tr key={comp.id} className="dark:text-white">
                    <td>{comp.name}</td>
                    <td>{comp.brand}</td>
                    <td>{comp.capacity}</td>
                    <td>{comp.speed}</td>
                    <td>{comp.otherData}</td>
                    <td>{comp.model}</td>
                    <td>{comp.serial}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={7} className="text-center dark:text-white">
                  No hay Componentes agregados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableWrapper>
    );
  };

  const renderSoftwareTable = () => {
    return (
      <TableWrapper>
        <table className="w-full bg-white border-collapse rounded-lg shadow-md overscroll-auto">
          <thead className="bg-gray-100 dark:bg-gray-900 dark:text-white">
            <tr>
              <th>Nombre:</th>
              <th>Version:</th>
              <th>Licencia:</th>
              <th>Otros datos:</th>
              <th>Fecha Instalacion:</th>
              <th>Estado:</th>
            </tr>
          </thead>
          <tbody className="text-center dark:bg-gray-800">
            {item &&
            "softwareRelation" in item &&
            item.softwareRelation.length > 0 ? (
              <>
                {item.softwareRelation.map((soft) => (
                  <tr key={soft.id} className="dark:text-white">
                    <td>{soft.name}</td>
                    <td>{soft.versions}</td>
                    <td>{soft.license}</td>
                    <td>{soft.otherData}</td>
                    <td>{formatDate(soft.installDate)}</td>
                    <td>{soft.status}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={6} className="text-center dark:text-white">
                  No hay Software agregado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableWrapper>
    );
  };

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
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {item ? (
              <>
                {/* Información Básica */}
                <div className="p-4 rounded shadow-md dark:text-white dark:shadow-md dark:shadow-indigo-800">
                  <h3 className="mb-2 text-2xl font-bold">
                    Información Básica:
                  </h3>
                  <ul>
                    {item && "userRelation" in item && (
                      <li>
                        <strong>Responsable: </strong>
                        {item.userRelation?.name || "N/A"}{" "}
                        {item.userRelation?.lastName || "N/A"}
                      </li>
                    )}
                    <li>
                      <strong>Nombre: </strong>
                      {item?.name}
                    </li>
                    {item && "area" in item && (
                      <li>
                        <strong>Área: </strong>
                        {item.area}
                      </li>
                    )}
                    {item && "typeEquipment" in item && (
                      <li>
                        <strong>Tipo Equipo: </strong>
                        {item.typeEquipment}
                      </li>
                    )}
                    <li>
                      <strong>Marca: </strong>
                      {item?.brand}
                    </li>
                    <li>
                      <strong>Modelo: </strong>
                      {item?.model}
                    </li>
                  </ul>
                </div>

                {/* Detalles Técnicos */}
                <div className="p-4 rounded shadow-md dark:text-white dark:shadow-md dark:shadow-indigo-800">
                  <h3 className="mb-2 text-2xl font-bold">
                    Detalles Técnicos:
                  </h3>
                  <ul>
                    <li>
                      <strong>Serial: </strong>
                      {item?.serial}
                    </li>
                    {item && "operationalSystem" in item && (
                      <li>
                        <strong>Sistema Operativo: </strong>
                        {item.operationalSystem}
                      </li>
                    )}
                    <li>
                      <strong>Dirección IP: </strong>
                      {item?.addressIp}
                    </li>
                    <li>
                      <strong>Mac: </strong>
                      {item?.mac}
                    </li>
                  </ul>
                </div>

                {/* Información Adicional */}
                <div className="p-4 rounded shadow-md dark:text-white dark:shadow-md dark:shadow-indigo-800">
                  <h3 className="mb-2 text-2xl font-bold">
                    Información Adicional:
                  </h3>
                  <ul>
                    {item && "purchaseDate" in item && (
                      <li>
                        <strong>Fecha Compra: </strong>
                        {formatDate(item.purchaseDate)}
                      </li>
                    )}
                    {item && "warrantyTime" in item && (
                      <li>
                        <strong>Tiempo Garantía: </strong>
                        {item.warrantyTime}
                      </li>
                    )}
                    {item && "deliveryDate" in item && (
                      <li>
                        <strong>Fecha Entrega: </strong>
                        {formatDate(item.deliveryDate)}
                      </li>
                    )}
                    <li>
                      <strong>Número Inventario: </strong>
                      {item?.inventoryNumber}
                    </li>
                    {item && "otherData" in item && (
                      <li>
                        <strong>Otros Datos: </strong>
                        {item.otherData}
                      </li>
                    )}
                    {item && "status" in item && (
                      <li>
                        <strong>Estado: </strong>
                        {item.status}
                      </li>
                    )}
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
    <section className="fixed inset-0 flex items-center justify-center p-40 bg-gray-800 bg-opacity-50">
      <div className="w-full p-6 bg-white rounded-md shadow-lg dark:bg-gray-900">
        <h3 className="mb-4 text-3xl font-semibold dark:text-white">
          Detalles del dispositivo
        </h3>
        <div className="flex mb-4">
          <div className="flex gap-2 p-2 rounded">
            {/* Bton Info General */}
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
            {/* Bton Perifericos */}
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
            {/* Bton Hardware / Componentes */}
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
          </div>
        </div>
        <div className="p-4 rounded dark:bg-gray-900">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderContent()}
          </motion.div>
        </div>
        <button
          onClick={closeModal}
          className="p-2 px-12 mt-4 duration-200 border rounded btn btn-secondary hover:bg-gray-300 dark:text-white dark:bg-color dark:hover:bg-teal-600"
        >
          Cerrar
        </button>
      </div>
    </section>
  );
};

export default ModalItemsDetails;
