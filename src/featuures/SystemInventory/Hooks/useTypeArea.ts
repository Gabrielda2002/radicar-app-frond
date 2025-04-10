import { useEffect, useState } from "react";
import { ICustomSelectOption } from "../Models/ICustomSelectOption";
import { getTypeArea } from "../Services/getTypeArea";

export const useTypeArea = () => {
        const [ typeArea, setTypeArea ] = useState<ICustomSelectOption[]>([]);
        const [ loading, setLoading ] = useState<boolean>(true);
        const [ error, setError ] = useState<string | null>(null);
    
        useEffect(() => {
            const getData = async () => {
                try {
                    
                    setLoading(true);
    
                    const response = await getTypeArea();
    
                    if (response.status === 200 || response.status === 201) {
                        setTypeArea(response.data);
                        setError(null); 
                    }
    
                } catch (error: any) {
                    if (error.response.status === 404) {
                        setError('No se encontraron estados disponibles. ' + error);
                    }
    
                    setError('Error inesperado al obtener los estados. ' + error);
                }
            }
            getData();
        }, [])
    
        return { typeArea, loading, error };
}