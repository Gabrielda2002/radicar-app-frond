import { IEspecialidad } from "@/models/IEspecialidad";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";

type UseFetchEspecialidadResult = {
  data: IEspecialidad[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export const useFetchEspecialidad = (): UseFetchEspecialidadResult => {
  const [data, setData] = useState<IEspecialidad[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback( async () => {
    setLoading(true);
    try {
      const response = await api.get('/especialidades');

        if (response.status === 200 || response.status === 201) {
            setData(response.data);
            setError(null);
        }

    } catch (error: any) {
        if (error.response?.status === 500) {
            setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
        }else{
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
