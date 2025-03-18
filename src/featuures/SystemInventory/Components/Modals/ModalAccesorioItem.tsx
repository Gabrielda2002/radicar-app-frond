//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import useAnimation from "@/hooks/useAnimations";
import { AnimatePresence } from "framer-motion";
import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals";
import inventoryOptions from "@/data-dynamic/inventoryOptions.json";

//*Icons
import {
  SquaresPlusIcon,
  TagIcon,
  InformationCircleIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  SwatchIcon,
  // MapPinIcon,
  CheckCircleIcon,
  CircleStackIcon,
  WifiIcon,
  CodeBracketIcon,
  KeyIcon,
  CalendarIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { createAccesoryEquipment } from "@/featuures/SystemInventory/Services/CreateAccesoryEquipment";
import { useBlockScroll } from "@/hooks/useBlockScroll";

interface ModalAccesorioItemProps {
  id: number;
}

const ModalAccesorioItem: React.FC<ModalAccesorioItemProps> = ({ id }) => {
  const [stadopen, setStadopen] = useState(false);
  useBlockScroll(stadopen);
  const { showAnimation, closing } = useAnimation(
    stadopen,
    () => setStadopen(false),
    300
  );
  // estados para controlar el estado del formulario
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>("");

  // estado para controlar que se va a agregar al equipo
  const [typeAdd, setTypeAdd] = useState<string>("");

  // estados para controlar la busqueda de accesorios y mostrar sugerencias
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getValidationSchema = (typeAdd: string) => {
    const baseValidationSchema = {
      name: Yup.string()
        .required("El nombre es requerido")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(200, "El nombre debe tener como máximo 200 caracteres"),
      othersData: Yup.string()
        .required("La descripción es requerida")
        .min(3, "La descripción debe tener al menos 3 caracteres")
        .max(200, "La descripción debe tener como máximo 200 caracteres"),
    };

    // Condiciones adicionales para Periferico y hardware
    if (typeAdd === "Periferico" || typeAdd === "hardware") {
      return Yup.object({
        ...baseValidationSchema,
        brand: Yup.string().required("La marca es requerida"),
        serial: Yup.string()
          .required("El serial es requerido")
          .min(3, "El serial debe tener al menos 3 caracteres")
          .max(200, "El serial debe tener como máximo 200 caracteres"),
        model: Yup.string()
          .required("El modelo es requerido")
          .min(3, "El modelo debe tener al menos 3 caracteres")
          .max(200, "El modelo debe tener como máximo 200 caracteres"),
      });
    }

    // Condiciones adicionales para software
    if (typeAdd === "software") {
      return Yup.object({
        ...baseValidationSchema,
        version: Yup.string()
          .required("La versión es requerida")
          .min(3, "La versión debe tener al menos 3 caracteres")
          .max(200, "La versión debe tener como máximo 200 caracteres"),
        license: Yup.string()
          .required("La licencia es requerida")
          .min(3, "La licencia debe tener al menos 3 caracteres")
          .max(200, "La licencia debe tener como máximo 200 caracteres"),
        dateInstallation: Yup.date().required(
          "La fecha de instalación es requerida"
        ),
        status: Yup.string().required("El estado es requerido"),
      });
    }

    // Condiciones adicionales para hardware
    if (typeAdd === "hardware") {
      return Yup.object({
        ...baseValidationSchema,
        capacity: Yup.string()
          .required("La capacidad es requerida")
          .min(3, "La capacidad debe tener al menos 3 caracteres")
          .max(200, "La capacidad debe tener como máximo 200 caracteres"),
        speed: Yup.string().required("La velocidad es requerida"),
      });
    }

    // Condiciones adicionales para Periferico
    if (typeAdd === "Periferico") {
      return Yup.object({
        ...baseValidationSchema,
        status: Yup.string().required("El estado es requerido"),
      });
    }

    return Yup.object(baseValidationSchema);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      serial: "",
      model: "",
      version: "",
      license: "",
      dateInstallation: "",
      status: "",
      capacity: "",
      speed: "",
      othersData: "",
    },
    validationSchema: getValidationSchema(typeAdd),
    onSubmit: async (values) => {
      try {
        setSubmitting(true);

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("otherData", values.othersData);
        formData.append("equipmentId", id.toString());

        let ep: string = "";

        if (typeAdd === "Periferico" || typeAdd === "hardware") {
          formData.append("brand", values.brand);
          formData.append("serial", values.serial);
          formData.append("model", values.model);
        }
        if (typeAdd === "software") {
          ep = "software";
          formData.append("version", values.version);
          formData.append("license", values.license);
          formData.append("dateInstallation", values.dateInstallation);
          formData.append("status", values.status);
        }
        if (typeAdd === "hardware") {
          ep = "componentes";
          formData.append("capacity", values.capacity);
          formData.append("speed", values.speed);
        }
        if (typeAdd === "Periferico") {
          ep = "accesorios-equipos";
          // formData.append("inventoryNumber", values.inventoryNumber);
          formData.append("status", values.status);
        }

        const response = await createAccesoryEquipment(formData, ep);

        if (response?.status === 200 || response?.status === 201) {
          setSubmitting(false);
          formik.resetForm();
          setSuccess(true);
          toast.success("Datos enviados con éxito", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setError(null);
          setTimeout(() => {
            setSuccess(false);
            setStadopen(false);
          }, 3000);
        } else {
          setSubmitting(false);
          setSuccess(false);
          setError("Error al crear el accesorio");
          toast.error("Error al enviar los datos", {
            position: "bottom-right",
            pauseOnHover: true,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        setError("Error al crear el accesorio" + error);
        toast.error(`Error al crear el accesorio: ${error}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setSubmitting(false);
    },
  });

  interface HandleSearchChangeEvent {
    target: {
      value: string;
    };
  }

  /**
   * Maneja los cambios en el campo de búsqueda de accesorios
   * @param {HandleSearchChangeEvent} e - Evento de cambio del input de búsqueda
   *
   * @description
   * Esta función realiza las siguientes acciones:
   * 1. Actualiza el estado de búsqueda con el valor ingresado
   * 2. Filtra las sugerencias basadas en el tipo de accesorio seleccionado
   * 3. Muestra solo las opciones que coinciden con el texto buscado
   *
   * @example
   * <input onChange={handleSearchChange} />
   */
  const handleSearchChange = (e: HandleSearchChangeEvent) => {
    // Obtiene el valor actual del campo de búsqueda
    const query = e.target.value;
    setSearch(query);

    // Filtra las sugerencias si hay un tipo seleccionado y texto de búsqueda
    if (typeAdd && query) {
      const filteredSuggestions = inventoryOptions[
        typeAdd.toLowerCase() as keyof typeof inventoryOptions
      ].filter((option) => option.toLowerCase().includes(query.toLowerCase()));
      setSuggestions(filteredSuggestions);
    } else {
      // Limpia las sugerencias si no hay criterios de búsqueda
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    formik.setFieldValue("name", suggestion);
    setSearch(suggestion);
    setSuggestions([]);
  };

  return (
    <>
      <div className="relative group">
        <button
          className="p-2 duration-200 border rounded-md hover:bg-gray-200 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
          onClick={() => setStadopen(true)}
        >
          <SquaresPlusIcon className="w-7 h-7" />
        </button>
        {/* Tooltip */}
        <div className="absolute z-10 px-2 py-1 text-sm text-white transition-opacity duration-200 transform -translate-x-1/2 translate-y-1 bg-gray-800 rounded-md opacity-0 pointer-events-none w-[134px] left-1/2 group-hover:opacity-100 dark:bg-gray-900">
          Agregar Accesorio
          {/* Flechita indicativa */}
          <div className="absolute z-0 w-3 h-3 transform rotate-45 -translate-x-1/2 bg-gray-800 bottom-[22px] left-1/2 dark:bg-gray-900"></div>
        </div>
      </div>

      {/* init event modal */}
      {stadopen && (
        <section
          className={`fixed inset-0 z-50 flex justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section className="w-[900px]">
            <div
              className={`w-full overflow-hidden transition-transform duration-300 transform bg-white rounded shadow-lg dark:bg-gray-600 ${
                showAnimation && !closing ? "translate-y-0" : "translate-y-10"
              }`}
            >
              {/* container-header */}
              <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
                <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
                  Agregar Accesorio
                </h1>
                <button
                  onClick={() => setStadopen(false)}
                  className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
                >
                  &times;
                </button>
              </div>

              {/* init form */}
              <form
                onSubmit={formik.handleSubmit}
                className="max-h-[70Vh] overflow-y-auto dark:bg-gray-800 dark:text-gray-200"
              >
                <div className="p-8">
                  <div className="flex mb-8">
                    <label className="">
                      <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                        Tipo de Accesorio
                      </span>
                      <select
                        name="typeAdd"
                        value={typeAdd}
                        onChange={(e) => setTypeAdd(e.target.value)}
                        className="w-[200px] p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                      >
                        <option value="">SELECCIONE</option>
                        <option value="Periferico">Periferico</option>
                        <option value="hardware">Hardware</option>
                        <option value="software">Software</option>
                      </select>
                    </label>
                  </div>
                  <section className="grid grid-cols-2 gap-x-7">
                    {/* validar que va crear el usuario y en base a esa seleccion mostrar el fomrulario correspondiente */}
                    {typeAdd && (
                      <>
                        <div className="relative">
                          <label className="w-full mb-2" htmlFor="">
                            <div className="flex items-center mb-2">
                              <TagIcon className="w-8 h-8 mr-2 dark:text-white" />
                              <span className="flex text-lg font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                                Nombre
                              </span>
                            </div>
                            <input
                              name="name"
                              value={search}
                              onChange={handleSearchChange}
                              onBlur={formik.handleBlur}
                              className={` w-full p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                                formik.touched.name && formik.errors.name
                                  ? "border-red-500 dark:border-red-500"
                                  : "border-gray-200 dark:border-gray-600"
                              }`}
                            />
                            {suggestions.length > 0 && (
                              <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-200 rounded top-22 dark:bg-gray-800 dark:border-gray-600 max-h-40">
                                {suggestions.map((suggestion) => (
                                  <li
                                    key={suggestion}
                                    onClick={() =>
                                      handleSuggestionClick(suggestion)
                                    }
                                    className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-stone-700 dark:text-gray-200"
                                  >
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            )}
                            <AnimatePresence>
                              {formik.touched.name && formik.errors.name ? (
                                <ErrorMessage>
                                  {formik.errors.name}
                                </ErrorMessage>
                              ) : null}
                            </AnimatePresence>
                          </label>
                        </div>

                        <div className="flex">
                          <label className="w-full mb-4">
                            <div className="flex items-center mb-2">
                              <InformationCircleIcon className="w-8 h-8 mr-2 dark:text-white" />
                              <span className="flex text-lg font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                                Otros Datos
                              </span>
                            </div>
                            <textarea
                              name="othersData"
                              value={formik.values.othersData}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={` w-full p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                                formik.touched.othersData &&
                                formik.errors.othersData
                                  ? "border-red-500 dark:border-red-500"
                                  : "border-gray-200 dark:border-gray-600"
                              }`}
                            ></textarea>
                            <AnimatePresence>
                              {formik.touched.othersData &&
                              formik.errors.othersData ? (
                                <ErrorMessage>
                                  {formik.errors.othersData}
                                </ErrorMessage>
                              ) : null}
                            </AnimatePresence>
                          </label>
                        </div>
                      </>
                    )}
                    {/* Si typeAdd es igual a periferico que muestre los campos correspondientes para el registro de esos datos */}
                    {(typeAdd === "Periferico" || typeAdd === "hardware") && (
                      <div className="flex">
                        <label className="w-full mb-4">
                          <div className="flex items-center mb-2">
                            <PuzzlePieceIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <span className="flex text-lg font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                              Marca
                            </span>
                          </div>
                          <input
                            type="text"
                            name="brand"
                            value={formik.values.brand}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={` w-full p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                              formik.touched.brand && formik.errors.brand
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                            }`}
                          />
                          <AnimatePresence>
                            {formik.touched.brand && formik.errors.brand ? (
                              <ErrorMessage>{formik.errors.brand}</ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </label>
                      </div>
                    )}

                    {(typeAdd === "Periferico" || typeAdd === "hardware") && (
                      <div className="flex">
                        <label className="w-full mb-4">
                          <div className="flex items-center mb-2">
                            <ShieldCheckIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <span className="flex text-lg font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                              Serial
                            </span>
                          </div>
                          <input
                            type="text"
                            name="serial"
                            value={formik.values.serial}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={` w-full p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                              formik.touched.serial && formik.errors.serial
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                            }`}
                          />
                          <AnimatePresence>
                            {formik.touched.serial && formik.errors.serial ? (
                              <ErrorMessage>
                                {formik.errors.serial}
                              </ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </label>
                      </div>
                    )}

                    {(typeAdd === "Periferico" || typeAdd === "hardware") && (
                      <div className="flex">
                        <label className="w-full mb-2">
                          <div className="flex items-center mb-2">
                            <SwatchIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <span className="flex text-lg font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                              Modelo
                            </span>
                          </div>
                          <input
                            type="text"
                            name="model"
                            value={formik.values.model}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={` w-full p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                              formik.touched.model && formik.errors.model
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                            }`}
                          />
                          <AnimatePresence>
                            {formik.touched.model && formik.errors.model ? (
                              <ErrorMessage>{formik.errors.model}</ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </label>
                      </div>
                    )}

                    {/* Si typeAdd es igual a software que muestre los campos correspondientes para el registro de esos datos */}
                    {typeAdd === "software" && (
                      <div className="flex">
                        <label className="w-full mb-2">
                          <div className="flex items-center mb-2">
                            <CodeBracketIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <span className="flex text-lg font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                              Versión
                            </span>
                          </div>
                          <input
                            type="text"
                            name="version"
                            value={formik.values.version}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={` w-full p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                              formik.touched.version && formik.errors.version
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                            }`}
                          />
                          <AnimatePresence>
                            {formik.touched.version && formik.errors.version ? (
                              <ErrorMessage>
                                {formik.errors.version}
                              </ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </label>
                      </div>
                    )}

                    {typeAdd === "software" && (
                      <div className="flex">
                        <label className="w-full mb-2">
                          <div className="flex items-center mb-2">
                            <KeyIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <span className="flex text-lg font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                              Licencia
                            </span>
                          </div>
                          <input
                            type="text"
                            name="license"
                            value={formik.values.license}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={` w-full p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                              formik.touched.license && formik.errors.license
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                            }`}
                          />
                          <AnimatePresence>
                            {formik.touched.license && formik.errors.license ? (
                              <ErrorMessage>
                                {formik.errors.license}
                              </ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </label>
                      </div>
                    )}

                    {typeAdd === "software" && (
                      <div className="flex">
                        <label className="w-full mb-2">
                          <div className="flex items-center mb-2">
                            <CalendarIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <span className="flex text-lg font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                              Fecha de Instalación
                            </span>
                          </div>
                          <input
                            type="date"
                            name="dateInstallation"
                            value={formik.values.dateInstallation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={` w-full p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                              formik.touched.dateInstallation &&
                              formik.errors.dateInstallation
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                            }`}
                          />
                          <AnimatePresence>
                            {formik.touched.dateInstallation &&
                            formik.errors.dateInstallation ? (
                              <ErrorMessage>
                                {formik.errors.dateInstallation}
                              </ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </label>
                      </div>
                    )}

                    {typeAdd === "software" && (
                      <div className="flex">
                        <label className="w-full mb-2">
                          <div className="flex items-center mb-2">
                            <CheckBadgeIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <span className="flex text-lg font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                              Estado
                            </span>
                          </div>
                          <select
                            id=""
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={` w-full p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                              formik.touched.status && formik.errors.status
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                            }`}
                          >
                            <option value="">- SELECT -</option>
                            <option value="NUEVO">Nuevo</option>
                            <option value="REGULAR">Regular</option>
                            <option value="MALO">Malo</option>
                          </select>
                          <AnimatePresence>
                            {formik.touched.status && formik.errors.status ? (
                              <ErrorMessage>
                                {formik.errors.status}
                              </ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </label>
                      </div>
                    )}

                    {/* Si typeAdd es igual a hardware que muestre los campos correspondientes para el registro de esos datos */}

                    {typeAdd === "hardware" && (
                      <div className="flex">
                        <label className="w-full mb-2">
                          <div className="flex items-center mb-2">
                            <CircleStackIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <span className="flex text-lg font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                              Capacidad
                            </span>
                          </div>
                          <input
                            type="text"
                            name="capacity"
                            value={formik.values.capacity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={` w-full p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                              formik.touched.capacity && formik.errors.capacity
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                            }`}
                          />
                          <AnimatePresence>
                            {formik.touched.capacity &&
                            formik.errors.capacity ? (
                              <ErrorMessage>
                                {formik.errors.capacity}
                              </ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </label>
                      </div>
                    )}

                    {typeAdd === "hardware" && (
                      <div className="flex">
                        <label className="w-full">
                          <div className="flex items-center mb-2">
                            <WifiIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <span className="flex text-lg font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                              Velocidad
                            </span>
                          </div>
                          <input
                            type="text"
                            name="speed"
                            value={formik.values.speed}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={` w-full p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                              formik.touched.speed && formik.errors.speed
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                            }`}
                          />
                          <AnimatePresence>
                            {formik.touched.speed && formik.errors.speed ? (
                              <ErrorMessage>{formik.errors.speed}</ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </label>
                      </div>
                    )}
                    {typeAdd === "Periferico" && (
                      <div className="flex">
                        <label className="">
                          <div className="flex items-center mb-2">
                            <CheckCircleIcon className="w-8 h-8 mr-2 dark:text-white" />
                            <span className="flex text-lg font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                              Estado
                            </span>
                          </div>
                          <select
                            id=""
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={` w-[200px] p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                              formik.touched.status && formik.errors.status
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-200 dark:border-gray-600"
                            }`}
                          >
                            <option value="">- SELECT -</option>
                            <option value="NUEVO">Nuevo</option>
                            <option value="REGULAR">Regular</option>
                            <option value="MALO">Malo</option>
                          </select>
                          <AnimatePresence>
                            {formik.touched.status && formik.errors.status ? (
                              <ErrorMessage>
                                {formik.errors.status}
                              </ErrorMessage>
                            ) : null}
                          </AnimatePresence>
                        </label>
                      </div>
                    )}
                  </section>
                </div>

                {/* container-footer */}
                <div className="flex items-center justify-end w-full gap-2 p-2 text-sm font-semibold bg-gray-200 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
                  <button
                    className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-600 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                    onClick={() => setStadopen(false)}
                    type="button"
                  >
                    Cerrar
                  </button>
                  <button
                    className="w-24 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                    type="submit"
                    disabled={submitting || !formik.isValid}
                  >
                    {submitting ? "Actualizando..." : "Actualizando"}
                  </button>
                  {success && null}
                  {error && <>{error}</>}
                </div>
              </form>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ModalAccesorioItem;
