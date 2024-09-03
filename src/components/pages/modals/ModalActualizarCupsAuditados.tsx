import { useState } from "react";

import editar from "/assets/editar.svg";

const ModalActualizarCupsAuditoria = () => {
  const [stadopen, setStadopen] = useState(false);

  return (
    <>
      <button className="" onClick={() => setStadopen(true)}>
        <img src={editar} alt="icon-editar" />
      </button>

      {/* init-event-modal */}
      {stadopen && (
        <section className="fixed inset-0 z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm">
          <section className="">
            <div className="w-full overflow-hidden transition-transform duration-300 transform bg-white rounded shadow-lg container-modal bg dark:bg-gray-800">
              {/* container-header */}
              <div className="flex w-full py-4 text-xl font-semibold bg-white ps-4 text-color dark:text-gray-200 dark:bg-gray-900">
                Actualizar CUPS Auditados
              </div>

              {/* init-form */}
              <form action="" className="max-h-[70Vh] overflow-y-auto ">
                <div className="p-8">
                  <section className="grid grid-cols-3 gap-x-16 ">
                    <div>
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700 dark:text-gray-200">
                          Descripción CUP
                        </span>
                        <textarea
                          id=""
                          name=""
                          className="w-full p-2 px-3 border border-gray-200 rounded dark-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        ></textarea>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700  after:content-['*'] after:text-red-600 after:ml-2 dark:text-gray-200 ">
                          Estado CUP
                        </span>
                        <select
                          id=""
                          name=""
                          className="w-full p-2 px-3 border border-gray-200 rounded dark-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        >
                          <option value=""></option>
                          <option value="1">Activo</option>
                          <option value="2">..?..</option>
                          <option value="3">Inactivo</option>
                        </select>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700  after:content-['*'] after:text-red-600 after:ml-2 dark:text-gray-200">
                          Observación hecha anteriormente
                        </span>
                        <textarea
                          id=""
                          name=""
                          className="w-full p-2 px-3 border border-gray-200 rounded dark-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        ></textarea>
                      </label>
                    </div>
                  </section>
                </div>
              </form>

              {/* container-footer */}
              <div className="flex items-center justify-end w-full gap-1 px-4 py-4 text-sm font-semibold bg-white h-14 dark:bg-gray-800">
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

export default ModalActualizarCupsAuditoria;
