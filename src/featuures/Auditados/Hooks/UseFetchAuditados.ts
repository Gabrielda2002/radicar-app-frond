import { IAuditados } from "@/models/IAuditados";
import { fetchAuditados } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchAuditados = () => {
  const [data, setData] = useState<IAuditados[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
  
    const getData = async () => {
      try {
        const auditados = await fetchAuditados();
        if (isMounted) {
          setData(auditados);
        }
      } catch (error) {
        setError("Error al obtener los datos de la tabla auditados o no tienes los permisos necesarios. " + error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
  
    getData();
  
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}