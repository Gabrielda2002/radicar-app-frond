import { useState } from "react";
import { ICups } from "../models/ICups";
import { api } from "../utils/api-config";

const useFetchCups = () => {
  const [data, setData] = useState<ICups | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCups = async (id: string) => {
    try {
      const response = await api.post(`/servicio-solicitado-code`, {
        code : id
      });

      if (response.data.length === 0) {
        setError("No se encontraron resultados");
        return;
      }else{
          setData(response.data);
            setError(null);
      }

    } catch (error) {
      setError(`Ocurrió un error al intentar obtener el cups.`);
      setData(null);
      console.log(error)
    }finally{
      setLoading(false);
    }
    
  };

  return { data, loading, error, fetchCups };
};

export default useFetchCups;
