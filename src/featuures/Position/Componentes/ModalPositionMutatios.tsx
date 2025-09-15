import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import Button from "@/components/common/Ui/Button";
import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { IPosition } from "@/models/IPosition";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

interface ModalPositionMutatiosProps {
  item: IPosition | null;
  onSuccess: () => void;
}

const ModalPositionMutatios: React.FC<ModalPositionMutatiosProps> = ({
  item,
  onSuccess,
}: ModalPositionMutatiosProps) => {
  const [isOpnen, setIsOpen] = useState<boolean>(false);

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
      name: "",
      description: "",
      areaId: 0,
      status: false,
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
        try {
            console.log(values)
            onSuccess();
            
        } catch (error) {
            
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
        isSubmitting={formik.isSubmitting}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
      </FormModal>
    </>
  );
};

export default ModalPositionMutatios;
