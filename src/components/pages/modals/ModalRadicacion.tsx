//*Funciones y Hooks
import { useState } from "react";
import ServicioForm from "../../ServicioForm";
import useAnimation from "../../../hooks/useAnimations";
import useFetchPaciente from "../../../hooks/useFetchPaciente";
import { Navigate, useNavigate } from "react-router-dom";

const ModalRadicacion = () => {
  const [stadopen, setStadopen] = useState(false);

  const navigate = useNavigate();


  const { data, loading, error, getData } = useFetchPaciente();
  const [identificacion, setIdentificacion] = useState<string>("");

  const { showAnimation, closing } = useAnimation(stadopen, () =>
    setStadopen(false)
  );
  const [cantidad, setCantidad] = useState<string>("");

  const handleBlur = () => {
    if (identificacion) {
      getData(identificacion);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      if (identificacion) {
        getData(identificacion);
      }
    }
  };
  
  
  const handleRegisterPaciente = () => {
      navigate("/tabla-pacientes");
    };

  const closeModal = () => {
    setStadopen(false);
  };
  const CantidadInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCantidad(value === "" ? "" : Number(value).toString());
  };

  const EventEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <button
        className="border-2 w-[80px] h-10 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800"
        onClick={() => setStadopen(true)}
      >
        Radicar
      </button>
      {stadopen && (
        <div
          className={`fixed z-50 flex items-center justify-center bg-black -inset-5 bg-opacity-40 transition-opacity duration-300 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`w-[900px] bg-white overflow-hidden rounded shadow-lg  transform transition-transform duration-300 dark:bg-gray-800 ${
              stadopen && !closing
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* container-header */}
            <div className="flex items-center justify-between px-2 py-2 dark:bg-gray-800">
              <h1 className="text-xl font-semibold text-color dark:text-gray-200  ">
                Radicación de Servicios
              </h1>
              <button
                onClick={() => setStadopen(false)}
                className="text-xl text-gray-500 hover-gray-700 pr-2"
              >
                &times;
              </button>
            </div>

            {/* init form */}
            <form className="flex max-h-[70Vh] overflow-y-auto  dark:bg-gray-800">
              <div className="px-5">
                <div>
                  <h5 className="mb-2 text-xl font-normal text-blue-500 dark:text-gray-200">
                    Datos Paciente
                  </h5>
                </div>

                <section className="grid grid-cols-3 mb-6 gap-x-10 gap-y-2 ms-2 text-sm">
                  <div>
                    <label htmlFor="">
                      <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                        Identificación
                      </span>
                      <input
                        type="text"
                        id="identificacion"
                        name="identificacion"
                        value={identificacion}
                        onChange={(e) => setIdentificacion(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 "
                      />
                    </label>
                  </div>

                  {/* { loading && <p className="text-gray-700 dark:text-gray-200">Cargando...</p>} */}

                  {error && !data && (
                    <div className="text-red-500 dark:text-red-300" >
                      {error}
                      <button
                        onClick={handleRegisterPaciente}
                      >
                        Registrar Paciente
                      </button>
                    </div>
                  )}

                  {data && (
                    <>
                      <div>
                        <label htmlFor="" className="">
                          <span className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                            Tipo Documento
                          </span>
                          <input
                            type="text"
                            id=""
                            value={data.documentRelation.name}
                            name=""
                            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 cursor-not-allowed"
                            disabled
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                            Nombre Completo
                          </span>
                          <input
                            type="text"
                            id=""
                            name=""
                            value={data.name}
                            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 cursor-not-allowed"
                            disabled
                          />
                          {/*sin modificar*/}
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                            Convevio
                          </span>
                          <input
                            type="text"
                            value={data.convenioRelation.name}
                            id=" "
                            name=""
                            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 cursor-not-allowed"
                            disabled
                          />
                          {/*sin modificar*/}
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                            IPS Primaria
                          </span>
                          <input
                            type="text"
                            id=""
                            name=""
                            value={data.ipsPrimariaRelation.name}
                            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 cursor-not-allowed"
                            disabled
                          />
                          {/*sin modificar*/}
                        </label>
                      </div>
                    </>
                  )}
                </section>

                {data && (
                  <>
                    <div>
                      <h5 className="mb-2 text-xl font-normal text-blue-500 dark:text-gray-200">
                        Datos Contacto Paciente
                      </h5>
                    </div>

                    <section className="grid grid-cols-2 mb-6 gap-x-40 gap-y-2 ms-2 text-sm">
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Telefono Fijo
                          </span>
                          <input
                            type="number"
                            id=""
                            name=""
                            value={data.landline}
                            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
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
                            value={data.phoneNumber}
                            name=""
                            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
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
                            value={data.address}
                            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
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
                            value={data.email}
                            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                          />
                        </label>
                      </div>
                    </section>
                  </>
                )}

                <div>
                  <h5 className="mb-2 text-xl font-normal text-blue-500 dark:text-gray-200 ">
                    Cups
                  </h5>
                </div>

                <section className="grid grid-cols-3 mb-6 border-2 border-transparent gap-x-10 gap-y-0 ps-2 text-sm">
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
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        placeholder="Digite número . . . ."
                      />
                    </label>
                  </div>
                  <ServicioForm cantidad={cantidad} />
                </section>

                <div>
                  <h5 className="mb-2 text-xl font-normal text-blue-500 dark:text-gray-200">
                    Información del Servicio a Radicar
                  </h5>
                </div>

                <section className="grid grid-cols-3 mb-6 gap-x-10 gap-y-2 ps-2 text-sm">
                  <div>
                    <label htmlFor="">
                      <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                        IPS Remite
                      </span>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
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
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
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
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
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
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
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
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="">
                      <span className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                        N° Radicado
                      </span>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 cursor-not-allowed"
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
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
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
                        Lugar Radicación
                      </span>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="">
                      <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                        Diagnóstico
                      </span>
                      <input
                        type="text"
                        id=""
                        name=""
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="disabled:bg-gray-200 disabled:cursor-not-allowed"
                    >
                      <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                        Descripción Diagnóstico
                      </span>
                      <textarea
                        id=""
                        name=""
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                      ></textarea>
                    </label>
                  </div>
                  <div>
                    <label htmlFor="">
                      <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                        Quién Radica
                      </span>
                      <select
                        id=""
                        name=""
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
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
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                      />
                    </label>
                  </div>
                </section>
              </div>
            </form>

            {/* container-footer */}
            <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-medium bg-white h-14 dark:bg-gray-800">
              <button
                onClick={() => setTimeout(closeModal, 250)}
                className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                Cerrar
              </button>
              <button className="w-20 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600">
                Radicar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalRadicacion;
