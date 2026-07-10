import { PageShell } from '@dash/components/layout/page-shell';
import { DashboardFiltersBar } from '@dash/components/filters/dashboard-filters-bar';
import { QueryState } from '@dash/components/ui/query-state';
import { KpiCard } from '@dash/components/charts/kpi-card';
import { ProgressList } from '@dash/components/charts/progress-bar';
import { Carousel } from '@dash/components/charts/carousel';
import { BlurFade } from '@dash/components/motion/blur-fade';
import { useFinanciero } from '@dash/lib/queries';
import { useGlobalFiltersFromUrl } from '@dash/lib/use-filters';
import { formatCurrency, formatNumber, formatPercent } from '@dash/lib/utils';
import { Badge } from '@dash/components/ui/badge';

export function FinancieroPage() {
  const { filters } = useGlobalFiltersFromUrl();
  const q = useFinanciero(filters);
  const data = q.data;

  return (
    <PageShell title="Análisis Financiero" badge="Costos desde NT vigente" badgeVariant="info">
      <DashboardFiltersBar />
      <QueryState isLoading={q.isLoading} isFetching={q.isFetching} isError={q.isError} error={q.error} empty={!data}>
        {data && (
          <>
            <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <BlurFade>
                <KpiCard
                  label="Costo Real Ejecutado"
                  value={formatCurrency(data.kpis.costoRealMillones)}
                  ticker={
                    data.kpis.costoRealMillones != null
                      ? { value: data.kpis.costoRealMillones, decimals: 1, prefix: '$', suffix: 'M' }
                      : undefined
                  }
                  caption={`${formatNumber(data.kpis.citasCosteadas)} citas costeadas (match NT)`}
                  accent="navy"
                />
              </BlurFade>
              <BlurFade delay={0.06}>
                <KpiCard
                  label="Costo Esperado NT"
                  value={formatCurrency(data.kpis.costoEsperadoMillones)}
                  ticker={
                    data.kpis.costoEsperadoMillones != null
                      ? { value: data.kpis.costoEsperadoMillones, decimals: 1, prefix: '$', suffix: 'M' }
                      : undefined
                  }
                  caption="Meta NT × costo_medio × 5 meses"
                  accent="navy"
                />
              </BlurFade>
              <BlurFade delay={0.12}>
                <KpiCard
                  label="Recuperación (Copagos)"
                  value={formatCurrency(data.kpis.recuperacionMillones)}
                  ticker={
                    data.kpis.recuperacionMillones != null
                      ? { value: data.kpis.recuperacionMillones, decimals: 1, prefix: '$', suffix: 'M' }
                      : undefined
                  }
                  caption="Real PANA"
                  accent="secondary"
                />
              </BlurFade>
              <BlurFade delay={0.18}>
                <KpiCard
                  label="Eficiencia (Rec/Costo)"
                  value={formatPercent(data.kpis.eficienciaPct)}
                  ticker={
                    data.kpis.eficienciaPct != null
                      ? { value: data.kpis.eficienciaPct, decimals: 1, suffix: '%' }
                      : undefined
                  }
                  caption={(data.kpis.eficienciaPct ?? 0) < 10 ? 'Recuperación muy baja' : 'Rango aceptable'}
                  accent={(data.kpis.eficienciaPct ?? 0) < 10 ? 'red' : 'green'}
                />
              </BlurFade>
            </section>

            <section className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-7">
                <Carousel
                  title="Pareto: CUPS por Costo Real"
                  description={`${data.paretoCups.length} CUPS costeados (match NT)`}
                  items={data.paretoCups}
                  pageSize={10}
                  headerExtra={<Badge>{formatPercent(data.paretoTop20Pct)} top-20 del costo</Badge>}
                  bodyClassName="overflow-x-auto"
                  renderPage={(slice) => (
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        <tr>
                          <th className="px-4 py-3 font-semibold">CUPS</th>
                          <th className="px-4 py-3 font-semibold">Servicio</th>
                          <th className="px-4 py-3 text-right font-semibold">Citas</th>
                          <th className="px-4 py-3 text-right font-semibold">Costo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-900 dark:divide-gray-700 dark:text-white">
                        {slice.map((c) => (
                          <tr key={c.cups} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-4 py-4 font-bold text-[#00776f] dark:text-[#049AE7]">{c.cups}</td>
                            <td className="px-4 py-4">{c.descripcion ?? '—'}</td>
                            <td className="px-4 py-4 text-right tabular-nums">{formatNumber(c.n)}</td>
                            <td className="px-4 py-4 text-right tabular-nums">{formatCurrency(c.millones)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                />
              </div>

              <div className="col-span-12 lg:col-span-5">
                <Carousel
                  title="Costo Real por Convenio"
                  description="NT.costo_medio_evento × citas matcheadas"
                  items={data.costoPorConvenio}
                  pageSize={8}
                  renderPage={(slice) => (
                    <>
                      <ProgressList
                        items={slice.map((c) => ({
                          label: c.convenio_grupo,
                          value: percentOfMax(c.millones, data.costoPorConvenio),
                          display: formatCurrency(c.millones),
                          tone: 'navy',
                        }))}
                      />
                      <p className="mt-4 text-[11px] italic text-gray-500 dark:text-gray-400">
                        Recuperación reportada solo en PANA:{' '}
                        {data.recuperacionPorConvenio[0]?.convenio_grupo ?? '—'} ({formatCurrency(
                          data.recuperacionPorConvenio[0]?.millones,
                        )})
                      </p>
                    </>
                  )}
                />
              </div>
            </section>
          </>
        )}
      </QueryState>
    </PageShell>
  );
}

function percentOfMax(v: number | null, arr: Array<{ millones: number | null }>): number {
  const max = Math.max(...arr.map((x) => x.millones ?? 0), 1);
  return v != null ? (v / max) * 100 : 0;
}
