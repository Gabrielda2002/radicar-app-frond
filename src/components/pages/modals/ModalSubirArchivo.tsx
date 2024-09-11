// ModalSubirArchivo.tsx
import React, { useState } from "react";
import upload from "/assets/upload.svg";
import { toast } from "react-toastify";

interface FileUploaderProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  uploading: boolean;
  stadopen: boolean;
  toggleModal: () => void;
}

const ModalSubirArchivo: React.FC<FileUploaderProps> = ({
  stadopen,
  toggleModal,
  onFileChange,
  uploading,
  onUpload,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleRemoveFile = (name: string) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== name)
    );
  };

  const handleUpload = () => {
    onUpload();
    toast.success("Archivos cargados con éxito");
  };

  return (
    <>
      {stadopen && (
        <div className="fixed z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <div
            className="fixed inset-0 transition-opacity duration-300 bg-black opacity-50 backdrop-blur-sm "
            onClick={toggleModal}
          ></div>

          <div className="z-10 w-[800px] p-4 bg-white rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-color">
                Subir Archivo
              </h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 gap-10 mb-4">
              <div>
                <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                  Archivos :
                </label>
                <input
                  type="file"
                  id="files"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                />
                <div
                  className="flex items-center justify-between rounded cursor-pointer hover:bg-blue-400 active:bg-blue-500 dark:hover:bg-gray-600 dark:active:bg-gray-700 group  outline outline-1 outline-gray-300 "
                  onClick={() => document.getElementById("files")?.click()}
                >
                  <button className="px-2 py-4 text-sm font-semibold text-gray-800 dark:text-gray-300 hover:text-gray-200 ">
                    Seleccionar Archivos
                  </button>
                    <img
                      src={upload}
                      alt="Upload Icon"
                      className="mr-4 w-8 h-8 mx-3 dark:invert group-hover:invert "
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
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Cerrar
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-800"
                disabled={uploading}
                onClick={handleUpload}
              >
                {uploading ? "Subiendo..." : "Subir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalSubirArchivo;
