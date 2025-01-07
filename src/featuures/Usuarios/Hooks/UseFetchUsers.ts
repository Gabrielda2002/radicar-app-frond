import { IUsuarios } from "@/models/IUsuarios";
import { fetchUsuario } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchUsuarios = () => {
    const [data, setData] = useState<IUsuarios[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const getData = async () => {
        try {
            const usuarios = await fetchUsuario();
            setData(usuarios);
        } catch (error) {
            setError("Error al obtener los datos de la tabla usuarios o no tienes los permisos necesarios. " + error);
        } finally {
            setLoading(false);
        }
        };
    
        getData();
    }, []);
    
    return { data, loading, error };
}