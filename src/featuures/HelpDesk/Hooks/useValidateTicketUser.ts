// src/featuures/HelpDesk/Hooks/useValidateTicketUser.ts
import { useState, useEffect, useCallback } from 'react';
import { useTickets } from "@/context/ticketContext";

export const useValidateTicketUser = (userId: number) => {
    const { validateUserTicketStatus, userTicketStatus} = useTickets();

    const [validatingTicket, setValidatingTicket] = useState<boolean>(true);

    const revalidate = useCallback(async () => {
        if(!userId) return;

        setValidatingTicket(true);
        try {
            await validateUserTicketStatus(userId);
        } catch (error) {
            console.log(error)
        } finally {
            setValidatingTicket(false);
        }
    }, [userId, validateUserTicketStatus]);

    useEffect(() => {
        revalidate();
    }, [revalidate]);

    const hasTicket = userId ? userTicketStatus[userId] || false : false;

    return {hasTicket, validatingTicket, revalidate};
};