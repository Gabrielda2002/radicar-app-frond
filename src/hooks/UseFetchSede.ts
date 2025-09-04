import { ILugarRadicacion } from "@/models/ILugarRadicado";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";

type UseFetchSedeResult = {
  data: ILugarRadicacion[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export const useFetchSede = (): UseFetchSedeResult => {
  const [data, setData] = useState<ILugarRadicacion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async () => {
    try {
      setLoading(true);

      const lugarRadicado = await api.get("/lugares-radicacion");

      if (lugarRadicado.status === 200 || lugarRadicado.status === 201) {
        setData(lugarRadicado.data);
        setError(null);
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setError(
          "Error del servidor. Por favor, inténtelo de nuevo más tarde."
        );
      } else {
        setError(error.response?.data?.message);
      }
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
