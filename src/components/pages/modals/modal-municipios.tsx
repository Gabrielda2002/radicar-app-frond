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
            
            <div className="">

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalMunicipios;
