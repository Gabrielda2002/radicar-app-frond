import type { FormikProps } from "formik";
import { CheckCircle2 } from "lucide-react";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import type { ITurnoOption, ITurnoRequestForm } from "@/models/ITurnos";

interface TurnoDetailsFieldsProps {
  formik: FormikProps<ITurnoRequestForm>;
  services: ITurnoOption[];
  isExistingPatient: boolean;
}

const TurnoDetailsFields = ({
  formik,
  services,
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
    <div className="pt-4 border-t border-slate-100 dark:border-gray-800">
      <Select
        name="serviceId"
        label="¿Qué servicio necesitas?"
        aria-label="Servicio de atención"
        required
        options={services.map((service) => ({
          value: service.id,
          label: service.name,
        }))}
        value={formik.values.serviceId}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.serviceId}
        error={formik.errors.serviceId}
        selectSize="lg"
      />
    </div>
    <Select
      name="priority"
      label="Tipo de atención"
      aria-label="Tipo de atención"
      options={[
        { value: "GENERAL", label: "General" },
        { value: "PRIORITARIO", label: "Prioritaria" },
      ]}
      value={formik.values.priority}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched.priority}
      error={formik.errors.priority}
      selectSize="lg"
      helpText="Selecciona atención prioritaria si cumples con las condiciones de atención preferencial."
    />
  </div>
);

export default TurnoDetailsFields;
