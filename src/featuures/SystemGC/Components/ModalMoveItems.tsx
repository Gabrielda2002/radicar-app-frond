import React, { useEffect, useState } from "react";
import ModalDefault from "@/components/common/Ui/ModalDefault";
import { ChevronLeftIcon, FolderIcon } from "lucide-react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { SECTIONS } from "../Page/SistemaArchivosSGC";
import { useFileManager } from "../Hooks/useFileManager";
import { Bounce, toast } from "react-toastify";
import { ModalMoveItemsProps } from "../Types/IFileManager";

const ModalMoveItems: React.FC<ModalMoveItemsProps> = ({
  isOpen,
  onClose,
  section,
  currentFolderId,
  itemNameToMove,
  itemType,
  itemId,
  handleRefresh,
}) => {
  const [navigationPath, setNavigationPath] = useState<
    Array<{ id: string; name: string }>
  >([{ id: "", name: "Inicio" }]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>(
    undefined
  );

  const [activeSection, setActiveSection] = useState<string>("");
  const { contents, loading, error, moveItem } = useFileManager(
    activeSection,
    selectedFolderId
  );

  useEffect(() => {
    if (isOpen) {
      setNavigationPath([{ id: "", name: "Inicio" }]);
      setSelectedFolderId(undefined);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setNavigationPath([{ id: "", name: "Inicio" }]);
      setSelectedFolderId(undefined);
      setActiveSection((prev) => prev || section);
    }
  }, [section, isOpen]);

  const handleSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSection = e.target.value;
    setActiveSection(newSection);
    setNavigationPath([{ id: "", name: "Inicio" }]);
    setSelectedFolderId(undefined);
  };

  const navigateToFolder = (folderId: string, folderName: string) => {
    setSelectedFolderId(folderId);
    setNavigationPath((prev) => [...prev, { id: folderId, name: folderName }]);
  };

  const navigateBack = () => {
    if (navigationPath.length > 1) {
      const newPath = navigationPath.slice(0, -1);
      setNavigationPath(newPath);
      const lastFolder = newPath[newPath.length - 1];
      setSelectedFolderId(lastFolder.id);
    }
  };

  const handleMove = () => {

      const isValidMove =
    itemType === "carpetas"
      ? selectedFolderId !== currentFolderId && selectedFolderId !== itemId
      : !!selectedFolderId && selectedFolderId !== currentFolderId;

    if (isValidMove) {
      moveItem(Number(itemId), selectedFolderId || "", itemType)
        .then((success) => {
          if (success) {
            onClose();
            handleRefresh();
          } else {
            toast.error(
              `Error al mover el ${
                itemType === "carpetas" ? "carpeta" : "archivo"
              }. Por favor, inténtalo de nuevo.`,
              {
                position: "bottom-right",
                autoClose: 5000,
                theme: "colored",
                transition: Bounce,
              }
            );
          }
        })
        .catch((error) => {
          console.error("Error moving item:", error);
          toast.error(
            `Error al mover el ${
              itemType === "carpetas" ? "carpeta" : "archivo"
            }. Por favor, inténtalo de nuevo.`,
            {
              position: "bottom-right",
              autoClose: 5000,
              theme: "colored",
              transition: Bounce,
            }
          );
        });
    }
  };

  const isCurrentLocation = selectedFolderId === currentFolderId;

  return (
    <>
      <ModalDefault
        isOpen={isOpen}
        onClose={() => onClose()}
        title={`Mover ${
          itemType === "carpetas" ? "carpeta" : "archivo"
        }: ${itemNameToMove}`}
        funtionClick={handleMove}
        isSubmitting={loading}
        isValid={
          itemType === "carpetas"
            ? selectedFolderId !== currentFolderId ||
              selectedFolderId !== undefined
            : !!selectedFolderId && !isCurrentLocation && selectedFolderId !== ""
        }
        submitText="Mover"
        cancelText="Cancelar"
        footerVariant="form"
        showSubmitButton={true}
        size="lg"
      >
        {navigationPath.length > 1 && (
          <button onClick={navigateBack} className="btn btn-secondary mb-4">
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        )}

        <div className="flex flex-wrap items-center">
          {navigationPath.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="mx-1 text-gray-500 dark:text-gray-400">/</span>
              )}
              <span
                className="text-blue-600 hover:underline dark:text-blue-400"
                onClick={() => {
                  setSelectedFolderId(item.id);
                  setNavigationPath(navigationPath.slice(0, index + 1));
                }}
              >
                {item.name}
              </span>
            </React.Fragment>
          ))}
        </div>
        

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-400">
            Sección:
          </label>
          <select
            value={activeSection}
            onChange={handleSectionChange}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SECTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="p-4 overflow-y-auto max-h-[50vh]">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <LoadingSpinner />
            </div>
          ) : !contents?.folders || contents.folders.length === 0 ? (
            <div className="p-4 text-gray-500 dark:text-gray-400">
              No hay carpetas disponibles para mover.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {contents?.folders?.map((f) => (
                <div
                  key={f.id}
                  className={`flex flex-col items-center p-3 border rounded-md 
                        ${
                          f.id === currentFolderId || (itemType === "carpetas" && f.id === itemId)
                            ? "border-red-500 bg-red-50 opacity-50 dark:bg-red-900/20 dark:border-red-700 cursor-not-allowed"
                            : "border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                        }`}
                  onClick={() => {
                    if ( !(f.id === currentFolderId || (itemType === "carpetas" && f.id === itemId))) {
                      navigateToFolder(f.id.toString(), f.name);
                    }
                  }}
                  title={
                    f.id === currentFolderId || (itemType === "carpetas" && f.id === itemId)
                      ? "No puedes mover a la carpeta actual"
                      : f.name
                  }
                >
                  <FolderIcon className="w-12 h-12 text-yellow-500 dark:text-yellow-400" />
                  <p className="mt-2 text-sm font-medium text-center text-gray-700 truncate dark:text-gray-400">
                    {f.name}
                  </p>
                </div>
              ))}
            </div>
          )}
          {error && (
            <div className="mt-4 text-red-500 dark:text-red-400">{error}</div>
          )}
        </div>
      </ModalDefault>
    </>
  );
};

export default ModalMoveItems;
