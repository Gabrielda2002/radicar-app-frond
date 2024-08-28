import { useState } from "react";

const ModalRadicacion = () => {
  const [stadopen, setStadopen] = useState(false);
  return (
    <>
      <button
        className="borde-2 w-[90px] h-12 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900  active:bg-emerald-800 "
        onClick={() => setStadopen(true)}
      >
        Radicar
      </button>

      {stadopen && (
        <section className="container-full fixed -inset-2 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center pt-12">
          <section className="">
            <div className="bg-slate-50 w-full rounded-xl overflow-hidden">
              {/* container-header */}
              <div className="border-b-2  bg-slate-50 w-full p-2 ps-4 text-3xl text-color  ">
                Radicacion de Servicios
              </div>

              {/* init form */}
              <form className="flex-1 p-5 max-h-[70Vh] overflow-y-auto">
                <div className="">
                    
                    <div>
                        <h5 className="text-blue-500 text-2xl ">Datos Paciente</h5>
                    </div>

                    <section className="border-2 grid grid-cols-3">{/*gap-4*/}
                        <div>
                            <label htmlFor="" className="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600 ">Tipo Documento</span>
                                <input type="text" id="" name="" className="block border-2 rounded-md m-2 "/>{/*sin modificar*/} 
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600 ">Identificacion</span>
                                <input type="number" id="" name="" className="block border-2 rounded-md m-2"/>                            
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600 ">Nombre Completo</span>
                                <input type="text" id="" name="" className="block border-2 rounded-md m-2"/>{/*sin modificar*/} 
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600 ">Convevio</span>
                                <input type="text" id=" " name="" className="block border-2 rounded-md m-2" />{/*sin modificar*/} 
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600 ">IPS Primaria</span> 
                                <input type="text" id="" name="" className="block border-2 rounded-md m-2"/>{/*sin modificar*/} 
                            </label>
                        </div>
                    </section>

                    <div>
                        <h5 className="text-blue-500 text-2xl">Datos Contacto Paciente</h5>
                    </div>
                    
                    <section className="border-2 grid grid-cols-2 ">
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">Telefono Fijo</span>
                                <input type="number" id="" name="" className="block border-2 rounded-md m-2"/>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">N° Celular</span>
                                <input type="number" id="" name="" className="block border-2 rounded-md m-2"/>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">Dirreción</span>
                                <input type="text" id="" name="" className="block border-2 rounded-md m-2"/>
                            </label> 
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">Email</span>
                                <input type="email" id="" name="" className="block border-2 rounded-md m-2"/>                                
                            </label>
                        </div>
                    </section>

                    <div>
                        <h5 className="text-blue-500 text-2xl">Informacion del Servicio a Radicar</h5>
                    </div>

                    <section className="grid grid-cols-3 border-2">
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">IPS Remite</span>
                                <input type="text"id="" name="" className="block border-2 rounded-md m-2" />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">Especialidad</span>
                                <input type="text"id="" name="" className="block border-2 rounded-md m-2" />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">Profesional Remite</span>
                                <input type="text"id="" name="" className="block border-2 rounded-md m-2" />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">Fecha Orden</span>
                                <input type="date"id="" name="" className="block border-2 rounded-md m-2" />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">Grupo Servicios</span>
                                <input type="text"id="" name="" className="block border-2 rounded-md m-2" />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">N° Radicado</span>
                                <input type="text"id="" name="" className="block border-2 rounded-md m-2" />{/*sin modificar*/}
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">Tipo Servicios</span>
                                <select id="" name="" className="block border-2 rounded-md m-2" >
                                    <option value="">SELECT</option>
                                    <option value="">1</option>
                                    <option value="">2</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">Lugar Radicacion</span>
                                <input type="text"id="" name="" className="block border-2 rounded-md m-2" />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">Diagnostico</span>
                                <input type="text"id="" name="" className="block border-2 rounded-md m-2" />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="" className="disabled:bg-gray-200 disabled:cursor-not-allowed">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">Descripcion Dianostico</span>
                                <textarea id="" name="" className="block border-2 rounded-md m-2 " ></textarea>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">Quien Radica</span>
                                <select id="" name="" className="block border-2 rounded-md m-2" >
                                    <option value="">SELECT</option>
                                    <option value="">..texto</option>
                                    <option value="">..texto</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">
                                <span className="after:content-['*'] after:ml-2 after:text-red-600">Soporte</span>
                                <input type="file"id="" name="" className="block border-2 rounded-md m-2" />
                            </label>
                        </div>
                    </section>
                    
                  
                </div>
              </form>

              {/* container-footer */}
              <div className="border-t-2 bg-slate-50 w-full h-16 flex justify-end items-center px-4 py-4 gap-4 text-xl ">
                <button onClick={() => setStadopen(false)} className="text-blue-400 hover:text-red-500 active:text-red-600 ">Cancelar</button>
                <button className="bg-color hover:bg-emerald-900 active:bg-emerald-950 text-white rounded-md h-12 w-24">Radicar</button>
              </div>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ModalRadicacion;

