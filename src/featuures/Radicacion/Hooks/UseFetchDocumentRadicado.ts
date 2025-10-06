import { IRadicados } from "@/models/IRadicados";
import { useState } from "react";
import { api } from "@/utils/api-config";

type UseFetchDocumentRadicadoReturn = {
  radicados: IRadicados[] | null;
  loading: boolean;
  errorRadicados: string | null;
  getData: (documento: string) => Promise<void>;
};

// traer los radicados por numero de documento
export const useFetchDocumentoRadicado = (): UseFetchDocumentRadicadoReturn => {
  const [radicados, setRadicados] = useState<IRadicados[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorRadicados, setError] = useState<string | null>(null);

  const getData = async (documento: string) => {
    try {
      setLoading(true);

      const response = await api.post("/radicado-doc-patient", {
        documento: documento,
      });

      if (response.status === 200 || response.status === 201) {
        setRadicados(response.data);
        setError(null);
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setError("Error del servidor, por favor intente más tarde.");
      } else {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return { radicados, loading, errorRadicados, getData };
};
