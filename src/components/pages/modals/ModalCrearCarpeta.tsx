import { useState } from "react";
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
      alert("El nombre de la carpeta es requerido");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setFolderName(inputValue);
  };

  return (
    <>
      {standOpen && (
        <div className="fixed z-50 flex justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <section>
            <div
              className="fixed inset-0 transition-opacity duration-300 bg-black opacity-50 backdrop-blur-sm "
              onClick={toggleModal}
            ></div>

            {/* Contenido del formulario */}

            <div className="z-10 w-[800px] bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800">
              <div className="flex items-center justify-between p-3 dark:bg-gray-800 ">
                <h1 className="text-2xl font-semibold text-color dark:text-gray-200 ">
                  Crear Carpeta
                </h1>
                <button
                  onClick={toggleModal}
                  className="text-xl text-gray-500 duration-200 rounded-md w-7 h-7 hover:bg-gray-300 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>

              {/* formulario con dos columnas */}

              <div className="grid grid-cols-1 gap-10 mb-4">
                <div className="p-4">
                  <label className="block mb-2 text-lg font-bold text-gray-700 dark:text-gray-200">
                    Nombre :
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

              <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-white h-14 dark:bg-gray-800">
                <button
                  onClick={toggleModal}
                  className="w-20 h-10 text-blue-400 duration-200 border-2 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                >
                  Cerrar
                </button>
                <button
                  className="w-20 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                  onClick={handleCreateFolder}
                  disabled={!!Error || !folderName.trim()}
                >
                  Crear
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ModalCrearCarpeta;
