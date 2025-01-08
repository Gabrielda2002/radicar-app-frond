import { IIPSRemite } from "@/models/IIpsRemite";
import { fetchIpsRemite } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchIpsRemite = () => {
  const [data, setData] = useState<IIPSRemite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const ipsRemite = await fetchIpsRemite();
        setData(ipsRemite);
      } catch (error) {
        setError("Error al obtener los datos de la tabla IPS remite o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};