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
    queryKey: ['filtros', 'convenios-grupo', soloNt, f.sede ?? '', f.sedeGrupo ?? '', f.desde ?? '', f.hasta ?? '', f.modalidad ?? '', f.regimen ?? ''],
    queryFn: () => filtrosApi.conveniosGrupo(f, soloNt),
    staleTime: FIVE_MIN,
  });
}

export function useConveniosJerarquia(f: DashboardFilters = {}, soloNt = false): UseQueryResult<ConvenioJerarquia[]> {
  return useQuery({
    // Jerarquia Grupo->Convenio: depende de los demas filtros, NO de convenio/convenioDetalle.
    queryKey: ['filtros', 'convenios-jerarquia', soloNt, f.sede ?? '', f.sedeGrupo ?? '', f.desde ?? '', f.hasta ?? '', f.modalidad ?? '', f.regimen ?? '', f.grupoEspecialidad ?? ''],
    queryFn: () => filtrosApi.conveniosJerarquia(f, soloNt),
    staleTime: FIVE_MIN,
  });
}

export function useSedesGrupo(f: DashboardFilters = {}, soloNt = false): UseQueryResult<SedeOption[]> {
  return useQuery({
    // Faceta sede: depende de los demas filtros, NO de sede/sedeGrupo.
    queryKey: ['filtros', 'sedes-grupo', soloNt, f.convenio ?? '', f.desde ?? '', f.hasta ?? '', f.modalidad ?? '', f.regimen ?? ''],
    queryFn: () => filtrosApi.sedesGrupo(f, soloNt),
    staleTime: FIVE_MIN,
  });
}

export function useModalidades(f: DashboardFilters = {}, soloNt = false): UseQueryResult<SedeOption[]> {
  return useQuery({
    // Faceta modalidad: depende de los demas filtros, NO de modalidad.
    queryKey: ['filtros', 'modalidades', soloNt, f.sede ?? '', f.sedeGrupo ?? '', f.convenio ?? '', f.desde ?? '', f.hasta ?? '', f.regimen ?? ''],
    queryFn: () => filtrosApi.modalidades(f, soloNt),
    staleTime: FIVE_MIN,
  });
}

export function useRegimenes(f: DashboardFilters = {}, soloNt = false): UseQueryResult<SedeOption[]> {
  return useQuery({
    // Faceta regimen: depende de los demas filtros, NO de regimen.
    queryKey: ['filtros', 'regimenes', soloNt, f.sede ?? '', f.sedeGrupo ?? '', f.convenio ?? '', f.desde ?? '', f.hasta ?? '', f.modalidad ?? ''],
    queryFn: () => filtrosApi.regimenes(f, soloNt),
    staleTime: FIVE_MIN,
  });
}

export function useGruposEspecialidad(f: DashboardFilters = {}, soloNt = false): UseQueryResult<SedeOption[]> {
  return useQuery({
    // Faceta grupo de especialidad: depende de los demas filtros.
    queryKey: ['filtros', 'grupos-especialidad', soloNt, f.sede ?? '', f.sedeGrupo ?? '', f.convenio ?? '', f.desde ?? '', f.hasta ?? '', f.modalidad ?? '', f.regimen ?? ''],
    queryFn: () => filtrosApi.gruposEspecialidad(f, soloNt),
    staleTime: FIVE_MIN,
  });
}

export function useSedesJerarquia(f: DashboardFilters = {}, soloNt = false): UseQueryResult<SedeJerarquia[]> {
  return useQuery({
    // Jerarquia Ciudad->Sede: depende de los demas filtros, NO de sede/sedeGrupo.
    queryKey: ['filtros', 'sedes-jerarquia', soloNt, f.convenio ?? '', f.desde ?? '', f.hasta ?? '', f.modalidad ?? '', f.regimen ?? '', f.grupoEspecialidad ?? ''],
    queryFn: () => filtrosApi.sedesJerarquia(f, soloNt),
    staleTime: FIVE_MIN,
  });
}
