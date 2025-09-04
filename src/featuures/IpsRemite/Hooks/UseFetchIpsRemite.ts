import { IIPSRemite } from "@/models/IIpsRemite";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";

type UseFetchIpsRemiteResult = {
  data: IIPSRemite[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFetchIpsRemite = (): UseFetchIpsRemiteResult => {
  const [data, setData] = useState<IIPSRemite[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback( async () => {
      try {
        setLoading(true);
        const response = await api.get('/ips-remite');

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
    } , []);

    const refetch = useCallback(() => {
      getData();
    }, [getData]);

    useEffect(() => {
      getData();
    }, [getData]);

  return { data, loading, error, refetch };
};