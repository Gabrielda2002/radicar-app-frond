import { api } from "@/utils/api-config";
import { useState } from "react";

interface UseMutationCUPSAuthResult {
    error: string | null;
    loading: boolean;
    UpdateCupsAuthorized: (id: number, formData: Object, onSuccess: () => void) => Promise<void>;
}

export const useMutationCUPSAuth = (): UseMutationCUPSAuthResult => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const UpdateCupsAuthorized = async (id: number, data: Object, onSuccess: () => void) => {
        try {

            setLoading(true);

            const response = await api.put(`/actualizar-cups/${id}`, data);

            if (response?.status === 200 || response?.status === 201) {
                setError(null);
                onSuccess()
            }

        } catch (error: any) {
            if (error.response?.status === 500) {
                setError("Error interno del servidor. Por favor, inténtelo más tarde.");
            } else {
                setError(error.response?.data?.message || "Ocurrió un error al actualizar el CUPS.");
            }
        } finally {
            setLoading(false);
        }
    }


    return { error, loading, UpdateCupsAuthorized };
}