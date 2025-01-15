import { IRequestLetter } from "@/models/IRequestLetter";
import { useEffect, useState } from "react";
import { FetchRequestLetter } from "../Services/FetchRequestLetter";

export const UseFetchRequestLetter = () => {
  const [requestLetter, setRequestLetter] = useState<IRequestLetter[] | null>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await FetchRequestLetter();

        if (response.length > 0) {
          setRequestLetter(response);
          setError(null);
        }else{
            setError("No se encontraron solicitudes");
            setRequestLetter(null);
        }
      } catch (error) {
        setError("Error inesperado al obtener las solicitudes. " + error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { requestLetter, loading, error };
};
