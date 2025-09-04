import { IServicios } from "@/models/IServicio";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";

type UseFetchServiceResult = {
  data: IServicios[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};


export const useFetchService = (): UseFetchServiceResult => {
  const [data, setData] = useState<IServicios[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback( async () => {
    try {
      const response = await api.get("/servicios");

      if (response.status === 200 || response.status === 201) {
        setData(response.data);
        setError(null);
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        setError(
          "Error del servidor. Por favor, inténtelo de nuevo más tarde."
        );
      } else {
        setError(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  } , []);

  const refetch = useCallback(() => {
    getData();
  }, [getData]);

    useEffect(() => {
    getData();
  }, [getData]);

  return { data, loading, error, refetch };
};
