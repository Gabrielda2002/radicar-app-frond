import { useMemo } from "react";
import type { FormikProps } from "formik";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import type { PpsTargetPopulation } from "@/featuures/PPS/models/IPps";
import type { PpsActivityFormValues } from "./ppsActivityForm";

interface PpsActivityExecutionFieldsProps {
  formik: FormikProps<PpsActivityFormValues>;
  targetPopulations: PpsTargetPopulation[];
}

const PpsActivityExecutionFields: React.FC<
  PpsActivityExecutionFieldsProps
> = ({ formik, targetPopulations }) => {
  const populationOptions = useMemo(
    () =>
      targetPopulations
        .filter((population) => population.status === true)
        .map((population) => ({
          value: population.id,
          label: `${population.code} — ${population.description}`,
        })),
    [targetPopulations]
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          type="number"
          label="Expresión numérica"
          name="numericExpression"
          value={formik.values.numericExpression}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.numericExpression &&
            formik.errors.numericExpression
              ? formik.errors.numericExpression
              : undefined
          }
          touched={formik.touched.numericExpression as boolean}
          helpText="Veces que se ejecuta."
          required
          min={1}
          step={1}
          disabled={formik.isSubmitting}
        />
        <Select
          label="Población objetivo"
          name="targetPopulationId"
          value={formik.values.targetPopulationId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          options={populationOptions}
          error={
            formik.touched.targetPopulationId &&
            formik.errors.targetPopulationId
              ? formik.errors.targetPopulationId
              : undefined
          }
          touched={formik.touched.targetPopulationId as boolean}
          required
          disabled={formik.isSubmitting}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          type="date"
          label="Fecha inicio"
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
          label="Fecha fin"
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

      <Input
        type="number"
        label="Recursos programados"
        name="programmedResources"
        value={formik.values.programmedResources}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.programmedResources &&
          formik.errors.programmedResources
            ? formik.errors.programmedResources
            : undefined
        }
        touched={formik.touched.programmedResources as boolean}
        helpText="Puede ser 0 o mayor/igual a 10.000."
        required
        min={0}
        disabled={formik.isSubmitting}
      />
    </>
  );
};

export default PpsActivityExecutionFields;
