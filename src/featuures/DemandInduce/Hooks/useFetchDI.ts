import { IDemandInduced } from "@/models/IDemandInduced";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";

export const useFetchDI = () => {
  const [data, setData] = useState<IDemandInduced[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDI = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/demanda/inducida");

      if (response.status === 200 || response.status === 201) {
        // Convertir los strings de fecha a objetos Date
        const transformedData = response.data.map((item: any) => ({
          ...item,
          dateCreated: new Date(item.dateCreated),
          dateCall: item.dateCall ? new Date(item.dateCall) : null,
          dateSend: item.dateSend ? new Date(item.dateSend) : null,
          dateVisit: item.dateVisit ? new Date(item.dateVisit) : null,
          assignmentDate: new Date(item.assignmentDate),
          classification: Boolean(item.classification),
          dificulties: Boolean(item.dificulties),
          conditionUser: Boolean(item.conditionUser),
        }));
        
        setData(transformedData);
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        setError(
          "Error interno del servidor. Por favor, inténtelo más tarde."
        );
      } else {
        setError(
          "Error al obtener las demandas inducidas: " +
            (error.response?.data?.message || error.message)
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para refrescar los datos manualmente
  const refetch = useCallback(() => {
    fetchDI();
  }, [fetchDI]);

  useEffect(() => {
    fetchDI();
  }, [fetchDI]);

  return {
    data,
    error,
    loading,
    refetch,
  };
};
