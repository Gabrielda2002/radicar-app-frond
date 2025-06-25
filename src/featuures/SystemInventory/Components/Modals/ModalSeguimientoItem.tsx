//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { createMonitoringItem } from "@/featuures/SystemInventory/Services/CreateMonitoringItem";
import { toast } from "react-toastify";
import FormModal from "@/components/common/Ui/FormModal";
import { createPortal } from "react-dom";
import { useTheme } from "@/context/blackWhiteContext";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";

interface ModalSeguimientoItemProps {
  id: number;
  tipoItem: string | null;
  refreshItems: () => void;
}

const ModalSeguimientoItem: React.FC<ModalSeguimientoItemProps> = ({
  id,
  tipoItem,
  refreshItems,
}) => {
  const [stadopen, setStadopen] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { theme} = useTheme();

  const user = localStorage.getItem("user");

  const idUsuario = user ? JSON.parse(user).id : "";

  const validationSchema = Yup.object({
    dateEvent: Yup.date().required("La fecha es requerida"),
    typeEvent: Yup.string().required("El tipo de evento es requerido"),
    description: Yup.string()
      .required("La descripción es requerida")
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .max(600, "La descripción debe tener como máximo 600 caracteres"),
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
        formData.append("itemId", id.toString());
        formData.append("eventDate", values.dateEvent);
        formData.append("typeEvent", values.typeEvent);
        formData.append("description", values.description);
        formData.append("responsable", idUsuario);

        const response = await createMonitoringItem(
          formData,
          tipoItem == "equipos"
            ? "seguimiento-equipos"
            : tipoItem === "dispositivos-red"
            ? "seguimiento-dispositivos-red"
            : tipoItem === "inventario/general"
            ? "seguimiento/inventario-general"
            : tipoItem === "inventario/televisores"
            ? "seguimiento/televisor"
            : "seguimiento/celulares"
        );

        if (response?.status === 201 || response?.status === 200) {
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
          formik.resetForm();
          if (refreshItems) {
            refreshItems();
          }
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

  return (
    <>
      <button
        className="p-2 duration-300 bg-gray-300 border-2 rounded-lg focus:outline-none hover:bg-gray-700 hover:text-white dark:bg-color dark:hover:bg-teal-600 dark:text-white"
        onClick={() => setStadopen(true)}
      >
        Nuevo seguimiento
      </button>

      {stadopen &&
        createPortal(
          <div className={`fixed inset-0 z-[100] flex items-center justify-center ${theme === 'dark' ? 'dark' : ''}`}>
            <FormModal
              isOpen={stadopen}
              onClose={() => setStadopen(false)}
              onSubmit={formik.handleSubmit}
              title="Nuevo Seguimiento"
              size="sm"
              className="max-w-2xl dark:bg-gray-800 dark:text-gray-200"
              isSubmitting={submitting}
              isValid={formik.isValid}
              submitText="Guardar"
            >
              <div className="p-6">
                <section className="grid grid-cols-2 gap-2">
                  <div className="flex">
                    <Input
                      type="date"
                      name="dateEvent"
                      label="Fecha de Evento"
                      value={formik.values.dateEvent}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      touched={formik.touched.dateEvent}
                      error={formik.errors.dateEvent}
                      required
                    />
                  </div>
                  <div className="flex">
                    <Select
                      name="typeEvent"
                      label="Tipo de Evento"
                      value={formik.values.typeEvent}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      touched={formik.touched.typeEvent}
                      error={formik.errors.typeEvent}
                      required
                      options={[
                        { value: "", label: "- SELECT -" },
                        { value: "MANTENIMIENTO PREVENTIVO", label: "Mantenimiento Preventivo" },
                        { value: "MANTENIMIENTO CORRECTIVO", label: "Mantenimiento Correctivo" },
                        { value: "CAMBIO DE DISPOSITIVO", label: "Cambio de Dispositivo" },
                        { value: "ENTREGA EQUIPO", label: "Entrega Equipo" },
                        { value: "RETIRO EQUIPO", label: "Retiro Equipo" },
                        { value: "DAR DE BAJA", label: "Dar de Baja" },
                        { value: "TRASLADO", label: "Traslado" },
                      ]}
                    />
                  </div>
                </section>
                <div className="w-full h-full">
                  <Input
                    type="text"
                    name="description"
                    label="Descripción del evento"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.description}
                    error={formik.errors.description}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center justify-center w-full p-2 text-sm font-semibold text-red-500 bg-red-100 border-2 border-red-500 rounded-md dark:bg-red-900 dark:text-red-200 dark:border-red-700">
                  {error}
                </div>
              )}
            </FormModal>
          </div>,
          document.body
        )}
    </>
  );
};

export default ModalSeguimientoItem;
