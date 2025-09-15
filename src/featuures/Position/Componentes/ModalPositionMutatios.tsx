import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import Button from "@/components/common/Ui/Button";
import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { IPosition } from "@/models/IPosition";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { usePositionMutation } from "../Hooks/usePositionMutation";
import { AnimatePresence } from "framer-motion";

interface ModalPositionMutatiosProps {
  item: IPosition | null;
  onSuccess: () => void;
}

const ModalPositionMutatios: React.FC<ModalPositionMutatiosProps> = ({
  item,
  onSuccess,
}: ModalPositionMutatiosProps) => {
  const [isOpnen, setIsOpen] = useState<boolean>(false);

  const { create, update, error, isLoading } = usePositionMutation();

  const validationSchema = {
    name: Yup.string()
      .required("El nombre es obligatorio")
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(200, "El nombre no debe exceder los 200 caracteres"),
    description: Yup.string()
      .optional()
      .max(200, "La descripción no debe exceder los 200 caracteres"),
    areaId: Yup.number().required("El área es obligatoria"),
    status: Yup.boolean().required("El estado es obligatorio"),
  };

  const formik = useFormik({
    initialValues: {
      name: item ? item?.name : "",
      description: item ? item.description : "",
      areaId: item ? item.areaId : "",
      status: item ? item.status : true,
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      try {
        item
          ? update(item.id, values, () => {
              setIsOpen(false);
              formik.resetForm();
              onSuccess();
            })
          : create(values, () => {
              setIsOpen(false);
              formik.resetForm();
              onSuccess();
            });
      } catch (error) {
        console.error("Error inesperado", error);
      }
    },
  });

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        {item ? "Editar" : "Agregar Cargo"}
      </Button>
      <FormModal
        isOpen={isOpnen}
        onClose={() => setIsOpen(false)}
        title={item ? "Editar Cargo" : "Agregar Cargo"}
        onSubmit={formik.handleSubmit}
        isValid={formik.isValid && formik.dirty}
        size="lg"
        submitText="Guardar"
        isSubmitting={formik.isSubmitting || isLoading}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 py-3 px-6 ovcerflow-y-auto">
          <Input
            label="Nombre"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : undefined
            }
            touched={formik.touched.name}
            placeholder="Nombre"
            required
          />
          <Input
            label="Descripción"
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : undefined
            }
            touched={formik.touched.description}
            placeholder="Descripción"
            required
          />
          <InputAutocompletado
            label="Área"
            onInputChanged={(value) => formik.setFieldValue("areaId", value)}
            apiRoute="area/name"
            error={
              formik.touched.areaId && formik.errors.areaId
                ? formik.errors.areaId
                : undefined
            }
            touched={formik.touched.areaId}
            required={true}
            placeholder="Ej: Sistemas"
          />
          <Select
            label="Estado"
            options={[
              { value: 1, label: "Activo" },
              { value: 0, label: "Inactivo" },
            ]}
            id="status"
            value={formik.values.status ? 1 : 0}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.status && formik.errors.status
                ? formik.errors.status
                : undefined
            }
            touched={formik.touched.status}
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
      </FormModal>
    </>
  );
};

export default ModalPositionMutatios;
