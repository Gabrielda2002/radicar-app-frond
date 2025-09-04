import { IRol } from "@/models/IRol";
import { api } from "@/utils/api-config";
import { useCallback, useState } from "react";

type UseLazyFetchTypeDocumentResult = {
  rols: IRol[];
  loadingRol: boolean;
  errorRol: string | null;
  fetchRols: () => Promise<void>;
};

export const useLazyFetchRol = (): UseLazyFetchTypeDocumentResult => {
  const [rols, setRols] = useState<IRol[]>([]);
  const [loadingRol, setLoadingRol] = useState<boolean>(false);
  const [errorRol, setErrorRol] = useState<string | null>(null);

  const fetchRols = useCallback(async () => {
    if (rols.length > 0) return;
    setLoadingRol(true);
    try {
      const response = await api.get("/roles");

      if (response.status === 200 || response.status === 201) {
        setRols(response.data);
        setErrorRol(null);
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        setErrorRol(
          "Error del servidor. Por favor, inténtelo de nuevo más tarde."
        );
      } else {
        setErrorRol(error.response?.data?.message);
      }
    } finally {
      setLoadingRol(false);
    }
  }, [rols.length]);

  return { rols, loadingRol, errorRol, fetchRols };
};
