import { useCallback, useState } from "react";
import { ICustomDataTickets } from "@/models/ICustomDataTickets";
import { api } from "@/utils/api-config";

type UseLazyFetchCategoryReturn = {
  dataCategory: ICustomDataTickets[];
  loadingCategory: boolean;
  errorCategory: string | null;
  fetchCategory: () => Promise<void>;
};

export const useLazyFetchCategory = (): UseLazyFetchCategoryReturn => {

  const [dataCategory, setDataCategory] = useState<ICustomDataTickets[]>([]);
  const [loadingCategory, setLoadingCategory] = useState<boolean>(false);
  const [errorCategory, setErrorCategory] = useState<string | null>(null);

  const fetchCategory = useCallback(async () => {
    if (dataCategory.length > 0) return;
    setLoadingCategory(true);
    try {
      const response = await api.get('/categorias');
      setDataCategory(response.data);
      setErrorCategory(null);
    } catch (error: any) {
      setErrorCategory(
        "Error al obtener los datos de la tabla categorias o no tienes los permisos necesarios. " +
          error
      );
    } finally {
      setLoadingCategory(false);
    }
  }, [dataCategory.length]);

  return { dataCategory, loadingCategory, errorCategory, fetchCategory };
};
