import { api } from "@/utils/api-config";
import { useState } from "react";
import { toast } from "react-toastify";

type UseMunicipalityMutationsResult = {
    createMunicipio: (data: Object, onSuccess?: () => void) => Promise<void>;
    updateMunicipio: (id: number, data: Object, onSuccess?: () => void) => Promise<void>;
    error: string | null;
    loading: boolean;
}

export const useMunicipalityMutations = (): UseMunicipalityMutationsResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createMunicipio = async (data: Object, onSuccess?: () => void) => {
        setLoading(true);
        try {
              const response = await api.post('/municipios', data);
              
                if (response.status === 200 || response.status === 201) {
                    setError(null);
                    toast.success("Creado con éxito");
                    onSuccess?.();
                }
              
        } catch (error: any) {
            if (error.response.status === 500) {
                setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
            } else {
                setError(error.response?.data?.message);
            }
        }finally {
            setLoading(false);
        }
    }

    const updateMunicipio = async (id: number, data: Object, onSuccess?: () => void) => {
        setLoading(true);
        try {
            const response = await api.put(`/municipios/${id}`, data);
            if (response.status === 200 || response.status === 201) {
                setError(null);
                toast.success("Actualizado con éxito");
                onSuccess?.();
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
            } else {
                setError(error.response?.data?.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return { createMunicipio, updateMunicipio, error, loading };

}