import { IArea } from "@/models/IArea";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";

type UseFetchArea = {
    area: IArea[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useFetchArea = (): UseFetchArea => {
    const [area, setArea] = useState<IArea[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getData = useCallback(async () => {
        setIsLoading(true);
        try {
            
            const response = await api.get<IArea[]>('/area');

            if (response.status === 200 || response.status === 201) {
                setError(null);
                setArea(response.data);
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                setError('Error del servidor. Por favor, inténtelo de nuevo más tarde.');
            }else {
                setError(error.response.data.message);
            }
        }finally {
            setIsLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        getData();
    }, [getData])

    useEffect(() => {
        getData();
    }, [getData]);

    return { area, isLoading, error, refetch };
}