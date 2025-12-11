//*Fuctions and hooks
import React, { useState, lazy, Suspense } from "react";
import { useUploadFile } from "../Hooks/useUploadFile";
import useFileManagerStore from "../Store/FileManagerStore";
//*Icons
import { PlusIcon } from "@heroicons/react/24/outline";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

const ModalSubirArchivo = lazy(() => import("./ModalSubirArchivo"));
const ModalCrearCarpeta = lazy(() => import("./ModalCrearCarpeta"));

interface DropDownManuProps {
  isInFolder: boolean;
}

const DropDownManu: React.FC<DropDownManuProps> = ({
  isInFolder,
}) => {
  const { uploadNewFile, createNewFolder, path } = useFileManagerStore();
  const currentFolderId = path[path.length - 1].id;
  
  const [stadOpenFolder, setStadOpenFolder] = useState(false);
  const [stadOpenFile, setStadOpenFile] = useState(false);

  const { uploading, handleFileChange, handleUpload } = useUploadFile(
    uploadNewFile,
    currentFolderId
  );

  const toggleModalFolder = () => {
    setStadOpenFolder(!stadOpenFolder);
  };

  const toggleModalFile = () => {
    setStadOpenFile(!stadOpenFile);
  };

  const handleModalOpenFolder = () => {
    setStadOpenFolder(true);
  };

  const handleModalOpenFile = () => {
    setStadOpenFile(true);
  };

  return (
    <Menu
      as="div"
      className="relative inline-block text-left rounded-md outline outline-offset-2 outline-3 outline-gray-300"
    >
      {({ open }) => (
        <>
          <div>
            <MenuButton className="flex w-full items-center justify-center gap-x-1.5 rounded-md dark:text-white bg-white dark:bg-gray-500 px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Nuevo
              <PlusIcon
                arial-hidden="true"
                className={`w-6 h-6 -mr-1 text-gray-800 dark:text-white duration-300 transform ${
                  open ? "rotate-[132deg]" : ""
                }`}
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-500 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <div className="flex text-sm text-gray-700 data-[focus]:bg-blue-100 data-[focus]:text-gray-900 w-full text-left dark:text-gray-200 dark:data-[focus]:bg-gray-600">
                  <button
                    className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-blue-100 data-[focus]:text-gray-900 w-full text-left dark:text-gray-200 dark:data-[focus]:bg-gray-600"
                    onClick={handleModalOpenFolder}
                    type="button"
                  >
                    Crear Carpeta.
                    <FolderPlusIcon className="w-6 h-6 dark:text-white" />
                  </button>
                </div>
              </MenuItem>
              {isInFolder && (
                <MenuItem>
                  <div className="flex text-sm text-gray-700 data-[focus]:bg-blue-100 data-[focus]:text-gray-900 w-full text-left dark:text-gray-200 dark:data-[focus]:bg-gray-600">
                    <button
                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-blue-100 data-[focus]:text-gray-900 w-full text-left dark:text-gray-200 dark:data-[focus]:bg-gray-600"
                      onClick={handleModalOpenFile}
                    >
                      Subir Archivo.
                      <DocumentPlusIcon className="w-6 h-6 dark:text-white" />
                    </button>
                  </div>
                </MenuItem>
              )}
            </div>
          </MenuItems>

          <Suspense fallback={<LoadingSpinner />}>
            {/* Modelo de Crear Carpeta */}
            {stadOpenFolder && (
              <ModalCrearCarpeta
                standOpen={stadOpenFolder}
                toggleModal={toggleModalFolder}
                createNewFolder={createNewFolder}
              />
            )}

            {/* Modelo de Subir Archivo */}
            {stadOpenFile && (
              <ModalSubirArchivo
                onFileChange={handleFileChange}
                onUpload={handleUpload}
                uploading={uploading}
                stadopen={stadOpenFile}
                toggleModal={toggleModalFile}
              />
            )}
          </Suspense>
        </>
      )}
    </Menu>
  );
};

export default DropDownManu;
