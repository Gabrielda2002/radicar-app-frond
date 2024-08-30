import { useState } from "react";
import ServicioForm from "../../servicio-form-radicacion";

const ModalRadicacion = () => {
  const [stadopen, setStadopen] = useState(false);
  const [cantidad, setCantidad] = useState<string>('');

    const CantidadInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCantidad(value === '' ? '' : Number(value).toString());   
    };

    const EventEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    };

    return (
      <>
        <button
          className="borde-2 w-[90px] h-12 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800"
          onClick={() => setStadopen(true)}
        >
          Radicar
        </button>

        {stadopen && (
          <section className="fixed z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 container-full -inset-2 backdrop-blur-sm">
            <section className="">
              <div className="z-10 w-[950px]  overflow-hidden bg-white shadow-lg transform transition-transform duration-300 dark:bg-gray-900 rounded">
                {/* container-header */}
                <div className="w-full py-4 text-xl font-semibold bg-white ps-4 text-color dark:text-gray-200 dark:bg-gray-900">
                  Radicacion de Servicios
                </div>

                {/* init form */}
                <form className="flex max-h-[70Vh] overflow-y-auto">
                  <div className="px-5">
                    <div>
                      <h5 className="text-xl font-normal mb-2 text-blue-500 dark:text-gray-200">
                        Datos Paciente
                      </h5>
                    </div>

                    <section className="grid grid-cols-3 gap-x-10 gap-y-2 mb-6 ms-2">
                      {/*gap-4*/}
                      <div>
                        <label htmlFor="" className="">
                          <span className="block mb-2 font-bold text-gray-700  dark:text-gray-200">
                            Tipo Documento
                          </span>
                          <input
                            type="text"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                            disabled
                          />
                          {/*sin modificar*/}
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Identificacion
                          </span>
                          <input
                            type="number"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-700"
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700  dark:text-gray-200">
                            Nombre Completo
                          </span>
                          <input
                            type="text"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-700"
                            disabled
                          />
                          {/*sin modificar*/}
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700  dark:text-gray-200">
                            Convevio
                          </span>
                          <input
                            type="text"
                            id=" "
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-700"
                            disabled
                          />
                          {/*sin modificar*/}
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700  dark:text-gray-200">
                            IPS Primaria
                          </span>
                          <input
                            type="text"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                            disabled
                          />
                          {/*sin modificar*/}
                        </label>
                      </div>
                    </section>

                    <div>
                      <h5 className="text-xl font-normal mb-2 text-blue-500 dark:text-gray-200">
                        Datos Contacto Paciente
                      </h5>
                    </div>

                    <section className="grid grid-cols-2 gap-x-40 gap-y-2 mb-6 ms-2">
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Telefono Fijo
                          </span>
                          <input
                            type="number"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            N° Celular
                          </span>
                          <input
                            type="number"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-700"
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Dirreción
                          </span>
                          <input
                            type="text"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-700"
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Email
                          </span>
                          <input
                            type="email"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-700"
                          />
                        </label>
                      </div>
                    </section>

                    <div>
                      <h5 className="text-xl font-normal mb-2 text-blue-500 dark:text-gray-200 ">
                        Cups
                      </h5>
                    </div>

                    <section className="grid grid-cols-3 gap-x-10 gap-y-0 mb-6 ps-2 border-2 border-transparent">
                      <div>
                        <label htmlFor="cantidad">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Cantidad de Servicios Solicitados
                          </span>
                          <input
                            type="text"
                            id="cantidad"
                            name="cantidad"
                            maxLength={1}
                            value={cantidad}
                            onChange={CantidadInput}
                            onKeyDown={EventEnter}
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-700"
                          />
                        </label>
                      </div>
                        <ServicioForm cantidad={cantidad} />
                    </section>

                    <div>
                      <h5 className="text-xl font-normal mb-2 text-blue-500 dark:text-gray-200">
                        Informacion del Servicio a Radicar
                      </h5>
                    </div>

                    <section className="grid grid-cols-3 gap-x-10 gap-y-2 mb-6 ps-2">
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            IPS Remite
                          </span>
                          <input
                            type="text"
                            id=""
                            name=""
                            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700y-700"
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Especialidad
                          </span>
                          <input
                            type="text"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-700"
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Profesional Remite
                          </span>
                          <input
                            type="text"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-700"
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Fecha Orden
                          </span>
                          <input
                            type="date"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-700"
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Grupo Servicios
                          </span>
                          <input
                            type="text"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-700"
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700  dark:text-gray-200">
                            N° Radicado
                          </span>
                          <input
                            type="text"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-700"
                            disabled
                          />
                          {/*sin modificar*/}
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Tipo Servicios
                          </span>
                          <select
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-gray-700"
                          >
                            <option value="">SELECT</option>
                            <option value="">1</option>
                            <option value="">2</option>
                          </select>
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Lugar Radicacion
                          </span>
                          <input
                            type="text"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-700"
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Diagnostico
                          </span>
                          <input
                            type="text"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-700"
                          />
                        </label>
                      </div>
                      <div>
                        <label
                          htmlFor=""
                          className="disabled:bg-gray-200 disabled:cursor-not-allowed"
                        >
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Descripcion Dianostico
                          </span>
                          <textarea
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-gray-700 "
                          ></textarea>
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Quien Radica
                          </span>
                          <select
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700-gray-700"
                          >
                            <option value="">SELECT</option>
                            <option value="">..texto</option>
                            <option value="">..texto</option>
                          </select>
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className="block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Soporte
                          </span>
                          <input
                            type="file"
                            id=""
                            name=""
                            className=" w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                          />
                        </label>
                      </div>
                    </section>
                  </div>
                </form>

                {/* container-footer */}
                <div className="flex items-center justify-end w-full h-14 gap-4 px-4 py-4 text-lg font-medium  bg-white dark:bg-gray-800">
                  <button
                    onClick={() => setStadopen(false)}
                    className="w-24 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                  <button className="w-24 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600">
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
