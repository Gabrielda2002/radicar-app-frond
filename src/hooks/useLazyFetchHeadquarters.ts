import { ILugarRadicacion } from "@/models/ILugarRadicado";
import { api } from "@/utils/api-config";
import { useCallback, useState } from "react";

type UseLazyFetchHeadquartersResult = {
  headquarters: ILugarRadicacion[];
  loadingHeadquarters: boolean;
  errorHeadquarters: string | null;
  fetchHeadquarters: () => Promise<void>;
};

export const useLazyFetchHeadquarters = (): UseLazyFetchHeadquartersResult => {
  const [headquarters, setHeadquarters] = useState<ILugarRadicacion[]>([]);
  const [loadingHeadquarters, setLoadingHeadquarters] =
    useState<boolean>(false);
  const [errorHeadquarters, setErrorHeadquarters] = useState<string | null>(
    null
  );

  const fetchHeadquarters = useCallback(async () => {
    if (headquarters.length > 0) return;
    setLoadingHeadquarters(true);
    try {
      const response = await api.get("/lugares-radicacion");

      if (response.status === 200 || response.status === 201) {
        setHeadquarters(response.data);
        setErrorHeadquarters(null);
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        setErrorHeadquarters(
          "Error del servidor. Por favor, inténtelo de nuevo más tarde."
        );
      } else {
        setErrorHeadquarters(error.response?.data?.message);
      }
    } finally {
      setLoadingHeadquarters(false);
    }
  }, [headquarters.length]);

  return {
    headquarters,
    loadingHeadquarters,
    errorHeadquarters,
    fetchHeadquarters,
  };
};
