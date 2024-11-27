// * Fuctions and Hooks
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IItems } from "../../../models/IItems";
import LoadingSpinner from "../../LoadingSpinner";
import ModalItemsForm from "../modals/ModalItemsForm";
import ModalItemsDetails from "../modals/ModalItemsDetails";
import ModalAccesorioItem from "../modals/ModalAccesorioItem";
import { IItemsNetworking } from "../../../models/IItemsNetworking";
import ModalTablaseguimientoItem from "../modals/ModalTablaSeguimientoItem";

// * Interface
interface ItemsListProps {
  invetario: IItems[] | IItemsNetworking[] | null;
  tipoItem: "equipos" | "dispositivos-red" | null;
  idSede: number | null;
}
// * Icons
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
  const [isGridView, setIsGridView] = useState(true); // * Estado para alternar vistas (Lista o de cuadrícula)

  // * Efecto para almacenar una cookie para el estado de la vista

  useEffect(() => {
    const savedView = Cookies.get("itemsViewMode");
    if (savedView === "list") {
      setIsGridView(false);
    }
  }, []);

  // * Efecto para guardar el estado de la vista

  const toggleViewMode = () => {
    const newViewMode = !isGridView ? "grid" : "list";
    Cookies.set("itemsViewMode", newViewMode, { expires: 7 });
    setIsGridView(!isGridView);
  };

  // * Efecto para determinar el cierre del modal o apertura del mismo

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simular carga inicial
    return () => clearTimeout(timeout);
  }, [tipoItem]);

  const handleViewDetails = (item: IItems | IItemsNetworking) => {
    setSelected(item);
  };

  const closeModal = () => {
    setSelected(null);
  };

  // * Funcion para mostrar el tipo de icon (en modo de lista)
  // * Iconos que, dependediendo del Item de Inventario, se muestre el icono del Dispositivo

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
              // value={query}
              // onChange={(e) =>setQuery(e.target.value)}
            />
            <select
              name=""
              id=""
              className="border-2 ml-2 border-stone-300 h-[45px] w-[100px] rounded-md  focus:outline-none text-stone-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="">10 items</option>
              <option value="">20 items</option>
              <option value="">30 items</option>
            </select>
            <button
              className="flex items-center px-4 py-1 ml-2 transition-colors duration-300 bg-gray-200 rounded-md text-pretty hover:text-white hover:bg-gray-700 dark:text-white dark:bg-color dark:hover:bg-teal-600"
              onClick={toggleViewMode} // * Alternar vista
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
          {/* {filteredData.length > 0 ? ()} */}
          {invetario && invetario.length > 0 ? (
            isGridView ? (
              <div className="grid gap-6 transition-all duration-500 ease-in-out md:grid-cols-2 lg:grid-cols-3">
                {invetario.map((item) => (
                  <div
                    key={item.id}
                    className="relative p-4 duration-500 border rounded-md shadow-sm dark:shadow-indigo-600 hover:shadow-lg dark:hover:shadow-indigo-600 dark:border-gray-700 hover:-translate-y-1"
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
                    className="flex items-center justify-between p-4 duration-500 border rounded-md shadow-sm dark:border-gray-700 dark:shadow-indigo-600 hover:shadow-xl dark:hover:shadow-indigo-600 hover:-translate-y-2"
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
