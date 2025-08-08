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

interface ModalFilterStatisticsProps {
  onFiltersApplied?: (filters: any) => void;
}

const ModalFilterStatistics = ({
  onFiltersApplied,
}: ModalFilterStatisticsProps) => {
  const { error, fetchStatistics, loading } = useFetchStatistics();

  const [selectedFilters, setSelectedFilters] = useState({
    element: "",
    program: "",
    professional: "",
    year: "",
    month: "",
  });

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
        setIsOpen(false);
        toast.success("Filtros aplicados correctamente");
        onFiltersApplied?.(values);
      }
    },
  });

  return (
    <>
      {Object.values(selectedFilters).some((v) => v) && (
        <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-400 rounded">
          <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Filtros seleccionados:</h4>
          <ul className="text-sm">
            <li>
              <span className="font-bold text-gray-700 dark:text-gray-100">Elemento:</span>
              <span className="text-gray-600 dark:text-gray-400 pl-2">
                {selectedFilters.element || "No seleccionado"}
              </span>
            </li>
            <li>
              <span className="font-bold text-gray-700 dark:text-gray-100">Programa:</span>
              <span className="text-gray-600 dark:text-gray-400 pl-2">
                {selectedFilters.program || "No seleccionado"}
              </span>
            </li>
            <li>
              <span className="font-bold text-gray-700 dark:text-gray-100">Profesional:</span>
              <span className="text-gray-600 dark:text-gray-400 pl-2">
                {selectedFilters.professional || "No seleccionado"}
              </span>
            </li>
            <li>
              <span className="font-bold text-gray-700 dark:text-gray-100">Año:</span>
              <span className="text-gray-600 dark:text-gray-400 pl-2">
                {selectedFilters.year || "No seleccionado"}
              </span>
            </li>
            <li>
              <span className="font-bold text-gray-700 dark:text-gray-100">Mes:</span>
              <span className="text-gray-600 dark:text-gray-400 pl-2">
                {selectedFilters.month || "No seleccionado"}
              </span>
            </li>
          </ul>
        </div>
      )}
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
            onInputChanged={(id, name) => {
              setSelectedFilters((prev) => ({ ...prev, element: name ?? "" }));
              formik.setFieldValue("element", id);
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
            onInputChanged={(id, name) => {
              setSelectedFilters((prev) => ({ ...prev, program: name ?? "" }));
              formik.setFieldValue("program", id);
            }}
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
              { value: "Nutrición", label: "Nutrición" },
              { value: "Ginecobstetricia", label: "Ginecobstetricia" },
              { value: "Psicología", label: "Psicología" }
            ]}
            label="Profesional"
            id="professiona"
            value={formik.values.professional}
            onChange={ (e) => {
              formik.handleChange(e);
              setSelectedFilters((prev) => ({ ...prev, professional: e.target.value }));
            }}
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
            onChange={(e) => {
              formik.handleChange(e);
              setSelectedFilters((prev) => ({ ...prev, year: e.target.value }));
            }}
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
            onChange={(e) => {
              formik.handleChange(e);
              setSelectedFilters((prev) => ({
                ...prev,
                month: e.target.value,
              }));
            }}
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
