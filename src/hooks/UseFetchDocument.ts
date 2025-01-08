import { IDocumento } from "@/models/IDocumento";
import { fetchDocumento } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchDocumento = (shouldFetch: boolean) => {
  const [dataDocumento, setDataDocumento] = useState<IDocumento[]>([]);
  const [loadingDocumento, setLoadingDocumento] = useState<boolean>(true);
  const [errorDocumento, setErrorDocumento] = useState<string | null>(null);

  useEffect(() => {

    if (!shouldFetch) return; // Si shouldFetch es false, no hacer la solicitud

    const getData = async () => {
      try {
        const users = await fetchDocumento();
        setDataDocumento(users);
      } catch (error) {
        setErrorDocumento("Error al obtener los datos de los datos de la tabla tipo documento o no tienes los permisos necesarios. " + error);
      } finally {
        setLoadingDocumento(false);
      }
    };

    getData();
  }, [shouldFetch]);

  return { dataDocumento, loadingDocumento, errorDocumento };
};