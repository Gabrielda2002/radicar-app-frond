import { ICirugias } from "@/models/ICirugias";
import { fetchCirugias } from "@/services/apiService";
import { useCallback, useEffect, useState } from "react";

interface UseFetchSurgeryResult {
  data: ICirugias[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFetchCirugias = (): UseFetchSurgeryResult => {
  const [data, setData] = useState<ICirugias[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const cirugias = await fetchCirugias();
      setData(cirugias);
    } catch (error) {
      setError("Error al obtener los datos de la tabla cirugias o no tienes los permisos necesarios. " + error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, loading, error, refetch };
}