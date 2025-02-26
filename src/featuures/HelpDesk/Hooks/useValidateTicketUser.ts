// src/featuures/HelpDesk/Hooks/useValidateTicketUser.ts
import { useState, useEffect, useCallback } from 'react';
import { api } from "@/utils/api-config";

export const useValidateTicketUser = (userId: number) => {
    const [hasTicket, setHasTicket] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

        const validateTicket = useCallback(async () => {
            try {
                const response = await api.get(`/user-ticket/${userId}`);
                setHasTicket(response.data.have);
            } catch (error) {
                setError("Error al validar el ticket");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, [userId]);

        useEffect(() => {
            validateTicket();
        }, [validateTicket]);

    return { hasTicket, loading, error, revalidate: validateTicket };
};