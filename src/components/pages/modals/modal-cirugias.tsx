import { useState } from "react";

import programar from "/assets/programar.svg";

const ModalCirugias = () => {
  const [stadopen, setStadopen] = useState(false);

  return (
    <>
      <button className="" onClick={() => setStadopen(true)}>
        <img src={programar} alt="" />
      </button>

      {/* init-modal */}
      {stadopen && (
        <section className="fixed z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 -inset-2 backdrop-blur-sm">
          <section>
            <div className=" w-[700px] bg-white shadow-lg transform transition-transform duration-300  dark:bg-gray-900 overflow-hidden rounded">
              {/* container-header */}
              <div className="flex w-full py-4 text-xl font-semibold bg-white ps-4 text-color dark:text-gray-200 dark:bg-gray-900 rounded">
                Modulo Ciugias
              </div>

              {/* init-form */}
              <form action="" className="max-h-[70Vh] overflow-y-auto ">
                <div className="px-5">
                  <div>
                    <h5 className="flex text-xl font-normal mb-2 text-blue-500 dark:text-gray-200">
                      Información Usuario
                    </h5>
                  </div>

                  <section className="grid grid-cols-2 gap-x-20 gap-y-4 mb-6 ms-2">
                    <div className="">
                      <label htmlFor="">
                        <span className=" mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white dark:bg-gray-700">
                          Documento
                        </span>
                        <input
                          type="number"
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className=" mb-2 font-bold text-gray-700  dark:text-white dark:bg-gray-700">
                          Nombre Completo
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                          disabled
                        />
                      </label>
                    </div>
                  </section>

                  <div>
                    <h5 className="flex text-xl font-normal mb-2 text-blue-500 dark:text-gray-200">
                      Información Cirugía
                    </h5>
                  </div>

                  <section className="grid grid-cols-2 gap-x-20 gap-y-4 mb-6 ms-2">
                    <div className="">
                      <label htmlFor="">
                        <span className="pb-4 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white dark:bg-gray-700">
                          Fecha Ordenamiento de Cirugía
                        </span>
                        <input
                          type="date"
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className=" mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white dark:bg-gray-700">
                          Fecha Paraclínicos
                        </span>
                        <input
                          type="date"
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className=" mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white dark:bg-gray-700">
                          Fecha de Valoración Anestesiologia
                        </span>
                        <input
                          type="date"
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className=" mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white dark:bg-gray-700">
                          IPS donde se realizará Cirugía
                        </span>
                        <select
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        >
                          <option value="">SELECT</option>
                          <option value="1">CUCUTA</option>
                          <option value="2">CAJICA</option>
                        </select>
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className=" mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white dark:bg-gray-700">
                          Fecha Cirugía
                        </span>
                        <input
                          type="date"
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className=" mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white dark:bg-gray-700">
                          Hora Programada
                        </span>
                        <input
                          type="date"
                          id=""
                          name=""
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                  </section>

                  <div>
                    <h5 className="flex text-xl font-normal mb-2 text-blue-500 dark:text-gray-200">
                      Observaciones
                    </h5>
                  </div>

                  <section className="flex justify-center">
                    <div className="">
                      <label htmlFor="">
                        <span className=" mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white dark:bg-gray-700">
                          Observación
                        </span>
                        <textarea
                          name=""
                          id=""
                          className="block w-[500px] h-28 px-3  mb-4 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        ></textarea>
                      </label>
                    </div>
                  </section>
                </div>
              </form>

              {/* container-footer */}
              <div className="flex items-center justify-end w-full h-14 gap-4 px-4 py-4 text-lg font-semibold bg-white dark:bg-gray-800">
                <button
                  className="w-24 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-600"
                  onClick={() => setStadopen(false)}
                >
                  Cancelar
                </button>
                <button className="w-24 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover-gray-600">
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
