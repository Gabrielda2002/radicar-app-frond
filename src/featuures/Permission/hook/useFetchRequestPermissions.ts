import { api } from "@/utils/api-config";
import { IRequestsPermissions } from "../type/IRequestsPermissions";
import { useCallback, useEffect, useState } from "react";

interface UseFetchRequestPermissionsReturn {
    data: IRequestsPermissions[] | null;
    error: string | null;
    isLoading: boolean;
    refetch: () => void;
}

export const useFetchRequestPermissions = (): UseFetchRequestPermissionsReturn => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<IRequestsPermissions[] | null>(null);

     const getData = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await api.get("/list/requests");

      if (response.status === 200) {
        setData(response.data);
        setError(null);
      }


    } catch (error: any) {
      if (error.response.status === 500) {
        setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
      }else {
        setError(error.response.data.message);
      }
    }finally{
      setIsLoading(false);
    }
  },  []);
  
  useEffect(() => {
    getData();
  }, [getData]);

  const refetch = useCallback(() => {
    getData();
  }, [getData]);

    return { data, error, isLoading, refetch };


}