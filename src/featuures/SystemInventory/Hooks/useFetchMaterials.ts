import { useEffect, useState } from "react";
import { getMaterials } from "../Services/getMaterials";
import { ICustomSelectOption } from "../Models/ICustomSelectOption";

export const useFetchMaterials = () => {
    const [materials, setMaterials] = useState<ICustomSelectOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
    
                const response = await getMaterials();
    
                if (response.status === 200 || response.status === 201) {
                    setMaterials(response.data);
                    setError(null); 
                }
    
            } catch (error: any) {
                if (error.response.status === 404) {
                    setError('No se encontraron materiales disponibles. ' + error);
                }
    
                setError('Error inesperado al obtener los materiales. ' + error);
            }
        }
        getData();
    }, [])

    return { materials, loading, error };
}