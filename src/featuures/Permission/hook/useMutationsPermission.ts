import { api } from "@/utils/api-config";
import { useState } from "react";
import { toast } from "react-toastify";

interface UseMutationsPermissionProps {
  error: string | null;
  isLoading: boolean;
  create: (data: Object, onSuccess: () => void) => void;
  update: (data: Object, requestId: number, stepId: number, onSuccess: () => void) => void;
}

export const UseMutationsPermission = (): UseMutationsPermissionProps => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const create = async (data: Object, onSuccess: () => void) => {
    try {
      setIsLoading(true);

      const response = await api.post("/permisos/requests", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        onSuccess();
        setError(null);
        toast.success("Permiso creado con éxito");
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
      }else {
        setError(error.response.data.message || "Error al crear el permiso");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (data: Object, requestId: number,stepId: number, onSuccess: () => void) => {
    try {
      setIsLoading(true);

      const response = await api.post(`/permissions/requests/${requestId}/steps/${stepId}/actions`, data);

      if (response.status === 200) {
        onSuccess();
        setError(null);
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
      }else {
        setError(error.response.data.message || "Error al actualizar el permiso");
      }
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
