import { IIPSPrimaria } from "@/models/IIpsPrimaria";
import { api } from "@/utils/api-config";
import { useCallback, useState } from "react";

type UseLazyFetchIpsPrimaryResult = {
    dataIpsPrimaria: { id: number; name: string }[];
    errorIpsPrimaria: string | null;
    loading: boolean;
    fetchIpsPrimaria: () => Promise<void>;
}

export const useLazyFetchIpsPrimary = (): UseLazyFetchIpsPrimaryResult => {
    const [dataIpsPrimaria, setDataIpsPrimaria] = useState<IIPSPrimaria[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorIpsPrimaria, setErrorIpsPrimaria] = useState<string | null>(null);

    const fetchIpsPrimaria = useCallback(async () => {
        if(dataIpsPrimaria.length > 0) return; 
        setLoading(true);
        try {
            const response = await api.get("/api/ips-primaria");
            if (response.status === 200 || response.status === 201) {
                setDataIpsPrimaria(response.data);
                setErrorIpsPrimaria(null);
            }
        } catch (error: any) {
            if (error.response?.status === 500) {
                setErrorIpsPrimaria("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
            }else{
                setErrorIpsPrimaria(error.response?.data?.message);
            }
        } finally {
            setLoading(false);
        }
    }, [dataIpsPrimaria]);

    return {
        dataIpsPrimaria,
        errorIpsPrimaria,
        loading,
        fetchIpsPrimaria
    };
}