import { IEstados } from "@/models/IEstados";
import { fetchEstados } from "@/services/apiService";
import { useEffect, useState } from "react";

  // Asumiendo que fetchEstados es la función que hace la solicitud
export const useFetchStatus = (shouldFetch: boolean) => {
  const [dataEstados, setDataEstados] = useState<IEstados[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorEstados, setErrorEstados] = useState<string | null>(null);

  useEffect(() => {
    // * si shouldFetch es false, no se hace la solicitud ya que le modal aun no esta abierto
    if (!shouldFetch) return; // Si shouldFetch es false, no hacer la solicitud

    const getData = async () => {
      try {
        const estados = await fetchEstados();
        setDataEstados(estados);
      } catch (error) {
        setErrorEstados("Error al obtener los estados o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [shouldFetch]); // Se ejecuta solo cuando shouldFetch cambia a true

  return { dataEstados, loading, errorEstados };
};