import ModalDefault from "@/components/common/Ui/ModalDefault";
import React, { useCallback, useState } from "react";

type ModalRenombrarItemProps = {
  standOpen: boolean;
  toggleModal: () => void;
  renameItem: (newName: string) => void;
  nameItemOld: string;
};

const ModalRenombrarItem: React.FC<ModalRenombrarItemProps> = ({
  standOpen,
  toggleModal,
  renameItem,
  nameItemOld
}) => {
  const [Error, setError] = useState("");
  const [folderNewName, setFolderNewName] = useState<string>(nameItemOld || "");

  const handleRename = useCallback(() => {
    if (folderNewName.trim()) {
      renameItem(folderNewName);
      toggleModal();
    } else {
      alert("El nombre de la carpeta es requerido");
    }
  }, [folderNewName, renameItem, toggleModal]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const regex = /^[a-zA-Z0-9\s]{1,60}$/;

      const inputValue = e.target.value;

      if (!regex.test(inputValue)) {
        setError(
          "Solo se permiten 60 caracteres alfanuméricos, sin caracteres especiales"
        );
      } else {
        setError("");
      }
      console.log(Error);
      setFolderNewName(inputValue);
    },
    []
  );

  return (
    <>
      <ModalDefault
        isOpen={standOpen}
        onClose={toggleModal}
        title="Renombrar Carpeta"
        funtionClick={handleRename}
        showSubmitButton={true}
        isSubmitting={false}
        isValid={!Error && folderNewName.trim() !== ""}
        submitText="Renombrar"
        cancelText="Cerrar"
        footerVariant="form"
        size="lg"
      >
        <div className="grid grid-cols-1 gap-10 mb-4">
          <div className="p-4">
            <label className="block mb-2 text-lg font-bold text-gray-700 dark:text-gray-200">
              Nombre :
            </label>
            <input
              type="text"
              value={folderNewName}
              placeholder="Ingrese el nombre..."
              className={`w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white ${
                Error
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              onChange={handleInputChange}
            />
            {Error && <p className="mt-2 text-red-500">{Error}</p>}
          </div>
        </div>
      </ModalDefault>
    </>
  );
};

export default ModalRenombrarItem;
