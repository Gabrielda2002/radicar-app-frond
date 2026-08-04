import { differenceInCalendarDays, parseISO } from "date-fns";

export const responseOpportunityDays = (
  receivedDate: Date | string,
  responseDate: Date | string | null
): string => {
  if (!responseDate) return "—";
  try {
    const received =
      typeof receivedDate === "string" ? parseISO(receivedDate) : receivedDate;
    const response =
      typeof responseDate === "string" ? parseISO(responseDate) : responseDate;
    if (isNaN(received.getTime()) || isNaN(response.getTime())) return "—";
    const days = differenceInCalendarDays(response, received);
    return `${days} ${days === 1 ? "día" : "días"}`;
  } catch {
    return "—";
  }
};