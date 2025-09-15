import React, { useState } from "react";
import Button from "../Ui/Button";
import { IArea } from "@/models/IArea";
import FormModal from "../Ui/FormModal";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "../Ui/Input";
import Select from "../Ui/Select";
import InputAutocompletado from "../InputAutoCompletado/InputAutoCompletado";
import { useAreaMutation } from "./Hooks/useAreaMutation";
import { AnimatePresence } from "framer-motion";

interface ModalMutationAreaProps {
  onSuccess: () => void;
  item?: IArea;
}

const ModalMutationArea: React.FC<ModalMutationAreaProps> = ({
  onSuccess,
  item,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isLoading, error, create, update } = useAreaMutation();

  const validationSchema = {
    name: Yup.string().required("El nombre es obligatorio"),
    description: Yup.string().optional(),
    status: Yup.boolean().required("El estado es obligatorio"),
    managerId: Yup.number().required("El jefe es obligatorio"),
  };

  const formik = useFormik({
    initialValues: {
      name: item ? item.name : "",
      description: item ? item.description : "",
      status: item ? item.status : true,
      managerId: item ? item.managerId : 0,
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      try {
        item
          ? update(item.id, values, () => {
              onSuccess();
              setIsOpen(false);
              formik.resetForm();
            })
          : create(values, () => {
              onSuccess();
              setIsOpen(false);
              formik.resetForm();
            });
      } catch (error) {
        console.error("Error inesperado", error);
      }
    },
  });

  return (
    <>
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        {item ? "Editar" : "Crear Area"}
      </Button>
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={item ? "Editar Area" : "Crear Area"}
        onSubmit={formik.handleSubmit}
        size="lg"
        isValid={formik.isValid && formik.dirty}
        isSubmitting={formik.isSubmitting || isLoading}
        submitText="Guardar"
      >
        <div className="grid grid-cols-2 gap-4 py-3 px-6 ovcerflow-y-auto">
          <Input
            label="Nombre"
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : undefined
            }
            touched={formik.touched.name}
            required
          />
          <Input
            label="Descripcion"
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            error={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : undefined
            }
            touched={formik.touched.description}
          />
          <Select
            label="Estado"
            id="status"
            name="status"
            options={[
              { value: 1, label: "Activo" },
              { value: 0, label: "Inactivo" },
            ]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status ? 1 : 0}
            error={
              formik.touched.status && formik.errors.status
                ? formik.errors.status
                : undefined
            }
            touched={formik.touched.status}
            required
          />
          <InputAutocompletado
            label="Jefe"
            onInputChanged={(value) => formik.setFieldValue("managerId", value)}
            apiRoute="search-user-by-name"
            error={
              formik.touched.managerId && formik.errors.managerId
                ? formik.errors.managerId
                : undefined
            }
            touched={formik.touched.managerId}
            required={true}
            placeholder="Ej: Juan Perez"
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
      </FormModal>
    </>
  );
};

export default ModalMutationArea;
