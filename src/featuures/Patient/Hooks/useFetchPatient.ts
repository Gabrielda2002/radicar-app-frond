import { useCallback, useState } from "react";
import { api } from "@/utils/api-config";
import { IPacientes } from "@/models/IPacientes";

interface useFetchPatientReturn {
  data: IPacientes | null;
  loading: boolean;
  error: string | null;
  getData: (documento: string) => Promise<void>;
  refetch?: () => Promise<void>;
} 

export const useFetchPatient = (): useFetchPatientReturn => {
  const [data, setData] = useState<IPacientes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const getData = useCallback( async (documento: string) => {
      try {

        setLoading(true);

        const pacientes = await api.post('/pacientes-documento', {
          documentNumber: documento
        });
        if (pacientes.status === 200 || pacientes.status === 201) {
          setData(pacientes.data);
          setError(null);
        }
      } catch (error: any) {
        if (error.response.status === 500) {
          setError("Error del servidor, por favor intente más tarde.");
        }else{
          setError(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    }, []);

    const refetch = useCallback( async () => {
      getData(data?.documentNumber.toString() || "");
      console.log("se ejecuta el refetch")
    }, [data, getData]);

  return { data, loading, error, getData, refetch };
};

