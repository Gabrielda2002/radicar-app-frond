import { api } from "@/utils/api-config";
import { useState } from "react";
import { toast } from "react-toastify";

type UsePositionMutationResult = {
    isLoading: boolean;
    error: string | null;
    create: (data: Object, onSuccess?: () => void) => void;
    update: (id: number, data: Object, onSuccess?: () => void) => void;
}

export const usePositionMutation = (): UsePositionMutationResult => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const create = async (data: Object, onSuccess?: () => void) => {
        setIsLoading(true);
        try {
            
            const response = await api.post("/cargo", data);

            if (response.status === 201 || response.status === 200) {
                setError(null);
                if (onSuccess) onSuccess();
                toast.success("Cargo creado con éxito");
                return response.data;
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
            }else {
                setError(error.response.data.message);
            }
        }finally{
            setIsLoading(false);
        }
    }

    const update = async (id: number, data: Object, onSuccess?: () => void) => {
        setIsLoading(true);
        try {
            const response = await api.put(`/cargo/${id}`, data);
            if (response.status === 200 || response.status === 201) {
                setError(null);
                if (onSuccess) onSuccess();
                toast.success("Cargo actualizado con éxito");
                return response.data;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
            } else {
                setError(error.response.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, error, create, update };

}