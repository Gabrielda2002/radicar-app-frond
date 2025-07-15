import { IProgramsGoals } from "@/models/IProgramsGoals";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";

export const useProgramsGoals = ( ) => {
    const [data, setData] = useState<IProgramsGoals[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProgramsGoals = async () => {
        try {
            
            setLoading(true);

            const response = await api.get<IProgramsGoals[]>("/metas/programas");

            if (response.status === 200 || response.status === 201) {
                setData(response.data);
                setError(null);
            }

        } catch (error: any) {
            setError(error.response.data.message || "Error al cargar las metas de los programas");
        }finally{
            setLoading(false);
        }
    }

    const refetch = useCallback(() => {
        fetchProgramsGoals();
    }, [fetchProgramsGoals])

    useEffect(() =>{
        fetchProgramsGoals();
    }, [])

    return {
        data,
        loading,
        error,
        fetchProgramsGoals,
        refetch
    }
}