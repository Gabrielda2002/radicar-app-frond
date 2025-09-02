import { api } from "@/utils/api-config";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

interface UseUpdateCUPSDiagReturn {
    updateCUPSDiag: (data: Object, id: number, endPoint: string, onSuccess?: () => void) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export const useUpdateCUPSDiag = (): UseUpdateCUPSDiagReturn => {
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
            setError(error.response.data.message)
        } finally {
            setLoading(false);
        }
    }, []);

    return { updateCUPSDiag, loading, error };
}