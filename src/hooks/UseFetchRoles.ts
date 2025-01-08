import { IRol } from "@/models/IRol";
import { fetchRoles } from "@/services/apiService";
import { useEffect, useState } from "react";

// * traer roles
export const useFetchRoles = (shouldFetch: boolean) => {
  const [dataRol, setDataRol] = useState<IRol[]>([]);
  const [loadingRol, setLoadingRol] = useState<boolean>(true);
  const [errorRol, setErrorRol] = useState<string | null>(null);

  useEffect(() => {

    if (!shouldFetch) return; // Si shouldFetch es false, no hacer la solicitud

    const getData = async () => {
      try {
        const roles = await fetchRoles();
        setDataRol(roles);
      } catch (error) {
        setErrorRol("Error al obtener los datos de la tabla roles o no tienes los permisos necesarios. " + error);
      } finally {
        setLoadingRol(false);
      }
    };

    getData();
  }, [ shouldFetch ]);

  return { dataRol, loadingRol, errorRol };
}