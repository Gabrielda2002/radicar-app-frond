import { useState } from "react";

import onOff from "/assets/on-off.svg";

const ModalAction = (props: any) => {
  const [stadopen, setStadopen] = useState(false);

  return (
    <>
      <button className="" onClick={() => setStadopen(true)}>
        <img src={onOff} alt="" />
      </button>

      {/* init event modal */}
      {stadopen && (
        <section className="fixed z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 inset-0 backdrop-blur-sm">
          <section className="">
            <div className="w-full bg-white shadow-lg transform transition-transform duration-300 overflow-hidden rounded">
              {/* container-header */}
              <div className="w-full flex py-4 ps-4 text-xl font-semibold bg-white text-color dark:text-gray-200 dark:bg-gray-900 ">
                Modulo Estado
              </div>

              {/* init form */}
              <form
                action=""
                className="max-h-[70Vh] overflow-y-auto flex"
              >
                <div className="p-8">
                  <section className=" grid grid-cols-2 gap-x-16">
                    <div className="">
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-200">ID {props.nom}</span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="w-full px-3 p-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                          disabled
                        />
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200 dark:bg-gray-700">
                          Estado
                        </span>
                        <select
                          id=""
                          name=""
                          className="w-full px-3 py-2 p-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-700"
                        >
                          <option value="">- SELECT -</option>
                          <option value="1">Activo</option>
                          <option value="2">Inactivo</option>
                        </select>
                      </label>
                    </div>
                  </section>
                </div>
              </form>

              {/* container-footer */}
              <div className="flex  items-center justify-end w-full h-14 gap-4 px-4 py-4 text-sm font-semibold  bg-white dark:bg-gray-800">
                <button
                  className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800"
                  onClick={() => setStadopen(false)}
                >
                  Cancelar
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

export default ModalAction;
