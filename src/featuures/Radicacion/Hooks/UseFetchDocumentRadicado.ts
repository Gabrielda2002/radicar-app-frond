import { IRadicados } from "@/models/IRadicados";
import { useState } from "react";
import { fetchRadicadoDocumentoEp } from "../Services/FetchRadicadoDocument";

// traer los radicados por numero de documento
export const useFetchDocumentoRadicado = () => {
    const [radicados, setRadicados] = useState<IRadicados[] | null>([]);
    const [loading, setLoading] = useState(false);
    const [errorRadicados, setError] = useState<string | null>(null);
  
    const getData = async (documento: string) => {
      try {
        
        const response = await fetchRadicadoDocumentoEp(documento);
  
        if (response.length === 0) {
          setError("Radicado no encontrado.");
          setRadicados(null);
        }else{
          setRadicados(response);
          setError(null);
        }
  
      } catch (error) {
        setError("Sin resultados, si el número de identidad está correcto, por favor registre al paciente.");
        setRadicados(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
   return { radicados, loading, errorRadicados, getData };
  }