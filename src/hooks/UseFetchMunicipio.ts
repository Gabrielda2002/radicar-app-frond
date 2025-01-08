import { IMunicipios } from "@/models/IMunicipios";
import { fetchMunicipio } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchMunicipio = (shouldFetch: boolean) => {
  const [municipios, setMunicipios] = useState<IMunicipios[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMunicipios, setErrorMunicipios] = useState<string | null>(null);

  useEffect(() => {
    
    if (!shouldFetch) return; // Si shouldFetch es false, no hacer la solicitud

    const getData = async () => {
      try {
        const municipios = await fetchMunicipio();
        setMunicipios(municipios);
      } catch (error) {
        setErrorMunicipios("Error al obtener los datos de la tabla municipios o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [shouldFetch]);

  return { municipios, loading, errorMunicipios };
};