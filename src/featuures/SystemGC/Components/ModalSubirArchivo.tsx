// ModalSubirArchivo.tsx
import React, { useCallback, useState } from "react";
import upload from "/assets/upload.svg";
import { toast } from "react-toastify";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import useAnimation from "@/hooks/useAnimations";

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

  useBlockScroll(stadopen);

  const { showAnimation, closing } = useAnimation(stadopen, () => {
    toggleModal();
  });

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

  const handleUpload = () => {
    onUpload();
    toast.success("Archivos cargados con éxito");
  };

  return (
    <>
      {stadopen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center pt-10 pb-10 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`w-[450px] md:w-[900px] max-w-2xl 2xl:max-w-5xl overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-lg dark:bg-gray-800 ${
              stadopen && !closing
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Header del modal */}
            <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
              <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
                Subir Archivos
              </h1>
              <button
                onClick={toggleModal}
                // disabled={!videoCompleted || loading || !success}
                className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 gap-10 mb-4">
              <div className="p-4">
                <label className="block mb-2 text-lg font-bold text-gray-700 dark:text-gray-200">
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
            </div>

            <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-gray-200 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
              <button
                onClick={toggleModal}
                className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
              >
                Cerrar
              </button>
              <button
                className="w-20 h-10 text-white duration-200 border-2 rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-800 dark:hover:bg-gray-600"
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
