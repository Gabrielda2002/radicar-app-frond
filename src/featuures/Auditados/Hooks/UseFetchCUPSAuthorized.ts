import { IAuditados } from "@/models/IAuditados";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";

export const useFetchCUPSAuthorized = () => {
  const [data, setData] = useState<IAuditados[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const fetchData = useCallback(async () => {
    try {

      setLoading(true);

      const response = await api.get('/auditoria-auditados');

      if (response.status === 200) {
        setData(response.data);
        setError(null);
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setError("Error interno del servidor. Por favor, inténtelo más tarde.");
      } else {
        setError(error.response?.data?.message || "Ocurrió un error al obtener los auditados.");
      }
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);


  return { data, loading, error, refetch };
}