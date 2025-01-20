import { IAuditLetter } from "@/models/IAuditLetter";
import { useEffect, useState } from "react";
import { FetchAuditLetter } from "../Services/FetchAuditLetter";

export const useFetchAuditLetter = () => {
    const [auditLetter, setAuditLetter] = useState<IAuditLetter[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                
                const response = await FetchAuditLetter();

                if (response.length > 0) {
                    setAuditLetter(response);
                    setError(null);
                }else{
                    setError("No se encontraron solicitudes");
                    setAuditLetter(null);
                }

            } catch (error) {
                setError("Error inesperado al obtener las solicitudes. " + error);
            }finally{
                setLoading(false);
            }
        }
        getData();
    }, [])
    return { auditLetter, loading, error };
}