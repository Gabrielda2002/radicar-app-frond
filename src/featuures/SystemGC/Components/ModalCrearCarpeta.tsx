import ModalDefault from "@/components/common/Ui/ModalDefault";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";

type ModalCrearCarpetaProps = {
  standOpen: boolean;
  toggleModal: () => void;
  createNewFolder: (name: string) => void;
};

const ModalCrearCarpeta = ({
  standOpen,
  toggleModal,
  createNewFolder,
}: ModalCrearCarpetaProps) => {
  const [Error, setError] = useState("");
  const [folderName, setFolderName] = useState("");

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      createNewFolder(folderName);
      toast.success("Carpeta creada correctamente");
      toggleModal();
    } else {
      setError("El nombre de la carpeta no puede estar vacío");
    }
  };

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
      setFolderName(inputValue);
    },
    []
  );

  return (
    <>
      <ModalDefault
        isOpen={standOpen}
        onClose={toggleModal}
        title="Crear Carpeta"
        funtionClick={handleCreateFolder}
        showSubmitButton={true}
        isSubmitting={false}
        isValid={!Error && folderName.trim() !== ""}
        submitText="Crear"
        cancelText="Cerrar"
        footerVariant="form"
        size="lg"
      >
        <div className="grid grid-cols-1 gap-10 mb-4">
          <div className="p-4">
            <label className="block mb-2 text-lg font-bold text-gray-700 dark:text-gray-200">
              Nombre:
            </label>
            <input
              type="text"
              placeholder="Ingrese el nombre..."
              className={`w-full px-3 py-2 border-2 rounded dark:bg-gray-700 dark:text-white ${
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

export default ModalCrearCarpeta;
