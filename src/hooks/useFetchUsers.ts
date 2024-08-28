import { useEffect, useState } from "react";
import { IRadicacion } from "../models/TableRadicacion";
import { fetchAuditoria, fetchCups, fetchUsers } from "../services/apiService";
import { IAuditoria } from "../models/IAuditoria";
import { ICups } from "../models/ICups";

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

export const useFetchAuditoria = () => {
    const [data, setData] = useState<IAuditoria[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const auditorias = await fetchAuditoria();
                setData(auditorias);
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

export const useFetchCups = () => {
    const [data, setData] = useState<ICups[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const cups = await fetchCups();
                setData(cups);
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