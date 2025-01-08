import { IRadicador } from "@/models/IRadicador";
import { fetchRadicador } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchRadicador = () => {
  const [dataRadicador, setDataRadicador] = useState<IRadicador[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorRadicador, setErrorRadicador] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const radicadores = await fetchRadicador();
        setDataRadicador(radicadores);
      } catch (error) {
        setErrorRadicador("Error al obtener los datos de la tabla radicadores o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { dataRadicador, loading, errorRadicador };
};