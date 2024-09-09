//*Funciones y Hooks
import { useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
const ModalCups = () => {
  const [stadopen, setStadopen] = useState(false);
  const { showAnimation, closing } = useAnimation(stadopen, () =>
    setStadopen(false)
  );

  const toggleModal = () => {
    setStadopen(!stadopen);
  };
  // Se agrega useEffect para controlar la animación de la ventana emergente

  return (
    <>
      <button
        className="border-2 w-[120px] h-10 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 "
        onClick={() => setStadopen(true)}
      >
        Agregar Cups
      </button>

      {stadopen && (
        <div
          className={`fixed z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="fixed inset-0 transition-opacity duration-300 bg-black opacity-50 backdrop-blur-sm "
            onClick={toggleModal}
          ></div>

          {/* Contenido del formulario */}

          <div
            className={`z-10 w-[800px] p-6 bg-white rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800 ${
              showAnimation && !closing ? "translate-y-0" : "translate-y-10"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-color">Agregar CUPS</h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            {/* formulario con dos columnas */}

            <div className="grid grid-cols-2 gap-10 mb-4">
              <div>
                <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                  Codigo
                </label>
                <input
                  type="number"
                  placeholder="Ingrese codigo..."
                  className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                  Descripcion
                </label>
                <input
                  type="text"
                  placeholder="Ingrese Descripcion"
                  className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
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
              <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-800">
                Subir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCups;
