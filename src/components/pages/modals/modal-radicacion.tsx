import { useState } from "react";

const ModalRadicacion = () => {
  const [stadopen, setStadopen] = useState(false);

  return (
    <>
      <button
        className="borde-2 w-[90px] h-12 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800"
        onClick={() => setStadopen(true)}
      >
        Radicar
      </button>

      {stadopen && (
        <section className="fixed flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 container-full -inset-2 backdrop-blur-sm">
          <section className="">
            <div className="w-full overflow-hidden bg-slate-50 dark:bg-gray-900 rounded">
              {/* container-header */}
              <div className="w-full p-2 text-3xl border-b-2 bg-slate-50 ps-4 text-color dark:text-gray-200 dark:bg-gray-900">
                Radicacion de Servicios
              </div>

              {/* init form */}
              <form className="flex-1 p-5 max-h-[70Vh] overflow-y-auto">
                <div className="">
                  <div>
                    <h5 className="text-2xl text-blue-500 dark:text-gray-200">
                      Datos Paciente
                    </h5>
                  </div>

                  <section className="grid grid-cols-3">
                    {/*gap-4*/}
                    <div>
                      <label htmlFor="" className="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Tipo Documento
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                          disabled
                        />
                        {/*sin modificar*/}
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Identificacion
                        </span>
                        <input
                          type="number"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Nombre Completo
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                          disabled
                        />
                        {/*sin modificar*/}
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Convevio
                        </span>
                        <input
                          type="text"
                          id=" "
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                        {/*sin modificar*/}
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          IPS Primaria
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                          disabled
                        />
                        {/*sin modificar*/}
                      </label>
                    </div>
                  </section>

                  <div>
                    <h5 className="text-2xl text-blue-500 dark:text-gray-200">
                      Datos Contacto Paciente
                    </h5>
                  </div>

                  <section className="grid grid-cols-2">
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Telefono Fijo
                        </span>
                        <input
                          type="number"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          N° Celular
                        </span>
                        <input
                          type="number"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Dirreción
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Email
                        </span>
                        <input
                          type="email"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                  </section>

                  <div>
                    <h5 className="text-2xl text-blue-500 dark:text-gray-200 pb-2">Cups</h5>
                  </div>

                  <section className="grid grid-cols-3 border-2 border-transparent">
                    <div>
                        <label htmlFor="">
                            <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">Cantidad de Servicios Solicitados</span>
                            <input type="text" id="" name="" className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700" />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="">
                            <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">Servicio Solicitado</span>
                            <input type="" id="" name="" className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700" />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="">
                            <span className=" dark:text-gray-200">Descripcion Servicio</span>
                            <textarea  id="" name="" className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700" ></textarea>
                        </label>
                    </div>
                  </section>

                  <div>
                    <h5 className="text-2xl text-blue-500 dark:text-gray-200">
                      Informacion del Servicio a Radicar
                    </h5>
                  </div>

                  <section className="grid grid-cols-3">
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          IPS Remite
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Especialidad
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Profesional Remite
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Fecha Orden
                        </span>
                        <input
                          type="date"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Grupo Servicios
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          N° Radicado
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                          disabled
                        />
                        {/*sin modificar*/}
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Tipo Servicios
                        </span>
                        <select
                          id=""
                          name=""
                          className="block p-1 px-6 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        >
                          <option value="">SELECT</option>
                          <option value="">1</option>
                          <option value="">2</option>
                        </select>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Lugar Radicacion
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Diagnostico
                        </span>
                        <input
                          type="text"
                          id=""
                          name=""
                          className="block p-1 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="disabled:bg-gray-200 disabled:cursor-not-allowed"
                      >
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Descripcion Dianostico
                        </span>
                        <textarea
                          id=""
                          name=""
                          className="block p-4 px-20 m-2 border-2 rounded-mddark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 "
                        ></textarea>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Quien Radica
                        </span>
                        <select
                          id=""
                          name=""
                          className="block p-1 px-8 m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        >
                          <option value="">SELECT</option>
                          <option value="">..texto</option>
                          <option value="">..texto</option>
                        </select>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Soporte
                        </span>
                        <input
                          type="file"
                          id=""
                          name=""
                          className="block m-2 border-2 rounded-md dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        />
                      </label>
                    </div>
                  </section>
                </div>
              </form>

              {/* container-footer */}
              <div className="flex items-center justify-end w-full h-16 gap-4 px-4 py-4 text-xl border-t-2 bg-slate-50 dark:bg-gray-800">
                <button
                  onClick={() => setStadopen(false)}
                  className="w-24 h-12 text-blue-400 rounded-md hover:text-red-500 active:text-red-600 dark:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button className="w-24 h-12 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600">
                  Radicar
                </button>
              </div>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ModalRadicacion;
