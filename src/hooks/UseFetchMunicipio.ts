import { IMunicipios } from "@/models/IMunicipios";
import { api } from "@/utils/api-config";
import { useEffect, useState } from "react";

type UseFetchMunicipioResult = {
  municipios: IMunicipios[];
  loading: boolean;
  error: string | null;
}

export const useFetchMunicipio = (): UseFetchMunicipioResult => {
  const [municipios, setMunicipios] = useState<IMunicipios[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMunicipios, setErrorMunicipios] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const municipios = await api.get('/municipios');

        if (municipios.status === 200 || municipios.status === 201) {
          setMunicipios(municipios.data);
          setErrorMunicipios(null);
        }

      } catch (error: any) {
        if (error.response.status === 500) {
          setErrorMunicipios("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
        }else {
          setErrorMunicipios(error.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { municipios, loading, error: errorMunicipios };
};