import { PageShell } from '@dash/components/layout/page-shell';
import { DashboardFiltersBar } from '@dash/components/filters/dashboard-filters-bar';
import { QueryState } from '@dash/components/ui/query-state';
import { Card, CardHeader, CardTitle, CardContent } from '@dash/components/ui/card';
import { KpiCard } from '@dash/components/charts/kpi-card';
import { ProgressList } from '@dash/components/charts/progress-bar';
import { Carousel } from '@dash/components/charts/carousel';
import { BlurFade } from '@dash/components/motion/blur-fade';
import { useResumen } from '@dash/lib/queries';
import { useGlobalFiltersFromUrl } from '@dash/lib/use-filters';
import { formatNumber, formatPercent } from '@dash/lib/utils';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const DONUT_COLORS = ['#1F8E8E', '#2E7D32', '#FBC02D'];

export function ResumenPage() {
  const { filters } = useGlobalFiltersFromUrl();
  const q = useResumen(filters);
  const data = q.data;

  return (
    <PageShell title="Resumen de Citas" badge="Ene–May 2026" badgeVariant="info">
      <DashboardFiltersBar soloConveniosNt />
      <QueryState isLoading={q.isLoading} isFetching={q.isFetching} isError={q.isError} error={q.error} empty={!data}>
        {data && (
          <>
            {/* KPIs */}
            <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <BlurFade>
                <KpiCard
                  label="Cumplimiento Global"
                  value={formatPercent(data.kpis.cumplimiento?.pct)}
                  ticker={
                    data.kpis.cumplimiento?.pct != null
                      ? { value: data.kpis.cumplimiento.pct, decimals: 1, suffix: '%' }
                      : undefined
                  }
                  progress={data.kpis.cumplimiento?.pct ?? 0}
                  accent={cumplAccent(data.kpis.cumplimiento?.pct)}
                  caption={`${formatNumber(data.kpis.cumplimiento?.cumplidas ?? 0)} cumplidas / ${formatNumber(
                    data.kpis.cumplimiento?.con_estado ?? 0,
                  )} con estado · solo convenios NT`}
                />
              </BlurFade>
              <BlurFade delay={0.12} className="h-full">
                <KpiCard
                  label="Convenios en Riesgo"
                  value={data.kpis.conveniosRiesgo}
                  ticker={{ value: data.kpis.conveniosRiesgo }}
                  caption="Cumplimiento < 80%"
                  accent={data.kpis.conveniosRiesgo > 10 ? 'red' : 'amber'}
                  delta={{ value: 'ALERTA', variant: 'warning' }}
                />
              </BlurFade>
              <BlurFade delay={0.18}>
                <KpiCard
                  label="Oportunidad Prom."
                  value={data.kpis.oportunidadDias != null ? `${data.kpis.oportunidadDias} d` : '—'}
                  ticker={
                    data.kpis.oportunidadDias != null
                      ? { value: data.kpis.oportunidadDias, decimals: 1, suffix: ' d' }
                      : undefined
                  }
                  caption="Días promedio fecha_deseada → fecha_cita"
                  accent="navy"
                />
              </BlurFade>
            </section>

            {/* Charts row 1 */}
            <BlurFade delay={0.12}>
              <section className="grid grid-cols-12 gap-6">
                <Card className="col-span-12 p-6 lg:col-span-8">
                <CardHeader className="flex flex-row items-start justify-between p-0 pb-6">
                  <div>
                    <CardTitle>Evolución Mensual: Efectivas vs Cumplidas</CardTitle>
                    <p className="text-label-md text-on-surface-variant">Base efectiva (cumplidas + incumplidas) · solo convenios NT</p>
                  </div>
                  <div className="flex gap-4 text-[12px] font-bold text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span className="h-3 w-3 rounded-full bg-corporate-navy" /> Efectivas
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-3 w-3 rounded-full bg-corporate-turquoise" /> Cumplidas
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data.evolucionMensual}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="mes" stroke="hsl(var(--on-surface-variant))" />
                      <YAxis stroke="hsl(var(--on-surface-variant))" tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                      <Tooltip
                        contentStyle={{
                          background: 'hsl(var(--surface-container-lowest))',
                          border: '1px solid hsl(var(--outline-variant))',
                          borderRadius: 8,
                          color: 'hsl(var(--on-surface))',
                        }}
                      />
                      <Bar dataKey="efectivas" fill="#0B3B5E" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="cumplidas" fill="#1F8E8E" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-12 p-6 lg:col-span-4">
                <CardHeader className="p-0 pb-2">
                  <CardTitle>Distribución de Servicios</CardTitle>
                  <p className="text-label-md text-on-surface-variant">Por funcionalidad</p>
                </CardHeader>
                <CardContent className="p-0">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={data.distribucionServicios}
                        dataKey="n"
                        nameKey="tipo"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                      >
                        {data.distribucionServicios.map((_, i) => (
                          <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v) => formatNumber(Number(v ?? 0))}
                        contentStyle={{
                          background: 'hsl(var(--surface-container-lowest))',
                          border: '1px solid hsl(var(--outline-variant))',
                          borderRadius: 8,
                          color: 'hsl(var(--on-surface))',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <ul className="mt-4 space-y-2">
                    {data.distribucionServicios.map((d, i) => (
                      <li key={d.tipo} className="flex items-center justify-between text-label-md">
                        <span className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
                          {d.tipo}
                        </span>
                        <span className="font-bold text-on-surface">{formatNumber(d.n)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
            </BlurFade>

            {/* Charts row 2 */}
            <BlurFade delay={0.06}>
            <section className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-6">
                <Carousel
                  title="Cumplimiento por Convenio"
                  description={`${data.cumplimientoTopConvenios.length} convenios con nota técnica`}
                  items={data.cumplimientoTopConvenios}
                  pageSize={6}
                  renderPage={(slice) => (
                    <ProgressList
                      items={slice.map((c) => ({
                        label: c.convenio_grupo,
                        value: c.pct ?? 0,
                        display: c.pct != null ? formatPercent(c.pct) : 's/d',
                        tone: pctTone(c.pct),
                      }))}
                    />
                  )}
                />
              </div>

              <div className="col-span-12 lg:col-span-6">
                <Carousel
                  title="Volumen por Sede"
                  description={`${formatNumber(data.volumenPorSede.reduce((a, s) => a + s.citas, 0))} citas · ${data.volumenPorSede.length} sedes`}
                  items={data.volumenPorSede}
                  pageSize={6}
                  renderPage={(slice) => {
                    const total = data.volumenPorSede.reduce((a, s) => a + s.citas, 0) || 1;
                    return (
                      <ProgressList
                        defaultTone="navy"
                        items={slice.map((s) => ({
                          label: s.sede_grupo.replace('NORDVITAL IPS - ', '').replace('NORDVITAL IPS ', ''),
                          value: (s.citas / total) * 100,
                          display: `${formatNumber(s.citas)} (${Math.round((s.citas / total) * 100)}%)`,
                          tone: 'navy',
                        }))}
                      />
                    );
                  }}
                />
              </div>
            </section>
            </BlurFade>
          </>
        )}
      </QueryState>
    </PageShell>
  );
}

function cumplAccent(pct: number | null | undefined): 'green' | 'turquoise' | 'amber' | 'red' | 'red-light' {
  if (pct == null) return 'turquoise';
  if (pct >= 85) return 'green';
  if (pct >= 80) return 'amber';
  if (pct >= 75) return 'red-light';
  return 'red';
}

function pctTone(pct: number | null | undefined): 'green' | 'turquoise' | 'amber' | 'red' | 'red-light' {
  if (pct == null) return 'navy' as never;
  if (pct >= 85) return 'green';
  if (pct >= 80) return 'amber';
  if (pct >= 75) return 'red-light';
  return 'red';
}
