import { useEffect, useState } from "react";
import { ICustomSelectOption } from "../Models/ICustomSelectOption";
import { getStatusIvGeneral } from "../Services/getStatusIvGeneral";

export const useFetchStatusIvGeneral = () => {
    const [ statusIvGeneral, setStatusIvGeneral ] = useState<ICustomSelectOption[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                
                setLoading(true);

                const response = await getStatusIvGeneral();

                if (response.status === 200 || response.status === 201) {
                    setStatusIvGeneral(response.data);
                    setError(null); 
                }

            } catch (error: any) {
                if (error.response.status === 404) {
                    setError('No se encontraron estados disponibles. ' + error);
                }

                setError('Error inesperado al obtener los estados. ' + error);
            }
        }
        getData();
    }, [])

    return { statusIvGeneral, loading, error };
}