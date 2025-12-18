import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { GlobalSearchResult, useGlobalSearch } from "../Hooks/useGlobalSearch";
import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

interface GlobalSearchProps {
  onNavigateToItem: (result: GlobalSearchResult) => void;
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
  onNavigateToItem,
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState<string>("");

  const {
    searchResults,
    isSearching,
    searchError,
    performGlobalSearch,
    clearResults,
  } = useGlobalSearch();

  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        performGlobalSearch(query);
      }, 300);
    } else {
      clearResults();
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, performGlobalSearch, clearResults]);

  const handleSelectResult = (result: GlobalSearchResult) => {
    onNavigateToItem(result);
    setQuery("");
    onClose();
    clearResults();
  };

  const getTypeColor = (tipoItem: string): string => {
    const colors: Record<string, string> = {
      equipos: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "dispositivos-red":
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "inventario/general":
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      "inventario/televisores":
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      "inventario/celulares":
        "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    };
    return (
      colors[tipoItem] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    );
  };

  const getTypeLabel = (tipoItem: string): string => {
    const labels: Record<string, string> = {
      equipos: "Equipos",
      "dispositivos-red": "Dispositivos de Red",
      "inventario/general": "Inventario General",
      "inventario/televisores": "Televisores",
      "inventario/celulares": "Celulares",
    };
    return labels[tipoItem] || tipoItem;
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar en todo el inventario..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 ml-3 text-lg bg-transparent border-none outline-none dark:text-white"
            />
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {isSearching && (
              <div className="flex items-center justify-center p-8">
                <LoadingSpinner />
              </div>
            )}

            {searchError && (
              <div className="p-4 text-red-600 dark:text-red-400">
                {searchError}
              </div>
            )}

            {!isSearching && query && searchResults.length === 0 && (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No se encontraron resultados para "{query}"
              </div>
            )}

            {searchResults.map((result, index) => (
              <button
                key={`${result.tipoItem}-${result.item.id}-${index}`}
                onClick={() => handleSelectResult(result)}
                className="w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700 outline-none"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {result.strategy.getIcon()}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {result.strategy.getName(result.item)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {result.departmentName} → {result.sedeName}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(
                        result.tipoItem
                      )}`}
                    >
                      {getTypeLabel(result.tipoItem)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {result.strategy.getTypeLabel(result.item)}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          {query && (
            <div className="p-3 text-xs text-gray-500 border-t border-gray-200 dark:border-gray-700 dark:text-gray-400">
              Presiona Enter para navegar al primer resultado
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GlobalSearch;
