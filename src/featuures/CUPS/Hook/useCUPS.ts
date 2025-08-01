import { ICups } from "@/models/ICups";
import { api } from "@/utils/api-config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useCUPS = () => {
  const [data, setData] = useState<ICups[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const response = await api.get<ICups[]>("/servicio-solicitado");

        if (response.status === 200 || response.status === 201) {
          setError(null);
          setData(response.data);
        }
      } catch (error: any) {
        if (error.response.status === 500) {
          setError(
            "Error interno del servidor. Por favor, inténtalo más tarde."
          );
        } else {
          setError(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const createCUPS = async (data: FormData, endPoint: string) => {
    try {
      setLoading(true);

      const response = await api.post(`/${endPoint}`, data);

      if (response.status === 200 || response.status === 201) {
        setError(null);
        toast.success("Creado exitosamente");
        return response;
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setError("Error interno del servidor. Por favor, inténtalo más tarde.");
      } else {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createCUPS };
};
