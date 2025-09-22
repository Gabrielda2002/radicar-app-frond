import { useEffect, useState } from "react";
import { IItemsWithLock } from "../Models/IItemsWithLock";
import { api } from "@/utils/api-config";

type UseFetchItemsWithLockReturn = {
    withLock: IItemsWithLock | undefined;
    loading: boolean;
    error: string | null;
}

export const useFetchItemsWithLock = (typeItem: string, idHeadquartersSelected?: number): UseFetchItemsWithLockReturn => {
    const [withLock, setWithLock] = useState<IItemsWithLock>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                setLoading(true);

                const endpoint = typeItem === "equipos" ? "equipments/statics/withLock" : "items/locked/dispositivos-red";

                const response = await api.get(`/${endpoint}/${idHeadquartersSelected}`);

                if (response.status === 200 || response.status === 201) {
                    setWithLock(response.data);
                    setError(null);
                }

            } catch (error) {
                setError("Error al cargar los datos.");
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },  [])

    return { withLock, loading, error };

}