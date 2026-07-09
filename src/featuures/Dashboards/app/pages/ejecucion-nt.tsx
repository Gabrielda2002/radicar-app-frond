import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { PageShell } from '@dash/components/layout/page-shell';
import { DashboardFiltersBar } from '@dash/components/filters/dashboard-filters-bar';
import { QueryState } from '@dash/components/ui/query-state';
import { Card } from '@dash/components/ui/card';
import { Carousel } from '@dash/components/charts/carousel';
import { PctBadge } from '@dash/components/charts/pct-badge';
import { Tooltip } from '@dash/components/ui/tooltip';
import { PulseHighlight } from '@dash/components/motion/pulse-highlight';
import { NumberTicker } from '@dash/components/motion/number-ticker';
import { useEjecucionNt } from '@dash/lib/queries';
import { useGlobalFiltersFromUrl } from '@dash/lib/use-filters';
import { cn, formatNumber, clampPercent } from '@dash/lib/utils';
import type { EjecucionNtResponse } from '@dash/lib/api';

export function EjecucionNtPage() {
  const { filters } = useGlobalFiltersFromUrl();
  const q = useEjecucionNt(filters);
  const data = q.data;

  // Buscadores locales (por CUPS o por descripcion) para el catalogo y para
  // contratado-sin-ejecutar. El toggle alterna el campo sobre el que se filtra.
  const [catSearch, setCatSearch] = useState('');
  const [catMode, setCatMode] = useState<SearchMode>('descripcion');
  const [contSearch, setContSearch] = useState('');
  const [contMode, setContMode] = useState<SearchMode>('descripcion');
  const catalogoFiltrado = useMemo(
    () => filterRows(data?.catalogoNt ?? [], catSearch, catMode),
    [data, catSearch, catMode],
  );
  const contratadoFiltrado = useMemo(
    () => filterRows(data?.contratadoSinEjecutar ?? [], contSearch, contMode),
    [data, contSearch, contMode],
  );

  // Agrupar tendencia por convenio
  const sparks = useMemo(() => groupTendencia(data?.tendenciaCumplimiento ?? []), [data]);

  return (
    <PageShell title="Ejecución vs Nota Técnica" badge="NT vigente 11 convenios" badgeVariant="info">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        {data && (
          <CumplimientoKpi
            pct={data.kpiCumplimientoGlobal?.pct ?? null}
            ejecutado={data.kpiCumplimientoGlobal?.ejecutado ?? 0}
            meta={data.kpiCumplimientoGlobal?.meta_periodo ?? 0}
          />
        )}
        <div className="min-w-0 flex-1">
          <DashboardFiltersBar soloConveniosNt />
        </div>
      </div>
      <QueryState isLoading={q.isLoading} isFetching={q.isFetching} isError={q.isError} error={q.error} empty={!data}>
        {data && (
          <>
            {/* Catalogo NT: CUPS de la nota tecnica efectivamente ejecutados bajo el filtro actual */}
            <Carousel
              title="Catálogo Nota Técnica — CUPS ejecutados"
              description={`${catalogoFiltrado.length} de ${data.catalogoNt.length} CUPS · meta vs ejecutado`}
              items={catalogoFiltrado}
              pageSize={10}
              bodyClassName="overflow-x-auto"
              headerExtra={
                <CupsSearch value={catSearch} mode={catMode} onValueChange={setCatSearch} onModeChange={setCatMode} />
              }
              emptyText={catSearch ? 'Ningún CUPS coincide con la búsqueda' : 'Sin datos para los filtros actuales'}
              renderPage={(slice) => (
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-surface-container-high text-label-md uppercase tracking-wider text-on-surface-variant">
                    <tr>
                      <th className="px-4 py-3 font-semibold">CUPS</th>
                      <th className="px-4 py-3 font-semibold">Descripción</th>
                      <th className="px-4 py-3 text-right font-semibold">Meta</th>
                      <th className="px-4 py-3 text-right font-semibold">Ejecutado</th>
                      <th className="px-4 py-3 text-right font-semibold">Cumplimiento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 text-on-surface">
                    {slice.map((c) => (
                      <tr key={c.cups} className="transition-colors hover:bg-surface-container-low">
                        <td className="px-4 py-4 font-bold text-primary">{c.cups}</td>
                        <td className="px-4 py-4">{c.descripcion ?? '—'}</td>
                        <td className="px-4 py-4 text-right tabular-nums">{formatNumber(c.meta)}</td>
                        <td className="px-4 py-4 text-right tabular-nums">{formatNumber(c.ejecutado)}</td>
                        <td className="px-4 py-4 text-right">
                          <PctBadge value={c.pct} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            />

            <Carousel
              title="Contratado sin Ejecutar — CUPS de la NT sin ejecución"
              description={`${contratadoFiltrado.length} de ${data.contratadoSinEjecutar.length} CUPS contratados (meta > 0) sin ejecución`}
              items={contratadoFiltrado}
              pageSize={10}
              bodyClassName="overflow-x-auto"
              headerExtra={
                <CupsSearch value={contSearch} mode={contMode} onValueChange={setContSearch} onModeChange={setContMode} />
              }
              emptyText={
                contSearch
                  ? 'Ningún CUPS coincide con la búsqueda'
                  : 'Todos los CUPS contratados tienen ejecución bajo el filtro actual'
              }
              renderPage={(slice) => (
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-surface-container-high text-label-md uppercase tracking-wider text-on-surface-variant">
                    <tr>
                      <th className="px-4 py-3 font-semibold">CUPS</th>
                      <th className="px-4 py-3 font-semibold">Descripción</th>
                      <th className="px-4 py-3 text-right font-semibold">Meta esperada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 text-on-surface">
                    {slice.map((c) => (
                      <tr key={c.cups} className="transition-colors hover:bg-surface-container-low">
                        <td className="px-4 py-4 font-bold text-primary">{c.cups}</td>
                        <td className="px-4 py-4">{c.descripcion ?? '—'}</td>
                        <td className="px-4 py-4 text-right tabular-nums">{formatNumber(c.meta)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            />

            <Carousel
              title="Ejecutado fuera de Nota Técnica — CUPS sin match"
              description={`${data.ejecutadoFueraNt.length} CUPS ejecutados que no están en la nota técnica · revisar si deben contratarse`}
              items={data.ejecutadoFueraNt}
              pageSize={10}
              bodyClassName="overflow-x-auto"
              emptyText="Todos los CUPS ejecutados están en la nota técnica"
              renderPage={(slice) => (
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-surface-container-high text-label-md uppercase tracking-wider text-on-surface-variant">
                    <tr>
                      <th className="px-4 py-3 font-semibold">CUPS</th>
                      <th className="px-4 py-3 font-semibold">Descripción</th>
                      <th className="px-4 py-3 text-right font-semibold">Ejecutado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 text-on-surface">
                    {slice.map((c) => (
                      <tr key={c.cups} className="transition-colors hover:bg-surface-container-low">
                        <td className="px-4 py-4 font-bold text-primary">{c.cups}</td>
                        <td className="px-4 py-4">{c.descripcion ?? '—'}</td>
                        <td className="px-4 py-4 text-right tabular-nums">{formatNumber(c.ejecutado)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            />

            <Carousel
              title="Tendencia Mensual de Ejecución por Convenio (NT)"
              description={`${sparks.length} convenios con nota técnica vigente`}
              items={sparks}
              pageSize={8}
              renderPage={(slice) => (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {slice.map((s) => (
                    <div key={s.convenio} className="rounded-lg border border-outline-variant p-3">
                      <div className="mb-2 flex items-start justify-between">
                        <span className="text-[10px] font-bold uppercase text-on-surface-variant">
                          {s.convenio}
                        </span>
                        <span className="text-[10px] text-on-surface-variant">{formatNumber(s.total)} ejec.</span>
                      </div>
                      <TendenciaBars points={s.points} />
                    </div>
                  ))}
                </div>
              )}
            />
          </>
        )}
      </QueryState>
    </PageShell>
  );
}

type SearchMode = 'cups' | 'descripcion';

/** Filtra filas por CUPS o por descripcion (case-insensitive). */
function filterRows<T extends { cups: string; descripcion: string | null }>(
  rows: T[],
  term: string,
  mode: SearchMode,
): T[] {
  const q = term.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((r) =>
    mode === 'cups' ? r.cups.toLowerCase().includes(q) : (r.descripcion ?? '').toLowerCase().includes(q),
  );
}

/** Buscador con toggle de campo (CUPS / Descripción) para usar en headerExtra. */
function CupsSearch({
  value,
  mode,
  onValueChange,
  onModeChange,
}: {
  value: string;
  mode: SearchMode;
  onValueChange: (v: string) => void;
  onModeChange: (m: SearchMode) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex overflow-hidden rounded-md border border-outline-variant text-[11px] font-semibold">
        {(['cups', 'descripcion'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onModeChange(m)}
            className={cn(
              'px-2.5 py-1.5 transition-colors',
              mode === m
                ? 'bg-corporate-turquoise text-white'
                : 'bg-surface text-on-surface-variant hover:bg-surface-container-low',
            )}
          >
            {m === 'cups' ? 'CUPS' : 'Descripción'}
          </button>
        ))}
      </div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-on-surface-variant" />
        <input
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={mode === 'cups' ? 'Buscar CUPS…' : 'Buscar descripción…'}
          className="w-44 rounded-md border border-outline-variant bg-surface py-1.5 pl-7 pr-6 text-[12px] text-on-surface placeholder:text-on-surface-variant focus:border-corporate-turquoise focus:outline-none"
        />
        {value && (
          <button
            type="button"
            aria-label="Limpiar búsqueda"
            onClick={() => onValueChange('')}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

function groupTendencia(rows: EjecucionNtResponse['tendenciaCumplimiento']) {
  const map = new Map<string, { points: Array<{ mes: string; ejecutado: number; pct: number | null }>; total: number }>();
  for (const r of rows) {
    if (!map.has(r.convenio)) {
      map.set(r.convenio, { points: [], total: 0 });
    }
    const m = map.get(r.convenio)!;
    m.points.push({ mes: r.mes, ejecutado: r.ejecutado ?? 0, pct: r.pct });
    m.total += r.ejecutado ?? 0;
  }
  return Array.from(map.entries())
    .map(([convenio, v]) => ({ convenio, ...v }))
    .sort((a, b) => b.total - a.total);
}

/** Tono del KPI de ejecucion: >=80 verde, >=50 turquesa, <50 rojo, sin meta gris. */
function ejecTone(pct: number | null): 'green' | 'turquoise' | 'red' | 'outline' {
  if (pct == null) return 'outline';
  return pct >= 80 ? 'green' : pct >= 50 ? 'turquoise' : 'red';
}

const ejecBarBg: Record<'green' | 'turquoise' | 'red' | 'outline', string> = {
  green: 'bg-normative-green',
  turquoise: 'bg-corporate-turquoise',
  red: 'bg-normative-red',
  outline: 'bg-outline-variant',
};

/** Barras mensuales de ejecucion, coloreadas por el semaforo del KPI; tooltip con el %. */
function TendenciaBars({ points }: { points: Array<{ mes: string; ejecutado: number; pct: number | null }> }) {
  if (points.length === 0) return <div className="h-16 rounded bg-outline-variant/10" />;
  const max = Math.max(...points.map((p) => p.ejecutado), 1);
  return (
    <div className="flex h-16 items-end gap-1">
      {points.map((p) => {
        const h = Math.max(4, Math.round((p.ejecutado / max) * 64));
        return (
          <Tooltip
            key={p.mes}
            content={
              <div className="text-center">
                <span className="block font-bold tabular-nums">{p.pct != null ? `${p.pct}%` : 's/d'}</span>
                <span className="mt-0.5 block text-surface/80">
                  {p.mes} · {formatNumber(p.ejecutado)} ejec.
                </span>
              </div>
            }
            className="flex flex-1 cursor-help items-end"
          >
            <div
              className={cn('w-full rounded-t-sm transition-colors', ejecBarBg[ejecTone(p.pct)])}
              style={{ height: h }}
            />
          </Tooltip>
        );
      })}
    </div>
  );
}

/**
 * KPI compacta horizontal de Cumplimiento Global, pensada para ir al lado de
 * la barra de filtros (misma altura via items-stretch). Pulsa en rojo cuando
 * el cumplimiento es bajo (<50%) habiendo meta NT vigente.
 */
function CumplimientoKpi({
  pct,
  ejecutado,
  meta,
}: {
  pct: number | null;
  ejecutado: number;
  meta: number;
}) {
  const hasMeta = meta > 0;
  const value = pct ?? 0;
  const tone = !hasMeta ? 'outline' : value >= 80 ? 'green' : value >= 50 ? 'turquoise' : 'red';
  const border = {
    outline: 'border-l-outline-variant',
    green: 'border-l-normative-green',
    turquoise: 'border-l-corporate-turquoise',
    red: 'border-l-normative-red',
  }[tone];
  const bar = {
    outline: 'bg-outline-variant',
    green: 'bg-normative-green',
    turquoise: 'bg-corporate-turquoise',
    red: 'bg-normative-red',
  }[tone];

  const card = (
    <Card className={cn('flex h-full items-center gap-4 border-l-4 px-5 py-3', border)}>
      <div className="min-w-0 flex-1">
        <p className="text-label-md uppercase tracking-wider text-on-surface-variant">
          Cumplimiento Global
        </p>
        <p className="mt-0.5 text-[10px] text-on-surface-variant">
          {hasMeta
            ? `${formatNumber(ejecutado)} ejec. / ${formatNumber(meta)} meta`
            : 'Sin NT vigente para el filtro'}
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
          <div
            className={cn('h-full rounded-full transition-all duration-700', bar)}
            style={{ width: `${clampPercent(value)}%` }}
          />
        </div>
      </div>
      <div className="text-headline-md font-bold text-corporate-navy">
        {hasMeta ? <NumberTicker value={value} decimals={1} suffix="%" /> : '—'}
      </div>
    </Card>
  );

  return (
    <PulseHighlight active={tone === 'red'} color="#D32F2F" className="lg:w-80">
      {card}
    </PulseHighlight>
  );
}

