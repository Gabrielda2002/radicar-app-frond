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
        <section className="fixed flex justify-center  pt-12 bg-black bg-opacity-50 inset-0 backdrop-blur-sm">
          <section className="">
            <div className="w-full bg-slate-50 overflow-hidden rounded-xl">
              {/* container-header */}
              <div className="w-full flex p-2 text-3xl border-b-2 bg-slate-50 ps-4 text-color">
                Modulo Estado
              </div>

              {/* init form */}
              <form
                action=""
                className=" p-5 max-h-[70Vh] overflow-y-auto flex"
              >
                <div className="">
                  <section className=" grid grid-cols-2 gap-16">
                    <div className="">
                      <label htmlFor="">
                        <span className="flex pb-2">ID {props.nom}</span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className=" block p-1 border-2 rounded-md text-stone-700"
                        />
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className="flex pb-2 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Estado
                        </span>
                        <select
                          id=""
                          name=""
                          className=" block p-1 border-2 rounded-md text-stone-700 w-40"
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
              <div className="flex  items-center justify-end w-full h-16 gap-4 p-4 text-xl border-t-2 bg-slate-50">
                <button
                  className="w-24 h-12 text-blue-400 rounded-md hover:text-red-500 active:text-red-600"
                  onClick={() => setStadopen(false)}
                >
                  Cancelar
                </button>
                <button className="w-24 h-12 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950">
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
