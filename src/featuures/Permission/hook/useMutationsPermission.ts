import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IRequestsPermissions } from "../type/IRequestsPermissions";

interface UseMutationsPermissionProps {
  data: IRequestsPermissions[] | null;
  error: string | null;
  isLoading: boolean;
  create: (data: Object, onSuccess: () => void) => void;
  update: (id: string, data: Object, onSuccess: () => void) => void;
  refetch: () => void;
}

export const UseMutationsPermission = (): UseMutationsPermissionProps => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IRequestsPermissions[] | null>(null);

  const create = async (data: Object, onSuccess: () => void) => {
    try {
      setIsLoading(true);

      const response = await api.post("/permisos/requests", data);

      if (response.status === 201) {
        onSuccess();
        setError(null);
        toast.success("Permiso creado con éxito");
      }
    } catch (error: any) {
      setError("Error al crear el permiso");
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (id: string, data: Object, onSuccess: () => void) => {
    try {
      setIsLoading(true);

      const response = await api.put(`/permisos/requests/${id}`, data);

      if (response.status === 200) {
        onSuccess();
        setError(null);
      }
    } catch (error: any) {
      setError("Error al actualizar el permiso");
    } finally {
      setIsLoading(false);
    }
  };

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

  return {
    error,
    isLoading,
    create,
    update,
    data,
    refetch,
  };
};
