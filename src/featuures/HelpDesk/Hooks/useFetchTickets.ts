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
    })
    
    return { tickets, loadingTickets, errorTickets };

}