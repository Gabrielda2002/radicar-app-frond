//*Funciones y Hooks
import React, { useEffect, useState } from "react";
import ServicioForm from "../../ServicioForm";
import useAnimation from "../../../hooks/useAnimations";
import useFetchPaciente from "../../../hooks/useFetchPaciente";
import { useNavigate } from "react-router-dom";
import InputAutocompletado from "../../InputAutocompletado";
import useFetchDiagnostico from "../../../hooks/useFetchDiagnostico";
import { submitRadicado } from "../../../services/submitRadicado";
import * as Yup from "yup";
import { useFormik } from "formik";

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

  const user = localStorage.getItem("user");
  const nombreUsuario = user
    ? JSON.parse(user).nombre + " " + JSON.parse(user).apellido
    : "";

  const idUsuario = user ? JSON.parse(user).id : "";

  const [identificacion, setIdentificacion] = useState<string>("");
  const [diagnosicoValue, setDiagnosticoValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // const [idDiagnostico, setIdDiagnostico] = useState<string>("");
  const [cantidad, setCantidad] = useState<string>("1");
  const [servicios, setServicios] = useState<string[]>([]);
  const [descripciones, setDescripciones] = useState<string[]>([]);

  // * usar formik y yup para validar los campos
  const validationSchema = Yup.object({
    telefonoFijo: Yup.string()
      .required("Campo requerido")
      .min(1, "El número debe tener al menos 1 caracteres.")
      .max(20, "El número debe tener máximo 10 caracteres."),
    numeroCelular: Yup.string()
      .required("Campo requerido")
      .min(1, "El número debe tener al menos 10 caracteres.")
      .max(15, "El número debe tener máximo 10 caracteres."),
    direccion: Yup.string().required("Campo requerido"),
    email: Yup.string().email("Email inválido").required("Campo requerido"),
    idIpsRemite: Yup.string().required("Campo requerido"),
    idEspecialidad: Yup.string().required("Campo requerido"),
    idGrupoServicios: Yup.string().required("Campo requerido"),
    idLugarRadicacion: Yup.string().required("Campo requerido"),
    idTipoServicios: Yup.string().required("Campo requerido"),
    nombreProfesional: Yup.string()
      .required("Campo requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres.")
      .max(100, "El nombre debe tener máximo 100 caracteres."),
    dateOrden: Yup.string().required("Campo requerido"),
    soporte: Yup.mixed().required("Campo requerido")
  });

  const formik = useFormik({
    initialValues: {
      telefonoFijo: "",
      numeroCelular: "",
      direccion: "",
      email: "",
      idIpsRemite: "",
      idEspecialidad: "",
      idGrupoServicios: "",
      idLugarRadicacion: "",
      idTipoServicios: "",
      nombreProfesional: "",
      dateOrden: "",
      idDiagnostico: "",
      descripcionDiagnostico: "",
      codigoDiagnostico: "",
      idPaciente: "",
      soporte: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);

    setSubmiting(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("landline", values.telefonoFijo);
    formData.append("phoneNumber", values.numeroCelular);
    formData.append("address", values.direccion);
    formData.append("email", values.email);
    formData.append("ipsRemitente", values.idIpsRemite);
    formData.append("specialty", values.idEspecialidad);
    formData.append("groupServices", values.idGrupoServicios);
    formData.append("place", values.idLugarRadicacion);
    formData.append("typeServices", values.idTipoServicios);
    formData.append("radicador", idUsuario);
    formData.append("profetional", values.nombreProfesional);
    formData.append("orderDate", values.dateOrden);
    if (values.soporte) {
      formData.append("file", values.soporte);
    }
    formData.append("idDiagnostico", values.idDiagnostico);
    formData.append("code", servicios.join(","));
    formData.append("DescriptionCode", descripciones.join(","));
    formData.append("idPatient", values.idPaciente);

    try {
      const response = await submitRadicado(formData, values.idPaciente);

      if (response?.status === 201) {
        setSuccess(true);

        setTimeout(() => {
          setStadopen(false);
          window.location.reload();
        }, 2000);
      } else {
        setErrorMessage("Error al radicar, revise los campos.");
      }
    } catch (error) {
      console.error(error);
    }

    setSubmiting(false);

    },
  });

  // * efecto para llenar los campos del formulario con los datos del paciente cada que data cambie
  useEffect(() => {
    if (data) {
      formik.setFieldValue("telefonoFijo", data.landline);
      formik.setFieldValue("numeroCelular", data.phoneNumber);
      formik.setFieldValue("direccion", data.address);
      formik.setFieldValue("email", data.email);
    }
  }, [data]);

  useEffect(() => {
    if (diagnostico) {
      formik.setFieldValue("idDiagnostico", diagnostico.map((item) => item.id).join(", "));
      setDescription(diagnostico.map((item) => item.description).join(", "));
      // formik.setFieldValue("servicios", diagnostico.map((item) => item.id).join(", "));      
    }
  }, [diagnostico]);

  useEffect(() => {
    if (data) {
      formik.setFieldValue("idPaciente", data.id.toString());
      // setIdPaciente(data.id.toString());
    }
  }, [data]);

  const { showAnimation, closing } = useAnimation(stadopen, () =>
    setStadopen(false)
  );

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
        className="border-2 w-[80px] h-10 rounded-md focus:outline-none bg-color text-white hover:bg-teal-800  active:bg-teal-900 "
        onClick={() => setStadopen(true)}
      >
        Radicar
      </button>
      {stadopen && (
        <div
          className={`fixed z-50 flex pt-16 justify-center bg-black -inset-5 bg-opacity-40 transition-opacity duration-300 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section>
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
              <form
                onSubmit={formik.handleSubmit}
                className="dark:bg-gray-800"
              >
                <div className="px-5 max-h-[70Vh] overflow-y-auto">
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
                        value={formik.values.idPaciente}
                        className="hidden"
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
                          name="telefonoFijo"
                          onChange={formik.handleChange}
                          value={formik.values.telefonoFijo}
                          onBlur={formik.handleBlur}
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                        {formik.touched.telefonoFijo &&
                        formik.errors.telefonoFijo ? (
                          <div className="text-red-500 dark:text-red-300">
                            {formik.errors.telefonoFijo}
                          </div>
                        ) : null}
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
                          onChange={formik.handleChange}
                          value={formik.values.numeroCelular}
                          name="numeroCelular"
                          onBlur={formik.handleBlur}  
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                        {
                          formik.touched.numeroCelular &&
                          formik.errors.numeroCelular ? (
                            <div className="text-red-500 dark:text-red-300">
                              {formik.errors.numeroCelular}
                            </div>
                          ) : null
                        }
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
                          name="direccion"
                          onChange={formik.handleChange}
                          value={formik.values.direccion}
                          onBlur={formik.handleBlur}
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                        {
                          formik.touched.direccion &&
                          formik.errors.direccion ? (
                            <div className="text-red-500 dark:text-red-300">
                              {formik.errors.direccion}
                            </div>
                          ) : null
                        }
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Email
                        </span>
                        <input
                          type="email"
                          onChange={formik.handleChange}
                          id=""
                          name="email"
                          value={formik.values.email}
                          onBlur={formik.handleBlur}
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                        {
                          formik.touched.email &&
                          formik.errors.email ? (
                            <div className="text-red-500 dark:text-red-300">
                              {formik.errors.email}
                            </div>
                          ) : null  
                        }
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
                        onInputChanged={(value) =>
                          formik.setFieldValue("idIpsRemite", value)
                        }
                        apiRoute="ips-remite-name"
                      />
                      {formik.touched.idIpsRemite &&
                      formik.errors.idIpsRemite ? (
                        <div className="text-red-500 dark:text-red-300">
                          {formik.errors.idIpsRemite}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <InputAutocompletado
                        label="Especialidad"
                        onInputChanged={(value) =>
                          formik.setFieldValue("idEspecialidad", value)
                        }
                        apiRoute="especialidades-name"
                      />
                      {formik.touched.idEspecialidad &&
                      formik.errors.idEspecialidad ? (
                        <div className="text-red-500 dark:text-red-300">
                          {formik.errors.idEspecialidad}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className=" block mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Profesional Remite
                        </span>
                        <input
                          type="text"
                          id=""
                          name="nombreProfesional"
                          placeholder="Digite nombre"
                          onChange={formik.handleChange}
                          value={formik.values.nombreProfesional}
                          onBlur={formik.handleBlur}
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                        {
                          formik.touched.nombreProfesional &&
                          formik.errors.nombreProfesional ? (
                            <div className="text-red-500 dark:text-red-300">
                              {formik.errors.nombreProfesional}
                            </div>
                          ) : null
                        }
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
                          name="dateOrden"
                          onChange={formik.handleChange}
                          value={formik.values.dateOrden}
                          onBlur={formik.handleBlur}
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                        {
                          formik.touched.dateOrden &&
                          formik.errors.dateOrden ? (
                            <div className="text-red-500 dark:text-red-300">
                              {formik.errors.dateOrden}
                            </div>
                          ) : null
                        }
                      </label>
                    </div>
                    <div>
                      <InputAutocompletado
                        label="Grupo Servicios"
                        onInputChanged={(value) =>
                          formik.setFieldValue(
                            "idGrupoServicios",
                            value
                          )
                        }
                        apiRoute="grupo-servicios-name"
                      />
                      {formik.touched.idGrupoServicios &&
                      formik.errors.idGrupoServicios ? (
                        <div className="text-red-500 dark:text-red-300">
                          {formik.errors.idGrupoServicios}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <InputAutocompletado
                        label="Tipo Servicios"
                        onInputChanged={(value) =>
                          formik.setFieldValue("idTipoServicios", value)
                        }
                        apiRoute="servicios-name"
                      />
                      {
                        formik.touched.idTipoServicios &&
                        formik.errors.idTipoServicios ? (
                          <div className="text-red-500 dark:text-red-300">
                            {formik.errors.idTipoServicios}
                          </div>
                        ) : null
                      }
                    </div>
                    <div>
                      <InputAutocompletado
                        label="Lugar Radicacación"
                        onInputChanged={(value) =>
                          formik.setFieldValue("idLugarRadicacion", value)
                        }
                        apiRoute="lugares-radicacion-name"
                      />
                      {formik.touched.idLugarRadicacion &&
                      formik.errors.idLugarRadicacion ? (
                        <div className="text-red-500 dark:text-red-300">
                          {formik.errors.idLugarRadicacion}
                        </div>
                      ) : null}
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
                        <span className=" block mb-2 font-bold text-gray-700 dark:text-gray-200">
                          Descripción Diagnóstico
                        </span>
                        <textarea
                          id=""
                          name=""
                          value={
                            description ||
                            (loading ? "" : errorDiagnostico || "")
                          }
                          disabled
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 cursor-not-allowed"
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
                          name="soporte"
                          accept=".pdf"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              formik.setFieldValue("soporte", e.target.files[0]); // Asignar el archivo seleccionado a Formik
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                        {
                          formik.touched.soporte &&
                          formik.errors.soporte ? (
                            <div className="text-red-500 dark:text-red-300">
                              {formik.errors.soporte}
                            </div>
                          ) : null
                        }
                      </label>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={formik.values.idDiagnostico}
                        className="hidden"
                      />
                    </div>
                  </section>
                </div>

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
                    type="submit"
                    className="w-20 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                  >
                    {submiting ? "Enviando..." : "Radicar"}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ModalRadicacion;
