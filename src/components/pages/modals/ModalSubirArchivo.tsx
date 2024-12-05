// ModalSubirArchivo.tsx
import React, { useCallback, useState } from "react";
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

  // * Se crea logica para evitar el desplazamiento del scroll dentro del modal
  // * Se implementa eventos del DOM para distribucion en demas propiedades anteiormente establecidas
  const openModal = () => {
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    document.body.style.overflow = "";
    toggleModal();
  };
  if (stadopen) {
    openModal();
  }

  return (
    <>
      {stadopen && (
        <div className="fixed z-50 flex justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <section>
            <div
              className="fixed inset-0 transition-opacity duration-300 bg-black opacity-50 backdrop-blur-sm "
              onClick={openModal}
            ></div>

            <div className="z-10 w-[800px] bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800">
              <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
                <h1 className="text-2xl font-semibold text-color dark:text-gray-200 ">
                  Subir Archivo
                </h1>
                <button
                  onClick={closeModal}
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
                  onClick={closeModal}
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
          </section>
        </div>
      )}
    </>
  );
};

export default ModalSubirArchivo;
