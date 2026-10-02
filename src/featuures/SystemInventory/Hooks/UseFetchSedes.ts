import { useEffect, useState } from "react";
import { api } from "@/utils/api-config";
import { ILugarRadicacion } from "@/models/ILugarRadicado";

const useFetchSedes = (id: number | null) => {

    const [sedes , setSedes] = useState<ILugarRadicacion[] | null>(null);
    const [loadingSedes , setLoading] = useState<boolean>(true);
    const [errorSedes, setError] = useState<string | null>(null);

    useEffect(() => {

        if( !id) return;

        const fetchEspecialidadAtcp = async () => {
            try {
    
                const response = await api.get(`/headquarters/department/${id}`);
                if (response.data.length === 0) {
                    setError("No se encontraron resultados");
                    setSedes(null);
                }else{
                    setSedes(response.data);
                    setError(null);
                }
            } catch (error) {
                setError(`Ocurrió un error al obtener las sedes.`);
                setSedes(null);
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
       fetchEspecialidadAtcp();
    }, [id]);

    return { sedes, loadingSedes , errorSedes }
}

export default useFetchSedes;
