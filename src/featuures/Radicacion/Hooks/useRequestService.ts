import { api } from "@/utils/api-config";
import { useState } from "react";
import { toast } from "react-toastify";

export const useRequestService = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createRequestService = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await api.post("/request/service", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setError(null);
        toast.success("Radicacion creada exitosamente");
        return response;
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
