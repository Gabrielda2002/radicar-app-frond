//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import FormModal from "../../Ui/FormModal";
import Input from "../../Ui/Input";
import Button from "../../Ui/Button";
import { useTableMutations } from "./Hook/useTablesMutations";
import { AnimatePresence } from "framer-motion";
import { useFetchDepartment } from "@/featuures/SystemInventory/Hooks/UseFetchDeparment";
import Select from "../../Ui/Select";
import { useFetchMunicipio } from "@/hooks/UseFetchMunicipio";

interface ModalTipoServicioProps {
  name: string;
  endPoint: string;
  onSuccess?: () => void;
}

const ModalAgregarDato: React.FC<ModalTipoServicioProps> = ({
  name,
  endPoint,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { create, error, loading } = useTableMutations();

  const { department } = useFetchDepartment();

  const { municipios } = useFetchMunicipio()

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    address: Yup.string().when("reference",{
      is: (value: string) => value === "Lugar Radicacion",
      then: (schema) => schema.required("La dirección es obligatoria"),
      otherwise: (schema) => schema.notRequired(), 
    } ),
    department: Yup.string().when("reference",{
      is: (value: string) => value === "Lugar Radicacion",
      then: (schema) => schema.required("El departamento es obligatorio"),
      otherwise: (schema) => schema.notRequired(),
    } ),
    city: Yup.string().when("reference",{
      is: (value: string) => value === "Lugar Radicacion",
      then: (schema) => schema.required("El municipio es obligatorio"),
      otherwise: (schema) => schema.notRequired(),
    } ),
    headquartersNumber: Yup.number().when("reference",{
      is: (value: string) => value === "Lugar Radicacion",
      then: (schema) => schema.min(1, "El número de sede debe ser al menos 1").required("El número de sede es obligatorio"),
      otherwise: (schema) => schema.notRequired(),
    } ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      department: "",
      city: "",
      reference: name,
      headquartersNumber: 0
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
          <div className="grid grid-cols-2 gap-6 py-3 px-5">
            <Input
              label={`Nombre del ${name}`}
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={`Nombre del ${name}`}
              error={
                formik.errors.name && formik.touched.name
                  ? formik.errors.name
                  : undefined
              }
              touched={formik.touched.name}
              required
            />
            {name === "Lugar Radicacion" && (
              <>
              <Select
                label="Departamento"
                name="department"
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={department.map((dept) => ({
                  value: dept.id,
                  label: dept.name,
                }))}
                error={
                  formik.errors.department && formik.touched.department
                    ? formik.errors.department
                    : undefined
                }
                touched={formik.touched.department}
              />
              <Select
                label="Municipio"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={municipios.map((mun) => ({
                  value: mun.id,
                  label: mun.name,
                }))}
                error={
                  formik.errors.city && formik.touched.city
                    ? formik.errors.city
                    : undefined
                }
                touched={formik.touched.city}
                required
              />
              <Input
                label="Dirección"
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Dirección"
                error={
                  formik.errors.address && formik.touched.address
                    ? formik.errors.address
                    : undefined
                }
                touched={formik.touched.address}
                required
              />
              <Input
                label="Número de Sede"
                type="number"
                name="headquartersNumber"
                value={formik.values.headquartersNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Número de Sede"
                error={
                  formik.errors.headquartersNumber && formik.touched.headquartersNumber
                    ? formik.errors.headquartersNumber
                    : undefined
                }
                touched={formik.touched.headquartersNumber}
                required
              />
              </>
            )}
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
