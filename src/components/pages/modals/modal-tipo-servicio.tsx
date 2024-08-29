import { useEffect, useState } from "react";

const ModalTipoServicio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setShowAnimation(true);
    } else {
      setShowAnimation(false);
      setTimeout(() => {
        setShowAnimation(false);
      }, 300);
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleModal}
        className="border-2 w-[200px] h-10 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900 active:bg-emerald-800"
      >
        Agregar Tipo Servicio
      </button>
      {isOpen && (
        <div className="fixed z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <div
            onClick={toggleModal}
            className="fixed inset-0 transition-opacity duration-300 bg-black opacity-40 backdrop-blur-sm"
          ></div>

          {/* Contenido del Formulario */}

          <div className="z-10 w-[900px] p-10 bg-white rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-lg font-semibold text-color">
                Agregar Tipo Servicio
              </h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover-gray-700"
              >
                &times;
              </button>
            </div>

            {/* Contenido del Formulario */}

            <div className="grid grid-cols-1 gap-10 mb-10">
              <div>
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

            <div className="flex justify-end space-x-3">
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-white bg-gray-500 rounded-lg round hover:bg-gray-600"
              >
                Cerrar
              </button>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTipoServicio;
