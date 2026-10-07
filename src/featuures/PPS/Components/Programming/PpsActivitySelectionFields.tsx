import { useMemo } from "react";
import type { ChangeEvent } from "react";
import type { FormikProps } from "formik";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import type {
  PpsActionLine,
  PpsHeadquartersOption,
} from "@/featuures/PPS/models/IPps";
import type { PpsActivityFormValues } from "./ppsActivityForm";

interface PpsActivitySelectionFieldsProps {
  formik: FormikProps<PpsActivityFormValues>;
  headquarters: PpsHeadquartersOption[];
  isLoadingHeadquarters: boolean;
  fallbackHeadquarters: PpsHeadquartersOption | null;
  actionLines: PpsActionLine[];
  isLoadingActionLines: boolean;
  territoryDisplay: string;
  onActionLineChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const PpsActivitySelectionFields: React.FC<PpsActivitySelectionFieldsProps> = ({
  formik,
  headquarters,
  isLoadingHeadquarters,
  fallbackHeadquarters,
  actionLines,
  isLoadingActionLines,
  territoryDisplay,
  onActionLineChange,
}) => {
  
  const headquartersOptions = useMemo(() => {
    const options = headquarters.map((headquarter) => ({
      value: headquarter.id,
      label: headquarter.name,
    }));
    if (fallbackHeadquarters) {
      options.push({
        value: fallbackHeadquarters.id,
        label: fallbackHeadquarters.name,
      });
    }
    return options;
  }, [headquarters, fallbackHeadquarters]);

  const actionLineOptions = useMemo(
    () =>
      actionLines.map((line) => ({
        value: line.id,
        label: `${line.code} — ${line.description}`,
      })),
    [actionLines]
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select
          label="Sede"
          name="headquartersId"
          value={formik.values.headquartersId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          options={headquartersOptions}
          error={
            formik.touched.headquartersId && formik.errors.headquartersId
              ? formik.errors.headquartersId
              : undefined
          }
          touched={formik.touched.headquartersId as boolean}
          required
          disabled={isLoadingHeadquarters || formik.isSubmitting}
        />
        <Input
          label="Territorio (Divipola)"
          value={territoryDisplay}
          disabled
          placeholder="—"
        />
      </div>

      <Select
        label="Línea de acción"
        name="actionLineId"
        value={formik.values.actionLineId}
        onChange={onActionLineChange}
        onBlur={formik.handleBlur}
        options={actionLineOptions}
        error={
          formik.touched.actionLineId && formik.errors.actionLineId
            ? formik.errors.actionLineId
            : undefined
        }
        touched={formik.touched.actionLineId as boolean}
        required
        disabled={isLoadingActionLines || formik.isSubmitting}
      />
    </>
  );
};

export default PpsActivitySelectionFields;
