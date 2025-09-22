import { useEffect, useState } from "react";
import { IQuantityItems } from "../Models/IQuantityItems";
import { api } from "@/utils/api-config";

type UseFetchQuantityReturn = {
    quantity: IQuantityItems[] | null;
    loading: boolean;
    error: string | null;
}

export const useFetchQuantity = (typeItem: string, idHeadquartersSelected?: number): UseFetchQuantityReturn => {
    const [quantity, setQuantity] = useState<IQuantityItems[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const endPoint = typeItem === "equipos" 
                ? "equipments/statics/headquarters" 
                : typeItem === "dispositivos-red" 
                ? "dispositivos-red/statistics/headquarters" 
                : typeItem === 'inventario/general'
                ? "inventario/general/statistics/headquarters"
                : typeItem === 'inventario/televisores'
                ? 'tv/statics/headquarters'
                : 'celular/statics/headquarters';

                const response = await api.get(`${endPoint}/${idHeadquartersSelected}`);
                if (response.status === 200 || response.status === 201) {
                    setQuantity(response.data);
                    setError(null);
                    
                }
            } catch (error) {
                setError("Error al cargar los datos de cantidad de items.");
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [typeItem])

    return { quantity, loading, error };
}