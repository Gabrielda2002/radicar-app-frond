import React from "react";
import folderIcon from "../../../../public/assets/folder-sgc.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

interface Folder {
  id: string;
  name: string;
}

interface FolderListProps {
  folders: Folder[];
  onFolderClick: (folderId: string, folderName: string) => void;
  onDelete: (id: string, type: "carpetas" | "archivo") => void;
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  onFolderClick,
  onDelete
}) => {
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
      {folders.map((folder) => (
        <div
          key={folder.id}
          // onClick={() => onFolderClick(folder.id, folder.name)}
          className="flex flex-col items-center p-4 bg-gray-100 rounded-md cursor-pointer dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {/* <h1>Carpetas</h1> */}
          <img src={folderIcon} alt="folder-icon" className="w-16 h-16 mb-2" />
          <span onClick={() => onFolderClick(folder.id, "carpetas")}>
            <p className="text-sm font-medium text-center text-gray-700 dark:text-gray-300">{folder.name}</p>
          </span>
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
                    onClick={() => onDelete(folder.id, "carpetas")}
                  >
                    Eliminar
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
          {/* <button onClick={() => onDelete(folder.id, "carpetas")}>Eliminar</button> */}
        </div>
      ))}
    </div>
  );
};

export default FolderList;
