import { format } from "date-fns";
import moment from "moment";

export const extractFechaHora = (fechaCompleta: Date | string) => {
  const date = new Date(fechaCompleta);
  return { fecha: format(date, "yyyy-MM-dd"), hora: format(date, "HH:mm") };
};

export const formatSpanishDate = (date: moment.Moment) =>
  new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  })
    .format(date.toDate())
    .replace(",", "");

// Calcula la duración legible entre fecha/hora inicio y fin
export const getDuracionLegible = (
  fechaInicio: string,
  horaInicio: string,
  fechaFin: string,
  horaFin: string,
) => {
  if (!fechaInicio || !horaInicio || !fechaFin || !horaFin) return null;
  const start = new Date(`${fechaInicio}T${horaInicio}`);
  const end = new Date(`${fechaFin}T${horaFin}`);
  const diffMs = end.getTime() - start.getTime();
  if (isNaN(diffMs) || diffMs <= 0) return null;
  const totalMin = Math.round(diffMs / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};
