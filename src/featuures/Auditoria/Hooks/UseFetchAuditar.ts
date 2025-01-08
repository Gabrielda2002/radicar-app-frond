import { IAuditar } from "@/models/IAuditar";
import { fetchAuditoria } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchAuditoria = () => {
  const [data, setData] = useState<IAuditar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const auditorias = await fetchAuditoria();
        setData(auditorias);
      } catch (error) {
        setError("Error al obtener los datos por Auditar o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};