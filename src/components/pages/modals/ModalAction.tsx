//*Funciones y Hooks
import { useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
//*Icons
import onOff from "/assets/on-off.svg";

const ModalAction = (props: any) => {
  const [stadopen, setStadopen] = useState(false);
  const { showAnimation, closing } = useAnimation(
    stadopen,
    () => setStadopen(false),
    300
  );

  return (
    <>
      <button className="focus:outline-none" onClick={() => setStadopen(true)}>
        <img className="dark:invert " src={onOff} alt="" />
      </button>

      {/* init event modal */}
      {stadopen && (
        <section
          className={`fixed inset-0 z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section className="">
            <div
              className={`w-full overflow-hidden transition-transform duration-300 transform bg-white rounded shadow-lg dark:bg-gray-800 ${
                showAnimation && !closing ? "translate-y-0" : "translate-y-10"
              }`}
            >
              {/* container-header */}
              <div className="flex items-center justify-between  px-2 py-2  ">
                <h1 className="text-xl font-semibold text-color dark:text-gray-200">
                  Módulo Estado
                </h1>
                <button
                  onClick={() => setStadopen(false)}
                  className="text-xl text-gray-500 hover:text-gray-700 pr-2"
                >
                  &times;
                </button>
              </div>

              {/* init form */}
              <form
                action=""
                className="max-h-[70Vh] overflow-y-auto flex dark:bg-gray-800 dark:text-gray-200"
              >
                <div className="p-4 ">
                  <section className="grid grid-cols-2 gap-x-16 ">
                    <div className="">
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                          ID {props.nom}
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="w-full p-2 px-3 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 cursor-not-allowed"
                          disabled
                        />
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Estado
                        </span>
                        <select
                          id=""
                          name=""
                          className="w-full p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
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

export default ModalAction;
