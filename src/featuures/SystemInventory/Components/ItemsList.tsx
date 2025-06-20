// * Fuctions and Hooks
import React, { useEffect, useState } from "react";
import Pagination from "@/components/common/PaginationTable/PaginationTable";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import usePagination from "@/hooks/usePagination";

// * Icons
import { useOpenSupport } from "@/hooks/useOpenSupport";
import { useFetchAreaDependency } from "../Hooks/useFetchAreaDependency";
import { AnyItem, ItemStrategyFactory } from "../strategies/ItemStrategy";
import FilterChips from "./FilterChips";
import { useItemsFilter } from "../Hooks/useItemsFilter";

// * Interface
interface ItemsListProps {
  invetario: AnyItem[] | null;
  tipoItem: string | null;
  idSede: number;
  onItemsUpdate: () => void;
  targetItemId?: string | number | null;
  onTargetItemProcessed?: () => void;
}

const ItemsList: React.FC<ItemsListProps> = ({
  invetario,
  tipoItem,
  idSede,
  onItemsUpdate,
  targetItemId,
  onTargetItemProcessed,
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

  const { query, setQuery, filteredData } = useItemsFilter({
    data: invetario,
    tipoItem,
    selectedAreaDependency,
  }) 

  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination<AnyItem>(
      filteredData,
      itemsPerPage
    );

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

  const navigateToItem = (targetId: string | number) =>  {
    if(!filteredData || filteredData.length === 0) return 1;

    const targetIndex = filteredData.findIndex(item => 
      item.id.toString() === targetId.toString()
    );

    if(targetIndex === -1){
      console.log(`Item with Id ${targetId} not found in filtered data`);
      return 1;
    }

    const targetPage = Math.floor(targetIndex / itemsPerPage) + 1;

    paginate(targetPage);

    return targetPage;
  }

  useEffect(() => {
    if (targetItemId && filteredData.length > 0) {
      const timer = setTimeout(() => {
        const targetPage = navigateToItem(targetItemId);
        
        // ✅ Función recursiva para buscar el elemento
        const findAndScrollToElement = (attempts = 0, maxAttempts = 10) => {
          const elementId = `item-${targetItemId}`;
          const element = document.getElementById(elementId);
  
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
  
            element.style.transition = 'all 0.3s ease';
            element.style.backgroundColor = '#3b82f6';
            element.style.transform = 'scale(1.02)';
  
            setTimeout(() => {
              element.style.backgroundColor = '';
              element.style.transform = '';
              onTargetItemProcessed?.();
            }, 2000);
            
            console.log(`Successfully navigated to item ${targetItemId} on page ${targetPage}`);
          } else if (attempts < maxAttempts) {
            setTimeout(() => findAndScrollToElement(attempts + 1, maxAttempts), 100);
          } else {
            console.error(`Could not find element ${elementId} after ${maxAttempts} attempts on page ${targetPage}`);
          }
        };
  
        findAndScrollToElement();
      }, 100);
  
      return () => clearTimeout(timer);
    }
  }, [targetItemId, filteredData, itemsPerPage]);

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

          {filteredData.length > 0 && invetario && invetario.length > 0 ? (
            <div className="grid gap-6 transition-all duration-500 ease-in-out md:grid-cols-2 lg:grid-cols-3">
              {currentData().map((item: AnyItem) => (
                <div
                  key={item.id}
                  id={`item-${item.id}`}
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
