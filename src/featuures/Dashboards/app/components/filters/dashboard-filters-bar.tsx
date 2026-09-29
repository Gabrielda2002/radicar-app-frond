import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { dashboardsApi } from '@dash/lib/api';
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
  const [recalculando, setRecalculando] = useState(false);

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
      refreshing={recalculando}
      onRefresh={async () => {
        // Antes este boton solo invalidaba la cache de TanStack: volvia a pedir
        // los mismos datos a la API y daba la sensacion de haber actualizado sin
        // que nada cambiara. Ahora reconstruye de verdad el pre-agregado
        // costos_agg desde costos, y recien despues refresca las consultas.
        if (recalculando) return;
        setRecalculando(true);
        const aviso = toast.loading('Recalculando datos desde el ETL…');
        try {
          const r = await dashboardsApi.rebuildAgregado();
          qc.invalidateQueries();
          toast.update(aviso, {
            render: `Datos actualizados: ${r.rows.toLocaleString('es-CO')} filas en ${r.segundos}s`,
            type: 'success',
            isLoading: false,
            autoClose: 5000,
          });
        } catch (e) {
          // 409 = ya hay otra reconstruccion corriendo (otra pestanya, otro
          // usuario, o este mismo boton tras cambiar de panel y remontarse).
          // No es un fallo: hay que esperar, no reintentar.
          const enCurso =
            (e as { response?: { status?: number } })?.response?.status === 409;
          // Si falla de verdad, no se invalida nada: es preferible seguir
          // mostrando la foto anterior, que es consistente, a un refresco a medias.
          toast.update(aviso, {
            render: enCurso
              ? 'Ya hay un recálculo en curso. Espera a que termine.'
              : 'No se pudieron recalcular los datos. Se mantiene la última actualización.',
            type: enCurso ? 'warning' : 'error',
            isLoading: false,
            autoClose: 6000,
          });
        } finally {
          setRecalculando(false);
        }
      }}
    />
  );
}
