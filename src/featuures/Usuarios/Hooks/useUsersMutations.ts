import { api } from "@/utils/api-config";
import { useState } from "react";
import { toast } from "react-toastify";

type UseUsersMutationsProps = {
  error: string | null;
  isLoading: boolean;
  create: (data: Object, onSuccess?: () => void) => Promise<void>;
  update: (id: number, data: Object, onSuccess?: () => void) => Promise<void>;
};

export const useUsersMutations = (): UseUsersMutationsProps => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const create = async (data: Object, onSuccess?: () => void) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/usuarios`, data);

      if (response.status === 201 || response.status === 200) {
        setError(null);
        if (onSuccess) onSuccess();
        toast.success("Usuario creado con éxito");
        return response.data;
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setError(
          "Error del servidor. Por favor, intenta nuevamente más tarde."
        );
      } else {
        setError(error.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (id: number, data: Object, onSuccess?: () => void) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/usuario-update-table/${id}`, data);
      if (response.status === 200) {
        setError(null);
        if (onSuccess) onSuccess();
        toast.success("Usuario actualizado con éxito");
        return response.data;
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setError(
          "Error del servidor. Por favor, intenta nuevamente más tarde."
        );
      } else {
        setError(error.response?.data?.message);
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
