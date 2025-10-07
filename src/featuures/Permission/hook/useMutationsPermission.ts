import { api } from "@/utils/api-config";
import { useState } from "react";
import { toast } from "react-toastify";

interface UseMutationsPermissionProps {
  error: string | null;
  isLoading: boolean;
  create: (data: Object, onSuccess: () => void) => void;
  update: (id: string, data: Object, onSuccess: () => void) => void;
}

export const UseMutationsPermission = (): UseMutationsPermissionProps => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return {
    error,
    isLoading,
    create,
    update,
  };
};
