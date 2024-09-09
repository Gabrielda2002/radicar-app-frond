//*Funciones y Hooks
import { useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
//*Icons
import programar from "/assets/programar.svg";

const ModalCirugias = () => {
  const [stadopen, setStadopen] = useState(false);
  const { showAnimation, closing } = useAnimation(
    stadopen,
    () => setStadopen(false),
    300
  );

  return (
    <>
      <button className="focus:outline-none" onClick={() => setStadopen(true)}>
        <img className="dark:invert" src={programar} alt="" />
      </button>

      {/* init-modal */}
      {stadopen && (
        <section
          className={` fixed z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 -inset-2 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section>
            <div
              className={` w-auto bg-white shadow-lg transform transition-transform duration-300  dark:bg-gray-800 overflow-hidden rounded ${
                showAnimation && !closing
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* container-header */}
              <div className="flex items-center justify-between px-2 py-2 dark:bg-gray-800">
                <h1 className="text-xl font-semibold text-color dark:text-gray-200  ">
                  Modulo Ciugias
                </h1>
                <button
                  onClick={() => setStadopen(false)}
                  className="text-xl text-gray-500 hover-gray-700 pr-2"
                >
                  &times;
                </button>
              </div>

              {/* init-form */}
              <form
                action=""
                className="max-h-[70Vh] overflow-y-auto dark:bg-gray-800"
              >
                <div className="px-5">
                  <div>
                    <h5 className="flex mb-2 text-xl font-normal text-blue-500 dark:text-gray-200">
                      Información Usuario
                    </h5>
                  </div>

                  <section className="grid grid-cols-2 mb-6 gap-x-20 gap-y-4 ms-2 text-sm">
                    <div className="">
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white">
                          Documento
                        </span>
                        <input
                          type="number"
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700 dark:text-white">
                          Nombre Completo
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 cursor-not-allowed"
                          disabled
                        />
                      </label>
                    </div>
                  </section>

                  <div>
                    <h5 className="flex mb-2 text-xl font-normal text-blue-500 dark:text-gray-200">
                      Información Cirugía
                    </h5>
                  </div>

                  <section className="grid grid-cols-2 mb-6 gap-x-20 gap-y-4 ms-2 text-sm">
                    <div className="">
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700 dark:text-white after:content-['*'] after:ml-2 after:text-red-600 ">
                          Fecha Ordenamiento de Cirugía
                        </span>
                        <input
                          type="date"
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className=" flex mb-2 font-bold text-gray-700 dark:text-white after:content-['*'] after:ml-2 after:text-red-600 ">
                          Fecha Paraclínicos
                        </span>
                        <input
                          type="date"
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className=" flex mb-2 font-bold text-gray-700 dark:text-white after:content-['*'] after:ml-2 after:text-red-600 ">
                          Fecha de Valoración Anestesiologia
                        </span>
                        <input
                          type="date"
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className=" flex mb-2 font-bold text-gray-700 dark:text-white after:content-['*'] after:ml-2 after:text-red-600 ">
                          IPS donde se realizará Cirugía
                        </span>
                        <select
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        >
                          <option value="">SELECT</option>
                          <option value="1">CUCUTA</option>
                          <option value="2">CAJICA</option>
                        </select>
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className=" flex mb-2 font-bold text-gray-700 dark:text-white after:content-['*'] after:ml-2 after:text-red-600 ">
                          Fecha Cirugía
                        </span>
                        <input
                          type="date"
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className=" flex mb-2 font-bold text-gray-700 dark:text-white after:content-['*'] after:ml-2 after:text-red-600 ">
                          Hora Programada
                        </span>
                        <input
                          type="date"
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                      </label>
                    </div>
                  </section>

                  <div>
                    <h5 className="flex mb-2 text-xl font-normal text-blue-500 dark:text-gray-200">
                      Observaciones
                    </h5>
                  </div>

                  <section className="flex justify-center text-sm">
                    <div className="">
                      <label htmlFor="">
                        <span className="flex justify-center mb-2 font-bold text-gray-700 dark:text-white after:content-['*'] after:ml-2 after:text-red-600 ">
                          Observación
                        </span>
                        <textarea
                          name=""
                          id=""
                          className="block w-[500px] h-28 px-3 pt-2 mb-4 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        ></textarea>
                      </label>
                    </div>
                  </section>
                </div>
              </form>

              {/* container-footer */}
              <div className="flex items-center justify-end w-full px-4 py-4 text-sm font-semibold bg-white gap-x-2 h-14 dark:bg-gray-800">
                <button
                  className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200  dark:hover:bg-gray-700"
                  onClick={() => setStadopen(false)}
                >
                  Cerrar
                </button>
                <button className="w-20 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover-gray-600  dark:hover:bg-gray-700">
                  Agregar
                </button>
              </div>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ModalCirugias;
