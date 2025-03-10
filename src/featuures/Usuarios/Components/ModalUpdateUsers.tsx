//*Funciones y Hooks
import React, { useEffect, useState, useMemo } from "react";
import useAnimation from "@/hooks/useAnimations";
import * as Yup from "yup";
import { useFormik } from "formik";
import areas from "@/data-dynamic/areas.json";
import {
  useFetchRoles,
} from "@/hooks/UseFetchRoles";
import { IUsuarios } from "@/models/IUsuarios";
import { AnimatePresence } from "framer-motion";
import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals";
import { updateUsuarios } from "../Services/UpdarteUsuarios";
import { useFetchMunicipio } from "@/hooks/UseFetchMunicipio";
import { useFetchSede } from "@/hooks/UseFetchSede";

//*Icons
import { MapPinIcon } from "@heroicons/react/24/outline";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useFetchDocumento } from "@/hooks/UseFetchDocument";
import { useBlockScroll } from "@/hooks/useBlockScroll";

interface ModalActionUsuarioProps {
  id: number;
  ususario: IUsuarios | null;
}

const ModalActionUsuario: React.FC<ModalActionUsuarioProps> = ({
  id,
  ususario,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  useBlockScroll(isOpen);

  // estados para inputs autocompletado de areas
  const [searchArea, setSearchArea] = useState<string>("");
  const [suggestionsArea, setSuggestionsArea] = useState<string[]>([]);
  const [searchCargo, setSearchCargo] = useState<string>("");
  const [suggestionsCargo, setSuggestionsCargo] = useState<string[]>([]);

  const [load, setLoad] = useState(false);

  //hook para traer los tipos de documentos
  const { dataDocumento, errorDocumento } = useFetchDocumento(load);

  // hook para traer los roles
  const { dataRol, errorRol } = useFetchRoles(load);

  // hook para traer  las municipios
  const { municipios, errorMunicipios } = useFetchMunicipio(load);

  // hook para traer las sedes
  const { data } = useFetchSede();

  useEffect(() => {
    if (isOpen) {
      setLoad(true);
    }
  }, [isOpen]);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        tipoDocumento: Yup.string().required(
          "El tipo de documento es obligatorio"
        ),
        correo: Yup.string().required("El correo es obligatorio"),
        identificacion: Yup.string()
          .required("La identificación es obligatoria")
          .min(5, "La identificación debe tener al menos 5 caracteres")
          .max(11, "La identificación debe tener como máximo 15 caracteres"),
        nombres: Yup.string()
          .required("El nombre completo es obligatorio")
          .min(2, "El nombre completo debe tener al menos 2 caracteres")
          .max(150, "El nombre completo debe tener como máximo 150 caracteres"),
        apellidos: Yup.string()
          .required("El nombre completo es obligatorio")
          .min(2, "El nombre completo debe tener al menos 2 caracteres")
          .max(150, "El nombre completo debe tener como máximo 150 caracteres"),
        rol: Yup.string().required("El rol es obligatorio"),
        municipio: Yup.string().required("El municipio es obligatorio"),
        contrasena: Yup.string()
          .optional()
          .min(8, "Debe tener minimo 8 caracteres")
          .max(150, "Debe tener máximo 150 caracteres")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
            "La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial (!@#$%^&*)"
          ),
        status: Yup.string().required("El estado es obligatorio"),
        area: Yup.string()
          .required("El área es obligatoria")
          .min(2, "El área debe tener al menos 2 caracteres")
          .max(100, "El área debe tener como máximo 100 caracteres"),
        cargo: Yup.string()
          .required("El cargo es obligatorio")
          .min(2, "El cargo debe tener al menos 2 caracteres")
          .max(200, "El cargo debe tener como máximo 200 caracteres"),
        sede: Yup.string().required("La sede es obligatoria"),
        celular: Yup.string()
          .required("El celular es obligatorio")
          .min(1, "El celular debe tener al menos 1 caracteres")
          .max(10, "El celular debe tener como máximo 10 caracteres"),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      tipoDocumento: "",
      correo: "",
      identificacion: "",
      nombres: "",
      apellidos: "",
      rol: "",
      municipio: "",
      contrasena: "",
      status: "",
      area: "",
      cargo: "",
      sede: "",
      celular: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("dniType", values.tipoDocumento);
        formData.append("email", values.correo);
        formData.append("dniNumber", values.identificacion);
        formData.append("name", values.nombres);
        formData.append("lastName", values.apellidos);
        formData.append("rol", values.rol);
        formData.append("municipio", values.municipio);
        formData.append("password", values.contrasena);
        formData.append("status", values.status);
        formData.append("area", values.area);
        formData.append("position", values.cargo);
        formData.append("headquarters", values.sede);
        formData.append("phoneNumber", values.celular);

        const response = await updateUsuarios(id, formData);

        if (response?.status === 200 || response?.status === 201) {
          setSuccess(true);
          setError("");
          setTimeout(() => {
            setIsOpen(false);
            window.location.reload();
          }, 2000);
        } else {
          setSuccess(false);
          setError("Ocurrió un error al intentar actualizar el usuario");
        }
      } catch (error) {
        setSuccess(false);
        setError(`Ocurrió un error al intentar guardar el cups ${error}`);
      }
    },
  });
  // console.log(formik.errors)

  useEffect(() => {
    if (ususario) {
      formik.setValues({
        tipoDocumento: ususario.idDocumento.toString(),
        correo: ususario.email,
        identificacion: ususario.dniNumber.toString(),
        nombres: ususario.name,
        apellidos: ususario.lastName,
        rol: ususario.idRol.toString(),
        municipio: ususario.idMunicipio.toString(),
        contrasena: "",
        status: ususario.status ? "1" : "0",
        area: ususario.area,
        cargo: ususario.cargo,
        sede: ususario.sedeId.toString(),
        celular: ususario.celular.toString(),
      });
      setSearchArea(ususario.area);
      setSearchCargo(ususario.cargo);
    }
  }, [ususario]);

  // funciones para el autocompletado de inputs
  const handleSearchChangeArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchArea(query);

    if (query) {
      const filteredSuggestions = areas.areas
    .filter((option) => option.name.toLowerCase().includes(query.toLowerCase()))
    .map((option) => option.name);
  setSuggestionsArea(filteredSuggestions);
    } else {
      setSuggestionsArea([]);
    }
  };

  const handleSuggestionClickArea = (suggestion: string) => {
    formik.setFieldValue("area", suggestion);
    setSearchArea(suggestion);
    setSuggestionsArea([]);
  };

  const handleSearchChangeCargo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchCargo(query);

    if (query) {
      const filteredSuggestions = areas.cargos
      .filter((option) => option.name.toLowerCase().includes(query.toLowerCase()))
      .map((option) => option.name);
    setSuggestionsCargo(filteredSuggestions);
    } else {
      setSuggestionsCargo([]);
    }
  };

  const handleSuggestionClickCargo = (suggestion: string) => {
    formik.setFieldValue("cargo", suggestion);
    setSearchCargo(suggestion);
    setSuggestionsCargo([]);
  };

  const { showAnimation, closing } = useAnimation(
    isOpen,
    () => setIsOpen(false),
    300
  );


  if (errorDocumento) return <p>Error al cargar los tipos de documentos</p>;
  if (errorMunicipios) return <p>Error al cargar los convenios</p>;
  if (errorRol) return <p>Error al cargar las ips primarias</p>;

  return (
    <>
      <button
        type="button"
        className={`border-2 w-[150px] h-10 rounded-md focus:outline-none bg-color text-white  hover:bg-teal-800  active:bg-teal-900  ${
          showAnimation && !closing ? "opacity-100" : "opacity-100"
        }`}
        onClick={() => setIsOpen(true)}
      >
        Actualizar
      </button>
      {isOpen && (
        <div className="fixed z-50 flex justify-center pt-6 transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <div
            className="fixed inset-0 transition-opacity duration-300 bg-black opacity-40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Contenido del Formulario */}
          <section>
            <div
              className={`z-10 w-[900px] bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800 ${
                showAnimation && !closing
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
                <h1 className="text-2xl font-semibold text-color dark:text-gray-200 ">
                  Datos Usuario
                </h1>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 hover:bg-gray-300 dark:hover:text-gray-900 hover:text-gray-900 w-7 h-7"
                >
                  &times;
                </button>
              </div>

              {/* Contenido del formulario */}
              <form onSubmit={formik.handleSubmit}>
                <div className="overflow-y-auto max-h-[80vh]">
                  <div className="grid grid-cols-1 gap-6 p-4">
                    <div className="flex items-center">
                      <InformationCircleIcon className="text-gray-900 dark:text-gray-100 w-7 h-7" />
                      <h2 className="pl-1 text-xl text-color dark:text-white">
                        Datos Personales:
                      </h2>
                    </div>
                    {/* USER NAMES */}
                    <div className="grid grid-cols-2 gap-2 px-3">
                      <div>
                        <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                          Nombres
                        </label>
                        <input
                          name="nombres"
                          value={formik.values.nombres}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          placeholder="Ingrese Nombres..."
                          className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                            formik.touched.nombres && formik.errors.nombres
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        />
                        <AnimatePresence>
                          {formik.touched.nombres && formik.errors.nombres ? (
                            <ErrorMessage>{formik.errors.nombres}</ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>
                      <div>
                        <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                          Apellidos
                        </label>
                        <input
                          name="apellidos"
                          value={formik.values.apellidos}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          placeholder="Ingrese Apellidos..."
                          className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                            formik.touched.apellidos && formik.errors.apellidos
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        />
                        <AnimatePresence>
                          {formik.touched.apellidos &&
                          formik.errors.apellidos ? (
                            <ErrorMessage>
                              {formik.errors.apellidos}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>
                      <div>
                        <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                          Tipo Documento
                        </label>
                        <select
                          className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                            formik.touched.tipoDocumento &&
                            formik.errors.tipoDocumento
                              ? "border-red-500 dark:border-red-500"
                              : "dark:border-gray-600 border-gray-200"
                          }`}
                          name="tipoDocumento"
                          value={formik.values.tipoDocumento}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">SELECCIONE</option>
                          {dataDocumento.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        <AnimatePresence>
                          {formik.touched.tipoDocumento &&
                          formik.errors.tipoDocumento ? (
                            <ErrorMessage>
                              {formik.errors.tipoDocumento}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                          Numero Cedula
                        </label>
                        <input
                          name="identificacion"
                          value={formik.values.identificacion}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="number"
                          placeholder="Ingrese Identificación..."
                          className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                            formik.touched.identificacion &&
                            formik.errors.identificacion
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        />
                        <AnimatePresence>
                          {formik.touched.identificacion &&
                          formik.errors.identificacion ? (
                            <ErrorMessage>
                              {formik.errors.identificacion}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>
                      <div>
                        <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                          Celular
                        </label>
                        <input
                          name="celular"
                          value={formik.values.celular}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          placeholder="Ingrese Celular..."
                          className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                            formik.touched.celular && formik.errors.celular
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        />
                        <AnimatePresence>
                          {formik.touched.celular && formik.errors.celular ? (
                            <ErrorMessage>{formik.errors.celular}</ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>
                      <div className="relative">
                        <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                          Area
                        </label>
                        <input
                          name="area"
                          value={searchArea}
                          onChange={handleSearchChangeArea}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          className={` w-full p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                            formik.touched.area && formik.errors.area
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        />
                        {suggestionsArea.length > 0 && (
                          <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-200 rounded top-22 dark:bg-gray-800 dark:border-gray-600 max-h-40">
                            {suggestionsArea.map((suggestion) => (
                              <li
                                key={areas.areas.find((a) => a.name === suggestion)?.id} 
                                onClick={() =>
                                  handleSuggestionClickArea(suggestion)
                                }
                                className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-stone-700 dark:text-gray-200"
                              >
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                        <AnimatePresence>
                          {formik.touched.area && formik.errors.area ? (
                            <ErrorMessage>{formik.errors.area}</ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>
                      <div className="relative">
                        <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                          Cargo
                        </label>
                        <input
                          name="cargo"
                          value={searchCargo}
                          onChange={handleSearchChangeCargo}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          className={` w-full p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                            formik.touched.cargo && formik.errors.cargo
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        />
                        {suggestionsCargo.length > 0 && (
                          <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-200 rounded top-22 dark:bg-gray-800 dark:border-gray-600 max-h-40">
                            {suggestionsCargo.map((suggestion) => (
                              <li
                                key={areas.cargos.find((cargo) => cargo.name === suggestion)?.id}
                                onClick={() =>
                                  handleSuggestionClickCargo(suggestion)
                                }
                                className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-stone-700 dark:text-gray-200"
                              >
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                        <AnimatePresence>
                          {formik.touched.cargo && formik.errors.cargo ? (
                            <ErrorMessage>{formik.errors.cargo}</ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>
                      <div>
                        <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                          Sede
                        </label>
                        <select
                          name="sede"
                          id="sede"
                          value={formik.values.sede}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                            formik.touched.sede && formik.errors.sede
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        >
                          <option value="">SELECCIONE</option>
                          {data.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        <AnimatePresence>
                          {formik.touched.sede && formik.errors.sede ? (
                            <ErrorMessage>{formik.errors.sede}</ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* USER MAIL AND DATES */}
                    <div className="flex items-center">
                      <IdentificationIcon className="text-gray-900 dark:text-gray-100 w-7 h-7" />
                      <h2 className="pl-2 text-xl text-color dark:text-gray-100">
                        Contacto:
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3 px-3">
                      <div>
                        <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                          Correo Electrónico
                        </label>
                        <input
                          type="mail"
                          placeholder="Ingresa Correo..."
                          name="correo"
                          value={formik.values.correo}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                            formik.touched.correo && formik.errors.correo
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } `}
                        />
                        <AnimatePresence>
                          {formik.touched.correo && formik.errors.correo ? (
                            <ErrorMessage>{formik.errors.correo}</ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label className="block mb-2 text-base font-bold text-left text-gray-700 text- dark:text-gray-200">
                          Municipio
                        </label>
                        <select
                          name="municipio"
                          value={formik.values.municipio}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                            formik.touched.municipio && formik.errors.municipio
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } `}
                        >
                          {municipios.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name}
                            </option>
                          ))}
                        </select>
                        <AnimatePresence>
                          {formik.touched.municipio &&
                          formik.errors.municipio ? (
                            <ErrorMessage>
                              {formik.errors.municipio}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-5 p-4">
                    <div className="flex items-center">
                      <MapPinIcon className="text-gray-900 dark:text-gray-100 w-7 h-7" />
                      <h2 className="pl-1 text-xl text-color dark:text-white">
                        Rol y Contraseña:
                      </h2>
                    </div>
                    {/* USER LOCATION AND THEIR PROPERTIES */}
                    <div className="grid grid-cols-2 gap-3 px-3">
                      <div>
                        <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                          Rol
                        </label>
                        <select
                          name="rol"
                          value={formik.values.rol}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={` w-full text-base px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                            formik.touched.rol && formik.errors.rol
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } `}
                        >
                          <option value="">SELECCIONE</option>
                          {dataRol.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        <AnimatePresence>
                          {formik.touched.rol && formik.errors.rol ? (
                            <ErrorMessage>{formik.errors.rol}</ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>

                      <div className="">
                        <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                          Contraseña
                        </label>
                        <input
                          name="contrasena"
                          value={formik.values.contrasena}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="password"
                          placeholder="Ingrese Contraseña..."
                          className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                            formik.touched.contrasena &&
                            formik.errors.contrasena
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } `}
                        />
                        <AnimatePresence>
                          {formik.touched.contrasena &&
                          formik.errors.contrasena ? (
                            <ErrorMessage>
                              {formik.errors.contrasena}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label className="block mb-2 text-base font-bold text-left text-gray-700 dark:text-gray-200">
                          Estado
                        </label>
                        <select
                          name="status"
                          value={formik.values.status}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={` w-full text-sm px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                            formik.touched.status && formik.errors.status
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } `}
                        >
                          <option value="">SELECCIONE</option>
                          <option value={1}>Activo</option>
                          <option value={0}>Inactivo</option>
                        </select>
                        {formik.touched.status && formik.errors.status ? (
                          <label className="text-red-500">
                            {formik.errors.status}
                          </label>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-gray-200 border-t-2 border-t-gray-900 dark:border-t-white h-14 dark:bg-gray-600">
                  <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                  >
                    Cerrar
                  </button>
                  <button
                    className="w-20 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                    type="submit"
                  >
                    Actualizar
                  </button>
                  {success && (
                    <span className="text-green-500">
                      Usuario actualizado con éxito!
                    </span>
                  )}
                  {error && <span className="text-red-500">{error}</span>}
                </div>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ModalActionUsuario;
