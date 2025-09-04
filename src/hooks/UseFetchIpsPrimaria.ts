import { IIPSPrimaria } from "@/models/IIpsPrimaria";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";

type UseFetchIpsPrimariaReturn = {
  dataIpsPrimaria: IIPSPrimaria[];
  loading: boolean;
  errorIpsPrimaria: string | null;
  refetch: () => void;
};

export const useFetchIpsPrimaria = (
  shouldFetch: boolean
): UseFetchIpsPrimariaReturn => {
  const [dataIpsPrimaria, setDataIpsPrimaria] = useState<IIPSPrimaria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorIpsPrimaria, setErrorIpsPrimaria] = useState<string | null>(null);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/ips-primaria");

      if (response.status === 200 || response.status === 201) {
        setDataIpsPrimaria(response.data);
        setErrorIpsPrimaria(null);
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setErrorIpsPrimaria(
          "Error del servidor. Por favor, inténtelo de nuevo más tarde."
        );
      } else {
        setErrorIpsPrimaria(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (shouldFetch) getData();
  }, [shouldFetch, getData]);

  return { dataIpsPrimaria, loading, errorIpsPrimaria, refetch };
};
