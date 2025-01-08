import { IConvenios } from "@/models/IConvenios";
import { fetchConvenio } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchConvenio = (shouldFetch: boolean) => {
  const [dataConvenios, setDataConvenios] = useState<IConvenios[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorConvenio, setErrorConvenio] = useState<string | null>(null);

  useEffect(() => {

    if (!shouldFetch) return; // Si shouldFetch es false, no hacer la solicitud

    const getData = async () => {
      try {
        const convenios = await fetchConvenio();
        setDataConvenios(convenios);
      } catch (error) {
        setErrorConvenio("Error al obtener los datos de la tabla convenios o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [shouldFetch]);

  return { dataConvenios, loading, errorConvenio };
};