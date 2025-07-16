import Button from "@/components/common/Ui/Button";
import { useFetchStatistics } from "../Hooks/useFetchStatistics";
import { useState } from "react";
import FormModal from "@/components/common/Ui/FormModal";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "@/components/common/Ui/Input";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import Select from "@/components/common/Ui/Select";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const ModalFilterStatistics = () => {
  const { error, fetchStatistics, loading } = useFetchStatistics();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const validationSchema = Yup.object({
    element: Yup.string().required("El elemento es requerido"),
    program: Yup.string().required("El programa es requerido"),
    professional: Yup.string().required("El profesional es requerido"),
    year: Yup.number()
      .required("El año es requerido")
      .min(2000, "El año debe ser mayor o igual a 2000"),
    month: Yup.number()
      .required("El mes es requerido")
      .min(1, "El mes debe ser entre 1 y 12")
      .max(12, "El mes debe ser entre 1 y 12"),
  });

  const formik = useFormik({
    initialValues: {
      element: "",
      program: "",
      professional: "",
      year: 0,
      month: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      const response = await fetchStatistics(values);
      if (response?.status === 200 || response?.status === 201) {
        formik.resetForm();
        toast.success("Filtros aplicados correctamente");
      }

    },
  });

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="secondary">
        Aplicar Filtros
      </Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Filtrar Estadísticas de Demandas Inducidas"
        onSubmit={formik.handleSubmit}
        isSubmitting={loading}
        isValid={formik.isValid}
        submitText="Filtrar"
        size="md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
          <InputAutocompletado
            apiRoute="elementos/demanda-inducida/buscar"
            label="Elemento de demanda inducida"
            onInputChanged={(value) => {
              formik.setFieldValue("element", value);
            }}
            error={
              formik.touched.element && formik.errors.element
                ? formik.errors.element
                : undefined
            }
            required={true}
            placeholder="Ej: Llamada telefónica"
            touched={formik.touched.element}
          />
          <InputAutocompletado
            apiRoute="programas/buscar"
            onInputChanged={(value) => formik.setFieldValue("program", value)}
            label="Programa"
            touched={formik.touched.program}
            error={formik.errors.program}
            placeholder="Ej: Vacunación menores de 6"
            required={true}
          />

          <Select
            options={[
              { value: "Medicina General", label: "Medicina General" },
              { value: "Enfermería", label: "Enfermería" },
            ]}
            label="Profesional"
            id="professiona"
            value={formik.values.professional}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="professional"
            touched={formik.touched.professional}
            error={formik.errors.professional}
            required={true}
          />

          <Input
            type="number"
            label="Año"
            id="year"
            value={formik.values.year}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="year"
            touched={formik.touched.year}
            error={formik.errors.year}
            required
          />
          <Input
            type="number"
            label="Mes"
            id="month"
            value={formik.values.month}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="month"
            touched={formik.touched.month}
            error={formik.errors.month}
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

export default ModalFilterStatistics;
