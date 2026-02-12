import { api } from "@/utils/api-config";
import { useState,  } from "react";

interface UseCreateTicketReturn {
    createTicket: (data: FormData, onSuccess?: () => void) => Promise<void>;
    error: string | null;
    isLoading: boolean;
}

export const useCreateTicket = (): UseCreateTicketReturn => {
    const [ error, setError] = useState<string | null>(null);
    const [ isLoading, setIsLoading] = useState<boolean>(false);

    const createTicket = async (data: FormData, onSuccess?: () => void) => {
        setIsLoading(true);
        try {
            
            const response  = await api.post('/tickets', data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            if (response.status === 201 || response.status === 200) {
                onSuccess?.();
            }


        } catch (error: any) {
            if (error.response.status === 500) {
                setError("Error del servidor. Por favor, inténtalo de nuevo más tarde.");
            }else {
                setError(error?.response?.data?.message || "Ocurrió un error al crear el ticket.");
            }
        }finally{
            setIsLoading(false);
        }
    }

    return {
        createTicket,
        error,
        isLoading
    }

}