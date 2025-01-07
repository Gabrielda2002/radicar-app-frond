import { ICirugias } from "@/models/ICirugias";
import { fetchCirugias } from "@/services/apiService";
import { useEffect, useState } from "react";

// * traer cirugias
export const useFetchCirugias = () => {
  const [dataCirugias, setDataCirugias] = useState<ICirugias[]>([]);
  const [loadingCirugias, setLoadingCirugias] = useState<boolean>(true);
  const [errorCirugias, setErrorCirugias] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const cirugias = await fetchCirugias();
        setDataCirugias(cirugias);
      } catch (error) {
        setErrorCirugias("Error al obtener los datos de la tabla cirugias o no tienes los permisos necesarios. " + error);
      } finally {
        setLoadingCirugias(false);
      }
    }
    getData();
  }, []);
  return { dataCirugias, loadingCirugias, errorCirugias };
}