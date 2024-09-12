import { useState } from "react";
import { IDiagnostico } from "../models/IDiagnostico";
import { api } from "../utils/api-config";

const useFetchDiagnostico = () => {
  const [diagnostico, setDiagnostico] = useState<IDiagnostico[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [errorDiagnostico, setError] = useState<string | null>(null);

    const fetchDiagnostico = async (code: string) => {
        try {
            
            const response = await api.post("/diagnosticos-name", { code });

            if (response.data.length > 0) {
                const responseData = Array.isArray(response.data) ? response.data : [response.data];
                setDiagnostico(responseData);
                setError(null);
            }else{
                setError("No se encontraron resultados");
                setDiagnostico(null);
            }

        } catch (error) {
            setError("Error al cargar el diagnóstico");
            setDiagnostico(null);
        }finally{
            setLoading(false);
        }
    }

    return { diagnostico, loading, errorDiagnostico, fetchDiagnostico };
};

export default useFetchDiagnostico;
