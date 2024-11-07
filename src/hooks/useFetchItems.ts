import { useEffect, useState } from "react";
import { api } from "../utils/api-config";
import { IItems } from "../models/IItems";

const useFetchItems = (id: number | null) => {

    const [items , setItems] = useState<IItems[] | null>(null);
    const [loadingItems , setLoading] = useState<boolean>(true);
    const [errorItems, setError] = useState<string | null>(null);

    useEffect(() => {

        if( !id) return;

        const fetchEspecialidadAtcp = async () => {
            try {
    
                const response = await api.get(`/equipos-sede/${id}`);
                if (response.data.length === 0) {
                    setError("No se encontraron resultados");
                    setItems(null);
                }else{
                    setItems(response.data);
                    setError(null);
                }
            } catch (error) {
                setError(`Ocurrió un error al obtener las items.`);
                setItems(null);
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
       fetchEspecialidadAtcp();
    }, [id]);

    return { items, loadingItems , errorItems }
}

export default useFetchItems;
