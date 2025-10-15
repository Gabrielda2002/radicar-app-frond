import { useCallback, useEffect, useState } from "react";
import { IMyRequestsPermissions, UseFetchMyRequestsReturn } from "../types/MyRquestsPermissions,.type"
import { api } from "@/utils/api-config";

export const useFetchMyRequests = (): UseFetchMyRequestsReturn => {
    const [data, setData] = useState<IMyRequestsPermissions[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getData = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await api.get('/list/requests/user');

            if (response.status === 200) {
                setData(response.data);
                setError(null); 
            }

        } catch (err: any) {
            if (err.response.status === 500) {
                setError('Error del servidor. Por favor, inténtelo de nuevo más tarde.');
            }else {
                setError(err.response.data.message || 'Ocurrió un error. Por favor, inténtelo de nuevo.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        getData();
    }, [getData]);

    const refetch = useCallback(() => {
        getData();
    }, [getData]);

return {
    data,
    isLoading,
    error,
    refetch
}

}