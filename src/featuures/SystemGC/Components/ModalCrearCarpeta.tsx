import useAnimation from "@/hooks/useAnimations";
import { useBlockScroll } from "@/hooks/useBlockScroll";
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

  useBlockScroll(standOpen);

  const { showAnimation, closing} = useAnimation(standOpen, () => {
    toggleModal();
  });

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      createNewFolder(folderName);
      toast.success("Carpeta creada correctamente");
      toggleModal();
    } else {
      alert("El nombre de la carpeta es requerido");
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
      {standOpen && (
        <div
        className={`fixed inset-0 z-50 flex items-center justify-center pt-10 pb-10 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
          showAnimation && !closing ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`w-[450px] md:w-[900px] max-w-2xl 2xl:max-w-5xl overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-lg dark:bg-gray-800 ${
            standOpen && !closing
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Header del modal */}
          <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
            <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
              Crear Carpeta
            </h1>
            <button
              onClick={toggleModal}
              // disabled={!videoCompleted || loading || !success}
              className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
            >
              &times;
            </button>
          </div>

              {/* Formulario con dos columnas */}

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

              {/* Botones */}

              <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-gray-200 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
                <button
                  onClick={toggleModal}
                  className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                >
                  Cerrar
                </button>
                <button
                  className="w-20 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-800 dark:hover:bg-gray-600"
                  onClick={handleCreateFolder}
                  disabled={!!Error || !folderName.trim()}
                >
                  Crear
                </button>
              </div>
            </div>
        </div>
      )}
    </>
  );
};

export default ModalCrearCarpeta;
