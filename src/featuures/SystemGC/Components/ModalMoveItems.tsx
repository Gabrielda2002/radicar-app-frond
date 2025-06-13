import React, { useEffect, useState } from "react";
import { useFileManager } from "../Hooks/useFileManager";
import ModalDefault from "@/components/common/Ui/ModalDefault";
import { ChevronLeftIcon, FolderIcon } from "lucide-react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

interface ModalMoveItemsProps {
  isOpen: boolean;
  onClose: () => void;
  onMove: (targetFolderId: string) => void;
  section: string;
  currentFolderId: string | null;
  itemName: string;
  itemType: "carpetas" | "archivos";
}
const ModalMoveItems: React.FC<ModalMoveItemsProps> = ({
  isOpen,
  onClose,
  onMove,
  section,
  currentFolderId,
  itemName,
  itemType,
}) => {
  const [navigationPath, setNavigationPath] = useState<
    Array<{ id: string; name: string }>
  >([{ id: "", name: "Inicio" }]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>(
    undefined
  );

  const { contents, loading, error } = useFileManager(
    section,
    selectedFolderId || undefined
  );

  useEffect(() => {
    if (isOpen) {
      setNavigationPath([{ id: "", name: "Inicio" }]);
      setSelectedFolderId(undefined);
    }
  }, [isOpen]);

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
    if (selectedFolderId !== currentFolderId && selectedFolderId) {
      onMove(selectedFolderId || "");
    }
  };

  const isCurrentLocation = selectedFolderId === currentFolderId;
  const isDisabled = isCurrentLocation || loading;

  return (
    <>
      <ModalDefault
        isOpen={isOpen}
        onClose={() => onClose()}
        title={`Mover ${
          itemType === "carpetas" ? "carpeta" : "archivo"
        }: ${itemName}`}
        funtionClick={handleMove}
        isSubmitting={loading}
        isValid={!!selectedFolderId && !isCurrentLocation}
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
                className="text-blue-600 cursor-pointer hover:underline dark:text-blue-400"
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
                  className={`flex flex-col items-center p-3 border rounded-md cursor-pointer 
                        ${
                          f.id === currentFolderId
                            ? "border-red-500 bg-red-50 opacity-50 dark:bg-red-900/20 dark:border-red-700 cursor-not-allowed"
                            : "border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                        }`}
                  onClick={() => {
                    if (f.id !== currentFolderId) {
                      navigateToFolder(f.id, f.name);
                    }
                  }}
                  title={
                    f.id === currentFolderId
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
