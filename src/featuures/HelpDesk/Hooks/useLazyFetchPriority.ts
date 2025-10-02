import { useCallback, useState } from "react";
import { ICustomDataTickets } from "@/models/ICustomDataTickets";
import { api } from "@/utils/api-config";

type UseLazyFetchPriorityReturn = {
  dataPriority: ICustomDataTickets[];
  loadingPriority: boolean;
  errorPriority: string | null;
  fetchPriority: () => Promise<void>;
};

export const useLazyFetchPriority = (): UseLazyFetchPriorityReturn => {

  const [dataPriority, setDataPriority] = useState<ICustomDataTickets[]>([]);
  const [loadingPriority, setLoadingPriority] = useState<boolean>(false);
  const [errorPriority, setErrorPriority] = useState<string | null>(null);

  const fetchPriority = useCallback(async () => {
    if (dataPriority.length > 0) return;
    setLoadingPriority(true);
    try {
      const response = await api.get('/prioridades');
      setDataPriority(response.data);
      setErrorPriority(null);
    } catch (error: any) {
      setErrorPriority(
        "error al obtener los datos de la tabla prioridades o no tienes los permisos necesarios. " +
          error
      );
    } finally {
      setLoadingPriority(false);
    }
  }, [dataPriority.length]);

  return { dataPriority, loadingPriority, errorPriority, fetchPriority };
};
