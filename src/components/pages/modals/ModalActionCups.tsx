import { useState } from "react";

import onOff from "/assets/on-off.svg";

const ModalActionCups = () => {
  const [stadopen, setStadopen] = useState(false);

  return (
    <>
      <button className="" onClick={() => setStadopen(true)}>
        <img className="dark:invert" src={onOff} alt="" />
      </button>

      {/* init event modal */}
      {stadopen && (
        <section className="fixed inset-0 z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm">
          <section className="">
            <div className="w-full overflow-hidden transition-transform duration-300 transform bg-white rounded shadow-lg  dark:bg-gray-800 ">
              {/* container-header */}
              <div className="flex w-full py-4 text-xl font-semibold bg-white ps-4 text-color dark:text-gray-200 dark:bg-gray-800 ">
                Modulo Estado
              </div>

              {/* init form */}
              <form action="" className="max-h-[70Vh] overflow-y-auto flex dark:bg-gray-800 dark:text-gray-200">
                <div className="p-4">
                  <section className="grid grid-cols-3">
                    <div className="flex">
                      <label htmlFor="" className="p-x-2">
                        <span className="flex mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                          ID Cups
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="w-[200px] p-2 px-3 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 cursor-not-allowed"
                          disabled
                        />
                      </label>
                    </div>
                    <div className="flex">
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Estado
                        </span>
                        <select
                          id=""
                          name=""
                          className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                        >
                          <option value="">- SELECT -</option>
                          <option value="1">Activo</option>
                          <option value="2">Inactivo</option>
                        </select>
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                          Nombre Cups
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="w-[250px] p-2 px-3 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                      </label>
                    </div>
                  </section>
                </div>
              </form>

              {/* container-footer */}
              <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-white h-14 dark:bg-gray-800">
                <button
                  className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                  onClick={() => setStadopen(false)}
                >
                  Cerrar
                </button>
                <button className="w-20 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600">
                  Actualizar
                </button>
              </div>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ModalActionCups;
