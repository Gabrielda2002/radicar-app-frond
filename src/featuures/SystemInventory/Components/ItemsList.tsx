// * Fuctions and Hooks
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Pagination from "@/components/common/PaginationTable/PaginationTable";
import { IItems } from "@/models/IItems";
import useSearch from "@/hooks/useSearch";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import ModalItemsForm from "../Components/Modals/ModalItemsForm";
import usePagination from "@/hooks/usePagination";
import ModalItemsDetails from "../Components/Modals/ModalItemsDetails";
import ModalAccesorioItem from "../Components/Modals/ModalAccesorioItem";
import { IItemsNetworking } from "@/models/IItemsNetworking";
import ModalTablaseguimientoItem from "./Modals/ModalTablaSeguimientoItem";

// * Icons
import {
  ListBulletIcon,
  Squares2X2Icon,
  ComputerDesktopIcon,
  CpuChipIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { useOpenSupport } from "@/hooks/useOpenSupport";

// * Interface
interface ItemsListProps {
  invetario: IItems[] | IItemsNetworking[] | null;
  tipoItem: "equipos" | "dispositivos-red" | null;
  idSede: number | null;
  onItemsUpdate: () => void;
}

const ItemsList: React.FC<ItemsListProps> = ({
  invetario,
  tipoItem,
  idSede,
  onItemsUpdate,
}) => {
  // * Estados para almacenar datos
  const [selected, setSelected] = useState<IItems | IItemsNetworking | null>(
    null
  );

  const { handleOpen } = useOpenSupport();

  const [isLoading, setIsLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const ITEMS_PER_PAGE = 9;
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } = useSearch<
    IItems | IItemsNetworking
  >(
    invetario || [],
    tipoItem === "equipos"
      ? ["name", "brand", "model"]
      : ["name", "brand", "model"]
  );

  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, itemsPerPage);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  // * almanecar la vista seleccionada en una cookie
  useEffect(() => {
    const savedView = Cookies.get("itemsViewMode");
    if (savedView === "list") {
      setIsGridView(false);
    }
  }, []);

  const toggleViewMode = () => {
    const newViewMode = !isGridView ? "grid" : "list";
    Cookies.set("itemsViewMode", newViewMode, { expires: 7 });
    setIsGridView(!isGridView);
  };

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

  // * Función para determinar el ícono a mostrar basado en el tipo de ítem
  // * Muestra el ícono correspondiente según el tipo de inventario (equipos o dispositivos)

  const getIcon = () => {
    return tipoItem === "equipos" ? (
      <ComputerDesktopIcon className="w-8 h-8 mr-2 dark:text-white" />
    ) : (
      <CpuChipIcon className="w-8 h-8 mr-2 dark:text-white" />
    );
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
                onSuccess={onItemsUpdate}
              />
            </div>
          </div>
          {/* Search Form */}
          <div className="relative flex items-center mt-6 mb-6">
            <input
              type="text"
              className="w-full p-2 border-2 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="Buscar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              name="itemsPerPage"
              id=""
              onChange={handleItemsPerPageChange}
              className="border-2 ml-2 border-stone-300 h-[45px] w-[100px] rounded-md  focus:outline-none text-stone-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="10">10 items</option>
              <option value="20">20 items</option>
              <option value="30">30 items</option>
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

          {filteredData.length > 0 && invetario && invetario.length > 0 ? (
            isGridView ? (
              <div className="grid gap-6 transition-all duration-500 ease-in-out md:grid-cols-2 lg:grid-cols-3">
                {currentData().map((item) => (
                  <div
                    key={item.id}
                    className="relative p-4 duration-500 border rounded-md shadow-sm dark:shadow-indigo-600 hover:shadow-lg dark:hover:shadow-indigo-600 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-14">
                      <div className="flex items-center gap-2">{getIcon()}</div>
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
                          onSuccess={onItemsUpdate}
                        />
                        <ModalTablaseguimientoItem
                          Items={item}
                          tipoItem={tipoItem}
                        />
                        {tipoItem === "equipos" && (
                          <ModalAccesorioItem id={(item as IItems).id} />
                        )}
                        {tipoItem === "equipos" && (
                          <div className="relative group">
                            <button
                              type="button"
                              className="p-2 duration-200 border-2 rounded-md hover:bg-gray-200 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
                              onClick={() =>
                                handleOpen(
                                  (item as IItems).soportRelacion?.nameSaved ||
                                    "",
                                  "ActasEntrega"
                                )
                              }
                              aria-label="Acta de entrega"
                            >
                              <ClipboardDocumentCheckIcon className="w-7 h-7" />
                            </button>
                            <div className="absolute z-10 px-2 py-1 text-sm text-white transition-opacity duration-200 transform translate-y-1 bg-gray-800 rounded-md opacity-0 pointer-events-none -translate-x-14 w-28 left-1/2 bottom-full mb-2 group-hover:opacity-100 dark:bg-gray-900 text-center">
                              Acta Entrega
                              {/* Flechita detrás del texto */}
                              <div className="absolute z-10 w-3 h-3 transform rotate-45 -translate-x-1/2 bg-gray-800 bottom-[22px] left-1/2 dark:bg-gray-900"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4 transition-all duration-500 ease-in-out">
                {currentData().map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 duration-500 border rounded-md shadow-sm dark:border-gray-700 dark:shadow-indigo-600 hover:shadow-xl dark:hover:shadow-indigo-600"
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
                        onSuccess={onItemsUpdate}
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
              No hay registros
            </p>
          )}
          <div>‎</div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
          {selected && (
            <ModalItemsDetails item={selected} onClose={closeModal} />
          )}
        </div>
      )}
    </>
  );
};

export default ItemsList;
