//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import useAnimation from "../../../hooks/useAnimations";

//*Icons

interface ModalAccesorioItemProps {
  id: number;
}

const ModalAccesorioItem: React.FC<ModalAccesorioItemProps> = ({ id }) => {
  const [stadopen, setStadopen] = useState(false);
  const { showAnimation, closing } = useAnimation(
    stadopen,
    () => setStadopen(false),
    300
  );
  //   const [success, setSuccess] = useState(false);
  //   const [submitting, setSubmitting] = useState(false);
  //   const [error, setError] = useState<string>("");

  // estado para controlar que se va a agregar al equipo
  const [typeAdd, setTypeAdd] = useState<string>("");

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
        inventoryNumber: Yup.string()
          .required("El número de inventario es requerido")
          .min(3, "El número de inventario debe tener al menos 3 caracteres")
          .max(
            200,
            "El número de inventario debe tener como máximo 200 caracteres"
          ),
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
      inventoryNumber: "",
      capacity: "",
      speed: "",
      othersData: "",
    },
    validationSchema: getValidationSchema(typeAdd),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <button className="focus:outline-none" onClick={() => setStadopen(true)}>
        Agregar Periferico
      </button>

      {/* init event modal */}
      {stadopen && (
        <section
          className={`fixed inset-0 z-50 flex justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section className="">
            <div
              className={`w-full overflow-hidden transition-transform duration-300 transform bg-white rounded shadow-lg dark:bg-gray-600 ${
                showAnimation && !closing ? "translate-y-0" : "translate-y-10"
              }`}
            >
              {/* container-header */}
              <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
                <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
                  Módulos
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
                <div className="p-6">
                  <section className="grid grid-cols-3">
                    {/* validar que va crear el usuario y en base a esa seleccion mostrar el fomrulario correspondiente */}

                    <div className="flex">
                      <label htmlFor="">
                        <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                          Tipo de Accesorio
                        </span>
                        <select
                          name="typeAdd"
                          value={typeAdd}
                          onChange={(e) => setTypeAdd(e.target.value)}
                          className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                        >
                          <option value="">SELECCIONE</option>
                          <option value="Periferico">Periferico</option>
                          <option value="hardware">Hardware</option>
                          <option value="software">Software</option>
                        </select>
                      </label>
                    </div>
                    {typeAdd && (
                      <>
                        <div className="flex">
                          <label htmlFor="">
                            <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                              Nombre
                            </span>
                            <select
                              name="name"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                            >
                              <option value="">SELECCIONE</option>
                            </select>
                            {formik.touched.name && formik.errors.name ? (
                              <label className="text-red-500">
                                {formik.errors.name}
                              </label>
                            ) : null}
                          </label>
                        </div>

                        <div className="flex">
                          <label htmlFor="">
                            <span className="flex text-base mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                              Otros Datos
                            </span>
                            <textarea
                              name="othersData"
                              value={formik.values.othersData}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                            ></textarea>
                            {formik.touched.othersData &&
                            formik.errors.othersData ? (
                              <label className="text-red-500">
                                {formik.errors.othersData}
                              </label>
                            ) : null}
                          </label>
                        </div>
                      </>
                    )}
                    {/* Si typeAdd es igual a periferico que muestre los campos correspondientes para el registro de esos datos */}
                    {(typeAdd === "Periferico" || typeAdd === "hardware") && (
                      <div className="flex">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                            Marca
                          </span>
                          <input
                            type="text"
                            name="brand"
                            value={formik.values.brand}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                          />
                          {formik.touched.brand && formik.errors.brand ? (
                            <label className="text-red-500">
                              {formik.errors.brand}
                            </label>
                          ) : null}
                        </label>
                      </div>
                    )}

                    {(typeAdd === "Periferico" || typeAdd === "hardware") && (
                      <div className="flex">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                            Serial
                          </span>
                          <input
                            type="text"
                            name="serial"
                            value={formik.values.serial}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                          />
                          {formik.touched.serial && formik.errors.serial ? (
                            <label className="text-red-500">
                              {formik.errors.serial}
                            </label>
                          ) : null}
                        </label>
                      </div>
                    )}

                    {(typeAdd === "Periferico" || typeAdd === "hardware") && (
                      <div className="flex">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                            Modelo
                          </span>
                          <input
                            type="text"
                            name="model"
                            value={formik.values.model}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                          />
                          {formik.touched.model && formik.errors.model ? (
                            <label className="text-red-500">
                              {formik.errors.model}
                            </label>
                          ) : null}
                        </label>
                      </div>
                    )}

                    {/* Si typeAdd es igual a software que muestre los campos correspondientes para el registro de esos datos */}
                    {typeAdd === "software" && (
                      <div className="flex">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                            Versión
                          </span>
                          <input
                            type="text"
                            name="version"
                            value={formik.values.version}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                          />
                          {formik.touched.version && formik.errors.version ? (
                            <label className="text-red-500">
                              {formik.errors.version}
                            </label>
                          ) : null}
                        </label>
                      </div>
                    )}

                    {typeAdd === "software" && (
                      <div className="flex">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                            Licencia
                          </span>
                          <input
                            type="text"
                            name="license"
                            value={formik.values.license}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                          />
                          {formik.touched.license && formik.errors.license ? (
                            <label className="text-red-500">
                              {formik.errors.license}
                            </label>
                          ) : null}
                        </label>
                      </div>
                    )}

                    {typeAdd === "software" && (
                      <div className="flex">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                            Fecha de Instalación
                          </span>
                          <input
                            type="date"
                            name="dateInstallation"
                            value={formik.values.dateInstallation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                          />
                          {formik.touched.dateInstallation &&
                          formik.errors.dateInstallation ? (
                            <label className="text-red-500">
                              {formik.errors.dateInstallation}
                            </label>
                          ) : null}
                        </label>
                      </div>
                    )}

                    {typeAdd === "software" && (
                      <div className="flex">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                            Estado
                          </span>
                          <select
                            id=""
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                          >
                            <option value="">- SELECT -</option>
                            <option value={1}>Activo</option>
                            <option value={0}>Inactivo</option>
                          </select>
                          {formik.touched.status && formik.errors.status ? (
                            <label className="text-red-500">
                              {formik.errors.status}
                            </label>
                          ) : null}
                        </label>
                      </div>
                    )}

                    {/* Si typeAdd es igual a hardware que muestre los campos correspondientes para el registro de esos datos */}

                    {typeAdd === "hardware" && (
                      <div className="flex">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                            Capacidad
                          </span>
                          <input
                            type="text"
                            name="capacity"
                            value={formik.values.capacity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                          />
                          {formik.touched.capacity && formik.errors.capacity ? (
                            <label className="text-red-500">
                              {formik.errors.capacity}
                            </label>
                          ) : null}
                        </label>
                      </div>
                    )}

                    {typeAdd === "hardware" && (
                      <div className="flex">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                            Velocidad
                          </span>
                          <input
                            type="text"
                            name="speed"
                            value={formik.values.speed}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                          />
                          {formik.touched.speed && formik.errors.speed ? (
                            <label className="text-red-500">
                              {formik.errors.speed}
                            </label>
                          ) : null}
                        </label>
                      </div>
                    )}

                    {/* Si typeAdd es igual a periferico que muestre los campos correspondientes para el registro de esos datos */}
                    {typeAdd === "Periferico" && (
                      <div className="flex">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                            Número de Inventario
                          </span>
                          <input
                            type="text"
                            name="inventoryNumber"
                            value={formik.values.inventoryNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                          />
                          {formik.touched.inventoryNumber &&
                          formik.errors.inventoryNumber ? (
                            <label className="text-red-500">
                              {formik.errors.inventoryNumber}
                            </label>
                          ) : null}
                        </label>
                      </div>
                    )}

                    {typeAdd === "Periferico" && (
                      <div className="flex">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                            Estado
                          </span>
                          <select
                            id=""
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                          >
                            <option value="">- SELECT -</option>
                            <option value={1}>Activo</option>
                            <option value={0}>Inactivo</option>
                          </select>
                          {formik.touched.status && formik.errors.status ? (
                            <label className="text-red-500">
                              {formik.errors.status}
                            </label>
                          ) : null}
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
                  >
                    Cerrar
                  </button>
                  <button
                    className="w-24 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                    type="submit"
                    // disabled={submitting}
                  >
                    Crear
                    {/* {submitting ? "Actualizando..." : "Actualizando"} */}
                  </button>
                  {/* {success && (
                    <div className="text-green-500">
                      Estado actualizado con éxito
                    </div>
                  )}
                  {error && <div className="text-red-500">{error}</div>} */}
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
