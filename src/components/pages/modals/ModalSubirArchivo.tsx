// ModalSubirArchivo.js
import  { useEffect, useState } from "react";
import upload from "/assets/upload.svg";


const ModalSubirArchivo = ({ standOpen, toggleModal}) => {


  const [showAnimation, setShowAnimation] = useState(false);

  // Se agrega useEffect para controlar la animación de la ventana emergente

  useEffect(() => {
    if (standOpen) {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 800);
    }
  }, [standOpen]);



  return (
    <>
      {standOpen && (
        <div className="fixed z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <div
            className="fixed inset-0 transition-opacity duration-300 bg-black opacity-50 backdrop-blur-sm "
            onClick={toggleModal}
          ></div>

          {/* Contenido del formulario */}

          <div className="z-10 w-[800px] p-6 bg-white rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800">
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

            {/* formulario con dos columnas */}

            <div className="grid grid-cols-1 gap-10 mb-4">
              <div>
                <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                  Archivos *:
                </label>
                <input
                  type="file"
                  id="files"
                  className="hidden"
                />
                <button
                  className="py-2 px-4 rounded shadow hover:bg-blue-500"
                  onClick={() => document.getElementById("files")?.click()}
                >
                  <img src={upload} alt="Upload Icon" className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Botones */}

            <div className="flex justify-end space-x-3">
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Cerrar
              </button>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-800"
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

export default ModalSubirArchivo;
