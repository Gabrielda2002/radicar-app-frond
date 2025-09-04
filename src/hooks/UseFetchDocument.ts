import { IDocumento } from "@/models/IDocumento";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";

type UseFetchDocumentoReturn = {
  dataDocumento: IDocumento[];
  loadingDocumento: boolean;
  errorDocumento: string | null;
  refetch: () => void;
}

export const useFetchDocumento = (shouldFetch: boolean): UseFetchDocumentoReturn => {
  const [dataDocumento, setDataDocumento] = useState<IDocumento[]>([]);
  const [loadingDocumento, setLoadingDocumento] = useState<boolean>(false);
  const [errorDocumento, setErrorDocumento] = useState<string | null>(null);

  const getData = useCallback(async ()  => {
    setLoadingDocumento(true);
    try {
        const response = await api.get('/documento');

        if (response.status === 200 || response.status === 201) {
            setDataDocumento(response.data);
            setErrorDocumento(null);
        }

    } catch (error: any) {
      if (error.response.status === 500) {
        setErrorDocumento("Error interno en el servidor. Por favor, inténtelo de nuevo más tarde.");
      }else {
        setErrorDocumento(error.response?.data?.message);
      }
    }finally{
      setLoadingDocumento(false);
    }

  }, []);

  const refetch = useCallback(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (shouldFetch) {
      getData();
    }
  }, [shouldFetch, getData]);

  return { dataDocumento, errorDocumento, refetch, loadingDocumento };
};