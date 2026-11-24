import type { FormikProps } from "formik";
import { CheckCircle2 } from "lucide-react";
import Input from "@/components/common/Ui/Input";
import type { ITurnoRequestForm } from "@/models/ITurnos";

interface TurnoDetailsFieldsProps {
  formik: FormikProps<ITurnoRequestForm>;
  isExistingPatient: boolean;
}

const TurnoDetailsFields = ({
  formik,
  isExistingPatient,
}: TurnoDetailsFieldsProps) => (
  <div className="space-y-5">
    <div className="flex items-start gap-2 p-3 text-sm leading-relaxed text-teal-900 bg-teal-50 rounded-lg dark:text-teal-200 dark:bg-teal-950/40">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p>
        {isExistingPatient
          ? "Encontramos tus datos. Si necesitas actualizarlos, indícalo al asesor durante tu atención."
          : "Es tu primera solicitud con este documento. Completa tus datos para continuar."}
      </p>
    </div>
    <Input
      name="name"
      label="Nombre completo"
      aria-label="Nombre completo"
      required
      autoComplete="name"
      maxLength={250}
      readOnly={isExistingPatient}
      value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched.name}
      error={formik.errors.name}
      size="lg"
    />
    <Input
      name="phoneNumber"
      label="Número de celular"
      aria-label="Número de celular"
      required
      type="tel"
      autoComplete="tel-national"
      inputMode="numeric"
      maxLength={10}
      readOnly={isExistingPatient}
      value={formik.values.phoneNumber}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched.phoneNumber}
      error={formik.errors.phoneNumber}
      size="lg"
    />
  </div>
);

export default TurnoDetailsFields;
