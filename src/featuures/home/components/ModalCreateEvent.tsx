import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { IEventos } from "@/models/IEventos";
import { format } from "date-fns";
import { useAuth } from "@/context/authContext";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import { useCreateEvent } from "../hooks/useCreateEvent";
import { Bounce, toast } from "react-toastify";
import { FormatDate } from "@/utils/FormatDate";
import { FaCalendarAlt, FaClock, FaInfoCircle, FaTag } from "react-icons/fa";
import FormModal from "@/components/common/Ui/FormModal";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import { AnimatePresence } from "framer-motion";

interface ModalCreateEventProps {
  initialData?: IEventos;
}

const ModalCreateEvent: React.FC<ModalCreateEventProps> = ({ initialData }) => {
  const [isOpen, setIsOpen] = useState(false);

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
        formData.append(
          "dateStart",
          `${values.fechaInicio}T${values.horaInicio}`
        );
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

    <Button
     variant="primary"
     onClick={() => setIsOpen(true)}
    >
      Crear Evento
    </Button>
    
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={initialData ? "Datos Evento" : "Evento"}
        onSubmit={formik.handleSubmit}
        isSubmitting={loading || (initialData && !formik.dirty)}
        isValid={formik.isValid && formik.dirty}
        submitText="Crear"
      >
        {[1, 18].includes(Number(rol)) ? (
          <>
            <div className="grid grid-cols-2 gap-6 p-4 mb-4 md:gap-10">
              <div>
                <Input
                  type="text"
                  name="titulo"
                  label="Titulo:"
                  value={formik.values.titulo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingrese Título..."
                  error={formik.errors.titulo}
                  touched={formik.touched.titulo}
                  required
                  size="full"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="descripcion"
                  label="Descripción:"
                  value={formik.values.descripcion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingrese Descripción..."
                  error={formik.errors.descripcion}
                  touched={formik.touched.descripcion}
                  required
                  size="full"
                />
              </div>
              <div>
                <Input
                  type="color"
                  name="color"
                  label="Color:"
                  value={formik.values.color}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.color}
                  touched={formik.touched.color}
                  required
                  size="full"
                />
              </div>
              <div>
                <Input
                  type="date"
                  name="fechaInicio"
                  label="Fecha de Inicio:"
                  value={formik.values.fechaInicio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.fechaInicio}
                  touched={formik.touched.fechaInicio}
                  required
                  size="full"
                  className="text-[13px] md:text-[16px]"
                />
              </div>
              <div>
                <Input
                  type="time"
                  name="horaInicio"
                  label="Hora de Inicio:"
                  value={formik.values.horaInicio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.horaInicio}
                  touched={formik.touched.horaInicio}
                  required
                  size="full"
                  className="text-[13px] md:text-[16px]"
                />
              </div>
              <div>
                <Input
                  type="date"
                  name="fechaFin"
                  label="Fecha de Fin:"
                  value={formik.values.fechaFin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.fechaFin}
                  touched={formik.touched.fechaFin}
                  required
                  size="full"
                  className="text-[13px] md:text-[16px]"
                />
              </div>
              <div>
                <Input
                  type="time"
                  name="horaFin"
                  label="Hora de Fin:"
                  value={formik.values.horaFin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.horaFin}
                  touched={formik.touched.horaFin}
                  required
                  size="full"
                  className="text-[13px] md:text-[16px]"
                />
              </div>
            </div>

            \ <AnimatePresence>
            {error && (
              <div>
                <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                  {error}
                </div>
              </div>
            )}
          </AnimatePresence>
          </>
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
      </FormModal>
    </>
  );
};

export default ModalCreateEvent;
