import Input from "@/components/common/Ui/Input";
import ModalDefault from "@/components/common/Ui/ModalDefault";
import React, { useState, useCallback } from "react";
import { ModalCrearCarpetaProps } from "../Types/IFileManager";
import useFileManagerStore from "../Store/FileManagerStore";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const ModalCrearCarpeta: React.FC<ModalCrearCarpetaProps> = ({
  standOpen,
  toggleModal,
}) => {

  const { createNewFolder, error: errorFromStore, isLoading } = useFileManagerStore();

  const [error, setError] = useState("");
  const [folderName, setFolderName] = useState("");

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      createNewFolder(folderName,() => {
        toggleModal();
        setFolderName("");
        toast.success("Carpeta creada con éxito!");
      });
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
        isSubmitting={isLoading}
        isValid={!error && folderName.trim() !== ""}
        submitText="Crear"
        cancelText="Cerrar"
        footerVariant="form"
        size="lg"
      >
        <div className="grid grid-cols-1 gap-10 mb-4">
          <div className="p-4">
            <Input
              type="text"
              label="Nombre de la Carpeta"
              placeholder="Ingrese el nombre..."
              onChange={handleInputChange}
              error={error ? error : undefined}
              value={folderName}
              required
              helpText="Tener en cuenta: la carpeta se creará en el departamento en que el este tu usuario."
            />
          </div>
            <AnimatePresence>
                {error || errorFromStore && (
                  <div>
                    <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                      {error || errorFromStore}
                    </div>
                  </div>
                )}
              </AnimatePresence>
        </div>
      </ModalDefault>
    </>
  );
};

export default ModalCrearCarpeta;
