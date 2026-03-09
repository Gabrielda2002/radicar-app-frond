import { IUnidadFuncional } from "@/models/IUnidadFuncional";
import { fetchUnidadFuncional } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchFuntionalUnit = () => {
    const [data, setData] = useState<IUnidadFuncional[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const getData = async () => {
        try {
            const unidadFuncional = await fetchUnidadFuncional();
            setData(unidadFuncional);
        } catch (error) {
            setError("Error al obtener los datos de la tabla unidad funcional o no tienes los permisos necesarios. " + error);
        } finally {
            setLoading(false);
        }
        };
    
        getData();
    }, []);
    
    return { data, loading, error };
}