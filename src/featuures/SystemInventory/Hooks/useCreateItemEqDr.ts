import { createItemEp, updateItemEp } from "@/utils/api-config";
import { useState } from "react";

export const useCreateItemEqDr = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createItem = async (item: FormData, ep: string) => {
    try {
      setLoading(true);

      const response = await createItemEp(item, ep);

      if (response.status === 201 || response.status === 200) {
        setError(null);
        return response;
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setError(
          "Error en los datos enviados. Por favor, revisa los campos. " +
            error.response.data.message
        );
      } else if (error.response.status === 409) {
        setError(
          "El elemento ya existe. Por favor, verifica los datos. " +
            error.response.data.message
        );
      } else if (error.response.status === 500) {
        setError("Error interno del servidor. Por favor, intenta más tarde. ");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemId: number, item: FormData, ep: string) => {
    try {
      setLoading(true);

      const response = await updateItemEp(item, itemId, ep);

      if (response.status === 200 || response.status === 201) {
        setError(null);
        return response;
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setError(
          "Error en los datos enviados. Por favor, revisa los campos. " +
            error.response.data.message
        );
      } else if (error.response.status === 404) {
        setError("El elemento no fue encontrado. Por favor, verifica el ID. ");
      } else if (error.response.status === 500) {
        setError("Error interno del servidor. Por favor, intenta más tarde. ");
      } else if (error.response.status === 409) {
        setError(
          "El elemento ya existe. Por favor, verifica los datos. " +
            error.response.data.message
        );
      }
    }finally{
        setLoading(false);
    }
  };

  return {
    updateItem,
    createItem,
    loading,
    error,
  };
};
