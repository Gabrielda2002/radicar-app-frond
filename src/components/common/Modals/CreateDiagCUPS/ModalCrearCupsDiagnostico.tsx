//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Button from "../../Ui/Button";
import FormModal from "../../Ui/FormModal";
import Input from "../../Ui/Input";
import { useCUPSDiagMutations } from "../UpdateDiagCUPS/Hook/useCUPSDiagMutations";

interface ModalCrearCupsDiagnosticoProps {
  modulo: string;
  onSuccess?: () => void;
}

const ModalCrearCupsDiagnostico: React.FC<ModalCrearCupsDiagnosticoProps> = ({
  modulo,
  onSuccess,
}) => {
  const [stadopen, setStadopen] = useState(false);

  // const { createCUPS,error, loading} = useCUPS();
  const { createCUPSDiag, error, loading } = useCUPSDiagMutations();

  const validationSchema = Yup.object({
    code: Yup.string().when("modulo", {
      is: (value: string) => value === "diagnostico",
      then: (schema) => schema
        .required("El código es requerido")
        .matches(
          /^[a-zA-Z]{1,2}(\d{1,3}[a-zA-Z]?|[a-zA-Z]{1})$/,
          "El código debe tener 1 o 2 letras seguidas de 1 a 3 dígitos y opcionalmente una letra"
        ),
      otherwise: (schema) => schema
        .required("El código es requerido")
        .min(1, "El código debe tener al menos 1 caracter")
        .max(10, "El código debe tener máximo 10 caracteres"),
    }),
    description: Yup.string()
      .required("La descripción es requerida")
      .min(3, "La descripción debe tener al menos 3 caracteres")
      .max(255, "La descripción debe tener máximo 255 caracteres"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
      description: "",
      modulo: modulo,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {

        await  createCUPSDiag(
          values,
          modulo == "cups" ? "servicio-solicitado" : "diagnosticos", () => {
            setStadopen(false);
            formik.resetForm();
            if (onSuccess) {
              onSuccess();
            }
          }
        );

      } catch (error) {

      }
    },
  });
  return (
    <>
      <Button onClick={() => setStadopen(true)} variant="primary">
        Agregar {modulo === "cups" ? "CUPS" : "Diagnóstico"}
      </Button>

      <FormModal
        isOpen={stadopen}
        onClose={() => setStadopen(false)}
        title={`Crear ${modulo === "cups" ? "CUPS" : "Diagnóstico"}`}
        onSubmit={formik.handleSubmit}
        isSubmitting={formik.isSubmitting || loading}
        isValid={formik.isValid}
        size="lg"
      >
        <div className="grid grid-cols-2 gap-4 p-3 mb-4 md:gap-10">
          <div>
            <Input
              label="Código"
              type="text"
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingrese código..."
              error={formik.errors.code}
              touched={formik.touched.code}
              required
            />
          </div>
          <div>
            <Input
              label="Descripción"
              type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingrese Descripción..."
              error={formik.errors.description}
              touched={formik.touched.description}
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
    </>
  );
};

export default ModalCrearCupsDiagnostico;
