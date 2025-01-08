import { IEventos } from "@/models/IEventos";
import { fetchEventosEp } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchEvents = (shouldFetch: boolean) => {
  const [evetns, setEvents] = useState<IEventos[] | null>([]);
  const [loadingEventos, setLoadingEventos] = useState(false);
  const [errorEventos, setErrorEventos] = useState<string | null>(null);

  useEffect(() => {

    if (!shouldFetch) return; // Si shouldFetch es false, no hacer la solicitud

    const getData = async () => {
      try {
        const events = await fetchEventosEp();
        setEvents(events);
        setErrorEventos(null);
      } catch (error) {
        setErrorEventos("Error al obtener los eventos o no tienes los permisos necesarios. " + error);
        setEvents(null);
      } finally {
        setLoadingEventos(false);
      }
    }
    getData();
  }, [shouldFetch]);
  return { evetns, loadingEventos, errorEventos };

}