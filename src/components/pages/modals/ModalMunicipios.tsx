import { useEffect, useState } from "react";

const ModalMunicipios = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isOpen) {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 1000);
    }
    [isOpen];
  });

  return (
    <>
      <button
        onClick={toggleModal}
        className="border-2 w-[150px] h-10 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900 active:bg-emerald-800"
      >
        Agregar Municipios
      </button>
      {isOpen && (
        <div className="fixed z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <div
            onClick={toggleModal}
            className="fixed inset-0 transition-opacity duration-300 bg-black opacity-40 backdrop-blur-sm"
          ></div>

          {/* Contenido del formulario */}

          <div className="z-10 w-[900px] p-10 bg-white rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800">
            <div className="flex justify-between mb-10 items center">
              <h2 className="text-lg font-semibold text-color">
                Agregar Municipios
              </h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            {/* Contenido del Fomrulario */}

            <div className="grid grid-cols-2 gap-10 mb-10">
              <div>
                <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                  Nombre Municipio
                </label>
                <input
                  type="text"
                  placeholder="Ingrese Municipio"
                  className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                <label className="block mb-2 font-bold text-gray700 dark:text-gray-200">
                  NIT Municipios
                </label>
                <input
                  type="number"
                  placeholder="Ingrese NIT..."
                  className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            {/* Botones */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-slate-600"
              >
                Cerrar
              </button>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 ">
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalMunicipios;
