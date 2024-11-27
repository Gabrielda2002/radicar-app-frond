import React, { useEffect, useState } from "react";
import { IItems } from "../../../models/IItems";
import LoadingSpinner from "../../LoadingSpinner";
import ModalItemsForm from "../modals/ModalItemsForm";
import ModalItemsDetails from "../modals/ModalItemsDetails";
import ModalAccesorioItem from "../modals/ModalAccesorioItem";
import { IItemsNetworking } from "../../../models/IItemsNetworking";
import ModalTablaseguimientoItem from "../modals/ModalTablaSeguimientoItem";

interface ItemsListProps {
  invetario: IItems[] | IItemsNetworking[] | null;
  tipoItem: "equipos" | "dispositivos-red" | null;
  idSede: number | null;
}

import {
  ListBulletIcon,
  Squares2X2Icon,
  ComputerDesktopIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

const ItemsList: React.FC<ItemsListProps> = ({
  invetario,
  tipoItem,
  idSede,
}) => {
  const [selected, setSelected] = useState<IItems | IItemsNetworking | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(true); // * Estado para alternar vistas

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // * Simular carga inicial
    return () => clearTimeout(timeout);
  }, [tipoItem]);

  const handleViewDetails = (item: IItems | IItemsNetworking) => {
    setSelected(item);
  };

  const closeModal = () => {
    setSelected(null);
  };

   // 
  // * Iconos que, dependediendo del Item de Inventario, se muestre el icono de Inventario
  const getIcon = () => {
    if (tipoItem === "equipos") {
      return <ComputerDesktopIcon className="w-8 h-8 mr-2 dark:text-white" />;
    } else if (tipoItem === "dispositivos-red") {
      return <CpuChipIcon className="w-8 h-8 mr-2 dark:text-white" />;
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {/* Header */}
          <div className="flex justify-between w-full">
            <h2 className="flex text-3xl dark:text-white">
              Inventario de {tipoItem}
            </h2>
            <div>
              <ModalItemsForm
                idSede={idSede}
                tipoItem={tipoItem}
                items={null}
                idItem={null}
              />
            </div>
          </div>

          {/* Search Form */}
          <div className="relative flex items-center mt-6 mb-6">
            <input
              type="text"
              className="w-full p-2 border-2 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="Busqueda de Dispositivo..."
            />
            <button
              className="flex items-center px-4 py-1 ml-4 transition-colors duration-300 bg-gray-200 rounded-md text-pretty hover:text-white hover:bg-gray-700 dark:text-white dark:bg-color dark:hover:bg-teal-600"
              onClick={() => setIsGridView(!isGridView)} // Alternar vista
            >
              {isGridView ? (
                <>
                  <ListBulletIcon className="w-8 h-8 mr-2 dark:text-white" />
                  Lista
                </>
              ) : (
                <>
                  <Squares2X2Icon className="w-8 h-8 mr-2 dark:text-white" />
                  Cuadrícula
                </>
              )}
            </button>
          </div>

          {/* Renderizado Condicional */}
          {invetario && invetario.length > 0 ? (
            isGridView ? (
              <div className="grid gap-6 transition-all duration-500 ease-in-out md:grid-cols-2 lg:grid-cols-3">
                {invetario.map((item) => (
                  <div
                    key={item.id}
                    className="relative p-4 duration-500 border rounded-md shadow-md dark:shadow-md dark:shadow-indigo-600 hover:shadow-xl dark:hover:shadow-indigo-950 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-14">
                      <h3 className="mb-2 text-2xl font-semibold dark:text-white">
                        {tipoItem === "equipos"
                          ? (item as IItems).name
                          : (item as IItemsNetworking).name}
                      </h3>
                      <p className="p-2 text-xs text-white bg-gray-600 rounded-full dark:bg-gray-900 dark:text-white">
                        {tipoItem === "equipos"
                          ? (item as IItems).typeEquipment
                          : ""}
                      </p>
                    </div>
                    <hr className="border-gray-300 dark:border-gray-600" />
                    <div className="flex flex-wrap justify-between gap-2 mt-4">
                      <button
                        onClick={() => handleViewDetails(item)}
                        className="px-3 py-1 transition-colors duration-300 bg-gray-200 rounded-md text-pretty hover:text-white hover:bg-gray-700 dark:text-white dark:bg-color dark:hover:bg-teal-600"
                      >
                        Ver detalles
                      </button>
                      <div className="flex flex-wrap gap-2">
                        <ModalItemsForm
                          idSede={null}
                          tipoItem={tipoItem}
                          items={item}
                          idItem={item.id}
                        />
                        <ModalTablaseguimientoItem
                          Items={item}
                          tipoItem={tipoItem}
                        />
                        {tipoItem === "equipos" && (
                          <ModalAccesorioItem id={(item as IItems).id} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4 transition-all duration-500 ease-in-out">
                {invetario.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 duration-500 border rounded-md shadow-md dark:border-gray-700 dark:shadow-md dark:shadow-indigo-600 hover:shadow-xl dark:hover:shadow-indigo-950"
                  >
                    <div>
                      <div className="flex items-center">
                        {getIcon()}
                        <h3 className="text-xl font-semibold dark:text-white">
                          {tipoItem === "equipos"
                            ? (item as IItems).name
                            : (item as IItemsNetworking).name}
                        </h3>
                      </div>
                      <p className="mt-1 text-xs text-black dark:text-gray-200">
                        {tipoItem === "equipos"
                          ? (item as IItems).typeEquipment
                          : ""}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(item)}
                        className="px-3 py-1 transition-colors duration-300 bg-gray-200 rounded-md text-pretty hover:text-white hover:bg-gray-700 dark:text-white dark:bg-color dark:hover:bg-teal-600"
                      >
                        Ver detalles
                      </button>
                      <ModalItemsForm
                        idSede={null}
                        tipoItem={tipoItem}
                        items={item}
                        idItem={item.id}
                      />
                      <ModalTablaseguimientoItem
                        Items={item}
                        tipoItem={tipoItem}
                      />
                      {tipoItem === "equipos" && (
                        <ModalAccesorioItem id={(item as IItems).id} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <p className="mt-4 text-xl font-bold text-center text-gray-600 dark:text-white">
              No hay ningún artículo incluido o creado
            </p>
          )}
          {selected && (
            <ModalItemsDetails item={selected} onClose={closeModal} />
          )}
        </div>
      )}
    </>
  );
};

export default ItemsList;
