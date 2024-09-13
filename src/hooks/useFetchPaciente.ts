import { useState } from "react";
import { IPacientes } from "../models/IPacientes";
import { api } from "../utils/api-config";

const useFetchPaciente = () => {
  const [data, setData] = useState<IPacientes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const getData = async (documento: string) => {
      try {
        const pacientes = await api.post('/pacientes-documento', {
          documentNumber: documento
        });

        if (pacientes.data.length === 0) {
          setError("No se encontraron pacientes con el documento ingresado");
          setData(null);
        }else{
          setData(pacientes.data);
          setError(null);
        }

      } catch (error) {
        setError("Error al obtener los datos de los pacientes" + error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

  return { data, loading, error, getData };
};

export default useFetchPaciente;
