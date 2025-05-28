// * Fuctions and Hooks
import React, { useEffect, useState } from "react";
import Pagination from "@/components/common/PaginationTable/PaginationTable";
import { IItems } from "@/models/IItems";
import useSearch from "@/hooks/useSearch";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import usePagination from "@/hooks/usePagination";
import { IItemsNetworking } from "@/models/IItemsNetworking";

// * Icons
import { useOpenSupport } from "@/hooks/useOpenSupport";
import { IItemsGeneral } from "../Models/IItemsGeneral";
import { useFetchAreaDependency } from "../Hooks/useFetchAreaDependency";
import { AnyItem, ItemStrategyFactory } from "../strategies/ItemStrategy";
import FilterChips from "./FilterChips";

// * Interface
interface ItemsListProps {
  invetario: AnyItem[] | null;
  tipoItem: string | null;
  idSede: number;
  onItemsUpdate: () => void;
}

const ItemsList: React.FC<ItemsListProps> = ({
  invetario,
  tipoItem,
  idSede,
  onItemsUpdate,
}) => {
  // * Estados para almacenar datos

  const strategy = tipoItem ? ItemStrategyFactory.getStrategy(tipoItem) : null;

  const { areaDependency } = useFetchAreaDependency();
  const [selectedAreaDependency, setSelectedAreaDependency] = useState<
    string[]
  >([]);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);

  const { handleOpen } = useOpenSupport();

  const [isLoading, setIsLoading] = useState(true);
  const ITEMS_PER_PAGE = 9;
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } =
    tipoItem === "equipos"
      ? useSearch<IItems>((invetario as IItems[]) || [], [
          "nameEquipment",
          "brandEquipment",
          "modelEquipment",
          "nameUser",
          "lastNameUser",
        ])
      : tipoItem === "dispositivos-red"
      ? useSearch<IItemsNetworking>((invetario as IItemsNetworking[]) || [], [
          "name",
          "brand",
          "model",
        ])
      : useSearch<IItemsGeneral>((invetario as IItemsGeneral[]) || [], [
          "name",
          "brand",
          "model",
          "responsable",
        ]);

  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination<IItems | IItemsNetworking | IItemsGeneral>(
      filteredData,
      itemsPerPage
    );

  const filteredGeneralItems =
    tipoItem === "inventario/general"
      ? ((invetario as IItemsGeneral[]) || []).filter(
          (item) =>
            (item.name.toLowerCase().includes(query.toLowerCase()) ||
              item.brand.toLowerCase().includes(query.toLowerCase()) ||
              item.model.toLowerCase().includes(query.toLowerCase())) &&
            (selectedAreaDependency.length === 0 ||
              selectedAreaDependency.includes(item.dependencyArea))
        )
      : [];

  const dataToShow =
    tipoItem === "inventario/general" ? filteredGeneralItems : filteredData;

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simular carga inicial
    return () => clearTimeout(timeout);
  }, [tipoItem]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {/* Header */}
          <div className="flex justify-between w-full">
            <h2 className="flex text-2xl md:text-3xl dark:text-white">
              Inventario de {tipoItem}
            </h2>
            <div>
              {strategy?.renderCreateButton(
                idSede,
                null,
                onItemsUpdate,
                null,
                tipoItem,
                false
              )}
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
            {/* filtro pora inventario general */}
            {tipoItem === "inventario/general" && (
              <div className="relative ml-2">
                <button
                  type="button"
                  className="p-2 border-2 truncate rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 flex items-center gap-2"
                  onClick={() => setShowAreaDropdown(!showAreaDropdown)}
                >
                  Filtro dependencia
                  <span className="ml-1">&#9662;</span>
                </button>
                {showAreaDropdown && (
                  <div className="absolute z-20 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:text-gray-400 rounded shadow-lg w-56 max-h-60 overflow-auto">
                    {areaDependency?.map((a) => (
                      <label
                        key={a.id}
                        className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <input
                          type="checkbox"
                          checked={selectedAreaDependency.includes(a.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAreaDependency((prev) => [
                                ...prev,
                                a.name,
                              ]);
                            } else {
                              setSelectedAreaDependency((prev) =>
                                prev.filter((name) => name !== a.name)
                              );
                            }
                          }}
                          className="mr-2"
                        />
                        <span>{a.name}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* chips filtros activos */}
                <FilterChips
                  selectedFilters={selectedAreaDependency}
                  onRemoveFilter={(filter) =>
                    setSelectedAreaDependency((prev) =>
                      prev.filter((name) => name !== filter)
                    )
                  }
                />
              </div>
            )}
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
          </div>

          {dataToShow.length > 0 && invetario && invetario.length > 0 ? (
            <div className="grid gap-6 transition-all duration-500 ease-in-out md:grid-cols-2 lg:grid-cols-3">
              {(tipoItem === "inventario/general"
                ? dataToShow
                : currentData()
              ).map((item: AnyItem) => (
                <div
                  key={item.id}
                  className="relative p-4 duration-500 border rounded-md shadow-sm dark:shadow-indigo-600 hover:shadow-lg dark:hover:shadow-indigo-600 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-14">
                    <div className="flex items-center gap-2">
                      {strategy?.getIcon()}
                    </div>
                    <h3 className="mb-2 font-semibold text-md md:text-2xl dark:text-white">
                      {strategy?.getName(item)}
                    </h3>
                    <p className="p-2 text-xs text-white bg-gray-600 rounded-full dark:bg-gray-900 dark:text-white">
                      {strategy?.getTypeLabel(item)}
                    </p>
                  </div>
                  <hr className="border-gray-300 dark:border-gray-600" />
                  <div className="flex flex-wrap justify-between gap-2 mt-4">
                    {strategy?.renderDetailsButton(
                      item,
                      tipoItem ?? "",
                      onItemsUpdate
                    )}
                    <div className="flex flex-wrap gap-2">
                      {strategy?.renderActionButtons(
                        item,
                        onItemsUpdate,
                        handleOpen
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
        </div>
      )}
    </>
  );
};

export default ItemsList;
