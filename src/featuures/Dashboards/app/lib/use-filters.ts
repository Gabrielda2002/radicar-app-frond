import { useSearchParams } from 'react-router-dom';
import type { DashboardFilters } from './api';

const URL_KEYS = [
  'desde',
  'hasta',
  'sede',
  'convenio',
  'convenioDetalle',
  'sedeGrupo',
  'modalidad',
  'regimen',
  'especialidad',
  'grupoEspecialidad',
] as const satisfies ReadonlyArray<keyof DashboardFilters>;
type UrlKey = (typeof URL_KEYS)[number];

/**
 * Sincroniza los filtros globales con la URL via search params.
 * Hace que recargar la pagina o compartir el link conserve el estado.
 * `setFilter('convenio', 'all' | '' | undefined)` borra el param.
 */
export function useGlobalFiltersFromUrl(): {
  filters: DashboardFilters;
  setFilter: (key: UrlKey, value: string | undefined) => void;
  setSede: (sede: string) => void;
  setSedeFilter: (sedeGrupo: string, sede: string) => void;
  setConvenioFilter: (convenio: string, convenioDetalle: string) => void;
  setRango: (desde?: string, hasta?: string) => void;
  resetAll: () => void;
} {
  const [params, setParams] = useSearchParams();

  const filters: DashboardFilters = Object.fromEntries(
    URL_KEYS.map((k) => [k, params.get(k) ?? undefined]),
  );

  function writeParam(next: URLSearchParams, key: string, value: string | undefined) {
    if (!value || value === 'all') next.delete(key);
    else next.set(key, value);
  }

  return {
    filters,
    setFilter(key, value) {
      const next = new URLSearchParams(params);
      writeParam(next, key, value);
      setParams(next, { replace: true });
    },
    setSede(sede) {
      const next = new URLSearchParams(params);
      writeParam(next, 'sede', sede);
      setParams(next, { replace: true });
    },
    setSedeFilter(sedeGrupo, sede) {
      // Escribe ciudad (sedeGrupo) y sede fisica (sede) en una sola
      // actualizacion para evitar que dos setParams encadenados se pisen.
      const next = new URLSearchParams(params);
      writeParam(next, 'sedeGrupo', sedeGrupo);
      writeParam(next, 'sede', sede);
      setParams(next, { replace: true });
    },
    setConvenioFilter(convenio, convenioDetalle) {
      // Escribe grupo (convenio) y convenio especifico (convenioDetalle) juntos.
      const next = new URLSearchParams(params);
      writeParam(next, 'convenio', convenio);
      writeParam(next, 'convenioDetalle', convenioDetalle);
      setParams(next, { replace: true });
    },
    setRango(desde, hasta) {
      const next = new URLSearchParams(params);
      writeParam(next, 'desde', desde);
      writeParam(next, 'hasta', hasta);
      setParams(next, { replace: true });
    },
    resetAll() {
      const next = new URLSearchParams(params);
      URL_KEYS.forEach((k) => next.delete(k));
      setParams(next, { replace: true });
    },
  };
}
