import { api } from "@/utils/api-config";
import { useState } from "react";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

const getMutationError = (error: unknown): string => {
    if (isAxiosError<{ message?: string }>(error)) {
        if (error.response?.status === 500) {
            return "Error del servidor. Por favor, inténtelo de nuevo más tarde.";
        }
        if (typeof error.response?.data?.message === "string") {
            return error.response.data.message;
        }
    }
    return "No se pudieron guardar los cambios. Inténtelo de nuevo.";
};

interface UseTablesMutationsReturn {
    loading: boolean;
    error: string | null;
    update: (id: number, data: Object, endPoint: string, onSuccess?: () => void) => Promise<void>;
    create: (data: Object, endPoint: string, onSuccess?: () => void) => Promise<void>;
}

export const useTableMutations = (): UseTablesMutationsReturn => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (id: number, data: Object, endPoint: string, onSuccess?: () => void): Promise<void> => {
        try {
            
            setLoading(true);

            const response = await api.put(`/${endPoint}/${id}`, data);

            if (response.status === 200) {
                setError(null);
                toast.success("Actualizado con éxito");
                if (onSuccess) {
                    onSuccess();
                }
            }

        } catch (error: unknown) {
            setError(getMutationError(error));
        } finally {
            setLoading(false);
        }
    };

    const create = async (data: Object, endPoint: string, onSuccess?: () => void): Promise<void> => {
        setLoading(true);
        try {

            const response = await api.post(`/${endPoint}`, data);

            if (response.status === 201 || response.status === 200) {
                setError(null)
                toast.success("Creado con exito");
                if (onSuccess) {
                    onSuccess();
                }
            }

        } catch (error: unknown) {
            setError(getMutationError(error));
        }finally {
            setLoading(false);
        }
    };

    return { loading, error, update, create };
}
