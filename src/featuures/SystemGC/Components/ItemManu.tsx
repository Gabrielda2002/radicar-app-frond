//*Fuctions and hooks
import React, { useState, lazy, Suspense } from "react";
import useFileManagerStore from "../Store/FileManagerStore";
//*Icons
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import ModalMoveItems from "./ModalMoveItems";
import { Move } from "lucide-react";

interface ItemManuProps {
  onDelete: () => void;
  itemName: string;
  itemType: "carpetas" | "archivo";
  itemId: string;
  nameItemOld: string;
}

//*Properties
const ModalRenombrarItem = lazy(() => import("./ModalRenombrarItem"));
const ConfirmDeletePopupProps = lazy(
  () => import("@/components/common/ConfirmDeletePopUp/ConfirmDeletePopUp")
);

const ItemManu: React.FC<ItemManuProps> = ({
  onDelete,
  itemName,
  itemType,
  itemId,
  nameItemOld,
}) => {
  const { section, path } = useFileManagerStore();
  const currentFolderId = path[path.length - 1].id;

  const [stadOpenRename, setStadOpenRename] = useState(false);
  const [stadOpenDelete, setStadOpenDelete] = useState(false);
  const [stadOpenMove, setStadOpenMove] = useState(false);


  const handleModalOpenRename = () => {
    setStadOpenRename(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalOpenDelete = () => {
    setStadOpenDelete(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalOpenMove = () => {
    setStadOpenMove(true);
  }

  const stadOffDelete = () => {
    setStadOpenDelete(false);
    document.body.style.overflow = "";
  };

  const confirmDeleteItem = () => {
    onDelete();
    stadOffDelete();
  };

  const itemsOptions = [
    {
      id: "delete",
      name: "Eliminar",
      icon: TrashIcon,
      onClick: handleModalOpenDelete,
    },
    {
      id: "rename",
      name: "Renombrar",
      icon: PencilIcon,
      onClick: handleModalOpenRename,
    },
    {
      id: "move",
      name: "Mover",
      icon: Move,
      onClick: handleModalOpenMove,
    }
  ]

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex cursor-pointer w-full justify-center gap-x-1.5 rounded-md bg-stone-100 dark:bg-gray-700 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 dark:hover:text-gray-700 hover:bg-gray-500 hover:scale-105 text-center duration-300">
            {/* conflic | dark:hover:-translate-y-1 duration-300 ease-in-out | */}
            <EllipsisVerticalIcon
              arial-hidden="true"
              className="w-8 h-8 text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-700"
            />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute -right-6 md:right-0 z-20 mt-2 w-44 md:w-56 origin-top-right rounded-md bg-white dark:bg-gray-500 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-leave:duration-75 data-enter:ease-out data-leave:ease-in"
        >
          <div className="py-1">
            {itemsOptions.map((op) => (
              <MenuItem key={op.id}>
                <div className="flex text-sm text-gray-700 data-focus:bg-blue-100 data-focus:text-gray-900 w-full text-left dark:text-gray-100 dark:data-focus:bg-gray-600">
                  <button
                    className="flex cursor-pointer justify-between items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-blue-100 data-focus:text-gray-900 w-full text-left dark:text-gray-100 dark:data-focus:bg-gray-600"
                    onClick={op.onClick}
                  >
                    {op.name}
                    <op.icon className="w-6 h-6 dark:text-white" />
                  </button>
                </div>
              </MenuItem>
            ))}
          </div>
        </MenuItems>

        <Suspense fallback={<LoadingSpinner />}>
          {
            <ModalRenombrarItem
              toggleModal={() => {
                setStadOpenRename(false);
              }}
              standOpen={stadOpenRename}
              nameItemOld={nameItemOld}
              itemId={itemId}
              typeItem={itemType}
            />
          }

          {/* Mensaje confirmacion DELETE */}
          {
            <ConfirmDeletePopupProps
              isOpen={stadOpenDelete} //condicion true
              onClose={stadOffDelete} //cerrar modal
              onConfirm={confirmDeleteItem} //eliminacion acertiva y cerrar el modal
              itemName={itemName}
            ></ConfirmDeletePopupProps> // pasar prop "cambio de nombre y clases"
          }
          {stadOpenMove && (
            <ModalMoveItems
              isOpen={stadOpenMove}
              onClose={() => {
                setStadOpenMove(false);
              }}
              itemType={itemType}
              itemNameToMove={itemName}
              section={section || "sgc"}
              currentFolderId={currentFolderId}
              itemId={itemId}
            />
          )}
        </Suspense>
      </Menu>
    </>
  );
};

export default ItemManu;
