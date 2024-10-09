import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ModalRenombrarItem from "../modals/ModalRenombrarItem";
import ConfirmDeletePopupProps from "../../ConfirmDeletePopup";

interface ItemManuProps {
  onDelete: () => void;
  renameItem: (newName: string) => void;
}

const ItemManu: React.FC<ItemManuProps> = ({ onDelete, renameItem }) => {
  const [stadOpenRename, setStadOpenRename] = useState(false);
  const [stadOpenDelete, setStadOpenDelete] = useState(false);

  const toggleModalRename = () => {
    setStadOpenRename(!stadOpenRename);
  };

  const handleModalOpenRename = () => {
    setStadOpenRename(true);
  };

  const handleModalOpenDelete = () => {
    setStadOpenDelete(true);
  };

  const stadOffDelete = () => {
    setStadOpenDelete(false);
  };

  const confirmDeleteItem = () => {
    onDelete();
    stadOffDelete();
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-stone-100 dark:bg-gray-700 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-gray-50 text-center">
            {/* conflic | dark:hover:-translate-y-1 duration-300 ease-in-out | */}
            <EllipsisVerticalIcon
              arial-hidden="true"
              className="w-8 h-8 text-gray-800 dark:invert"
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
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-blue-100 data-[focus]:text-gray-900 w-full text-left dark:text-gray-100 dark:data-[focus]:bg-gray-600"
                onClick={handleModalOpenDelete}
              >
                Eliminar.
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-blue-100 data-[focus]:text-gray-900 w-full text-left dark:text-gray-100 dark:data-[focus]:bg-gray-600"
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

        {/* Mensaje confirmacion DELETE */}
        {
          <ConfirmDeletePopupProps
            isOpen={stadOpenDelete} //condicion true
            onClose={stadOffDelete} //cerrar modal
            onConfirm={confirmDeleteItem} //eliminacion acertiva y cerrar el modal
            iteamName="el elemento"
            condicClase={true}
          ></ConfirmDeletePopupProps> // pasar prop "cambio de nombre y clases"
        }
      </Menu>
    </>
  );
};

export default ItemManu;
