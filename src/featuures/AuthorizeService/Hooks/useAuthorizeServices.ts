import { api } from "@/utils/api-config";
import { useState } from "react";

interface UseAuthorizeServices {
    error: string | null;
    isLoading: boolean;
    authorizeService: (data: Object, radicadoId: number, onSuccess: () => void) => void;
}

export const useAuthorizeServices = (): UseAuthorizeServices => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const authorizeService = async (data: Object, radicadoId: number, onSuccess: () => void) => {
        setIsLoading(true);
        try {

            const response = await api.put(`/autorizar-radicado/${radicadoId}`, data);

            if (response.status === 200) {
                onSuccess();
                setError(null);
            }


        } catch (error: any) {
            if (error.response.status === 500) {
                setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
            } else {
                setError(error.response.data.message || "Ocurrió un error desconocido.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return {
        error,
        isLoading,
        authorizeService
    }

}