import { ITickets } from "@/models/ITickets";
import { useEffect, useCallback , useState } from "react";
import { FetchTicketsEp } from "../Services/FetchTicketsEp";

export const useFetchTickets = () => {
  const [tickets, setTickets] = useState<ITickets[]>([]);
  const [loadingTickets, setLoadingTickets] = useState<boolean>(true);
  const [errorTickets, setErrorTickets] = useState<string | null>(null);

  const getData = useCallback(async () => {
    try {
      setLoadingTickets(true);

      const response = await FetchTicketsEp();
      setTickets(response);
      setLoadingTickets(false);
    } catch (error) {
      setErrorTickets("Error al cargar los tickets");
    } finally {
      setLoadingTickets(false);
    }
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  return { tickets, loadingTickets, errorTickets, refetchTickets: getData };
};
