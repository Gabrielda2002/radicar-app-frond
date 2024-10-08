import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { submitGestionAuxiliar } from "../../../services/submitGestionAuxiliar";

interface ModalGestionServicioProps {
  onClose: () => void;
  idRadicado: number;
}

const ModalGestionServicio: React.FC<ModalGestionServicioProps> = ({
  onClose,
  idRadicado,
}) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    estadoSeguimiento: Yup.string().required("El estado de seguimiento es requerido."),
    observacion: Yup.string()
      .min(10, "La observación debe tener al menos 10 caracteres.")
      .max(200, "La observación no debe exceder los 200 caracteres.")
      .required("La observación es requerida."),
  });

  // Hook de Formik
  const formik = useFormik({
    initialValues: {
      estadoSeguimiento: "",
      observacion: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSuccess(false);

      const formData = new FormData();
      formData.append("observation", values.observacion);
      formData.append("status", values.estadoSeguimiento);
      formData.append("idRadicacion", idRadicado.toString());

      try {
        const response = await submitGestionAuxiliar(formData);

        if (response && response.status === 200) {
          setSuccess(true);
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 2000);
        } else {
          throw new Error("Error al registrar la gestión.");
        }
      } catch (error) {
        console.error(error);
      }

      setIsSubmitting(false);
    },
  });

  return (
    <section className="fixed inset-0 z-50 flex justify-center pt-14   transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm">
      <section>
        <div className="w-full bg-white shadow-lg transform transition-transform duration-300 overflow-hidden rounded dark:bg-gray-800">
          <div className="flex items-center justify-between px-2 py-2">
            <h1 className="text-xl font-semibold text-color dark:text-gray-200">
              Gestión Servicio Cliente
            </h1>
            <button onClick={onClose} className="text-xl text-gray-500 hover-gray-700 pr-2">
              &times;
            </button>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <section className="py-2 px-4 max-h-[70Vh] overflow-y-auto grid grid-cols-2 mb-4 ms-2 dark:bg-gray-800">
              <div className="flex">
                <label htmlFor="estadoSeguimiento">
                  <span className="flex mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white">
                    Estado Seguimiento
                  </span>
                  <select
                    id="estadoSeguimiento"
                    name="estadoSeguimiento"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.estadoSeguimiento}
                    className="w-[200px] px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-gray-200 dark:bg-gray-800"
                  >
                    <option value="">- SELECT -</option>
                    <option value="1">Asignado</option>
                    <option value="2">Cancelado</option>
                    <option value="3">Cerrado</option>
                    <option value="4">Cumplido</option>
                    <option value="5">Incumplido</option>
                    <option value="6">Pendiente</option>
                    <option value="7">Reprogramado</option>
                  </select>
                  {formik.touched.estadoSeguimiento && formik.errors.estadoSeguimiento && (
                    <p className="text-red-500">{formik.errors.estadoSeguimiento}</p>
                  )}
                </label>
              </div>

              <div>
                <label htmlFor="observacion">
                  <span className="flex mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white">
                    Observación
                  </span>
                  <textarea
                    id="observacion"
                    name="observacion"
                    placeholder="Observación . . ."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.observacion}
                    className={`w-[300px] px-3 py-2 border rounded dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${
                      formik.touched.observacion && formik.errors.observacion ? "border-red-500" : "border-gray-300"
                    }`}
                  ></textarea>
                  {formik.touched.observacion && formik.errors.observacion && (
                    <p className="text-red-500">{formik.errors.observacion}</p>
                  )}
                </label>
              </div>
            </section>

            <div className="flex items-center justify-end w-full h-12 gap-2 px-4 py-4 text-sm font-semibold bg-white dark:bg-gray-800">
              <button
                type="button"
                className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={onClose}
              >
                Cerrar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formik.isValid}
                className={`w-16 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>

          {success && <div className="mb-4 text-green-500">¡Gestión registrada con éxito!</div>}
        </div>
      </section>
    </section>
  );
};

export default ModalGestionServicio;
