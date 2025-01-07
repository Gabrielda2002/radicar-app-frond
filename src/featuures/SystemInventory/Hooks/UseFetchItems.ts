import { useEffect, useState } from "react";
import { api } from "@/utils/api-config";
import { IItems } from "@/models/IItems";
import { IItemsNetworking } from "@/models/IItemsNetworking";

const useFetchItems = (id: number | null, tipoItem: "equipos" | "dispositivos-red" | null) => {

    const [items , setItems] = useState<IItems[] | IItemsNetworking[] | null>(null);
    const [loadingItems , setLoading] = useState<boolean>(true);
    const [errorItems, setError] = useState<string | null>(null);

    useEffect(() => {

        if( !id || !tipoItem) return;

        const fetchEspecialidadAtcp = async () => {
            try {
    
                const response = await api.get(`/${tipoItem}-sede/${id}`);
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
    }, [id, tipoItem]);

    return { items, loadingItems , errorItems }
}

export default useFetchItems;
