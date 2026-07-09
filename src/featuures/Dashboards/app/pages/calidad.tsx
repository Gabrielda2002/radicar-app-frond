import { useMemo } from 'react';
import { PageShell } from '@dash/components/layout/page-shell';
import { DashboardFiltersBar } from '@dash/components/filters/dashboard-filters-bar';
import { QueryState } from '@dash/components/ui/query-state';
import { Card, CardHeader, CardTitle, CardContent } from '@dash/components/ui/card';
import { GaugeCard } from '@dash/components/charts/gauge';
import { StackedBar } from '@dash/components/charts/stacked-bar';
import { Carousel } from '@dash/components/charts/carousel';
import { useCalidad } from '@dash/lib/queries';
import { useGlobalFiltersFromUrl } from '@dash/lib/use-filters';
import { formatNumber, formatPercent } from '@dash/lib/utils';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const LINE_COLORS = ['#006a6a', '#0B3B5E', '#1F8E8E', '#2E7D32', '#FBC02D', '#D32F2F', '#7B1FA2'];

export function CalidadPage() {
  const { filters } = useGlobalFiltersFromUrl();
  const q = useCalidad(filters);
  const data = q.data;

  const inasisten = useMemo(() => pivotInasistencia(data?.inasistenciaMensual ?? []), [data]);

  return (
    <PageShell title="Calidad y Oportunidad" badge="Circular 030/2006" badgeVariant="info">
      <DashboardFiltersBar soloConveniosNt />
      <QueryState isLoading={q.isLoading} isFetching={q.isFetching} isError={q.isError} error={q.error} empty={!data}>
        {data && (
          <>
            <Carousel
              title="Oportunidad por Especialidad"
              description={`${data.oportunidadEspecialidad.length} especialidades · días promedio fecha_deseada → fecha_cita`}
              items={data.oportunidadEspecialidad}
              pageSize={8}
              renderPage={(slice) => (
                <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
                  {slice.map((e, i) => (
                    <GaugeCard
                      key={e.especialidad}
                      title={truncate(e.especialidad, 22)}
                      value={e.dias != null ? e.dias.toFixed(1) : '—'}
                      unit="Días"
                      fillPct={oportunidadFill(e.dias)}
                      tone={['secondary', 'primary', 'green', 'amber'][i % 4] as never}
                      footer={<span className="text-on-surface-variant">{formatNumber(e.n)} citas</span>}
                    />
                  ))}
                </div>
              )}
            />

            <section className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
              <Carousel
                title="Estado de Consultas por Sede"
                description={`${data.estadoPorSede.length} sedes`}
                items={data.estadoPorSede}
                pageSize={4}
                headerExtra={
                  <div className="hidden gap-4 md:flex">
                    <Legend color="bg-secondary" label="Cumplida" />
                    <Legend color="bg-secondary-container" label="Incumplida" />
                    <Legend color="bg-error-container" label="Cancelada" />
                  </div>
                }
                renderPage={(slice) => (
                  <div className="space-y-6">
                    {slice.map((s) => (
                      <div key={s.sede_grupo} className="space-y-2">
                        <div className="flex justify-between text-label-md text-on-surface-variant">
                          <span className="font-bold">{s.sede_grupo}</span>
                          <span>
                            {formatNumber(s.total)} citas ·{' '}
                            <span className={`font-bold ${cumplBandTextClass(efectivoCumpl(s))}`}>
                              {formatPercent(efectivoCumpl(s))} cumplimiento
                            </span>
                          </span>
                        </div>
                        <StackedBar
                          normalized
                          segments={[
                            { value: s.pct_cump ?? 0, bgClass: 'bg-secondary', label: 'Cumplida' },
                            { value: s.pct_incump ?? 0, bgClass: 'bg-secondary-container', label: 'Incumplida' },
                            { value: s.pct_canc ?? 0, bgClass: 'bg-error-container', label: 'Cancelada' },
                          ]}
                        />
                      </div>
                    ))}
                  </div>
                )}
              />

              <Card className="p-gutter">
                <CardHeader className="p-0 pb-6">
                  <CardTitle>% Inasistencia Mensual por Convenio</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={inasisten.rows}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="mes" stroke="hsl(var(--on-surface-variant))" />
                      <YAxis stroke="hsl(var(--on-surface-variant))" tickFormatter={(v) => `${v}%`} />
                      <Tooltip
                        formatter={(v) => `${Number(v ?? 0).toFixed(1)}%`}
                        contentStyle={{
                          background: 'hsl(var(--surface-container-lowest))',
                          border: '1px solid hsl(var(--outline-variant))',
                          borderRadius: 8,
                        }}
                      />
                      {inasisten.convenios.map((c, i) => (
                        <Line
                          key={c}
                          type="monotone"
                          dataKey={c}
                          stroke={LINE_COLORS[i % LINE_COLORS.length]}
                          strokeWidth={2.5}
                          dot={{ r: 3 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-label-md">
                    {inasisten.convenios.map((c, i) => (
                      <span key={c} className="flex items-center gap-2">
                        <span
                          className="h-1 w-4 rounded-full"
                          style={{ background: LINE_COLORS[i % LINE_COLORS.length] }}
                        />
                        {c}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </QueryState>
    </PageShell>
  );
}

function oportunidadFill(dias: number | null | undefined): number {
  if (dias == null) return 0;
  // 0 dias = 100%, 5 dias = 0%
  return Math.max(0, Math.min(100, ((5 - dias) / 5) * 100));
}

function truncate(s: string, max: number): string {
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

function pivotInasistencia(rows: Array<{ convenio_grupo: string; mes: string; pct: number | null }>) {
  const conveniosSet = new Set<string>();
  const byMes = new Map<string, Record<string, string | number | null>>();
  for (const r of rows) {
    conveniosSet.add(r.convenio_grupo);
    const m = byMes.get(r.mes) ?? { mes: r.mes };
    m[r.convenio_grupo] = r.pct;
    byMes.set(r.mes, m);
  }
  return {
    convenios: Array.from(conveniosSet),
    rows: Array.from(byMes.values()).sort((a, b) => String(a.mes).localeCompare(String(b.mes))),
  };
}

function efectivoCumpl(s: { pct_cump?: number | null; pct_incump?: number | null }): number | null {
  const base = (s.pct_cump ?? 0) + (s.pct_incump ?? 0);
  return base > 0 ? ((s.pct_cump ?? 0) / base) * 100 : null;
}

/** Semáforo de 4 bandas (idéntico al Resumen): >=85 verde, 80-85 amarillo, 75-80 rojo claro, <75 rojo oscuro */
function cumplBandTextClass(pct: number | null): string {
  if (pct == null) return 'text-on-surface-variant';
  if (pct >= 85) return 'text-normative-green';
  if (pct >= 80) return 'text-normative-amber';
  if (pct >= 75) return 'text-[#EF5350]';
  return 'text-normative-red';
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-label-md">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      {label}
    </span>
  );
}
