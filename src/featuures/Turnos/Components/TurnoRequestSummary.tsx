import { MapPin } from "lucide-react";
import type { ITurnoSedeConfig, ITurnoRequestForm } from "@/models/ITurnos";

interface TurnoRequestSummaryProps {
  values: ITurnoRequestForm;
  config: ITurnoSedeConfig;
}

const TurnoRequestSummary = ({ values, config }: TurnoRequestSummaryProps) => {
  const documentType = config.documentTypes.find(
    (type) => String(type.id) === values.documentTypeId,
  )?.name;
  const service = config.services.find(
    (option) => String(option.id) === values.serviceId,
  )?.name;
  const details = [
    ["Paciente", values.name],
    ["Documento", `${documentType} ${values.documentNumber}`],
    ["Celular", values.phoneNumber],
    ["Servicio", service],
    ["Atención", values.priority === "PRIORITARIO" ? "Prioritaria" : "General"],
  ];
  return (
    <div className="space-y-6">
      <dl className="divide-y divide-slate-100 dark:divide-gray-800">
        {details.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-5 py-3 text-sm">
            <dt className="shrink-0 text-slate-500 dark:text-gray-400">
              {label}
            </dt>
            <dd className="text-right font-medium break-words">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex items-start gap-3 p-4 text-sm leading-relaxed text-teal-900 bg-teal-50 border border-teal-100 rounded-xl dark:text-teal-200 dark:bg-teal-950/40 dark:border-teal-900">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <p>
          Al solicitar el turno, tu navegador pedirá acceso a tu ubicación para
          confirmar que estás en la sede.
        </p>
      </div>
    </div>
  );
};

export default TurnoRequestSummary;
