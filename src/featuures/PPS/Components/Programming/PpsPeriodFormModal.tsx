import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Input from "@/components/common/Ui/Input";
import { useStorePpsPeriods } from "@/featuures/PPS/store/useStorePpsPeriods";
import type { PpsPeriod } from "@/featuures/PPS/models/IPps";
import FormModal from "@/components/common/Ui/FormModal";
import Button from "@/components/common/Ui/Button";

interface PpsPeriodFormModalProps {
  onCreated?: (period: PpsPeriod) => void;
}

interface PpsPeriodFormValues {
  validityYear: number | string;
  startDate: string;
  endDate: string;
}

const INITIAL_VALUES: PpsPeriodFormValues = {
  validityYear: "",
  startDate: "",
  endDate: "",
};

const validationSchema = Yup.object({
  validityYear: Yup.number()
    .typeError("Ingrese un año válido.")
    .integer("Ingrese un año válido.")
    .min(2017, "El año debe estar entre 2017 y 2100.")
    .max(2100, "El año debe estar entre 2017 y 2100.")
    .required("El año de la vigencia es requerido."),
  startDate: Yup.string().required("La fecha de inicio es requerida."),
  endDate: Yup.string()
    .required("La fecha final es requerida.")
    .test(
      "end-after-start",
      "La fecha final no puede ser anterior a la inicial.",
      function (value) {
        const { startDate } = this.parent as PpsPeriodFormValues;
        if (!startDate || !value) return true;
        return value >= startDate;
      }
    ),
});

const PpsPeriodFormModal: React.FC<PpsPeriodFormModalProps> = ({
  onCreated,
}) => {
  const { error, isLoading, createPeriod } = useStorePpsPeriods();
  const [ isOpen, setIsOpen ] = useState<boolean>(false);

  const formik = useFormik<PpsPeriodFormValues>({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: async (values) => {
      await createPeriod(
        {
          validityYear: Number(values.validityYear),
          startDate: values.startDate,
          endDate: values.endDate,
        },
        (created) => {
          toast.success("Vigencia creada");
          onCreated?.(created);
          setIsOpen(false);
        }
      );
    },
  });

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <>
    <Button
      onClick={() => setIsOpen(true)}
      >
        Agregar vigencia
    </Button>

    <FormModal
      onSubmit={formik.handleSubmit}
      title="Nueva vigencia"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      size="md"
      isSubmitting={formik.isSubmitting || isLoading}
      submitText="Crear"
    >
      <div className="space-y-4 p-2">
        <Input
          type="number"
          label="Año de la vigencia"
          name="validityYear"
          value={formik.values.validityYear}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.validityYear && formik.errors.validityYear
              ? formik.errors.validityYear
              : undefined
          }
          touched={formik.touched.validityYear as boolean}
          required
          disabled={formik.isSubmitting}
          placeholder="Ej: 2026"
        />
        <Input
          type="date"
          label="Fecha inicio vigencia"
          name="startDate"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.startDate && formik.errors.startDate
              ? formik.errors.startDate
              : undefined
          }
          touched={formik.touched.startDate as boolean}
          required
          disabled={formik.isSubmitting}
        />
        <Input
          type="date"
          label="Fecha final vigencia"
          name="endDate"
          value={formik.values.endDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.endDate && formik.errors.endDate
              ? formik.errors.endDate
              : undefined
          }
          touched={formik.touched.endDate as boolean}
          required
          disabled={formik.isSubmitting}
        />
      </div>
      {error && formik.submitCount > 0 && (
        <div className="p-4 mb-4 text-white bg-red-500 rounded-lg shadow-lg">
          {error}
        </div>
      )}
    </FormModal>
    </>
  );
};

export default PpsPeriodFormModal;
