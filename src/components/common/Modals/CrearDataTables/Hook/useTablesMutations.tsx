import { api } from "@/utils/api-config";
import { useState } from "react";
import { toast } from "react-toastify";

interface UseTablesMutationsReturn {
    loading: boolean;
    error: string | null;
    update: (data: Object, endPoint: string, onSuccess?: () => void) => Promise<void>;
    create: (data: Object, endPoint: string, onSuccess?: () => void) => Promise<void>;
}

export const useTableMutations = (): UseTablesMutationsReturn => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (data: Object, endPoint: string): Promise<void> => {
        // update logic here
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

        } catch (error: any) {
            if (error.response.status === 500) {
                setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
            }else {
                setError(error.response.data.message);
            }
        }finally {
            setLoading(false);
        }
    };

    return { loading, error, update, create };
}