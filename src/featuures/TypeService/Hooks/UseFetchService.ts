import { IServicios } from "@/models/IServicio";
import { fetchServicio } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchService = () => {
    const [data, setData] = useState<IServicios[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const getData = async () => {
        try {
            const servicios = await fetchServicio();
            setData(servicios);
        } catch (error) {
            setError("Error al obtener los datos de la tabla servicios o no tienes los permisos necesarios. " + error);
        } finally {
            setLoading(false);
        }
        };
    
        getData();
    }, []);
    
    return { data, loading, error };
}