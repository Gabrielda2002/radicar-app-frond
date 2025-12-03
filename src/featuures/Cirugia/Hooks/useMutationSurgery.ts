import { useState } from "react";
import { api } from "@/utils/api-config";

interface UseUpdateGroupServiceReturn {
  error: string | null;
  isLoading: boolean;
  updateGroupService: (groupId: number, radicadoId: number, onSuccess: () => void) => Promise<any>;
  createSurgery: (data: Object, onSuccess: () => void) => Promise<any>;
}

export const useMutationSurgery = (): UseUpdateGroupServiceReturn => {

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateGroupService = async (groupId: number, radicadoId: number, onSuccess: () => void) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/update-group-services/${radicadoId}`, {
        groupServices: groupId
      })

      if (response?.status === 200) {
        setError(null);
        onSuccess();
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
      } else {
        setError(error.response.data.message || "Error desconocido. Por favor, inténtelo de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createSurgery = async (data: Object, onSuccess: () => void) => {
    setIsLoading(true);
    try {

      const response = await api.post(`/cirugias`, data);

      if (response.status === 201) {
        setError(null);
        onSuccess();
      }

    } catch (error: any) {
      if (error.response.status === 500) {
        setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
      } else {
        setError(error.response.data.message || "Error desconocido. Por favor, inténtelo de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  }
  return {
    error,
    isLoading,
    updateGroupService,
    createSurgery
  }
};