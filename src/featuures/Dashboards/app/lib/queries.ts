import { useQuery, keepPreviousData, type UseQueryResult } from '@tanstack/react-query';
import {
  dashboardsApi,
  filtrosApi,
  type DashboardFilters,
  type ResumenResponse,
  type EjecucionNtResponse,
  type FinancieroResponse,
  type CalidadResponse,
  type PymResponse,
  type SedeOption,
  type RangoFechas,
  type SedeJerarquia,
  type ConvenioJerarquia,
} from './api';

const FIVE_MIN = 5 * 60 * 1000;

function buildKey(name: string, f: DashboardFilters) {
  return [
    name,
    f.desde ?? '',
    f.hasta ?? '',
    f.sede ?? 'all',
    f.convenio ?? 'all',
    f.convenioDetalle ?? 'all',
    f.sedeGrupo ?? 'all',
    f.modalidad ?? 'all',
    f.regimen ?? 'all',
    f.especialidad ?? 'all',
    f.grupoEspecialidad ?? 'all',
  ];
}

export function useResumen(f: DashboardFilters): UseQueryResult<ResumenResponse> {
  return useQuery({
    queryKey: buildKey('resumen', f),
    queryFn: () => dashboardsApi.resumen(f),
    staleTime: FIVE_MIN,
    placeholderData: keepPreviousData,
  });
}

export function useEjecucionNt(f: DashboardFilters): UseQueryResult<EjecucionNtResponse> {
  return useQuery({
    queryKey: buildKey('ejecucion-nt', f),
    queryFn: () => dashboardsApi.ejecucionNt(f),
    staleTime: FIVE_MIN,
    placeholderData: keepPreviousData,
  });
}

export function useFinanciero(f: DashboardFilters): UseQueryResult<FinancieroResponse> {
  return useQuery({
    queryKey: buildKey('financiero', f),
    queryFn: () => dashboardsApi.financiero(f),
    staleTime: FIVE_MIN,
    placeholderData: keepPreviousData,
  });
}

export function useCalidad(f: DashboardFilters): UseQueryResult<CalidadResponse> {
  return useQuery({
    queryKey: buildKey('calidad', f),
    queryFn: () => dashboardsApi.calidad(f),
    staleTime: FIVE_MIN,
    placeholderData: keepPreviousData,
  });
}

export function usePym(f: DashboardFilters): UseQueryResult<PymResponse> {
  return useQuery({
    queryKey: buildKey('pym', f),
    queryFn: () => dashboardsApi.pym(f),
    staleTime: FIVE_MIN,
    placeholderData: keepPreviousData,
  });
}

// ════════════════════════════════════════════════════════════════
//  Catalogos para filtros
// ════════════════════════════════════════════════════════════════

/**
 * Dimensiones que `filtrosApi.*` envia en el request de un catalogo facetado
 * (manda el objeto de filtros entero). La key de cache tiene que derivarse de
 * esta lista, no enumerarse a mano en cada hook.
 */
const FACET_DIMS = [
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

/**
 * Key de cache de un catalogo facetado: TODAS las dimensiones que viajan en el
 * request, menos las que el backend descarta del WHERE para no auto-filtrar la
 * propia lista (`omit`, que refleja el destructuring de `filtros.service.ts`).
 *
 * Antes cada hook enumeraba sus dimensiones a mano y varias quedaban fuera de
 * la key aunque si viajaran en el request: con `staleTime` de 5 min, TanStack
 * Query devolvia la lista cacheada aunque la faceta hubiera cambiado y el
 * `<select>` se quedaba con opciones viejas. Derivarla evita que la proxima
 * dimension que se agregue al DTO vuelva a quedarse fuera.
 */
function buildFacetKey(
  name: string,
  f: DashboardFilters,
  soloNt: boolean,
  omit: ReadonlyArray<keyof DashboardFilters>,
): ReadonlyArray<string | boolean> {
  return [
    'filtros',
    name,
    soloNt,
    ...FACET_DIMS.filter((d) => !omit.includes(d)).map((d) => f[d] ?? ''),
  ];
}

export function useRangoFechas(): UseQueryResult<RangoFechas> {
  return useQuery({
    queryKey: ['filtros', 'rango-fechas'],
    queryFn: filtrosApi.rangoFechas,
    staleTime: FIVE_MIN,
  });
}

export function useConveniosGrupo(f: DashboardFilters = {}, soloNt = false): UseQueryResult<SedeOption[]> {
  return useQuery({
    // Faceta convenio: depende de los demas filtros, NO de convenio.
    queryKey: buildFacetKey('convenios-grupo', f, soloNt, ['convenio']),
    queryFn: () => filtrosApi.conveniosGrupo(f, soloNt),
    staleTime: FIVE_MIN,
  });
}

export function useConveniosJerarquia(f: DashboardFilters = {}, soloNt = false): UseQueryResult<ConvenioJerarquia[]> {
  return useQuery({
    // Jerarquia Grupo->Convenio: depende de los demas filtros, NO de convenio/convenioDetalle.
    queryKey: buildFacetKey('convenios-jerarquia', f, soloNt, ['convenio', 'convenioDetalle']),
    queryFn: () => filtrosApi.conveniosJerarquia(f, soloNt),
    staleTime: FIVE_MIN,
  });
}

export function useSedesGrupo(f: DashboardFilters = {}, soloNt = false): UseQueryResult<SedeOption[]> {
  return useQuery({
    // Faceta sede: depende de los demas filtros, NO de sede/sedeGrupo.
    queryKey: buildFacetKey('sedes-grupo', f, soloNt, ['sedeGrupo', 'sede']),
    queryFn: () => filtrosApi.sedesGrupo(f, soloNt),
    staleTime: FIVE_MIN,
  });
}

export function useModalidades(f: DashboardFilters = {}, soloNt = false): UseQueryResult<SedeOption[]> {
  return useQuery({
    // Faceta modalidad: depende de los demas filtros, NO de modalidad.
    queryKey: buildFacetKey('modalidades', f, soloNt, ['modalidad']),
    queryFn: () => filtrosApi.modalidades(f, soloNt),
    staleTime: FIVE_MIN,
  });
}

export function useRegimenes(f: DashboardFilters = {}, soloNt = false): UseQueryResult<SedeOption[]> {
  return useQuery({
    // Faceta regimen: depende de los demas filtros, NO de regimen.
    queryKey: buildFacetKey('regimenes', f, soloNt, ['regimen']),
    queryFn: () => filtrosApi.regimenes(f, soloNt),
    staleTime: FIVE_MIN,
  });
}

export function useGruposEspecialidad(f: DashboardFilters = {}, soloNt = false): UseQueryResult<SedeOption[]> {
  return useQuery({
    // Faceta grupo de especialidad: depende de los demas filtros, NO de
    // grupoEspecialidad/especialidad.
    queryKey: buildFacetKey('grupos-especialidad', f, soloNt, ['grupoEspecialidad', 'especialidad']),
    queryFn: () => filtrosApi.gruposEspecialidad(f, soloNt),
    staleTime: FIVE_MIN,
  });
}

export function useSedesJerarquia(f: DashboardFilters = {}, soloNt = false): UseQueryResult<SedeJerarquia[]> {
  return useQuery({
    // Jerarquia Ciudad->Sede: depende de los demas filtros, NO de sede/sedeGrupo.
    queryKey: buildFacetKey('sedes-jerarquia', f, soloNt, ['sedeGrupo', 'sede']),
    queryFn: () => filtrosApi.sedesJerarquia(f, soloNt),
    staleTime: FIVE_MIN,
  });
}
