import { IStatisticsDemandInduced } from "@/models/IStatisticsDemandInduced";
import { api } from "@/utils/api-config";
import { useState } from "react";

export const useFetchStatistics = () => {
  const [data, setData] = useState<IStatisticsDemandInduced>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = async (data: Object) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Sending request to API with data:", data);

      const response = await api.post<IStatisticsDemandInduced>(
        "demanda/inducida/estadistica",
        data
      );

      console.log("API Response:", response);

      if (response.status === 200 || response.status === 201) {
        setData(response.data);
        console.log("Statistics data set:", response.data);
        setError(null);
        return response;
      }
    } catch (error: any) {
      console.error("Error fetching statistics:", error);
      if (error.response?.status === 500) {
        setError("Error del servidor, por favor intente más tarde.");
      } else if (error.response?.status === 404) {
        setError("No se encontraron estadísticas con los filtros aplicados.");
      } else {
        setError(error.response?.data?.message || "Error al obtener las estadísticas");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchStatistics,
  };
};
