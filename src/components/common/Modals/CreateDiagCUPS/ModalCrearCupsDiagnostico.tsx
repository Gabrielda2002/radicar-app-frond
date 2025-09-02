//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Button from "../../Ui/Button";
import FormModal from "../../Ui/FormModal";
import { useCUPS } from "@/featuures/CUPS/Hook/useCUPS";
import Input from "../../Ui/Input";

interface ModalCrearCupsDiagnosticoProps {
  modulo: string;
  onSuccess?: () => void;
}

const ModalCrearCupsDiagnostico: React.FC<ModalCrearCupsDiagnosticoProps> = ({
  modulo,
  onSuccess,
}) => {
  const [stadopen, setStadopen] = useState(false);

  const { createCUPS,error, loading} = useCUPS();

  const getValidationSchema = (Modulo: string) => {
    const validationSchema = {
      description: Yup.string()
        .required("El nombre del cups es requerido")
        .min(1, "El nombre del cups debe tener al menos 1 caracter")
        .max(150, "El nombre del cups debe tener máximo 150 caracteres"),
    };

    if (Modulo === "diagnostico") {
      return {
        ...validationSchema,
        code: Yup.string()
          .required("El estado del cups es requerido")
          .matches(
            /^[a-zA-Z]{1,2}(\d{1,3}[a-zA-Z]?|[a-zA-Z]{1})$/,
            "El código debe tener 1 o 2 letras seguidas de 1 a 3 dígitos y opcionalmente una letra"
          ),
      };
    } else {
      return {
        ...validationSchema,
        code: Yup.string()
          .required("El estado del cups es requerido")
          .min(1, "El código debe tener al menos 1 caracter")
          .max(10, "El código debe tener máximo 10 caracteres"),
      };
    }

    return validationSchema;
  };

  const formik = useFormik({
    initialValues: {
      code: "",
      description: "",
    },
    validationSchema: Yup.object(getValidationSchema(modulo)),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("code", values.code);
        formData.append("name", values.description);

        const response = await createCUPS(
          formData,
          modulo == "cups" ? "servicio-solicitado" : "diagnosticos"
        );

        if (response?.status === 200 || response?.status === 201) {
            setStadopen(false);
            formik.resetForm();
            if (onSuccess) {
              onSuccess();
            }
        }
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
