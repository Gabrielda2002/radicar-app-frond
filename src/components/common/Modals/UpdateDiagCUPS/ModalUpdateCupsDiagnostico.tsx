//*Funciones y Hooks
import * as Yup from "yup";
import { useState, useMemo } from "react";
import { useFormik } from "formik";
//*Icons
import onOff from "/assets/on-off.svg";
import FormModal from "../../Ui/FormModal";
import Input from "../../Ui/Input";
import Select from "../../Ui/Select";
import { useUpdateCUPSDiag } from "./Hook/useUpdateCUPSDiag";
import { AnimatePresence } from "framer-motion";
import { ICups } from "@/models/ICups";
import { IDiagnostico } from "@/models/IDiagnostico";
import Button from "../../Ui/Button";

interface ModalUpdateCupsDiagnosticoProps {
  item: ICups | IDiagnostico;
  modulo: string;
  onSuccess?: () => void;
}

const ModalUpdateCupsDiagnostico: React.FC<ModalUpdateCupsDiagnosticoProps> = ({
  item,
  modulo,
  onSuccess,
}) => {
  const [stadopen, setStadopen] = useState(false);

  const { error, loading, updateCUPSDiag } = useUpdateCUPSDiag();

  // Paso 2: Definir valores iniciales como una variable separada para poder compararlos
  const initialValues = useMemo(() => ({
    id: item.id,
    status: (item as ICups) ? ((item as ICups).status ? 1 : 0) : undefined,
    description: (item as ICups)
      ? (item as ICups).name
      : (item as IDiagnostico).description,
    modulo: modulo,
  }), [item, modulo]);

  const validationSchema = Yup.object({
    description: Yup.string()
      .min(3, "Mínimo 3 caracteres")
      .required("El nombre del cups es requerido")
      .max(255, "Máximo 255 caracteres"),
    status: Yup.number().when("modulo", {
      is: (value: string) => value === "cups",
      then: (schema) => schema.required("El estado es requerido"),
      otherwise: (schema) => schema.optional(),
    }),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const endPoint =
          modulo === "cups"
            ? "servicio-solicitado-update-table"
            : "diagnosticos";

        await updateCUPSDiag(values, item.id, endPoint, () => {
          setStadopen(false);
          formik.resetForm();
          if (onSuccess) {
            onSuccess();
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  // Paso 4: Función para detectar si hay cambios reales en los datos
  const hasChanges = useMemo(() => {
    // Comparar solo los campos editables (excluyendo id y modulo)
    const editableFields = modulo === "cups" 
      ? ['description', 'status'] 
      : ['description'];
    
    return editableFields.some(field => {
      const currentValue = formik.values[field as keyof typeof formik.values];
      const initialValue = initialValues[field as keyof typeof initialValues];
      return currentValue !== initialValue;
    });
  }, [formik.values, initialValues, modulo]);

  // Paso 5: El formulario es válido Y tiene cambios
  const canSubmit = formik.isValid && hasChanges;

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setStadopen(true)}
        icon={<img className="dark:invert " src={onOff} alt="" />}
      />

      <FormModal
        isOpen={stadopen}
        onClose={() => setStadopen(false)}
        title={`${
          modulo === "cups" ? "Modificar CUPS" : "Modificar Diagnóstico"
        }`}
        onSubmit={formik.handleSubmit}
        isSubmitting={formik.isSubmitting || loading}
        isValid={canSubmit}
        size="lg"
        submitText="Guardar"
      >
        <section className="grid grid-cols-1 md:grid-cols-3 py-3 px-5 gap-4">
          <Input
            label={`${modulo === "cups" ? "ID CUPS" : "ID Diagnóstico"}`}
            type="text"
            id="id"
            name="id"
            value={formik.values.id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched && formik.errors.id ? formik.errors.id : undefined
            }
            touched={formik.touched.id}
            disabled
            required
          />
          {modulo === "cups" && (
            <Select
              label="Estado"
              options={[
                { value: 1, label: "Activo" },
                { value: 0, label: "Inactivo" },
              ]}
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.status && formik.errors.status
                  ? formik.errors.status
                  : undefined
              }
              touched={formik.touched.status}
            />
          )}
          <Input
            label={`${
              modulo === "cups" ? "Descripción Cups" : "Descripción Diagnóstico"
            }`}
            type="text"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : undefined
            }
            touched={formik.touched.description}
            required
          />
          <AnimatePresence>
            {error && (
              <div>
                <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                  {error}
                </div>
              </div>
            )}
          </AnimatePresence>
        </section>
      </FormModal>
    </>
  );
};

export default ModalUpdateCupsDiagnostico;
