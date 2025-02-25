import { ICustomDataTickets } from "@/models/ICustomDataTickets";
import { useEffect, useState } from "react";
import { FetchCategoryEp } from "../Services/FetchCategoryEp";

export const useFetchCategory = (shouldFetch: boolean) => {
    const [dataCategory, setDataCategory] = useState<ICustomDataTickets[]>([]);
    const [loadingCategory, setLoadingCategory] = useState<boolean>(true);
    const [errorCategory, setErrorCategory] = useState<string | null>(null);

    useEffect(() => {
        if(!shouldFetch) return;

        const getData =  async () => {
            try {
                setLoadingCategory(true);
                const response = await FetchCategoryEp();
                setDataCategory(response);

            } catch (error) {
                setErrorCategory("Error al obtener los datos de la tabla categorias o no tienes los permisos necesarios. " + error);
            }finally{
                setLoadingCategory(false);
            }
        };
        
        getData();
    }, [shouldFetch]);
    return { dataCategory, loadingCategory, errorCategory };
}