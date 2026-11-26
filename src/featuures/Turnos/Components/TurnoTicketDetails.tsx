import { Clock3, MapPin, Users } from "lucide-react";
import type { ITurnoTicket, TurnoStatusType } from "@/models/ITurnos";
import { TURNO_CLASSIFICATION_LABELS } from "../constants/turnoClassification";

const statusLabels: Record<TurnoStatusType, string> = {
  PENDIENTE: "En espera",
  LLAMADO: "Es tu turno",
  EN_ATENCION: "En atención",
  FINALIZADO: "Atención finalizada",
  NO_ASISTIO: "No asistió",
  CANCELADO: "Turno cancelado",
  TRANSFERIDO: "Transferido",
};

interface TurnoTicketDetailsProps {
  ticket: ITurnoTicket;
}

const TurnoTicketDetails = ({ ticket }: TurnoTicketDetailsProps) => (
  <>
    <div className="text-center">
      <h1 className="text-5xl font-bold tracking-tight tabular-nums sm:text-6xl" aria-label={`Turno ${ticket.ticketCode}`}>
        {ticket.ticketCode}
      </h1>
      <p className="text-sm font-medium text-color dark:text-teal-300">
        {statusLabels[ticket.status]}
      </p>
    </div>
    <div className="space-y-1 py-2 border-y border-dashed border-slate-200 dark:border-gray-700">
      <p className="flex items-center gap-2 text-sm">
        <MapPin
          className="h-4 w-4 text-color dark:text-teal-300"
          aria-hidden="true"
        />
        {ticket.headquarter.name}
      </p>
      <p className="text-sm font-semibold">{ticket.service.name}</p>
      {ticket.classification ? (
        <p className="text-sm text-slate-600 dark:text-gray-300">
          Clasificación: {TURNO_CLASSIFICATION_LABELS[ticket.classification]}
        </p>
      ) : null}
      <p className="text-sm text-slate-500 dark:text-gray-400">
        {ticket.patient.name} · {ticket.priority === "PRIORITARIO" ? "Atención prioritaria" : "Atención general"}
      </p>
    </div>
    {ticket.status === "PENDIENTE" ? (
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 bg-slate-50 rounded-xl dark:bg-gray-800">
          <Users
            className="h-4 w-4 text-color dark:text-teal-300"
            aria-hidden="true"
          />
          <p className="text-xl font-semibold tabular-nums">
            {ticket.aheadCount}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">
            Turnos por delante
          </p>
        </div>
        <div className="p-2 bg-slate-50 rounded-xl dark:bg-gray-800">
          <Clock3
            className="h-4 w-4 text-color dark:text-teal-300"
            aria-hidden="true"
          />
          <p className="text-xl font-semibold tabular-nums">
            {ticket.estimatedWaitMinutes === null ? (
              <span className="text-xl">No disponible</span>
            ) : (
              <>
                {ticket.estimatedWaitMinutes}
                <span className="ml-1 text-sm">min</span>
              </>
            )}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">
            Espera estimada
          </p>
        </div>
      </div>
    ) : null}
  </>
);

export default TurnoTicketDetails;
