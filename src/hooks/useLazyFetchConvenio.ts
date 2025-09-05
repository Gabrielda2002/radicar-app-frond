import { IConvenios } from "@/models/IConvenios";
import { api } from "@/utils/api-config";
import { useCallback, useState } from "react";

type UseLazyFetchConvenioResult = {
    dataConvenios: IConvenios[];
    errorConvenio: string | null;
    loading: boolean;
    fetchConvenios: () => Promise<void>;
}

export const useLazyFetchConvenio = (): UseLazyFetchConvenioResult => {
    const [dataConvenios, setDataConvenios] = useState<IConvenios[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorConvenio, setErrorConvenio] = useState<string | null>(null);

    const fetchConvenios = useCallback(async () => {
        if(dataConvenios.length > 0) return; 
        setLoading(true);
        try {

            const response = await api.get("/ips-primaria");

            if (response.status === 200 || response.status === 201) {
                setDataConvenios(response.data);
                setErrorConvenio(null);
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                setErrorConvenio("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
            }else {
                setErrorConvenio(error.response?.data?.message);
            }
        }finally {
            setLoading(false);
        }
    }, [dataConvenios.length]);

    return { dataConvenios, errorConvenio, loading, fetchConvenios };

}