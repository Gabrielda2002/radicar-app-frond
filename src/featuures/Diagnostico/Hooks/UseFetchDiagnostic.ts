import { IDiagnostico } from "@/models/IDiagnostico";
import { fetchDiagnosticos } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchDiagnostic = () => {
    const [diagnostico, setDiagnostico] = useState<IDiagnostico[] | null>([]);
    const [loading, setLoading] = useState(false);
    const [errorDiagnostico, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const cirugias = await fetchDiagnosticos();
          setDiagnostico(cirugias);
          setError(null);
        } catch (error) {
          setError("Error al obtener los departamentos o no tienes los permisos necesarios. " + error);
          setDiagnostico(null);
        } finally {
          setLoading(false);
        }
      }
      getData();
    }, []);
    return { diagnostico, loading, errorDiagnostico };
  }