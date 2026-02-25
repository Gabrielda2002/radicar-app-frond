import { api } from "@/utils/api-config";
import { useState } from "react";

interface UseRequestServiceReturn {
  createRequestService: (data: Object, onSuccess?: () => void) => Promise<any>;
  error: string | null;
  loading: boolean;
}

export const useRequestService = (): UseRequestServiceReturn => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createRequestService = async (data: Object, onSuccess?: () => void) => {
    try {
      setLoading(true);
      const response = await api.post("/request/service", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setError(null);
        onSuccess?.();
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setError("Error interno del servidor, por favor intente más tarde.");
      } else {
        setError(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { createRequestService, error, loading };
};
