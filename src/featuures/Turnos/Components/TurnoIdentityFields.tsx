import type { ChangeEvent } from "react";
import type { FormikProps } from "formik";
import { IdCard } from "lucide-react";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import type { ITurnoOption, ITurnoRequestForm } from "@/models/ITurnos";

interface TurnoIdentityFieldsProps {
  formik: FormikProps<ITurnoRequestForm>;
  documentTypes: ITurnoOption[];
  onIdentityChange: () => void;
}

const TurnoIdentityFields = ({
  formik,
  documentTypes,
  onIdentityChange,
}: TurnoIdentityFieldsProps) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    onIdentityChange();
    formik.handleChange(event);
  };
  return (
    <div className="space-y-5">
      <Select
        name="documentTypeId"
        label="Tipo de documento"
        aria-label="Tipo de documento"
        required
        options={documentTypes.map((type) => ({
          value: type.id,
          label: type.name,
        }))}
        value={formik.values.documentTypeId}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.documentTypeId}
        error={formik.errors.documentTypeId}
        selectSize="lg"
      />
      <Input
        name="documentNumber"
        label="Número de documento"
        aria-label="Número de documento"
        required
        inputMode="numeric"
        autoComplete="off"
        maxLength={20}
        icon={<IdCard className="h-5 w-5" />}
        value={formik.values.documentNumber}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.documentNumber}
        error={formik.errors.documentNumber}
        size="lg"
      />
      <p className="text-sm leading-relaxed text-slate-500 dark:text-gray-400">
        Si ya tienes un turno activo hoy, podrás recuperarlo con tu documento.
      </p>
    </div>
  );
};

export default TurnoIdentityFields;
