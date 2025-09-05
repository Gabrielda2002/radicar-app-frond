import { IConvenios } from "@/models/IConvenios";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";

export const useFetchConvenio = () => {
  const [dataConvenios, setDataConvenios] = useState<IConvenios[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorConvenio, setErrorConvenio] = useState<string | null>(null);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const convenios = await api.get("/convenio");

      if (convenios.status === 200 || convenios.status === 201) {
        setDataConvenios(convenios.data);
        setErrorConvenio(null);
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setErrorConvenio(
          "Error del servidor. Por favor, inténtelo de nuevo más tarde."
        );
      } else {
        setErrorConvenio(error.response?.data?.message);
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

  return { dataConvenios, loading, errorConvenio, refetch };
};
