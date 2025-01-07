//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import useAnimation from "@/hooks/useAnimations";
import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals";
import { AnimatePresence } from "framer-motion";
import { createMonitoringItem } from "@/featuures/SystemInventory/Services/createMonitoringItem";
import { toast } from "react-toastify";

interface ModalSeguimientoItemProps {
  id: number;
  tipoItem: string | null;
}

const ModalSeguimientoItem: React.FC<ModalSeguimientoItemProps> = ({
  id,
  tipoItem,
}) => {
  const [stadopen, setStadopen] = useState(false);
  const { showAnimation, closing } = useAnimation(
    stadopen,
    () => setStadopen(false),
    300
  );
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // * Se crea logica para evitar el desplazamiento del scroll dentro del modal
  // * Se implementa eventos del DOM para distribucion en demas propiedades anteiormente establecidas
  const openModal = () => {
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    document.body.style.overflow = "";
    setStadopen(false);
  };
  if (stadopen) {
    openModal();
  }

  const user = localStorage.getItem("user");

  const idUsuario = user ? JSON.parse(user).id : "";

  const validationSchema = Yup.object({
    dateEvent: Yup.date().required("La fecha es requerida"),
    typeEvent: Yup.string().required("El tipo de evento es requerido"),
    description: Yup.string()
      .required("La descripción es requerida")
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

        const response = await createMonitoringItem(
          formData,
          tipoItem == "equipos"
            ? "seguimiento-equipos"
            : "seguimiento-dispositivos-red"
        );

        if (response?.status === 201 || response?.status === 200) {
          setSuccess(true);
          setSubmitting(false);
          setError(null);
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
          setTimeout(() => {
            setStadopen(false);
          }, 2000);
        } else {
          setError("Ocurrio un error al intentar crear el seguimiento");
          toast.error("Ocurrio un error al intentar crear el seguimiento", {
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
      } catch (error) {
        setError(`Ocurrio un error al intentar crear el seguimiento ${error}`);
        toast.error(`Error al enviar los datos: ${error}`, {
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
  console.log(formik.errors);

  return (
    <>
      <button
        className="p-2 duration-300 bg-gray-300 border-2 rounded-lg focus:outline-none hover:bg-gray-700 hover:text-white dark:bg-color dark:hover:bg-teal-600 dark:text-white"
        onClick={() => setStadopen(true)}
      >
        Nuevo seguimiento
      </button>

      {/* init event modal */}
      {stadopen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm">
          <section className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className={`w-[50vw] h-[fit-content] overflow-auto bg-white rounded shadow-lg dark:bg-gray-600 transition-transform transform ${
                showAnimation && !closing
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* container-header */}
              <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
                <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
                  Módulos
                </h1>
                <button
                  onClick={closeModal}
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
                  <section className="grid grid-cols-2 gap-2">
                    <div className="flex">
                      <label className="w-full">
                        <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                          Fecha de Evento
                        </span>
                        <input
                          type="date"
                          name="dateEvent"
                          value={formik.values.dateEvent}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={` w-full p-2 px-3 border-2 border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 cursor-not-allowed ${
                            formik.touched.dateEvent && formik.errors.dateEvent
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        />
                        <div></div>
                        <AnimatePresence>
                          {formik.touched.dateEvent &&
                          formik.errors.dateEvent ? (
                            <ErrorMessage>
                              {formik.errors.dateEvent}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </label>
                    </div>
                    <div className="flex">
                      <label className="w-full">
                        <span className="flex text-base mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Tipo de Evento
                        </span>
                        <select
                          id=""
                          name="typeEvent"
                          value={formik.values.typeEvent}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={` w-full p-2 px-3 py-2 border-2 border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                            formik.touched.typeEvent && formik.errors.typeEvent
                              ? "border-red-500 dark:borde-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        >
                          <option value="">- SELECT -</option>
                          <option value="MANTENIMIENTO PREVENTIVO">
                            Mantenimiento Preventivo
                          </option>
                          <option value="MANTENIMIENTO CORRECTIVO">
                            Mantenimiento Correctivo
                          </option>
                          <option value="CAMBIO DE DISPOSITIVO">
                            Cambio de Dispositivo
                          </option>
                          <option value="ENTREGA EQUIPO">Entrega Equipo</option>
                          <option value="RETIRO EQUIPO">Retiro Equipo</option>
                          <option value="DAR DE BAJA">Dar de Baja</option>
                        </select>
                        <div></div>
                        <AnimatePresence>
                          {formik.touched.typeEvent &&
                          formik.errors.typeEvent ? (
                            <ErrorMessage>
                              {formik.errors.typeEvent}
                            </ErrorMessage>
                          ) : null}
                        </AnimatePresence>
                      </label>
                    </div>
                  </section>
                  <div className="w-full h-full">
                    <label className="">
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
                        className={`w-full h-full p-2 px-3 border-2 border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 ${
                          formik.touched.description &&
                          formik.errors.description
                            ? "border-red-500 dark:borde-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                      <div></div>
                      <AnimatePresence>
                        {formik.touched.description &&
                        formik.errors.description ? (
                          <ErrorMessage>
                            {formik.errors.description}
                          </ErrorMessage>
                        ) : null}
                      </AnimatePresence>
                    </label>
                  </div>
                </div>

                {/* container-footer */}
                <div className="flex items-center justify-end w-full gap-2 p-2 text-sm font-semibold bg-gray-200 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
                  <button
                    className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-600 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                    onClick={closeModal}
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
                  {success && null}
                  {error && <>{error}</>}
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
