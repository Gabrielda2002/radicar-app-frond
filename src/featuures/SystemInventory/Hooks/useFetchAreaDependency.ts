import { useEffect, useState } from "react";
import { getAreaDependency } from "../Services/getAreaDependency";
import { ICustomSelectOption } from "../Models/ICustomSelectOption";

export const useFetchAreaDependency = () => {
        const [areaDependency, setAreaDependency] = useState<ICustomSelectOption[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
    
        useEffect(() => {
            
            const fetchData = async () => {
                try {
                    
                    setLoading(true);
        
                    const response =  await getAreaDependency();
        
                    if (response.status === 200 || response.status === 201) {
                        setAreaDependency(response.data);
                        setError(null); 
                    }
        
                } catch (error: any) {
                    if (error.response.status === 404) {
                        setError('No se encontraron activos disponibles. ' + error);
                    }
        
                    setError('Error inesperado al obtener los activos. ' + error);
                }
            }
            fetchData();
        }, [])
    
        return { areaDependency, loading, error };
} 