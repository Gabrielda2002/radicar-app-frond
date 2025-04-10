import { useState } from "react";
import { ICustomSelectOption } from "../Models/ICustomSelectOption";
import { getAssetByClassification } from "../Services/getAssetByClassification";

export const useFetchAsset = () => {
    const [asset, setAsset] = useState<ICustomSelectOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (id: string) => {
        try {
            
            setLoading(true);

            const response =  await getAssetByClassification(id);

            if (response.status === 200 || response.status === 201) {
                setAsset(response.data);
                setError(null); 
            }

        } catch (error: any) {
            if (error.response.status === 404) {
                setError('No se encontraron activos disponibles. ' + error);
            }

            setError('Error inesperado al obtener los activos. ' + error);
        }
    }

    return { asset, loading, error, fetchData };

}