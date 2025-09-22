import { useEffect, useState } from "react";
import { IAgeStatics } from "../Models/IAgeStatics";
import { api } from "@/utils/api-config";

type UseFetchAgeStaticsReturn = {
    ageStatics: IAgeStatics | null;
    loading: boolean;
    error: string | null;
}

export const useFetchAgeStatics = (typeItem: string, idHeadquartersSelected?: number): UseFetchAgeStaticsReturn => {
    const [ageStatics, setAgeStatics] = useState<IAgeStatics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {

        const fetchData = async () => {
            try {
                
                setLoading(true);

                const endPoint = typeItem === "equipos" 
                ? "equipments/statics/age" 
                : typeItem === 'inventario/general'
                ? "inventario/general/statistics/age"
                : typeItem === 'inventario/televisores' 
                ? 'tv/statics/age'
                : 'celular/statics/age'

                const response = await api.get(`${endPoint}/${idHeadquartersSelected}`);

                if (response.status === 200 || response.status === 201) {
                    setAgeStatics(response.data)
                    setError(null)
                }

            } catch (error) {
                setError("Error fetching data");
            }finally{
                setLoading(false)
            }
        }
        fetchData();
    }, [typeItem])

    return {ageStatics, loading, error};
    
}