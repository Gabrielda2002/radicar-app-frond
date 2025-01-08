import { IIPSPrimaria } from "@/models/IIpsPrimaria";
import { fetchIpsPrimaria } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchIpsPrimaria = (shouldFetch: boolean) => {
  const [dataIpsPrimaria, setDataIpsPrimaria] = useState<IIPSPrimaria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorIpsPrimaria, setErrorIpsPrimaria] = useState<string | null>(null);

  useEffect(() => {

    if (!shouldFetch) return; // Si shouldFetch es false, no hacer la solicitud

    const getData = async () => {
      try {
        const ipsPrimaria = await fetchIpsPrimaria();
        setDataIpsPrimaria(ipsPrimaria);
      } catch (error) {
        setErrorIpsPrimaria("Error al obtener los datos de la tabla IPS primaria o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [shouldFetch]);

  return { dataIpsPrimaria, loading, errorIpsPrimaria };
};