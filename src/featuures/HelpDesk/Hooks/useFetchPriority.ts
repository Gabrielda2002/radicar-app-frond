import { ICustomDataTickets } from "@/models/ICustomDataTickets";
import { useEffect, useState } from "react";
import { FetchPriorityEp } from "../Services/FetchPriorityEp";

export const useFetchPriority = (shouldFetch: boolean) => {
    const [dataPriority, setDataPriority] = useState<ICustomDataTickets[]>([]);
    const [loadingPriority, setLoadingPriority] = useState<boolean>(true);
    const [errorPriority, setErrorPriority] = useState<string | null>(null);

    useEffect(() => {
        
        if(!shouldFetch) return;

        const getData = async () => {
            try {
                
                setLoadingPriority(true);

                const response = await FetchPriorityEp();
                return setDataPriority(response);
                setErrorPriority(null);


            } catch (error) {

                setErrorPriority('error al obtener los datos de la tabla prioridades o no tienes los permisos necesarios. ' + error);
            }finally{
                setLoadingPriority(false);
            }
        }
        getData();
    }, [shouldFetch]);
    
    return { dataPriority, loadingPriority, errorPriority };

}