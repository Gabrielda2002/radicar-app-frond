import { IAuditados } from "@/models/IAuditados";
import { fetchAuditados } from "@/services/apiService";
import { useCallback, useEffect, useState } from "react";
import { UpdateCups } from "../Services/UpdateCups";

export const useFetchAuditados = () => {
  const [data, setData] = useState<IAuditados[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    let isMounted = true;
  
  const fetchData = useCallback(async () => {
     try {

        setLoading(true);

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
  }, [])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const UpdateCupsAuthorized = async (id: number, data: FormData) => {
    try {
      
      setLoading(true);

      const response = await UpdateCups(id, data);

      if (response?.status === 200 || response?.status === 201) {
        setError(null);
        return response;
      }

    } catch (error: any) {
      if (error.response?.status === 500) {
        setError("Error interno del servidor. Por favor, inténtelo más tarde.");
      }else {
        setError("Error al actualizar el CUPS: " + error.response?.data?.message);
      }
    }finally{
      setLoading(false);
    }
  }

  return { data, loading, error, UpdateCupsAuthorized, refetch: fetchData };
}