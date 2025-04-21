import { useFormik } from "formik";
import { AnimatePresence } from "framer-motion";
import React from "react";
import * as Yup from "yup";
import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals";
import { IEventos } from "@/models/IEventos";
import { format } from "date-fns";
import { useAuth } from "@/context/authContext";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import { useCreateEvent } from "../hooks/useCreateEvent";
import { Bounce, toast } from "react-toastify";
import { FormatDate } from "@/utils/FormatDate";
import { FaCalendarAlt, FaClock, FaInfoCircle, FaTag } from "react-icons/fa";

interface ModalCrearEventoProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: IEventos;
}

const ModalCrearEvento: React.FC<ModalCrearEventoProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const { actionEvent, success, error, loading } = useCreateEvent();

  useBlockScroll(isOpen);

  const validationSchema = Yup.object({
    titulo: Yup.string()
      .required("El título es requerido")
      .min(2, "El título debe tener al menos 2 caracteres")
      .max(200, "El título debe tener máximo 200 caracteres"),
    descripcion: Yup.string()
      .required("La descripción es requerida")
      .min(2, "La descripción debe tener al menos 2 caracteres")
      .max(300, "La descripción debe tener máximo 300 caracteres"),
    color: Yup.string().required("El color es requerido"),
    fechaInicio: Yup.date().required("La fecha de inicio es requerida"),
    fechaFin: Yup.date().required("La fecha de fin es requerida"),
    horaInicio: Yup.string().required("La hora de inicio es requerida"),
    horaFin: Yup.string().required("La hora de fin es requerida"),
  });

  // Función para extraer fecha y hora separadas
  const extractFechaHora = (fechaCompleta: Date) => {
    if (!fechaCompleta) return { fecha: "", hora: "" };
    
    const date = new Date(fechaCompleta);
    const fecha = format(date, "yyyy-MM-dd");
    const hora = format(date, "HH:mm");
    
    return { fecha, hora };
  };

  // configuración de formik
  const formik = useFormik({
    initialValues: {
      titulo: initialData?.title || "",
      descripcion: initialData?.description || "",
      color: initialData?.color || "#000000",
      fechaInicio: initialData?.dateStart 
        ? extractFechaHora(initialData.dateStart).fecha 
        : "",
      fechaFin: initialData?.dateEnd 
        ? extractFechaHora(initialData.dateEnd).fecha 
        : "",
      horaInicio: initialData?.dateStart 
        ? extractFechaHora(initialData.dateStart).hora 
        : "",
      horaFin: initialData?.dateEnd 
        ? extractFechaHora(initialData.dateEnd).hora 
        : "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("title", values.titulo);
        formData.append("description", values.descripcion);
        formData.append("color", values.color);
        formData.append("dateStart", `${values.fechaInicio}T${values.horaInicio}`);
        formData.append("dateEnd", `${values.fechaFin}T${values.horaFin}`);
        formData.append("timeStart", values.horaInicio);
        formData.append("timeEnd", values.horaFin);

        const response = await actionEvent(formData, initialData?.id);

        if (response?.status === 200 || (response?.status === 201 && success)) {
          formik.resetForm();
          toast.success("Evento creado exitosamente.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        console.log(`Ocurrió un error inesperado: ${error}`);
      }
    },
  });

  const { rol } = useAuth();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-5 0 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-lg w-[430px] sm:w-[600px] md:w-[650px] h-fit dark:bg-gray-800 dark:text-white">
            <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
              <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
                {initialData ? "Datos Evento" : "Evento"}
              </h1>
              <button
                onClick={onClose}
                // disabled={!videoCompleted || loading || !success}
                className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
              >
                &times;
              </button>
            </div>
            {[1, 18].includes(Number(rol)) ? (
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-6 p-4 mb-4 md:gap-10">
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 text-md md:text-lg dark:text-gray-200">
                      Titulo:
                    </label>
                    <input
                      type="text"
                      name="titulo"
                      value={formik.values.titulo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese Título..."
                      className={` w-full px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${formik.touched.titulo} && formik.errors.titulo}
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    <AnimatePresence>
                      {formik.touched.titulo && formik.errors.titulo ? (
                        <ErrorMessage>{formik.errors.titulo}</ErrorMessage>
                      ) : null}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 text-md md:text-lg dark:text-gray-200">
                      Descripción:
                    </label>
                    <input
                      type="text"
                      name="descripcion"
                      value={formik.values.descripcion}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese Descripción..."
                      className={` w-full px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                        formik.touched.descripcion && formik.errors.descripcion
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    <AnimatePresence>
                      {formik.touched.descripcion &&
                      formik.errors.descripcion ? (
                        <ErrorMessage>{formik.errors.descripcion}</ErrorMessage>
                      ) : null}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 text-md md:text-lg dark:text-gray-200">
                      Color:
                    </label>
                    <input
                      type="color"
                      name="color"
                      value={formik.values.color}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese Descripción..."
                      className={` w-full px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                        formik.touched.color && formik.errors.color
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    <AnimatePresence>
                      {formik.touched.color && formik.errors.color ? (
                        <ErrorMessage>{formik.errors.color}</ErrorMessage>
                      ) : null}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 text-md md:text-lg dark:text-gray-200">
                      Fecha de Inicio:
                    </label>
                    <input
                      type="date"
                      name="fechaInicio"
                      value={formik.values.fechaInicio}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`text-[13px] md:text-[16px] w-full px-1 md:px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                        formik.touched.fechaInicio && formik.errors.fechaInicio
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    <AnimatePresence>
                      {formik.touched.fechaInicio &&
                      formik.errors.fechaInicio ? (
                        <ErrorMessage>{formik.errors.fechaInicio}</ErrorMessage>
                      ) : null}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 text-md md:text-lg dark:text-gray-200">
                      Hora de Inicio:
                    </label>
                    <input
                      type="time"
                      name="horaInicio"
                      value={formik.values.horaInicio}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`text-[13px] md:text-[16px] w-full px-1 md:px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                        formik.touched.horaInicio && formik.errors.horaInicio
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    <AnimatePresence>
                      {formik.touched.horaInicio &&
                      formik.errors.horaInicio ? (
                        <ErrorMessage>{formik.errors.horaInicio}</ErrorMessage>
                      ) : null}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 text-md md:text-lg dark:text-gray-200">
                      Fecha de Fin:
                    </label>
                    <input
                      type="date"
                      name="fechaFin"
                      value={formik.values.fechaFin}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`text-[13px] md:text-[16px] w-full px-1 md:px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                        formik.touched.fechaFin && formik.errors.fechaFin
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    <AnimatePresence>
                      {formik.touched.fechaFin && formik.errors.fechaFin ? (
                        <ErrorMessage>{formik.errors.fechaFin}</ErrorMessage>
                      ) : null}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 text-md md:text-lg dark:text-gray-200">
                      Hora de Fin:
                    </label>
                    <input
                      type="time"
                      name="horaFin"
                      value={formik.values.horaFin}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`text-[13px] md:text-[16px] w-full px-1 md:px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                        formik.touched.horaFin && formik.errors.horaFin
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    <AnimatePresence>
                      {formik.touched.horaFin && formik.errors.horaFin ? (
                        <ErrorMessage>{formik.errors.horaFin}</ErrorMessage>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>

                {error && (
                  <div className="text-red-500 dark:text-red-300">{error}</div>
                )}

                <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-gray-300 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
                  <button
                    onClick={onClose}
                    className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-500 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                    disabled={loading}
                  >
                    Cerrar
                  </button>
                  <button
                    className={`w-20 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-800 dark:hover:bg-gray-600 ${
                      loading || (initialData && !formik.dirty)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    type="submit"
                    disabled={loading || (initialData && !formik.dirty)}
                  >
                    {initialData ? "Actualizar" : "Subir"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 w-[430px] sm:w-[600px] md:w-[650px] h-fit">
                <h2 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-200">
                  Detalles del Evento
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center">
                    <FaTag className="mr-2 text-blue-500" />
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      Evento:
                    </span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {initialData?.title || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaInfoCircle className="mr-2 text-green-500" />
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      Descripción:
                    </span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {initialData?.description || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-purple-500" />
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      Fecha Inicio:
                    </span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {initialData?.dateStart
                        ? FormatDate(initialData.dateStart)
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-red-500" />
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      Fecha Fin:
                    </span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {initialData?.dateEnd
                        ? FormatDate(initialData.dateEnd)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCrearEvento;
