import { IEspecialidad } from "@/models/IEspecialidad";
import { fetchEspecialidad } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchEspecialidad = () => {
    const [data, setData] = useState<IEspecialidad[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const getData = async () => {
        try {
            const especialidad = await fetchEspecialidad();
            setData(especialidad);
        } catch (error) {
            setError("Error al obtener los datos de la tabla especialidades o no tienes los permisos necesarios. " + error);
        } finally {
            setLoading(false);
        }
        };
    
        getData();
    }, []);
    
    return { data, loading, error };
}