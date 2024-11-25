//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import ServicioForm from "../../GenerarInputsCUPS";
import React, { useEffect, useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
import InputAutocompletado from "../../InputAutocompletado";
import useFetchDiagnostico from "../../../hooks/useFetchDiagnostico";
import { submitRadicado } from "../../../services/submitRadicado";
import { useFetchPaciente } from "../../../hooks/useFetchPaciente";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../ErrorMessageModals";
import { AnimatePresence } from "framer-motion";

//*Icons
import id from "/assets/id.svg";
import phone from "/assets/phone.svg";
import email from "/assets/email.svg";
import adress from "/assets/adress.svg";
import telephone from "/assets/telephone.svg";

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

  const items = servicios.map((servicio, index) => ({
    code: servicio,
    description: descripciones[index],
  }))

  // * usar formik y yup para validar los campos
  const validationSchema = Yup.object({
    telefonoFijo: Yup.string()
      .required("Campo requerido")
      .min(1, "El número debe tener al menos 1 caracteres.")
      .max(10, "El número debe tener máximo 10 caracteres."),
    numeroCelular: Yup.string()
      .required("Campo requerido")
      .min(1, "El número debe tener al menos 10 caracteres.")
      .max(10, "El número debe tener máximo 10 caracteres."),
    numeroCelular2: Yup.string()
      .optional()
      .min(1, "El número debe tener al menos 10 caracteres.")
      .max(10, "El número debe tener máximo 10 caracteres."),
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
    soporte: Yup.mixed().required("Campo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      telefonoFijo: "",
      numeroCelular: "",
      numeroCelular2: "",
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
      // console.log(values);


      // ? validar que cantidad no este vacia y sea mayor a 0 
      if (!cantidad || parseInt(cantidad) <= 0) {
        setErrorMessage("La cantidad de servicios solicitados no puede estar vacía.");
        return;
      }

      // ! validar si la cantidad de cups ingresados es igual a la cantidad de pares de inputs que solicito el usuario
      // ! tambien se valida que no haya campos vacios
      let errorCups = "";
      if (servicios.length !== parseInt(cantidad)) {
        errorCups =
          "La cantidad de códigos de CUPS no coincide con la cantidad especificada.";
      } else if (descripciones.length !== parseInt(cantidad)) {
        errorCups =
          "La cantidad de descripciones de CUPS no coincide con la cantidad especificada.";
      } else {
        for (let i = 0; i < parseInt(cantidad); i++) {
          if (!servicios[i]) {
            errorCups = `Falta el código del CUPS N° ${i + 1}.`;
            break;
          }
          if (!descripciones[i]) {
            errorCups = `Falta la descripción del CUPS N° ${i + 1}.`;
            break;
          }
        }
      }

      if (errorCups) {
        setErrorMessage(errorCups);
        return;
      }
      setSubmiting(true);
      setSuccess(false);

      const formData = new FormData();
      formData.append("landline", values.telefonoFijo);
      formData.append("phoneNumber", values.numeroCelular);
      formData.append("phoneNumber2", values.numeroCelular2);
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
      formData.append("items", JSON.stringify(items));
      // formData.append("code", servicios.join(","));
      // formData.append("DescriptionCode", descripciones.join(","));


      formData.append("idPatient", values.idPaciente);

      try {
        const response = await submitRadicado(formData, values.idPaciente);

        if (response?.status === 201 || response?.status === 200) {
          setSuccess(true);
          setErrorMessage(null);
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

  // console.log(formik.values);

  // * efecto para llenar los campos del formulario con los datos del paciente cada que data cambie
  useEffect(() => {
    if (data) {
      formik.setFieldValue("telefonoFijo", data.landline);
      formik.setFieldValue("numeroCelular", data.phoneNumber);
      formik.setFieldValue("numeroCelular2", data.phoneNumber2 || "");
      formik.setFieldValue("direccion", data.address);
      formik.setFieldValue("email", data.email);
    }
  }, [data]);

  useEffect(() => {
    if (diagnostico) {
      formik.setFieldValue(
        "idDiagnostico",
        diagnostico.map((item) => item.id).join(", ")
      );
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

  // ? redirigir al usuario a la tabla de pacientes para registrar un nuevo paciente
  const handleRegisterPaciente = () => {
    navigate("/tabla-pacientes", { state: { openModal: true } });
  };

  const closeModal = () => {
    setStadopen(false);
  };

  // ? validar que la cantidad de servicios sea un número entero mayor a 0
  const CantidadInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[1-9]\d*$/.test(value) || value === "") {
      setCantidad(value);
    }
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
        type="button"
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
              <div className="flex items-center justify-between px-2 py-2 bg-gray-100 border-b-2 border-black dark:border-white dark:bg-gray-600">
                <h1 className="p-3 text-2xl font-semibold text-color dark:text-gray-200">
                  Radicación de Servicios
                </h1>
                <button
                  type="button"
                  onClick={() => setStadopen(false)}
                  className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
                >
                  &times;
                </button>
              </div>

              {/* init form */}
              <form onSubmit={formik.handleSubmit} className="dark:bg-gray-800">
                <div className="px-5 max-h-[70Vh] overflow-y-auto">
                  <div>
                    <h5 className="p-2 mt-2 mb-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
                      Datos Paciente:
                    </h5>
                  </div>

                  <section className="grid grid-cols-2 mb-6 text-sm gap-x-10 gap-y-2 ms-2">
                    <div>
                      <label htmlFor="">
                        <div className="flex mb-2">
                          <img
                            src={id}
                            alt=""
                            className="mr-2 w-7 h-7 dark:invert"
                          />
                          <span className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Identificación
                          </span>
                        </div>
                        <input
                          type="text"
                          id="identificacion"
                          name="identificacion"
                          value={identificacion}
                          onChange={(e) => setIdentificacion(e.target.value)}
                          onKeyDown={handleKeyDown}
                          onBlur={handleBlur}
                          placeholder="Digite número"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                      </label>
                    </div>
                    {error && !data && (
                      <div className="text-red-500 dark:text-red-300">
                        {error}
                        <div></div>
                        <button
                          type="button"
                          className="text-blue-500 dark:text-blue-300"
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
                    <h5 className="p-2 mt-12 mb-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
                      Datos Contacto Paciente:
                    </h5>
                  </div>

                  <section className="grid grid-cols-2 mb-6 text-sm gap-x-10 gap-y-2 ms-2">
                    <div className="mb-4">
                      <label htmlFor="">
                        <div className="flex mb-2">
                          <img
                            src={telephone}
                            alt=""
                            className="mr-2 h-7 w-7 dark:invert"
                          />
                          <span className="flex text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200 items-center">
                            Telefono Fijo
                          </span>
                        </div>
                        <input
                          type="number"
                          id=""
                          name="telefonoFijo"
                          placeholder="Ingrese teléfono..."
                          onChange={formik.handleChange}
                          value={formik.values.telefonoFijo}
                          onBlur={formik.handleBlur}
                          className={` w-full px-3 py-2 border-2 border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 ${
                            formik.touched.telefonoFijo &&
                            formik.errors.telefonoFijo
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        />
                        <AnimatePresence>
                          {formik.touched.telefonoFijo &&
                          formik.errors.telefonoFijo ? (
                            <ErrorMessage>
                              {formik.errors.telefonoFijo}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <div className="flex mb-2">
                          <img
                            src={phone}
                            alt=""
                            className="mr-2 w-7 h-7 dark:invert"
                          />
                          <span className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            N° Celular
                          </span>
                        </div>
                        <input
                          type="number"
                          id=""
                          placeholder="Ingrese número de celular..."
                          onChange={formik.handleChange}
                          value={formik.values.numeroCelular}
                          name="numeroCelular"
                          onBlur={formik.handleBlur}
                          className={` ${
                            formik.touched.numeroCelular &&
                            formik.errors.numeroCelular
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } w-full px-3 py-2 border-2 rounded dark:text-white dark:bg-gray-800 text-stone-700 dark:border-gray-600`}
                        />
                        <AnimatePresence>
                          {formik.touched.numeroCelular &&
                          formik.errors.numeroCelular ? (
                            <ErrorMessage>
                              {formik.errors.numeroCelular}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <div className="flex mb-2">
                          <img
                            src={phone}
                            alt=""
                            className="mr-2 w-7 h-7 dark:invert"
                          />
                          <span className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            N° Celular 2
                          </span>
                        </div>
                        <input
                          type="number"
                          id=""
                          placeholder="Ingrese número de celular..."
                          onChange={formik.handleChange}
                          value={formik.values.numeroCelular2}
                          name="numeroCelular2"
                          onBlur={formik.handleBlur}
                          className={` ${
                            formik.touched.numeroCelular2 &&
                            formik.errors.numeroCelular2
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } w-full px-3 py-2 border-2 rounded dark:text-white dark:bg-gray-800 text-stone-700 dark:border-gray-600`}
                        />
                        <AnimatePresence>
                          {formik.touched.numeroCelular2 &&
                          formik.errors.numeroCelular2 ? (
                            <ErrorMessage>
                              {formik.errors.numeroCelular2}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <div className="flex mb-2">
                          <img
                            src={adress}
                            alt=""
                            className="mr-2 w-7 h-7 dark:invert"
                          />
                          <span className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Dirección
                          </span>
                        </div>
                        <input
                          type="text"
                          id=""
                          placeholder="Ingrese dirección..."
                          name="direccion"
                          onChange={formik.handleChange}
                          value={formik.values.direccion}
                          onBlur={formik.handleBlur}
                          className={` ${
                            formik.touched.direccion && formik.errors.direccion
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } w-full px-3 py-2 border-2 rounded dark:text-white dark:bg-gray-800 text-stone-700 dark:border-gray-600`}
                        />
                        <AnimatePresence>
                          {formik.touched.direccion &&
                          formik.errors.direccion ? (
                            <ErrorMessage>
                              {formik.errors.direccion}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <div className="flex mb-2">
                          <img
                            src={email}
                            alt=""
                            className="mr-2 w-7 h-7 dark:invert"
                          />
                          <span className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Email
                          </span>
                        </div>
                        <input
                          type="email"
                          onChange={formik.handleChange}
                          id=""
                          name="email"
                          placeholder="Ingrese correo electronico..."
                          value={formik.values.email}
                          onBlur={formik.handleBlur}
                          className={` ${
                            formik.touched.email && formik.errors.email
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } w-full px-3 py-2 border-2 rounded dark:text-white dark:bg-gray-800 text-stone-700 dark:border-gray-600`}
                        />
                        <AnimatePresence>
                          {formik.touched.email && formik.errors.email ? (
                            <div className="mt-2 text-red-500 dark:text-red-300">
                              {formik.errors.email}
                            </div>
                          ) : null}
                        </AnimatePresence>
                      </label>
                    </div>
                  </section>

                  <div>
                    <h5 className="p-2 mt-12 mb-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
                      CUPS:
                    </h5>
                  </div>
                  {/* el usuario ingresa la cantidad de servicios que desea ingresar */}
                  <section className="grid grid-cols-1 mb-6 text-sm border-2 border-transparent gap-x-10 gap-y-3 ps-2">
                    <div className="mb-3">
                      <label htmlFor="cantidad">
                        <span className="block text-base mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
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
                          className="w-auto px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                          placeholder="Digite número . . . ."
                        />
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                      <ServicioForm
                        cantidad={cantidad}
                        servicios={servicios}
                        descripciones={descripciones}
                        onServicioChange={handleServicioChange}
                        onDescripcionChange={handleDescripcionChange}
                      />
                    </div>
                  </section>

                  <div>
                    <h5 className="p-2 mt-12 mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
                      Información del Servicio a Radicar:
                    </h5>
                  </div>

                  <section className="grid grid-cols-2 mb-4 text-sm gap-x-10 gap-y-8 ps-2">
                    <div className="mb-1">
                      <InputAutocompletado
                        label="IPS Remite"
                        onInputChanged={(value) =>
                          formik.setFieldValue("idIpsRemite", value)
                        }
                        apiRoute="ips-remite-name"
                        error={
                          formik.touched.idIpsRemite &&
                          !!formik.errors.idIpsRemite
                        }
                      />
                      <AnimatePresence>
                        {formik.touched.idIpsRemite &&
                        formik.errors.idIpsRemite ? (
                          <ErrorMessage>
                            {formik.errors.idIpsRemite}
                          </ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>
                    <div>
                      <InputAutocompletado
                        label="Especialidad"
                        onInputChanged={(value) =>
                          formik.setFieldValue("idEspecialidad", value)
                        }
                        apiRoute="especialidades-name"
                        error={
                          formik.touched.idEspecialidad &&
                          !!formik.errors.idEspecialidad
                        }
                      />
                      {formik.touched.idEspecialidad &&
                      formik.errors.idEspecialidad ? (
                        <div className="mt-2 text-red-500 dark:text-red-300">
                          {formik.errors.idEspecialidad}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className=" block text-base mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
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
                          className={` ${
                            formik.touched.nombreProfesional &&
                            formik.errors.nombreProfesional
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } w-full px-3 py-2 border-2 rounded dark:text-white dark:bg-gray-800 text-stone-700 dark:border-gray-600`}
                        />
                        <AnimatePresence>
                          {formik.touched.nombreProfesional &&
                          formik.errors.nombreProfesional ? (
                            <ErrorMessage>
                              {formik.errors.nombreProfesional}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="block text-base mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Fecha Orden
                        </span>
                        <input
                          type="date"
                          id=""
                          name="dateOrden"
                          onChange={formik.handleChange}
                          value={formik.values.dateOrden}
                          onBlur={formik.handleBlur}
                          className={` ${
                            formik.touched.dateOrden && formik.errors.dateOrden
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } w-full px-3 py-2 border-2 rounded dark:text-white dark:bg-gray-800 text-stone-700 dark:border-gray-600`}
                        />
                        <AnimatePresence>
                          {formik.touched.dateOrden &&
                          formik.errors.dateOrden ? (
                            <ErrorMessage>
                              {formik.errors.dateOrden}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </label>
                    </div>
                    <div>
                      <InputAutocompletado
                        label="Grupo Servicios"
                        onInputChanged={(value) =>
                          formik.setFieldValue("idGrupoServicios", value)
                        }
                        apiRoute="grupo-servicios-name"
                        error={
                          formik.touched.idGrupoServicios &&
                          !!formik.errors.idGrupoServicios
                        }
                      />
                      <AnimatePresence>
                        {formik.touched.idGrupoServicios &&
                        formik.errors.idGrupoServicios ? (
                          <ErrorMessage>
                            {formik.errors.idGrupoServicios}
                          </ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>
                    <div>
                      <InputAutocompletado
                        label="Tipo Servicios"
                        onInputChanged={(value) =>
                          formik.setFieldValue("idTipoServicios", value)
                        }
                        apiRoute="servicios-name"
                        error={
                          formik.touched.idTipoServicios &&
                          !!formik.errors.idTipoServicios
                        }
                      />
                      <AnimatePresence>
                        {formik.touched.idTipoServicios &&
                        formik.errors.idTipoServicios ? (
                          <ErrorMessage>
                            {formik.errors.idTipoServicios}
                          </ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>
                    <div>
                      <InputAutocompletado
                        label="Lugar Radicación"
                        onInputChanged={(value) =>
                          formik.setFieldValue("idLugarRadicacion", value)
                        }
                        apiRoute="lugares-radicacion-name"
                        error={
                          formik.touched.idLugarRadicacion &&
                          !!formik.errors.idLugarRadicacion
                        }
                      />
                      <AnimatePresence>
                        {formik.touched.idLugarRadicacion &&
                        formik.errors.idLugarRadicacion ? (
                          <ErrorMessage>
                            {formik.errors.idLugarRadicacion}
                          </ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </div>
                    <br />
                    <div className="grid grid-cols-1">
                      <div>
                        <label htmlFor="">
                          <span className="block text-base mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Diagnóstico
                          </span>
                          <input
                            type="text"
                            id=""
                            name=""
                            onChange={(e) =>
                              setDiagnosticoValue(e.target.value)
                            }
                            onKeyDown={handleDiagnosticoKeyDown}
                            placeholder="Digite código"
                            className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="disabled:bg-gray-200 disabled:cursor-not-allowed"
                      >
                        <span className="block mb-2 text-base font-bold text-gray-700 dark:text-gray-200">
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
                          className="w-full px-3 py-2 border border-gray-200 rounded cursor-not-allowed dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                        ></textarea>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="">
                        <span className="block text-base mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
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
                        <span className="block text-base mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Soporte
                        </span>
                        <input
                          type="file"
                          id=""
                          name="soporte"
                          accept=".pdf"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              formik.setFieldValue(
                                "soporte",
                                e.target.files[0]
                              ); // Asignar el archivo seleccionado a Formik
                            }
                          }}
                          className={` ${
                            formik.touched.soporte && formik.errors.soporte
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } w-full px-3 py-2 border-2 rounded dark:text-white dark:bg-gray-800 text-stone-700 dark:border-gray-600`}
                        />
                        <AnimatePresence>
                          {formik.touched.soporte && formik.errors.soporte ? (
                            <ErrorMessage>
                              {formik.errors.soporte}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
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
                <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-medium bg-gray-100 border-t-2 border-black dark:border-white h-14 dark:bg-gray-600">
                  <button
                    type="button"
                    onClick={() => setTimeout(closeModal, 250)}
                    className="w-20 h-10 text-blue-400 duration-300 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-600"
                  >
                    Cerrar
                  </button>
                  <button
                    disabled={submiting}
                    type="submit"
                    className="w-20 h-10 text-white duration-300 border-2 border-gray-400 rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600 dark:hover:border-gray-900"
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
