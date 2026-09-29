import React from "react";
import moment from "moment";
import { CalendarDays, Clock3, FileText, Mail, MapPin, Palette, UserRound } from "lucide-react";
import { IEventos } from "@/models/IEventos";
import { formatSpanishDate } from "../utils/eventDates";

interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  variant?: "filled" | "outline";
  children: React.ReactNode;
}

const InfoCard = ({ icon: Icon, label, variant = "outline", children }: InfoCardProps) => (
  <div
    className={
      variant === "filled"
        ? "flex items-start gap-3 rounded-xl bg-[#e6f8f9] p-4 dark:bg-gray-700"
        : "flex items-start gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-600"
    }
  >
    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#008d93]" />
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
        {label}
      </p>
      <div className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-100">{children}</div>
    </div>
  </div>
);

interface EventReadViewProps {
  event: IEventos
}

const EventReadView: React.FC<EventReadViewProps> = ({ event }) => {
  const location = event.place || "No especificado";
  const responsibleName = `${event.authorRelation?.name} ${event.authorRelation?.lastName}` || "No especificado";
  const responsibleEmail = event.authorRelation?.email || "";
  const startDate = moment(event.dateStart);
  const endDate = moment(event.dateEnd);
  const startTime = event.timeStart ? moment(event.timeStart, "HH:mm").format("hh:mm A") : "Sin hora";
  const endTime = event.timeEnd ? moment(event.timeEnd, "HH:mm").format("hh:mm A") : "";
  const sameDate = startDate.isSame(endDate, "day");

  return (
    <div className="space-y-5 p-1">
      <div className="rounded-xl border border-[#ccebec] bg-linear-to-r from-[#effbfb] to-white p-4 dark:border-gray-600 dark:from-gray-700 dark:to-gray-800">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#008d93]">
          <CalendarDays className="h-4 w-4" />
          <span>Evento institucional</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{event.title}</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard icon={CalendarDays} label="Fecha" variant="filled">
          {sameDate ? (
            <p className="capitalize">{formatSpanishDate(startDate)}</p>
          ) : (
            <div className="space-y-1">
              <p className="capitalize">Inicio: {formatSpanishDate(startDate)}</p>
              <p className="capitalize">Fin: {formatSpanishDate(endDate)}</p>
            </div>
          )}
        </InfoCard>

        <InfoCard icon={Clock3} label="Horario" variant="filled">
          <p>
            {startTime}
            {endTime && <> - {endTime}</>}
          </p>
          <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
            Zona horaria: GMT-5
          </p>
        </InfoCard>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard icon={MapPin} label="Lugar">
          <p className="wrap-break-word">{location}</p>
        </InfoCard>
        <InfoCard icon={UserRound} label="Responsable">
          <p className="wrap-break-word">{responsibleName}</p>
        </InfoCard>
      </div>

      {responsibleEmail && (
        <InfoCard icon={Mail} label="Correo del responsable">
          <p className="break-all">{responsibleEmail}</p>
        </InfoCard>
      )}

      <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-600">
        <div className="mb-3 flex items-center gap-2 text-[#008d93]">
          <FileText className="h-4 w-4" />
          <p className="text-xs font-bold uppercase tracking-wider">Descripción y agenda</p>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {event.description || "Este evento no tiene descripción."}
        </p>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-gray-600">
        <div className="flex items-center gap-3">
          <Palette className="h-5 w-5 text-[#008d93]" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
              Color del evento
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Identificador del calendario
            </p>
          </div>
        </div>
        <span
          className="h-7 w-7 rounded-full border-2 border-white shadow-md dark:border-gray-700"
          style={{ backgroundColor: event.color || "#008d93" }}
          title={event.color || "#008d93"}
        />
      </div>
    </div>
  );
};

export default EventReadView;
