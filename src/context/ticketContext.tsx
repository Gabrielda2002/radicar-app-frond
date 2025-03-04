import React, {createContext, useState, useCallback, useEffect, useContext} from 'react';
import {FetchTicketsEp} from "@/featuures/HelpDesk/Services/FetchTicketsEp.ts";
import {ITickets} from "@/models/ITickets.ts";
import {api} from "@/utils/api-config";

interface TicketContextProps {
    tickets: ITickets[];
    loading: boolean;
    error: string | null;
    refetchTickets: () => Promise<void>;
    validateUserTicketStatus: (userId: number) => Promise<boolean>;
}

const TicketContext = createContext<TicketContextProps | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tickets, setTickets] = useState<ITickets[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [userTicketStatus, setUserTicketStatus] = useState<Record<boolean, number>>({});

    const validateUserTicketStatus = useCallback(async (userId: number): Promise<boolean> => {
        try {
            
            const response = await api.get(`/user-ticket/${userId}`);

            const HasTicket = response.data.have;

            setUserTicketStatus((prevState) => ({
                ...prevState,
                [userId]: HasTicket
            }))

            return HasTicket;

        } catch (error) {
            console.log(`Error validating user ticket status ${error}`);
            return false;
        }
    }, []) 

    const refetchTickets = useCallback(async () => {
        try {
            setLoading(true);
            const response = await FetchTicketsEp();

            setTickets(response);
            setError(null);
        }catch (error) {
            setError(`Error fetching tickets ${error}`);
        }finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        refetchTickets();
    }, [refetchTickets])

    return (
        <TicketContext.Provider value={{tickets, loading, error, refetchTickets, validateUserTicketStatus, userTicketStatus}}>
            {children}
        </TicketContext.Provider>
    )

}

export const useTickets = (): TicketContextProps => {
    const context = useContext(TicketContext);
    if (!context) {
        throw new Error('useTickets must be used within a TicketProvider');
    }
    return context;
}