import { MapPin } from "lucide-react";
import type { ITurnoSedeConfig, ITurnoRequestForm } from "@/models/ITurnos";
import { TURNO_CLASSIFICATION_LABELS } from "../constants/turnoClassification";

interface TurnoRequestSummaryProps {
  values: ITurnoRequestForm;
  config: ITurnoSedeConfig;
  onEditClassification: () => void;
  onEditService: () => void;
  onEditPriority: () => void;
}

const TurnoRequestSummary = ({
  values,
  config,
  onEditClassification,
  onEditService,
  onEditPriority,
}: TurnoRequestSummaryProps) => {
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
    [
      "Clasificación",
      values.classification
        ? TURNO_CLASSIFICATION_LABELS[values.classification]
        : "",
    ],
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
        <div className="flex items-center justify-between gap-5 py-3 text-sm">
          <dt className="shrink-0 text-slate-500 dark:text-gray-400">
            Servicio
          </dt>
          <dd className="text-right font-medium break-words">{service}</dd>
        </div>
        <div className="flex items-center justify-between gap-5 py-3 text-sm">
          <dt className="shrink-0 text-slate-500 dark:text-gray-400">
            Atención
          </dt>
          <dd className="text-right font-medium">
            {values.priority === "PRIORITARIO" ? "Prioritaria" : "General"}
          </dd>
        </div>
      </dl>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={onEditClassification}
          className="min-h-12 rounded-xl border border-slate-300 px-4 py-3 text-base font-semibold text-color hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/40 dark:border-gray-700 dark:text-teal-300 dark:hover:bg-gray-800"
        >
          Cambiar clasificación
        </button>
        <button
          type="button"
          onClick={onEditService}
          className="min-h-12 rounded-xl border border-slate-300 px-4 py-3 text-base font-semibold text-color hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/40 dark:border-gray-700 dark:text-teal-300 dark:hover:bg-gray-800"
        >
          Cambiar servicio
        </button>
        <button
          type="button"
          onClick={onEditPriority}
          className="min-h-12 rounded-xl border border-slate-300 px-4 py-3 text-base font-semibold text-color hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/40 dark:border-gray-700 dark:text-teal-300 dark:hover:bg-gray-800"
        >
          Cambiar prioridad
        </button>
      </div>
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
