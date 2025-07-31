import { useState } from "react";
import { IPacientes } from "../models/IPacientes";
import { api } from "../utils/api-config";

export const useFetchPaciente = () => {
  const [data, setData] = useState<IPacientes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const getData = async (documento: string) => {
      try {

        setLoading(true);

        const pacientes = await api.post('/pacientes-documento', {
          documentNumber: documento
        });
        if (pacientes.status === 200 || pacientes.status === 201) {
          setData(pacientes.data);
          setError(null);
          return pacientes;
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
    };

  return { data, loading, error, getData };
};

