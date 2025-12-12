import React, { useEffect, useState } from "react";
import ModalDefault from "@/components/common/Ui/ModalDefault";
import { ChevronLeftIcon, FolderIcon, HomeIcon, ChevronRightIcon, FolderOpenIcon } from "lucide-react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { SECTIONS } from "../Page/SistemaArchivosSGC";
import { toast } from "react-toastify";
import { ModalMoveItemsProps } from "../Types/IFileManager";
import useFileManagerStore from "../Store/FileManagerStore";
import { AnimatePresence, motion } from "framer-motion";
import Select from "@/components/common/Ui/Select";
import Button from "@/components/common/Ui/Button";

const ModalMoveItems: React.FC<ModalMoveItemsProps> = ({
  isOpen,
  onClose,
  section,
  currentFolderId,
  itemNameToMove,
  itemType,
  itemId,
}) => {

  const [navigationPath, setNavigationPath] = useState<
    Array<{ id: string; name: string }>
  >([{ id: "", name: "Inicio" }]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>(
    undefined
  );
  const [activeSection, setActiveSection] = useState<string>(section);

  const {
    modalContents,
    modalLoading,
    modalError,
    error,
    fetchModalContents,
    moveItem
  } = useFileManagerStore();

  useEffect(() => {
    if (isOpen) {
      setNavigationPath([{ id: "", name: "Inicio" }]);
      setSelectedFolderId(undefined);
      setActiveSection(section);
    }
  }, [isOpen, section]);

  useEffect(() => {
    if (isOpen) {
      const currentFolder = navigationPath[navigationPath.length - 1].id;
      fetchModalContents(activeSection, currentFolder || undefined);
    }
  }, [isOpen, activeSection, navigationPath]);

  const handleSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSection = e.target.value;
    setActiveSection(newSection);
    setNavigationPath([{ id: "", name: "Inicio" }]);
    setSelectedFolderId(undefined);
  };

  const navigateToFolder = (folderId: string, folderName: string) => {
    setNavigationPath((prev) => [...prev, { id: folderId, name: folderName }]);
    setSelectedFolderId(folderId);
  };

  const navigateBack = () => {
    if (navigationPath.length > 1) {
      const newPath = navigationPath.slice(0, -1);
      setNavigationPath(newPath);
      const lastFolder = newPath[newPath.length - 1];
      setSelectedFolderId(lastFolder.id);
    }
  };

  const handleMove = async () => {
    const isValidMove =
      itemType === "carpetas"
        ? selectedFolderId !== currentFolderId && selectedFolderId !== itemId
        : !!selectedFolderId && selectedFolderId !== currentFolderId;

    if (isValidMove) {
      await moveItem(
        Number(itemId),
        selectedFolderId || "",
        itemType === "carpetas" ? "carpetas" : "archivo",
        activeSection,
        () => {
          onClose();
          toast.success(`${itemType === "carpetas" ? "Carpeta" : "Archivo"} movido con éxito!`);
        }
      );
    } else {
      toast.warning("Selecciona una ubicación válida diferente a la actual.");
    }
  };

  const isCurrentLocation = selectedFolderId === currentFolderId;

  return (
    <>
      <ModalDefault
        isOpen={isOpen}
        onClose={() => onClose()}
        title={`Mover ${itemType === "carpetas" ? "Carpeta" : "Archivo"}`}
        funtionClick={handleMove}
        isSubmitting={modalLoading}
        isValid={
          itemType === "carpetas"
            ? selectedFolderId !== currentFolderId ||
            selectedFolderId !== undefined
            : !!selectedFolderId && !isCurrentLocation && selectedFolderId !== ""
        }
        submitText="Mover aquí"
        cancelText="Cancelar"
        footerVariant="form"
        showSubmitButton={true}
        size="lg"
      >
        {/* Encabezado personalizado con info del item */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              {itemType === "carpetas" ? (
                <FolderIcon className="w-6 h-6 text-white" />
              ) : (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Moviendo
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                {itemNameToMove}
              </p>
            </div>
          </div>
        </div>
        {/* Navegación mejorada */}
        <div className="mb-6">
          {navigationPath.length > 1 && (
            <Button
              onClick={navigateBack}
              variant="secondary"
              className="mb-3 flex items-center gap-2 text-sm"
              icon={<ChevronLeftIcon className="w-4 h-4" />}
            >
              Volver
            </Button>
          )}

          {/* Breadcrumb mejorado */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <HomeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
              {navigationPath.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <ChevronRightIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                  )}
                  <button
                    onClick={() => {
                      setSelectedFolderId(item.id);
                      setNavigationPath(navigationPath.slice(0, index + 1));
                    }}
                    className={`text-sm font-medium transition-colors truncate ${
                      index === navigationPath.length - 1
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    {item.name}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Selector de sección mejorado */}
        <div className="mb-4">
          <Select
            options={SECTIONS.map((s) => ({
              label: s.name,
              value: s.id,
            }))}
            label="Seleccionar sección"
            value={activeSection}
            onChange={handleSectionChange}
          />
        </div>

        {/* Área de contenido mejorada */}
        <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
          <div className="sticky top-0 z-10 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderOpenIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Carpetas disponibles
                </span>
              </div>
              {!modalLoading && modalContents?.folders && (
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-full">
                  {modalContents.folders.length} {modalContents.folders.length === 1 ? 'carpeta' : 'carpetas'}
                </span>
              )}
            </div>
          </div>

          <div className="p-4 overflow-y-auto max-h-[50vh]">
            {modalLoading ? (
              <div className="flex flex-col items-center justify-center h-40 gap-3">
                <LoadingSpinner />
                <p className="text-sm text-gray-500 dark:text-gray-400">Cargando carpetas...</p>
              </div>
            ) : !modalContents?.folders || modalContents.folders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 gap-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <FolderIcon className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  No hay carpetas disponibles
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Selecciona otra sección o crea una nueva carpeta
                </p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
              >
                {modalContents?.folders?.map((f, index) => {
                  const isDisabled = f.id === currentFolderId || (itemType === "carpetas" && f.id == itemId);
                  const isSelected = selectedFolderId === f.id.toString();
                  
                  return (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      onClick={() => {
                        if (!isDisabled) {
                          navigateToFolder(f.id.toString(), f.name);
                        }
                      }}
                      className={`
                        group relative flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200
                        ${isDisabled
                          ? "border-red-200 bg-red-50/50 dark:bg-red-900/10 dark:border-red-800 cursor-not-allowed opacity-60"
                          : isSelected
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500 shadow-lg scale-105"
                          : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer hover:shadow-md hover:scale-102"
                        }
                      `}
                      title={isDisabled ? "No puedes mover a esta ubicación" : f.name}
                    >
                      {/* Icono de carpeta con animación */}
                      <div className={`
                        relative mb-2 transition-transform duration-200
                        ${!isDisabled && "group-hover:scale-110"}
                      `}>
                        <FolderIcon 
                          className={`
                            w-12 h-12 transition-colors
                            ${isDisabled 
                              ? "text-red-400 dark:text-red-600" 
                              : isSelected
                              ? "text-blue-500 dark:text-blue-400"
                              : "text-yellow-500 dark:text-yellow-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-300"
                            }
                          `} 
                        />
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                          >
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        )}
                        {isDisabled && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* Nombre de carpeta */}
                      <p className={`
                        text-sm font-medium text-center line-clamp-2 w-full
                        ${isDisabled 
                          ? "text-red-600 dark:text-red-400" 
                          : isSelected
                          ? "text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300"
                        }
                      `}>
                        {f.name}
                      </p>

                      {/* Indicador de doble clic */}
                      {!isDisabled && !isSelected && (
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded-full text-xs">
                            <ChevronRightIcon className="w-3 h-3" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
        {/* Mensajes de error mejorados */}
        <AnimatePresence>
          {(modalError || error) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4"
            >
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-red-800 dark:text-red-300">
                    Error
                  </h4>
                  <p className="mt-1 text-sm text-red-700 dark:text-red-400">
                    {modalError || error}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info de ayuda */}
        {selectedFolderId && !modalLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
          >
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Haz clic en "Mover aquí" para confirmar la operación o navega a otra carpeta.
              </p>
            </div>
          </motion.div>
        )}
      </ModalDefault>
    </>
  );
};

export default ModalMoveItems;
