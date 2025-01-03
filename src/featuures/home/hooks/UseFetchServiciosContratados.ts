import { IServiciosContratados } from "@/models/IServiciosContratados";
import { useState } from "react";
import { fetchServicioContratadoEp } from "../services/FetchServiciosContratados";

export const useFetchServicioContratado = () => {
    const [servicios, setServicios] = useState<IServiciosContratados[] | null>([]);
    const [loadingServicios, setLoadingServicios] = useState(false);
    const [errorServicios, setErrorServicios] = useState<string | null>(null);
  
    const getData = async (codigo: string) => {
      try {
        
        const response = await fetchServicioContratadoEp(codigo);
  
        if (response.length === 0) {
          setErrorServicios("Servicio no encontrado.");
          setServicios(null);
          
        }
        setServicios(response);
        setErrorServicios(null);
  
      } catch (error) {
        setServicios(null);
        setErrorServicios(`Servicio no encontrado ${error}` )
      }finally{
        setLoadingServicios(false);
      }
    }
    return { servicios, loadingServicios, errorServicios, getData };
  }