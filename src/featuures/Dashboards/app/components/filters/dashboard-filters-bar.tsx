import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useRangoFechas,
  useConveniosGrupo,
  useConveniosJerarquia,
  useSedesJerarquia,
  useModalidades,
  useRegimenes,
  useGruposEspecialidad,
} from '@dash/lib/queries';
import { useGlobalFiltersFromUrl } from '@dash/lib/use-filters';
import { GlobalFilters, type FilterOption } from '@dash/components/filters/global-filters';
import { buildPeriodoOptions, periodoToRange, rangeToPeriodo } from '@dash/lib/periodos';

const ALL_OPT: FilterOption = { value: 'all', label: 'Todas' };

/**
 * Envoltorio "smart" de GlobalFilters: lee catalogos del backend, mantiene
 * el estado en la URL, e invalida la cache TanStack en Actualizar.
 *
 * Selectores (single-select):
 *   - Periodo (mes)         -> ?desde + ?hasta
 *   - Sede (sede_grupo)     -> ?sedeGrupo   (nombres cortos, agrupador)
 *   - Convenio (agrupador)  -> ?convenio
 *   - Modalidad contractual -> ?modalidad
 *   - Regimen agrupado      -> ?regimen
 */
export function DashboardFiltersBar({ soloConveniosNt = false }: { soloConveniosNt?: boolean } = {}) {
  const { filters, setRango, setFilter, setSedeFilter, setConvenioFilter } = useGlobalFiltersFromUrl();
  const sedeJerarquia = useSedesJerarquia(filters, soloConveniosNt);
  const convenios = useConveniosGrupo(filters, soloConveniosNt);
  const conveniosJerarquia = useConveniosJerarquia(filters, soloConveniosNt);
  const modalidades = useModalidades(filters, soloConveniosNt);
  const regimenes = useRegimenes(filters, soloConveniosNt);
  const especialidades = useGruposEspecialidad(filters, soloConveniosNt);
  const rango = useRangoFechas();
  const qc = useQueryClient();

  const sedeOptions = sedeJerarquia.data ?? [];

  const convenioOptions: FilterOption[] = useMemo(
    () => [
      { ...ALL_OPT, label: 'Todos los convenios' },
      ...(convenios.data?.map((c) => ({ value: c.value, label: c.label })) ?? []),
    ],
    [convenios.data],
  );

  const modalidadOptions: FilterOption[] = useMemo(
    () => [
      ALL_OPT,
      ...(modalidades.data?.map((m) => ({ value: m.value, label: m.label })) ?? []),
    ],
    [modalidades.data],
  );

  const regimenOptions: FilterOption[] = useMemo(
    () => [
      ALL_OPT,
      ...(regimenes.data?.map((r) => ({ value: r.value, label: r.label })) ?? []),
    ],
    [regimenes.data],
  );

  const especialidadOptions: FilterOption[] = useMemo(
    () => [
      ALL_OPT,
      ...(especialidades.data?.map((e) => ({ value: e.value, label: e.label })) ?? []),
    ],
    [especialidades.data],
  );

  const periodoOptions: FilterOption[] = useMemo(
    () => buildPeriodoOptions(rango.data?.desde, rango.data?.hasta),
    [rango.data],
  );

  const selectedPeriodo = useMemo(
    () => rangeToPeriodo(filters.desde, filters.hasta),
    [filters.desde, filters.hasta],
  );

  return (
    <GlobalFilters
      periodos={periodoOptions}
      sedeJerarquia={sedeOptions}
      convenios={convenioOptions}
      convenioJerarquia={conveniosJerarquia.data ?? []}
      modalidades={modalidadOptions}
      regimenes={regimenOptions}
      especialidades={especialidadOptions}
      selectedPeriodo={selectedPeriodo}
      selectedSedeGrupo={filters.sedeGrupo ?? ''}
      selectedSede={filters.sede ?? ''}
      selectedConvenio={filters.convenio ?? 'all'}
      selectedConvenioDetalle={filters.convenioDetalle ?? ''}
      selectedModalidad={filters.modalidad ?? 'all'}
      selectedRegimen={filters.regimen ?? 'all'}
      selectedEspecialidad={filters.grupoEspecialidad ?? 'all'}
      onPeriodoChange={(value) => {
        const { desde, hasta } = periodoToRange(value);
        setRango(desde, hasta);
      }}
      onSedeChange={(sedeGrupo, sede) => setSedeFilter(sedeGrupo, sede)}
      onConvenioChange={(convenio, convenioDetalle) => setConvenioFilter(convenio, convenioDetalle ?? '')}
      onModalidadChange={(value) => setFilter('modalidad', value)}
      onRegimenChange={(value) => setFilter('regimen', value)}
      onEspecialidadChange={(value) => setFilter('grupoEspecialidad', value)}
      onRefresh={() => {
        qc.invalidateQueries({ queryKey: ['filtros'] });
        qc.invalidateQueries();
      }}
    />
  );
}
