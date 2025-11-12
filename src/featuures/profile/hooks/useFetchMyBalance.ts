import { useCallback, useEffect, useState } from "react";
import { IMyBalance, UseFetchMyBalanceReturn } from "../type/IMyBalance";
import { api } from "@/utils/api-config";

export const useFetchMyBalance = (): UseFetchMyBalanceReturn => {
    const [data, setData] = useState<IMyBalance | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getData = useCallback(async () => {
        setIsLoading(true);
        try {

            const response = await api.get('/my-balance');

            if (response.status === 200) {
                setData(response.data);
                setError(null);
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
            } else {
                setError(error.response.data.message || "Ocurrió un error al obtener el balance.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [])
    useEffect(() => {
        getData();
    }, [getData]);

    return {
        data,
        isLoading,
        error
    }

}

