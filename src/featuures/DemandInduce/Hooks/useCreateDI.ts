import { api } from "@/utils/api-config";
import { useState } from "react";

export const useCreateDI = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createDI = async (data: Object) => {
    try {
      setLoading(true);

      const response = await api.post("/demanda/inducida", data);

      if (response.status === 201 || response.status === 200) {
        setLoading(false);
        setError(null);
        return response;
      }
    } catch (error: any) {
      setError(
        "Error al crear la demanda inducida: " + error.response?.data?.message
      );
      console.log("Error al crear la demanda inducida:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    createDI,
    error,
    loading,
  };
};
