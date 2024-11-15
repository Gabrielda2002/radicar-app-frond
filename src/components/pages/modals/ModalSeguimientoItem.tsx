//*Funciones y Hooks
  import React, { useState } from "react";
  import useAnimation from "../../../hooks/useAnimations";
  import * as Yup from "yup";
  //*Icons
  import { useFormik } from "formik";
import { createMonitoringItem } from "./createMonitoringItem";
  
  interface ModalSeguimientoItemProps {
    id: number;
    tipoItem: string | null;
  }
  
  const ModalSeguimientoItem: React.FC<ModalSeguimientoItemProps> = ({ id, tipoItem }) => {
    const [stadopen, setStadopen] = useState(false);
    const { showAnimation, closing } = useAnimation(
      stadopen,
      () => setStadopen(false),
      300
    );
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const user = localStorage.getItem("user");

  const idUsuario = user ? JSON.parse(user).id : "";
  
    const validationSchema = Yup.object({
      dateEvent: Yup.date().required("La fecha es requerida"),  
      typeEvent: Yup.string().required("El tipo de evento es requerido"),
      description: Yup.string().required("La descripción es requerida")
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(255, "La descripción debe tener como máximo 100 caracteres"),
    });
  
    const formik = useFormik({
      initialValues: {
        dateEvent: "",
        typeEvent: "",
        description: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {

        try {
          setSubmitting(true);
          
          const formData = new FormData();
          formData.append("equipmentId", id.toString());
          formData.append("eventDate", values.dateEvent);
          formData.append("eventType", values.typeEvent);
          formData.append("description", values.description);
          formData.append("responsible", idUsuario);

           const response = await createMonitoringItem(formData, tipoItem == "equipos" ? "seguimiento-equipos" : "seguimiento-dispositivos-red");

           if (response?.status === 201 || response?.status === 200) {
            setSuccess(true);
            setSubmitting(false);
            setError(null);
            setTimeout(() => {
              setStadopen(false);
            }, 2000);
            
           }else{
             setError("Ocurrio un error al intentar crear el seguimiento");
           }

        } catch (error) {
          setError(`Ocurrio un error al intentar crear el seguimiento ${error}`);
        }
        setSubmitting(false);
      },
    });
    console.log(formik.errors);
  
    return (
      <>
        <button className="focus:outline-none" onClick={() => setStadopen(true)}>
            Nuevo seguimiento
        </button>
  
        {/* init event modal */}
        {stadopen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm">
          <section className="fixed inset-0 z-50 flex justify-center items-center">
            <div
              className={`w-[60vw] h-[fit-content] overflow-auto bg-white rounded shadow-lg dark:bg-gray-600 transition-transform transform ${
                showAnimation && !closing ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
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
                      <div className="flex">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                            Fecha de Evento
                          </span>
                          <input
                            type="date"
                            name="dateEvent"
                            value={formik.values.dateEvent}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[200px] p-2 px-3 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 cursor-not-allowed"
                          />
                          {formik.touched.dateEvent && formik.errors.dateEvent ? (
                            <label className="text-red-500">
                              {formik.errors.dateEvent}
                            </label>
                          ) : null}
                        </label>
                      </div>
                      <div className="flex">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Tipo de Evento   
                          </span>
                          <select
                            id=""
                            name="typeEvent"
                            value={formik.values.typeEvent}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                          >
                            <option value="">- SELECT -</option>
                            <option value="MANTENIMIENTO PREVENTIVO">Mantenimiento Preventivo</option>
                            <option value="MANTENIMIENTO CORRECTIVO">Mantenimiento Correctivo</option>
                            <option value="CAMBIO DE DISPOSITIVO">Cambio de Dispositivo</option>
                            <option value="ENTREGA EQUIPO">Entrega Equipo</option>
                            <option value="RETIRO EQUIPO">Retiro Equipo</option>
                            <option value="DAR DE BAJA">Dar de Baja</option>
                          </select>
                          {formik.touched.typeEvent && formik.errors.typeEvent ? (
                            <label className="text-red-500">
                              {formik.errors.typeEvent}
                            </label>
                          ) : null}
                        </label>
                      </div>
                      <div className="">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                            Descripcion del evento
                          </span>
                          <input
                            type="text"
                            id=""
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[250px] p-2 px-3 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                          />
                          {formik.touched.description && formik.errors.description ? (
                            <label className="text-red-500">
                              {formik.errors.description}
                            </label>
                          ) : null}
                        </label>
                      </div>
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
                      disabled={submitting}
                    >
                      {/* {submitting ? "Actualizando..." : "Actualizando"} */}
                      Enviar
                    </button>
                     {success && (
                      <div className="text-green-500">
                        Estado actualizado con éxito
                      </div>
                    )}
                    {error && <div className="text-red-500">{error}</div>}
                  </div>
                </form>
              </div>
            </section>
          </div>
        )}
      </>
    );
  };
  
  export default ModalSeguimientoItem;
