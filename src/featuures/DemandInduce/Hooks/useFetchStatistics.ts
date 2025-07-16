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

      const response = await api.post<IStatisticsDemandInduced>(
        "demanda/inducida/estadistica",
        data
      );

      if (response.status === 200 || response.status === 201) {
        setData(response.data);
        console.log(response.data)
        setError(null);
        return response;
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setError("Error del servidor, por favor intente más tarde.");
      } else {
        setError(error.response.data.message);
      }
    }finally {
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
