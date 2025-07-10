import * as Yup from "yup";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import FormModal from "@/components/common/Ui/FormModal";
import Button from "@/components/common/Ui/Button";
import { createPortal } from "react-dom";
import { useTheme } from "@/context/blackWhiteContext";
import Select from "@/components/common/Ui/Select";
import Input from "@/components/common/Ui/Input";
import { useCreateMonitoringRaSg } from "../Hooks/useCreateMonitoringRaSg";
import { toast } from "react-toastify";

interface ModalGestionServicioProps {
  idRadicado: number | null;
  idCirugias: number | null;
  disabledButton?: boolean;
}

const ModalGestionServicio: React.FC<ModalGestionServicioProps> = ({
  idRadicado,
  idCirugias,
  disabledButton = false,
}) => {
  const { createMonitoring, error, loading } = useCreateMonitoringRaSg();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const user = localStorage.getItem("user");

  const idUsuario = user ? JSON.parse(user).id : "";

  const { theme } = useTheme();

  // Esquema de validación con Yup
  const validationSchema = useMemo(
    () =>
      Yup.object({
        estadoSeguimiento: Yup.string().required(
          "El estado de seguimiento es requerido."
        ),
        observacion: Yup.string()
          .min(10, "La observación debe tener al menos 10 caracteres.")
          .max(200, "La observación no debe exceder los 200 caracteres.")
          .required("La observación es requerida."),
      }),
    []
  );

  // Hook de Formik
  const formik = useFormik({
    initialValues: {
      estadoSeguimiento: "",
      observacion: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("observation", values.observacion);
      formData.append("status", values.estadoSeguimiento);

      try {
        let endPoint: string = "";

        if (idCirugias !== null) {
          formData.append("surgeryId", idCirugias.toString());
          formData.append("userId", idUsuario);
          endPoint = "seguimiento-auxiliar-cirugia";
        } else if (idRadicado !== null) {
          formData.append("idRadicacion", idRadicado.toString());
          formData.append("userId", idUsuario);
          endPoint = "seguimientos-auxiliares";
        }

        const response = await createMonitoring(formData, endPoint);

        if (
          (response && response.status === 200) ||
          (response && response.status === 201)
        ) {
          toast.success("Gestión registrada con éxito");
          formik.resetForm();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="md"
        disabled={disabledButton}
      >
        Registrar Gestión Servicio
      </Button>

      {isOpen &&
        createPortal(
          <div className={`${theme === "dark" ? "dark" : ""}`}>
            <FormModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Crear Gestión Servicio"
              onSubmit={formik.handleSubmit}
              isSubmitting={loading}
              isValid={formik.isValid}
              submitText="Crear"
              size="md"
            >
              <section className="py-2 px-4 max-h-[70Vh] overflow-y-auto grid grid-cols-2 mb-4 ms-2 dark:bg-gray-800 gap-12">
                <div className="">
                  <Select
                    options={[
                      { value: "1", label: "Asignado" },
                      { value: "2", label: "Cancelado" },
                      { value: "3", label: "Cerrado" },
                      { value: "4", label: "Cumplido" },
                      { value: "5", label: "Incumplido" },
                      { value: "6", label: "Pendiente" },
                      { value: "7", label: "Reprogramado" },
                      { value: "9", label: "Programado" },
                    ]}
                    label="Estado Seguimiento"
                    id="estadoSeguimiento"
                    name="estadoSeguimiento"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.estadoSeguimiento}
                    touched={formik.touched.estadoSeguimiento}
                    error={formik.errors.estadoSeguimiento}
                    required
                  />
                </div>

                <div>
                  <Input
                    label="Observación"
                    id="observacion"
                    name="observacion"
                    placeholder="Observación"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.observacion}
                    touched={formik.touched.observacion}
                    error={formik.errors.observacion}
                    required
                  />
                </div>
              </section>
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

export default ModalGestionServicio;
