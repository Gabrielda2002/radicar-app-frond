import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ModalRenombrarItem from "../modals/ModalRenombrarItem";

interface ItemManuProps {
  onDelete: () => void;
  renameItem: (newName: string) => void;
}

const ItemManu: React.FC<ItemManuProps> = ({ onDelete, renameItem }) => {
  const [stadOpenRename, setStadOpenRename] = useState(false);

  const toggleModalRename = () => {
    setStadOpenRename(!stadOpenRename);
  };

  const handleModalOpenRename = () => {
    setStadOpenRename(true);
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white dark:bg-gray-700 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 hover:bg-gray-50 text-center dark:hover:-translate-y-1 duration-300 ease-in-out">
            <EllipsisVerticalIcon
              arial-hidden="true"
              className="w-8 h-8 text-gray-800 dark:invert"
            />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in dark:bg-gray-800"
        >
          <div className="py-1">
            <MenuItem>
              <button
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full text-left dark:text-gray-200 dark:data-[focus]:bg-gray-500"
                onClick={onDelete}
              >
                Eliminar.
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full text-left dark:text-gray-200 dark:data-[focus]:bg-gray-500"
                onClick={handleModalOpenRename}
              >
                Renombrar.
              </button>
            </MenuItem>
          </div>
        </MenuItems>

        {
          <ModalRenombrarItem
            toggleModal={toggleModalRename}
            standOpen={stadOpenRename}
            renameItem={renameItem}
          />
        }
      </Menu>
    </>
  );
};

export default ItemManu;
