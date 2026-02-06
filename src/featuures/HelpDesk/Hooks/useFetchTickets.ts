import { ITickets } from "@/models/ITickets";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";


type TicketReturn = {
  tickets: ITickets[] | null;
  isLoading: boolean;
  error: string | null;
  refetchTickets: () => Promise<void>;
}

export const useFetchTickets = (): TicketReturn => {

  const [ tickets, setTickets ] = useState<ITickets[] | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string | null>(null);

  const getData = useCallback( async () => {
    setIsLoading(true);
    try {
      
      const response = await api.get("/tickets-table");

      if (response.status === 200 || response.status === 201) {
        setTickets(response.data);
        setError(null);
      }

    } catch (error: any) {
      if (error.response.status === 500) {
        setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
      }else {
        setError(error.response?.data?.message);
      }
    }finally {
      setIsLoading(false);
    }
  }, [])

  const refetchTickets = useCallback(async () => {
    await getData();
  }, [getData]);

   useEffect(() => {
    getData();
   }, [getData]);


  return { tickets, isLoading, error, refetchTickets };
};
