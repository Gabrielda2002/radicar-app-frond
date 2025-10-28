import Input from "@/components/common/Ui/Input";
import ModalDefault from "@/components/common/Ui/ModalDefault";
import React, { useState, useCallback } from "react";
import { ModalCrearCarpetaProps } from "../Types/IFileManager";

const ModalCrearCarpeta: React.FC<ModalCrearCarpetaProps> = ({
  standOpen,
  toggleModal,
  createNewFolder,
}) => {
  const [error, setError] = useState("");
  const [folderName, setFolderName] = useState("");

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      createNewFolder(folderName);
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
            {error && <p className="mt-2 text-red-500">{error}</p>}
          </div>
        </div>
      </ModalDefault>
    </>
  );
};

export default ModalCrearCarpeta;
