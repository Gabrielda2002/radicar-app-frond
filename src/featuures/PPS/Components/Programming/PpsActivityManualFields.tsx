import type { FormikProps } from "formik";
import Input from "@/components/common/Ui/Input";
import Textarea from "@/components/common/Ui/Textarea";
import type { PpsActivityFormValues } from "./ppsActivityForm";

interface PpsActivityManualFieldsProps {
  formik: FormikProps<PpsActivityFormValues>;
}

const PpsActivityManualFields: React.FC<PpsActivityManualFieldsProps> = ({
  formik,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Consecutivo de la meta"
          name="goalCode"
          value={formik.values.goalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.goalCode && formik.errors.goalCode
              ? formik.errors.goalCode
              : undefined
          }
          touched={formik.touched.goalCode as boolean}
          placeholder="M01"
          required
          disabled={formik.isSubmitting}
        />
        <Input
          label="Consecutivo de la actividad"
          name="activityCode"
          value={formik.values.activityCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.activityCode && formik.errors.activityCode
              ? formik.errors.activityCode
              : undefined
          }
          touched={formik.touched.activityCode as boolean}
          placeholder="A01"
          required
          disabled={formik.isSubmitting}
        />
      </div>
      <Textarea
        label="Descripción de la meta"
        name="goalDescription"
        value={formik.values.goalDescription}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.goalDescription && formik.errors.goalDescription
            ? formik.errors.goalDescription
            : undefined
        }
        touched={formik.touched.goalDescription as boolean}
        required
        maxLength={300}
        showCharCount
        disabled={formik.isSubmitting}
      />
      <Textarea
        label="Descripción de la actividad"
        name="activityDescription"
        value={formik.values.activityDescription}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.activityDescription &&
          formik.errors.activityDescription
            ? formik.errors.activityDescription
            : undefined
        }
        touched={formik.touched.activityDescription as boolean}
        required
        maxLength={300}
        showCharCount
        disabled={formik.isSubmitting}
      />
    </>
  );
};

export default PpsActivityManualFields;
