import { useState } from "react";
import { IEspecialidad } from "../models/IEspecialidad";
import { api } from "../utils/api-config";

const useFetchEspecialidadAtcp = () => {

    const [especialidades , setEspecialidades] = useState<IEspecialidad | null>(null);
    const [loadingEspecialidades , setLoading] = useState<boolean>(true);
    const [errorEspecialidades, setError] = useState<string | null>(null);

    const fetchEspecialidadAtcp = async (name: string) => {
        try {

            const response = await api.post('/especialidades-name' , {
                name : name
            });
            if (response.data.length === 0) {
                setError("No se encontraron resultados");
                setEspecialidades(null);
            }else{
                setEspecialidades(response.data);
                setError(null);
            }
        } catch (error) {
            setError(`Ocurrió un errorEspecialidades al intentar obtener la especialidad.`);
            setEspecialidades(null);
        } finally {
            setLoading(false);
        }
    }
    return { especialidades, loadingEspecialidades , errorEspecialidades, fetchEspecialidadAtcp }
}

export default useFetchEspecialidadAtcp
