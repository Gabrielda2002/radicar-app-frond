import { api } from "@/utils/api-config";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

interface UseCUPSDiagMutationsReturn {
    updateCUPSDiag: (data: Object, id: number, endPoint: string, onSuccess?: () => void) => Promise<void>;
    createCUPSDiag: (data: Object, endPoint: string, onSuccess?: () => void) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export const useCUPSDiagMutations = (): UseCUPSDiagMutationsReturn => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const updateCUPSDiag = useCallback(async (data: Object, id: number, endPoint: string, onSuccess?: () => void) => {
        setLoading(true);
        setError(null);
        try {

            const response = await api.put(`/${endPoint}/${id}`, data);

            if (response.status === 200 || response.status === 201) {
                toast.success("Actualizado con éxito");
                setError(null);
                if (onSuccess) {
                    onSuccess();
                }
                
                return response.data;
            }

        } catch (error: any) {
            if (error.response?.status === 500) {
                setError("Error interno del servidor. Por favor, inténtalo más tarde.");
            } else {
                setError(error.response?.data?.message || "Error al actualizar");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const createCUPSDiag = useCallback(async (data: Object, endPoint: string, onSuccess?: () => void) => {
        setLoading(true);
        setError(null);
        try {

            const response = await api.post(`/${endPoint}`, data);

            if (response.status === 200 || response.status === 201) {
                toast.success("Creado con éxito");
                setError(null);
                
                // Ejecutar callback de éxito para refrescar datos
                if (onSuccess) {
                    onSuccess();
                }
                
                return response.data;
            }

        } catch (error: any) {
            if (error.response?.status === 500) {
                setError("Error interno del servidor. Por favor, inténtalo más tarde.");
            } else if (error.response?.status === 409) {
                setError("El elemento ya existe. Por favor, verifica los datos.");
            } else {
                setError(error.response?.data?.message || "Error al crear");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    return { updateCUPSDiag, createCUPSDiag, loading, error };
}