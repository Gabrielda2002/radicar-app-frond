import { ITickets } from "@/models/ITickets";
import { useEffect, useState } from "react";
import { FetchTicketsEp } from "../Services/FetchTicketsEp";

export const useFetchTickets = () => {
    const [tickets, setTickets] = useState<ITickets[]>([]);
    const [loadingTickets, setLoadingTickets] = useState<boolean>(true);
    const [errorTickets, setErrorTickets] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                
                setLoadingTickets(true);
                
                const response = await FetchTicketsEp();
                setTickets(response);
                setLoadingTickets(false);
                console.log(response)
    
            } catch (error) {
                setErrorTickets("Error al cargar los tickets");
            }finally{
                setLoadingTickets(false);
            }
        };
        getData();
    }, [])
    
//actualiza el estado del ticket
      const updateTicketStatus = async (
        ticketId: string | number,
        status: string
      ) => {
        try {
          console.log(
            `Intentando actualizar ticket ${ticketId} a estado: ${status}`
          );

          // Actualiza el estado localmente primero para una UI responsiva
          setTickets((prevTickets) =>
            prevTickets.map((ticket) =>
              ticket.id === ticketId ? { ...ticket, status } : ticket
            )
          );

          console.log(`Ticket ${ticketId} actualizado a estado: ${status}`);

        } catch (error) {
          console.error("Error al actualizar el ticket:", error);
          setErrorTickets("Error al actualizar el estado del ticket");
        }
      };


    return { tickets, loadingTickets, errorTickets, updateTicketStatus };

}