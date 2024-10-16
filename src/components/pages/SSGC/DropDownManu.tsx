import React, { useState } from "react";
import ModalCrearCarpeta from "../modals/ModalCrearCarpeta";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import ModalSubirArchivo from "../modals/ModalSubirArchivo";
import { useUploadFile } from "../../../hooks/useUploadFile";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

interface DropDownManuProps {
  currentFolderId: string;
  uploadNewFile: (formData: FormData, id: string | number) => Promise<void>;
  createNewFolder: (name: string) => void;
  isInFolder: boolean;
}

const DropDownManu: React.FC<DropDownManuProps> = ({
  uploadNewFile,
  currentFolderId,
  createNewFolder,
  isInFolder,
}) => {
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
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md dark:text-white bg-white dark:bg-gray-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Nuevo
              <ChevronDownIcon
                arial-hidden="true"
                className={`w-5 h-5 -mr-1 text-gray-400 dark:text-white duration-300 transform ${
                  open ? "rotate-180" : ""
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
                <button
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-blue-100 data-[focus]:text-gray-900 w-full text-left dark:text-gray-200 dark:data-[focus]:bg-gray-600"
                  onClick={handleModalOpenFolder}
                >
                  Crear Carpeta.
                </button>
              </MenuItem>
              {isInFolder && (
                <MenuItem>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-blue-100 data-[focus]:text-gray-900 w-full text-left dark:text-gray-200 dark:data-[focus]:bg-gray-600"
                    onClick={handleModalOpenFile}
                  >
                    Subir Archivo.
                  </button>
                </MenuItem>
              )}
            </div>
          </MenuItems>

          <ModalCrearCarpeta
            standOpen={stadOpenFolder}
            toggleModal={toggleModalFolder}
            createNewFolder={createNewFolder}
          />
          <ModalSubirArchivo
            onFileChange={handleFileChange}
            onUpload={handleUpload}
            uploading={uploading}
            stadopen={stadOpenFile}
            toggleModal={toggleModalFile}
          />
        </>
      )}
    </Menu>
  );
};

export default DropDownManu;
