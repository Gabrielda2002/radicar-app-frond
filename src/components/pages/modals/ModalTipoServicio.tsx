//*Funciones y Hooks
import { useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
const ModalTipoServicio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { showAnimation, closing } = useAnimation(isOpen, () =>
    setIsOpen(false)
  );

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="border-2 w-[200px] h-10 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900 active:bg-emerald-800"
      >
        Agregar Tipo Servicio
      </button>
      {isOpen && (
        <div className="fixed z-50 flex pt-16 justify-center transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <section>
            <div
              onClick={toggleModal}
              className="fixed inset-0 transition-opacity duration-300 bg-black opacity-40 backdrop-blur-sm"
            ></div>

            {/* Contenido del Formulario */}

            <div
              className={`z-10 w-[900px]  bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800  ${
                showAnimation && !closing
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center justify-between  px-2 py-2 dark:bg-gray-800 ">
                <h1 className="text-xl font-semibold text-color dark:text-gray-200 ">
                  Agregar Tipo Servicio
                </h1>
                <button
                  onClick={toggleModal}
                  className="text-xl text-gray-500 hover-gray-700 pr-2"
                >
                  &times;
                </button>
              </div>

              {/* Contenido del Formulario */}

              <div className="grid grid-cols-1 gap-10 mb-4">
                <div className="p-4">
                  <label className="block mb-2 font-bold text-gray-7000 dark:text-gray-200">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese Nombre Tipo Servicio..."
                    className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Botones */}

              <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-white h-14 dark:bg-gray-800">
                <button
                  onClick={toggleModal}
                  className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                >
                  Cerrar
                </button>
                <button className="w-20 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600">
                  Agregar
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ModalTipoServicio;
