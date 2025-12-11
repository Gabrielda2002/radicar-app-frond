// ModalSubirArchivo.tsx
import React, { useCallback, useState } from "react";
import upload from "/assets/upload.svg";
import { toast } from "react-toastify";
import ModalDefault from "@/components/common/Ui/ModalDefault";
import Input from "@/components/common/Ui/Input";
import { FileUploaderProps } from "../Types/IFileManager";
import useFileManagerStore from "../Store/FileManagerStore";
import { AnimatePresence } from "framer-motion";
import { useUploadFile } from "../Hooks/useUploadFile";

const ModalSubirArchivo: React.FC<FileUploaderProps> = ({
  stadopen,
  toggleModal,
}) => {

  const { error, isLoading, uploadNewFile, path } = useFileManagerStore();
  const currentFolderId = path[path.length - 1].id;

    const { uploading, handleFileChange: onFileChange, handleUpload } = useUploadFile(
    uploadNewFile,
    currentFolderId,
    toggleModal
  );

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const allowedExtensions = /(\.pdf|\.doc|\.docx|\.xls|\.xlsx)$/i;
        const filesArray = Array.from(e.target.files);

        const validFiles = filesArray.filter((file) =>
          allowedExtensions.test(file.name)
        );
        const invalidFiles = filesArray.filter(
          (file) => !allowedExtensions.test(file.name)
        );

        if (invalidFiles.length > 0) {
          toast.error(
            `Los siguientes archivos no son válidos: ${invalidFiles
              .map((file) => file.name)
              .join(", ")}`
          );
        }

        if (validFiles.length > 0) {
          setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);

          const dataTransfer = new DataTransfer();
          validFiles.forEach((file) => dataTransfer.items.add(file));

          const newEvent = {
            ...e,
            target: {
              ...e.target,
              files: dataTransfer.files,
            },
          };

          onFileChange(newEvent as React.ChangeEvent<HTMLInputElement>);
        }
      }
    },
    [onFileChange]
  );

  const handleRemoveFile = (name: string) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== name)
    );
  };

  return (
    <>
      <ModalDefault
        isOpen={stadopen}
        onClose={toggleModal}
        title="Subir Archivos"
        funtionClick={handleUpload}
        showSubmitButton={true}
        isSubmitting={uploading || isLoading}
        isValid={selectedFiles.length > 0}
        submitText="Subir"
        cancelText="Cerrar"
        footerVariant="form"
        size="lg"
      >
        <div className="grid grid-cols-1 gap-10 mb-4">
          <div className="p-4">
            <Input
              label="Seleccione archivos"
              type="file"
              id="files"
              className="hidden"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.xls,.xlsx"
            />
            <div
              className="flex items-center justify-between duration-200 rounded cursor-pointer hover:bg-blue-400 active:bg-blue-500 dark:hover:bg-gray-600 dark:active:bg-gray-700 group outline outline-1 outline-gray-300 "
              onClick={() => document.getElementById("files")?.click()}
            >
              <button className="px-2 py-4 text-sm font-semibold text-gray-800 dark:text-gray-300 hover:text-gray-200 ">
                Seleccionar Archivos
              </button>
              <img
                src={upload}
                alt="Upload Icon"
                className="w-8 h-8 mx-3 mr-4 dark:invert group-hover:invert "
              />
            </div>

            {selectedFiles.length > 0 && (
              <ul className="mt-4 space-y-2">
                {selectedFiles.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-100 rounded-md dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <span className="w-full text-sm font-medium text-gray-700 truncate dark:text-gray-300">
                      {file.name}
                    </span>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveFile(file.name)}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
            <AnimatePresence>
                {error && (
                  <div>
                    <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                      {error}
                    </div>
                  </div>
                )}
              </AnimatePresence>
        </div>
      </ModalDefault>
    </>
  );
};

export default ModalSubirArchivo;
