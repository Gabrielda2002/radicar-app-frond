import { useState } from "react";
import { api } from "../utils/api-config";
import { IInputAutocompletado } from "../models/IInputAutocompletado";

const useFetchEspecialidadAtcp = () => {

    const [data , setData] = useState<IInputAutocompletado[] | null>([]);
    const [loading , setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInputAtcp = async (name: string, url: string) => {
        try {

            const response = await api.post(`/${url}` ,{
                name : name
            });
            if (!response.data || (Array.isArray(response.data) && response.data.length === 0)) {
                setError("No se encontraron resultados");
                setData(null);
            }else{
                const responseData = Array.isArray(response.data) ? response.data : [response.data];
                setData(responseData);
                setError(null);
            }
        } catch (error) {
            setError(`Ocurrió un errorEspecialidades al intentar obtener la especialidad.`);
            setData(null);
        } finally {
            setLoading(false);
        }
    }
    return { data, loading , error, fetchInputAtcp }
}

export default useFetchEspecialidadAtcp
