import  { useState } from "react";
import ModalCrearCarpeta from "../modals/ModalCrearCarpeta";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import ModalSubirArchivo from "../modals/ModalSubirArchivo";

const DropDownManu = () => {
  //   const [isOpen, setIsOpen] = useState(false);
  const [stadOpenFolder, setStadOpenFolder] = useState(false);
  const [stadOpenFile, setStadOpenFile] = useState(false);

  const toggleModalFolder = () => {
    setStadOpenFolder(!stadOpenFolder);
  };

  const toggleModalFile = () => {
    setStadOpenFile(!stadOpenFile);
    
  };

  const handleModalOpenFolder = () => {
    setStadOpenFolder(true);
    // setStadOpenFile(true);
    // setIsOpen(false);
  };
  const handleModalOpenFile = () => {
    setStadOpenFile(true);
    // setStadOpenFile(true);
    // setIsOpen(false);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Nuevo
          <ChevronDownIcon
            arial-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              onClick={handleModalOpenFolder}
            >
              Crear Carpeta.
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              onClick={handleModalOpenFile}
            >
              Subir Archivo
            </button>
          </MenuItem>
        </div>
      </MenuItems>

      {<ModalCrearCarpeta standOpen={stadOpenFolder} toggleModal={toggleModalFolder} />}
      {<ModalSubirArchivo standOpen={stadOpenFile} toggleModal={toggleModalFile}/>}
    </Menu>
  );
};

export default DropDownManu;
