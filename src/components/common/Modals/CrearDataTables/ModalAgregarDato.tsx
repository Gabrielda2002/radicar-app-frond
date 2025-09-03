//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import FormModal from "../../Ui/FormModal";
import Input from "../../Ui/Input";
import Button from "../../Ui/Button";
import { useTableMutations } from "./Hook/useTablesMutations";
import { AnimatePresence } from "framer-motion";

interface ModalTipoServicioProps {
  name: string;
  endPoint: string;
  onSuccess?: () => void;
}

const ModalAgregarDato: React.FC<ModalTipoServicioProps> = ({
  name,
  endPoint,
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { create, error, loading } = useTableMutations();

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await create(values, endPoint, () => {
          formik.resetForm();
          setIsOpen(false);
          if (onSuccess) {
            onSuccess();
          }
        });
      } catch (error) {}
    },
  });

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        {`Agregar ${name}`}
      </Button>
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Agregar ${name}`}
        onSubmit={formik.handleSubmit}
        isSubmitting={formik.isSubmitting || loading}
        isValid={formik.isValid}
        submitText="Agregar"
        size="lg"
      >
        <div className="grid grid-cols-1 gap-10 mb-4">
          <div className="p-4">
            <Input
              label={`Nombre del ${name}`}
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={`Nombre del ${name}`}
              error={
                formik.errors && formik.touched.name
                  ? formik.errors.name
                  : undefined
              }
              touched={formik.touched.name}
              required
            />
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
        </div>
      </FormModal>
    </>
  );
};

export default ModalAgregarDato;
