import { useState } from "react";
import mostrar from "/assets/mostrar.svg";
import { useFetchUsers } from "../../../hooks/useFetchUsers";

const ModalAuditoriaServicio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div onClick={toggleModal}>
        <img src={mostrar} alt="" />
      </div>
      {isOpen && (
        <div className="fixed z-50 flex items-center justify-center w-screen transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <div
            onClick={toggleModal}
            className="fixed inset-0 transition-opacity duration-300 bg-black opacity-40 backdrop-blur-sm"
          ></div>

          {/* Contenido del Formulario */}

          <div className="z-10 w-[1200px] p-10 bg-white rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-lg font-semibold text-color">Servicios</h2>
              <button
                onClick={toggleModal}
                className="text-xl text-gray-500 hover-gray-700"
              >
                &times;
              </button>
            </div>

            {/* Contenido del Formulario */}

            <div className="overflow-x-auto divide-y divide-gray-200 dark:divide-gray-700">
              <table className="w-full text-sm table-auto">
                <thead>
                  <tr>
                    <th className="">Codigo:</th>
                    <th>Descripcion:</th>
                    <th>Estado:</th>
                    <th>Observacion:</th>
                  </tr>
                </thead>
                <tbody className="text-center divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-200">
                  <tr>
                    <td>...texto alusivo</td>
                    <td>...texto alusivo</td>
                    <td>...texto alusivo</td>
                    <td>...texto alusivo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Botones */}

            <div className="flex justify-end mt-6 space-x-3 text-sm">
              <button
                onClick={toggleModal}
                className="px-6 py-3 text-white bg-gray-500 rounded-lg round hover:bg-gray-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAuditoriaServicio;
