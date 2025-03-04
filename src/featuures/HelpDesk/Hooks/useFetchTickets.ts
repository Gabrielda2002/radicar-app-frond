
import {useTickets} from "@/context/ticketContext.tsx";

export const useFetchTickets = () => {
  const { tickets, loading: loadingTickets, error: errorTickets, refetchTickets } = useTickets();

  return { tickets, loadingTickets, errorTickets, refetchTickets };
};
