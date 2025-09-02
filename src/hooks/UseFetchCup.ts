import { ICups } from "@/models/ICups";
import { fetchCups } from "@/services/apiService";
import { useCallback, useEffect, useState } from "react";

export const useFetchCups = () => {
  const [data, setData] = useState<ICups[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const cups = await fetchCups();
      setData(cups);
      setError(null);
    } catch (error) {
      setError("Error al obtener los datos de los CUPS o no tienes los permisos necesarios. " + error);
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
};