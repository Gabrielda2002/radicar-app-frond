import { IPosition } from "@/models/IPosition";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";

type UseFetchPositionResult = {
    data: IPosition[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useFetchPosition = (): UseFetchPositionResult => {
    const [data, setData] = useState<IPosition[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getData = useCallback(async () => {
        setIsLoading(true);
        try {
            
            const response=  await api.get("/cargo");

            if (response.status === 200 || response.status === 201) {
                setData(response.data);
                setError(null);
                return response.data;
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
            }else {
                setError(error.response.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        getData();
    }, [getData]);


    useEffect(() => {
        getData();
    }, [getData]);

    return { data, isLoading, error, refetch };
}