import { useCallback, useEffect, useState } from "react";
import { IBalancesVacations, UseFetchBalanceReturn } from "../Types/IBalancesVacations";
import { api } from "@/utils/api-config";

export const useFetchBalances = (): UseFetchBalanceReturn => {
    const [ data, setData ] = useState<IBalancesVacations | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            
            const response = await api.get<IBalancesVacations>('/pending-setup');

            if (response.status === 200) {
                setData(response.data);
                setError(null);
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                setError("Error del servidor. Por favor, intente más tarde.");
            }else {
                setError(`${error.response.data.message || "Error al obtener los datos."}`);
            }
        }finally{
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        getData();
    }, [getData]);

    const refetch = useCallback(() => {
        getData();
    }, [getData])

return {
    data: data!,
    loading,
    error,
    refetch
}

}