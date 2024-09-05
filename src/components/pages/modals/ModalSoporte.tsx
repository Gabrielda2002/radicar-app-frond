import { useState } from "react";

import soporte from "/assets/soporte.svg";

const ModalSoporte = () => {
  const [stadOpen, setStadOpen] = useState(false);

  return (
    <>
      <button className="focus:outline-none" onClick={() => setStadOpen(true)}>
        <img className="dark:invert" src={soporte} alt="" />
      </button>

      {stadOpen && (
        <section className="fixed inset-0 z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm">
          <section className="">
            <div className="w-full overflow-hidden transition-transform duration-300 transform bg-white rounded shadow-lg dark:bg-gray-800 ">
              {/* container-header */}
              <div className="flex w-full py-4 text-xl font-semibold bg-white ps-4 text-color dark:text-gray-200 dark:bg-gray-800 ">
                Modulo Soporte
              </div>

              {/* init form */}
              <form
                action=""
                className="max-h-[70Vh] overflow-y-auto overflow-x-hidden flex dark:bg-gray-800 dark:text-gray-200"
              >
                <div className="p-8">{/* ! ajustar haci informacion ! */}
                  <section className="grid h-[600px] w-[600px]">

                  </section>
                </div>
              </form>

              {/* container-footer */}
              <div className="flex items-center justify-end w-full  px-4 py-4 text-sm font-semibold bg-white h-14 dark:bg-gray-800">
                <button
                  className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                  onClick={() => setStadOpen(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ModalSoporte;
