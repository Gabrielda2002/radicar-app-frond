import { useEffect, useState } from "react";
import { IRadicacion } from "../models/TableRadicacion";
import { fetchUsers } from "../services/apiService";

export const useFetchUsers = () => {
    const [data, setData] = useState<IRadicacion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const users = await fetchUsers();
                setData(users);
            } catch (error) {
                setError("Error al obtener los datos de los usuarios" + error);
            }finally{
                setLoading(false);
            }
        };

        getData();
    } , []);

    return {data, loading, error};
}