//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import FormModal from "@/components/common/Ui/FormModal";
import { createPortal } from "react-dom";
import { useTheme } from "@/context/blackWhiteContext";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { AnimatePresence } from "framer-motion";
import useStoreMonitoringItem from "../../Store/useStoreMonitoringItem";

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

  const { isLoading, error, addMonitoring } = useStoreMonitoringItem();

  const { theme } = useTheme();

  const user = localStorage.getItem("user");

  const idUsuario = user ? JSON.parse(user).id : "";

  const validationSchema = Yup.object({
    eventDate: Yup.date().required("La fecha es requerida"),
    typeEvent: Yup.string().required("El tipo de evento es requerido"),
    description: Yup.string()
      .required("La descripción es requerida")
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .max(600, "La descripción debe tener como máximo 600 caracteres"),
  });

  const formik = useFormik<{
    eventDate: string;
    typeEvent: string;
    description: string;
    itemId: string;
    managerId: string;
  }>({
    initialValues: {
      eventDate: "",
      typeEvent: "",
      description: "",
      itemId: id.toString(),
      managerId: idUsuario.toString(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      const endPoint = tipoItem == "equipos"
        ? "seguimiento-equipos"
        : tipoItem === "dispositivos-red"
          ? "seguimiento-dispositivos-red"
          : tipoItem === "inventario/general"
            ? "seguimiento/inventario-general"
            : tipoItem === "inventario/televisores"
              ? "seguimiento/televisor"
              : "seguimiento/celulares"

      await addMonitoring(
        values,
        endPoint,
        () => {
          refreshItems();
          setStadopen(false);
          toast.success("Seguimiento agregado correctamente");
        }
      );
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
          <div className={`fixed inset-0 z-100 flex items-center justify-center ${theme === 'dark' ? 'dark' : ''}`}>
            <FormModal
              isOpen={stadopen}
              onClose={() => setStadopen(false)}
              onSubmit={formik.handleSubmit}
              title="Nuevo Seguimiento"
              size="lg"
              className="max-w-2xl dark:bg-gray-800 dark:text-gray-200"
              isSubmitting={isLoading}
              isValid={formik.isValid}
              submitText="Guardar"
            >
              <div className="p-6">
                <section className="grid grid-cols-2 gap-2">
                  <div className="flex">
                    <Input
                      type="date"
                      name="eventDate"
                      label="Fecha de Evento"
                      value={formik.values.eventDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      touched={formik.touched.eventDate}
                      error={formik.errors.eventDate}
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
                        { value: "MANTENIMIENTO PREVENTIVO", label: "Mantenimiento Preventivo" },
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

              <AnimatePresence>
                {error && (
                  <div>
                    <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                      {error}
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </FormModal>
          </div>,
          document.body
        )}
    </>
  );
};

export default ModalSeguimientoItem;
