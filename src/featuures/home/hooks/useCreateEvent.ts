import { createEventEp } from "@/utils/api-config";
import { useState } from "react";

export const useCreateEvent = () => {
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const createEvent = async (data: FormData) => {
        try {
            
            setLoading(true);

            const response = await createEventEp(data);
    
            if (response?.status === 200 || response?.status === 201) {
                setSuccess(true);
                setError(null);
                return response;
            }
    
        } catch (error: any) {
            if (error.response.status === 400) {
                setError("Revise los campos del formulario");
            }
            setError(`Hubo un error inesperado ${error}`);
        }finally{
            setLoading(false);
        }
    }
    return { createEvent, success, error, loading };
}