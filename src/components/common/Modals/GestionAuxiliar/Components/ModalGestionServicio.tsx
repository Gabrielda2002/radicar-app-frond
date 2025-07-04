import * as Yup from "yup";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { submitGestionAuxiliar } from "../Services/submitGestionAuxiliar";
import FormModal from "@/components/common/Ui/FormModal";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { createPortal } from "react-dom";
import { useTheme } from "@/context/blackWhiteContext";

interface ModalGestionServicioProps {
  idRadicado: number | null;
  idCirugias: number | null;
  isDisabledButton?: boolean;
}

const ModalGestionServicio: React.FC<ModalGestionServicioProps> = ({
  idRadicado,
  idCirugias,
}) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const user = localStorage.getItem("user");

  const idUsuario = user ? JSON.parse(user).id : "";

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
      setIsSubmitting(true);
      setSuccess(false);

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

        const response = await submitGestionAuxiliar(formData, endPoint);

        if (response && response.status === 200) {
          setSuccess(true);
          setTimeout(() => {
            setIsOpen(false);
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
    <>
      <Button variant="primary" type="button" onClick={() => setIsOpen(true)}>
        Registrar Gestión
      </Button>
      {isOpen &&
        createPortal(
          <div
            className={`fixed inset-0 z-[100] flex items-center justify-center ${
              theme === "dark" ? "dark" : ""
            }`}
          >
            <FormModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Registrar Gestión"
              onSubmit={formik.handleSubmit}
              isSubmitting={isSubmitting}
              isValid={formik.isValid}
              submitText="Guardar"
              className="max-h-[90vh] overflow-y-auto"
              size="sm"
            >
              <section className="py-2 px-4 max-h-[70Vh] overflow-y-auto grid grid-cols-2 mb-4 ms-2 dark:bg-gray-800 gap-12">
                <div>
                  <Select
                    id="estadoSeguimiento"
                    name="estadoSeguimiento"
                    label="Estado Seguimiento"
                    required
                    options={[
                      { value: "", label: "- SELECT -" },
                      { value: "1", label: "Asignado" },
                      { value: "2", label: "Cancelado" },
                      { value: "3", label: "Cerrado" },
                      { value: "4", label: "Cumplido" },
                      { value: "5", label: "Incumplido" },
                      { value: "6", label: "Pendiente" },
                      { value: "7", label: "Reprogramado" },
                      { value: "9", label: "Programado" },
                    ]}
                    value={formik.values.estadoSeguimiento}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.estadoSeguimiento}
                    touched={formik.touched.estadoSeguimiento}
                    disabled={isSubmitting}
                    selectSize="md"
                    variant="default"
                  />
                </div>
                <div>
                  <Input
                    id="observacion"
                    name="observacion"
                    label="Observación"
                    required
                    placeholder="Observación . . ."
                    value={formik.values.observacion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.observacion}
                    touched={formik.touched.observacion}
                    disabled={isSubmitting}
                    size="md"
                    variant="default"
                    maxLength={200}
                    helpText="Mínimo 10 y máximo 200 caracteres."
                  />
                </div>
              </section>
              {success && (
                <div className="mb-4 text-green-500">
                  ¡Gestión registrada con éxito!
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
