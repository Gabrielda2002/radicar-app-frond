import { IMunicipios } from "@/models/IMunicipios";
import { api } from "@/utils/api-config";
import { useState, useCallback } from "react";

type UseLazyFetchMunicipioResult = {
  municipios: IMunicipios[];
  loading: boolean;
  error: string | null;
  fetchMunicipios: () => Promise<void>;
}

export const useLazyFetchMunicipio = (): UseLazyFetchMunicipioResult => {
  const [municipios, setMunicipios] = useState<IMunicipios[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMunicipios = useCallback(async () => {
    // Si ya tenemos datos, no hacer la llamada nuevamente
    if (municipios.length > 0) return;
    
    setLoading(true);
    try {
      const response = await api.get('/municipios');

      if (response.status === 200 || response.status === 201) {
        setMunicipios(response.data);
        setError(null);
      }

    } catch (error: any) {
      if (error.response?.status === 500) {
        setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
      } else {
        setError(error.response?.data?.message || "Error al cargar municipios");
      }
    } finally {
      setLoading(false);
    }
  }, [municipios.length]);

  return { municipios, loading, error, fetchMunicipios };
};
