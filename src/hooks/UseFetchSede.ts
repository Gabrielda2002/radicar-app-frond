import { ILugarRadicacion } from "@/models/ILugarRadicado";
import { fetchLugarRadicado } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchSede = () => {
  const [data, setData] = useState<ILugarRadicacion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const lugarRadicado = await fetchLugarRadicado();
        setData(lugarRadicado);
      } catch (error) {
        setError("Error al obtener los datos de la tabla lugar radicacion o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};