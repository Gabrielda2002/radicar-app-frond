import { useCallback, useEffect, useState } from "react";
import { ICustomSelectOption } from "../Models/ICustomSelectOption";
import { getClassification } from "../Services/getClassification";

export const useFetchClassification = () => {
    const [classification, setClassification] = useState<ICustomSelectOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getData = useCallback(async () => {
        try {

            setLoading(true);

            const response = await getClassification();

            if (response.status === 200 || response.status === 201) {
                setClassification(response.data);
                setError(null);
            }

        } catch (error: any) {

            if (error.response.status === 404) {
                setError('No se encontraron clasificaciones disponibles. ' + error);
            }

            setError('Error inesperado al obtener la clasificación. ' + error);
        } finally {
            setLoading(false);
        }
    }, [])


    useEffect(() => {
        getData();
    }, [getData])

    const refetch = useCallback(() => {
        getData();
    }, [getData])



    return { classification, loading, error, refetch };

}