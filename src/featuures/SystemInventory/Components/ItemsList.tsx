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
} from "@heroicons/react/24/outline";

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
  onItemsUpdate
}) => {
  // * Estados para almacenar datos
  const [selected, setSelected] = useState<IItems | IItemsNetworking | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(true); // * Estado para alternar vistas (Lista o de cuadrícula)
  const ITEMS_PER_PAGE = 9; // * Asignación de numero fijo para mejor compresion de datos y equipos
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);

  // * Ajuste de lógica para la búsqueda
  const { query, setQuery, filteredData } = useSearch<
    IItems | IItemsNetworking
  >(
    invetario || [],
    tipoItem === "equipos"
      ? ["name", "brand", "model"]
      : ["name", "brand", "model"]
  );

  // * Lógica de paginación para gestionar la navegación entre páginas
  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, itemsPerPage);

  // * Función para cambiar el número de elementos por página
  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  // * Implementación de cookie para almacenar el estado de la vista (grid/lista)
  // * Efecto para leer y aplicar la vista guardada de la cookie
  useEffect(() => {
    const savedView = Cookies.get("itemsViewMode");
    if (savedView === "list") {
      setIsGridView(false);
    }
  }, []);

  // * Subcomponente para alternar entre vista en "grid" o "lista", y guardar la preferencia en cookie
  const toggleViewMode = () => {
    const newViewMode = !isGridView ? "grid" : "list";
    Cookies.set("itemsViewMode", newViewMode, { expires: 7 });
    setIsGridView(!isGridView);
  };

  // * Efecto para manejar el cierre o apertura del modal después de un retraso
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simular carga inicial
    return () => clearTimeout(timeout);
  }, [tipoItem]);

  // * Función para establecer el ítem seleccionado al hacer clic
  const handleViewDetails = (item: IItems | IItemsNetworking) => {
    setSelected(item);
  };

  // * Función para cerrar el modal y resetear el ítem seleccionado
  const closeModal = () => {
    setSelected(null);
  };

  // * Función para determinar el ícono a mostrar basado en el tipo de ítem
  // * Muestra el ícono correspondiente según el tipo de inventario (equipos o dispositivos)

  const getIcon = () => {      
      return tipoItem === "equipos"  ? <ComputerDesktopIcon className="w-8 h-8 mr-2 dark:text-white" /> :
             <CpuChipIcon className="w-8 h-8 mr-2 dark:text-white" />
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
                      <div className="flex items-center gap-2">
                        {getIcon()}
                      </div>
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
