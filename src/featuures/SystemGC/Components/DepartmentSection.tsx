import React, { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Folder } from "../Types/IFileManager";

interface DepartmentSectionProps {
  departmentName: string;
  departmentId: number;
  folders: Folder[];
  defaultExpanded?: boolean;
  folderCount: number;
  onFolderClick: (folderId: string, folderName: string) => void;
  onDelete: (id: string, type: "carpetas" | "archivo") => void;
  renameItem: (id: string, newName: string, type: "carpetas" | "archivo") => void;
  section: string;
  currentFolderId: string;
  handleRefresh: () => void;
  getIconForFolder: (folderName: string) => React.FC<React.SVGProps<SVGSVGElement>> | null;
  rol: string | null;
  ItemManu: React.ComponentType<any>;
  FolderIcon: React.ComponentType<any>;
}

const DepartmentSection: React.FC<DepartmentSectionProps> = ({
  departmentName,
//   departmentId,
  folders,
  defaultExpanded = true,
  folderCount,
  onFolderClick,
  onDelete,
  renameItem,
  section,
  currentFolderId,
  handleRefresh,
  getIconForFolder,
  rol,
  ItemManu,
  FolderIcon,
}) => {
  // Estado para controlar si la sección está expandida o colapsada
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Sincronizar con defaultExpanded cuando cambia
  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);

  const handleDelete = (folderId: string) => {
    onDelete(folderId, "carpetas");
  };

  const handleRename = (folderId: string, newName: string) => {
    renameItem(folderId, newName, "carpetas");
  };

  return (
    <div className="mb-6">
      {/* Header de la sección */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between dark:bg-gray-900 bg-gray-200 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg group bg-gradient-to-r`}
      >
        <div className="flex items-center gap-3">
          {/* Icono de colapsar/expandir */}
          {isExpanded ? (
            <ChevronDownIcon className="w-6 h-6 dark:text-colorIcon transition-transform duration-300" />
          ) : (
            <ChevronRightIcon className="w-6 h-6 dark:text-colorIcon transition-transform duration-300" />
          )}

          {/* Nombre del departamento */}
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            🏥 {departmentName}
          </h3>
        </div>

        {/* Badge con contador de carpetas */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 dark:bg-white/20 bg-black/20 rounded-full backdrop-blur-sm">
            {folderCount} {folderCount === 1 ? "carpeta" : "carpetas"}
          </span>
        </div>
      </button>

      {/* Contenido colapsable */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[5000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 px-2">
          {folders.map((folder) => {
            const CustomIcon = getIconForFolder(folder.name);

            return (
              <div
                key={folder.id}
                onClick={() => onFolderClick(folder.id.toString(), folder.name)}
                className="relative flex flex-col items-center p-4 text-gray-700 duration-500 bg-gray-100 border-2 rounded-md shadow-sm cursor-pointer dark:shadow-indigo-500 dark:border-gray-700 dark:bg-gray-700 hover:shadow-lg dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-indigo-500 dark:hover:underline"
              >
                {CustomIcon ? (
                  <CustomIcon className="w-8 h-8 md:w-16 md:h-16 dark:text-colorIcon transition-colors duration-300" />
                ) : (
                  <FolderIcon className="w-16 h-16 dark:text-colorIcon" />
                )}

                {/* Menú en la esquina superior derecha */}
                {[1, 4].includes(Number(rol)) && (
                  <div
                    className="absolute top-2 right-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ItemManu
                      onDelete={() => handleDelete(folder.id.toString())}
                      renameItem={(newName: string) =>
                        handleRename(folder.id.toString(), newName)
                      }
                      itemName={folder.name}
                      itemType="carpetas"
                      currentFolderId={currentFolderId}
                      section={section}
                      itemId={folder.id.toString()}
                      handleRefresh={handleRefresh}
                      nameItemOld={folder.name}
                    />
                  </div>
                )}

                {/* Nombre de la carpeta */}
                <p className="flex flex-wrap text-sm font-bold text-center text-gray-700 dark:text-stone-200">
                  {folder.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DepartmentSection;
