//*Funciones y Hooks
import React, { useEffect, useState } from "react";
import ServicioForm from "../../ServicioForm";
import useAnimation from "../../../hooks/useAnimations";
import useFetchPaciente from "../../../hooks/useFetchPaciente";
import { useNavigate } from "react-router-dom";
import InputAutocompletado from "../../InputAutocompletado";
import useFetchDiagnostico from "../../../hooks/useFetchDiagnostico";
import { submitRadicado } from "../../../services/submitRadicado";

const ModalRadicacion = () => {
  const [stadopen, setStadopen] = useState(false);

  const navigate = useNavigate();

  {
    /* hook que trae los datos del paciente */
  }
  const { data, error, getData } = useFetchPaciente();

  const { diagnostico, loading, errorDiagnostico, fetchDiagnostico } =
    useFetchDiagnostico();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [submiting, setSubmiting] = useState<boolean>(false);

  const [idIpsRemite, setIdIpsRemite] = useState<string>("");
  const [idEspecialidad, setIdEspecialidad] = useState<string>("");
  const [idGrupoServicios, setIdGrupoServicios] = useState<string>("");
  const [idLugarRadicacion, setIdLugarRa] = useState<string>("");
  const [idTipoServicios, setIdTipoServicios] = useState<string>("");
  const [idPaciente, setIdPaciente] = useState<string>("");
  const [telefonoFijo, setTelefonoFijo] = useState<string>("");
  const [numeroCelular, setNumeroCelular] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nombreProfesional, setNombreProfesional] = useState<string>("");
  const [dateOrden, setDateOrden] = useState<string>("");
  const [soporte, setSoporte] = useState<File | null>(null);

  const handleSoporteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSoporte(e.target.files[0]);
    }
  };

  const user = localStorage.getItem("user");
  const nombreUsuario = user
    ? JSON.parse(user).nombre + " " + JSON.parse(user).apellido
    : "";

  const idUsuario = user ? JSON.parse(user).id : "";

  const [identificacion, setIdentificacion] = useState<string>("");
  const [diagnosicoValue, setDiagnosticoValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [idDiagnostico, setIdDiagnostico] = useState<string>("");
  const [cantidad, setCantidad] = useState<string>("1");
  const [servicios, setServicios] = useState<string[]>([]);
  const [descripciones, setDescripciones] = useState<string[]>([]);

  // * funcion para enviar los datos del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmiting(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("landline", telefonoFijo);
    formData.append("phoneNumber", numeroCelular);
    formData.append("address", direccion);
    formData.append("email", email);
    formData.append("ipsRemitente", idIpsRemite);
    formData.append("specialty", idEspecialidad);
    formData.append("groupServices", idGrupoServicios);
    formData.append("place", idLugarRadicacion);
    formData.append("typeServices", idTipoServicios);
    formData.append("radicador", idUsuario);
    formData.append("profetional", nombreProfesional);
    formData.append("orderDate", dateOrden);
    if (soporte) {
      formData.append("file", soporte);
    }
    formData.append("idDiagnostico", idDiagnostico);
    formData.append("code", servicios.join(","));
    formData.append("DescriptionCode", descripciones.join(","));
    formData.append("idPatient", idPaciente);

    try {
      
      const response = await submitRadicado(formData, idPaciente);



      if (response?.status === 201) {
        setSuccess(true);

        setTimeout(() => {
          setStadopen(false);
        }, 2000);

      }else{
        setErrorMessage("Error al radicar, revise los campos.");
      }

    } catch (error) {
      console.error(error);
    }

    setSubmiting(false);

  };

  useEffect(() => {
    if (data) {
      setTelefonoFijo(data.landline);
      setNumeroCelular(data.phoneNumber);
      setDireccion(data.address);
      setEmail(data.email);
    }
  }, [data]);

  useEffect(() => {
    if (diagnostico) {
      setDescription(diagnostico.map((item) => item.description).join(", "));
      setIdDiagnostico(diagnostico.map((item) => item.id).join(", "));
    }
  }, [diagnostico]);

  useEffect(() => {
    if (data) {
      setIdPaciente(data.id.toString());
    }
  }, [data]);

  // * funcion para traer el id del input autocompletado

  const handleTipoServiciosChange = (id?: string) => {
    setIdTipoServicios(id || "");
  };

  const handleLugarRadicacionChange = ( id?: string) => {
    setIdLugarRa(id || "");
  };

  const { showAnimation, closing } = useAnimation(stadopen, () =>
    setStadopen(false)
  );

  const hableIpsRemiteChange = (id?: string) => {
    setIdIpsRemite(id || "");
  };

  const hableEspecialidadChange = (id?: string) => {
    setIdEspecialidad(id || "");
  };

  const hableGrupoServiciosChange = (id?: string) => {
    setIdGrupoServicios(id || "");
  };

  const handleDiagnosticoKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Tab") {
      if (diagnosicoValue) {
        fetchDiagnostico(diagnosicoValue);
      }
    }
  };

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
    setCantidad(value);
    // reiniciar arrays de servicios y descripciones
    setServicios(Array(Number(value)).fill(""));
    setDescripciones(Array(Number(value)).fill(""));
  };

  const handleServicioChange = (index: number, value: string) => {
    const newServicios = [...servicios];
    newServicios[index] = value;
    setServicios(newServicios);
  };

  const handleDescripcionChange = (index: number, value: string) => {
    const newDescripciones = [...descripciones];
    newDescripciones[index] = value;
    setDescripciones(newDescripciones);
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
              <h1 className="text-xl font-semibold text-color dark:text-gray-200 ">
                Radicación de Servicios
              </h1>
              <button
                onClick={() => setStadopen(false)}
                className="pr-2 text-xl text-gray-500 hover-gray-700"
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

                <section className="grid grid-cols-3 mb-6 text-sm gap-x-10 gap-y-2 ms-2">
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
                        placeholder="Digite número"
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 "
                      />
                    </label>
                  </div>
                  {error && !data && (
                    <div className="text-red-500 dark:text-red-300">
                      {error}
                      <div></div>
                      <button
                        onClick={handleRegisterPaciente}
                        className="text-blue-500 dark:text-blue-300"
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
                            className="w-full px-3 py-2 border border-gray-200 rounded cursor-not-allowed dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
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
                            className="w-full px-3 py-2 border border-gray-200 rounded cursor-not-allowed dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
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
                            className="w-full px-3 py-2 border border-gray-200 rounded cursor-not-allowed dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
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
                            className="w-full px-3 py-2 border border-gray-200 rounded cursor-not-allowed dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                            disabled
                          />
                          {/*sin modificar*/}
                        </label>
                      </div>
                    </>
                  )}
                  <div>
                    <input
                      type="text"
                      value={idPaciente}
                      className="hidden"
                      onChange={(e) => setIdPaciente(e.target.value)}
                    />
                  </div>
                </section>

                <div>
                  <h5 className="mb-2 text-xl font-normal text-blue-500 dark:text-gray-200">
                    Datos Contacto Paciente
                  </h5>
                </div>

                    <section className="grid grid-cols-2 mb-6 text-sm gap-x-40 gap-y-2 ms-2">
                      <div>
                        <label htmlFor="">
                          <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Telefono Fijo
                          </span>
                          <input
                            type="number"
                            id=""
                            name=""
                            onChange={(e) => setTelefonoFijo(e.target.value)}
                            value={telefonoFijo}
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
                            onChange={(e) => setNumeroCelular(e.target.value)}
                            value={numeroCelular}
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
                            onChange={(e) => setDireccion(e.target.value)}
                            value={direccion}
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
                            onChange={(e) => setEmail(e.target.value)}
                            id=""
                            name=""
                            value={email}
                            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                          />
                        </label>
                      </div>
                    </section>

                <div>
                  <h5 className="mb-2 text-xl font-normal text-blue-500 dark:text-gray-200 ">
                    Cups
                  </h5>
                </div>
                {/* el usuario ingresa la cantidad de servicios que desea ingresar */}
                <section className="grid grid-cols-3 mb-6 text-sm border-2 border-transparent gap-x-10 gap-y-0 ps-2">
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
                  <ServicioForm
                    cantidad={cantidad}
                    servicios={servicios}
                    descripciones={descripciones}
                    onServicioChange={handleServicioChange}
                    onDescripcionChange={handleDescripcionChange}
                  />
                </section>

                <div>
                  <h5 className="mb-2 text-xl font-normal text-blue-500 dark:text-gray-200">
                    Información del Servicio a Radicar
                  </h5>
                </div>

                <section className="grid grid-cols-3 mb-6 text-sm gap-x-10 gap-y-2 ps-2">
                  <div>
                    <InputAutocompletado
                      label="IPS Remite"
                      onInputChanged={hableIpsRemiteChange}
                      apiRoute="ips-remite-name"
                    />
                  </div>
                  <div>
                    <InputAutocompletado
                      label="Especialidad"
                      onInputChanged={hableEspecialidadChange}
                      apiRoute="especialidades-name"
                    />
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
                        placeholder="Digite nombre"
                        onChange={(e) => setNombreProfesional(e.target.value)}
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
                        onChange={(e) => setDateOrden(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                      />
                    </label>
                  </div>
                  <div>
                    <InputAutocompletado
                      label="Grupo Servicios"
                      onInputChanged={hableGrupoServiciosChange}
                      apiRoute="grupo-servicios-name"
                    />
                  </div>
                  <div>
                    <InputAutocompletado
                      label="Tipo Servicios"
                      onInputChanged={handleTipoServiciosChange}
                      apiRoute="servicios-name"
                    />
                  </div>
                  <div>
                    <InputAutocompletado
                      label="Lugar Radicacación"
                      onInputChanged={handleLugarRadicacionChange}
                      apiRoute="lugares-radicacion-name"
                    />
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
                        onChange={(e) => setDiagnosticoValue(e.target.value)}
                        onKeyDown={handleDiagnosticoKeyDown}
                        placeholder="Digite código"
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
                        value={description || (loading ? "" : errorDiagnostico || "") }
                        disabled
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                      ></textarea>
                    </label>
                  </div>

                  <div>
                    <label htmlFor="">
                      <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                        Quién Radica
                      </span>
                      <input
                        type="text"
                        id=""
                        name=""
                        value={nombreUsuario}
                        disabled
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                      />
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
                        accept=".pdf"
                        onChange={handleSoporteChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                      />
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={idDiagnostico}
                      className="hidden"
                    />
                  </div>
                </section>
              </div>
            </form>

                  {errorMessage && (
                    <div className="text-red-500 dark:text-red-300">
                      {errorMessage}
                    </div>
                  )}
                  {success && (
                    <div className="text-green-500 dark:text-green-300">
                      Radicado guardado correctamente.
                    </div>
                  )}

            {/* container-footer */}
            <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-medium bg-white h-14 dark:bg-gray-800">
              <button
                onClick={() => setTimeout(closeModal, 250)}
                className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                Cerrar
              </button>
              <button
                disabled={submiting}
                className="w-20 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                onClick={handleSubmit}
              >
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
