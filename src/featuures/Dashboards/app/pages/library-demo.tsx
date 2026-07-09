import { useState } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';
import { PageShell } from '@dash/components/layout/page-shell';
import { GlobalFilters, type FilterOption, type SedeJerarquiaOption } from '@dash/components/filters/global-filters';
import { Card, CardHeader, CardTitle, CardContent } from '@dash/components/ui/card';
import { Badge } from '@dash/components/ui/badge';
import Button from '@/components/common/Ui/Button';
import { BannerInfo } from '@dash/components/ui/banner-info';
import { KpiCard } from '@dash/components/charts/kpi-card';
import { ProgressList } from '@dash/components/charts/progress-bar';
import { GaugeCard } from '@dash/components/charts/gauge';
import { HeatmapCell, HeatmapLegend } from '@dash/components/charts/heatmap-cell';
import { StatusBadge, riskFromPct } from '@dash/components/charts/status-badge';
import { Sparkline } from '@dash/components/charts/sparkline';
import { StackedBar } from '@dash/components/charts/stacked-bar';
import { MiniTreemap } from '@dash/components/charts/mini-treemap';
import { DataTable } from '@dash/components/data/data-table';
import { formatNumber, formatPercent } from '@dash/lib/utils';

const PERIODOS: FilterOption[] = [
  { value: 'ene-may-2026', label: 'Ene – May 2026' },
  { value: 'last-30', label: 'Últimos 30 días' },
  { value: '2026', label: 'Año 2026' },
];

const DEMO_CONVENIOS: FilterOption[] = [
  { value: 'all', label: 'Todos los convenios' },
  { value: 'COMPENSAR', label: 'COMPENSAR' },
  { value: 'FAMISANAR', label: 'FAMISANAR' },
  { value: 'NUEVA EPS', label: 'NUEVA EPS' },
];

const DEMO_SEDES_JERARQUIA: SedeJerarquiaOption[] = [
  {
    value: 'CUCUTA',
    label: 'CUCUTA',
    citas: 227244,
    sedes: [
      { value: 'SEDE 01', label: 'SEDE 01', citas: 112822 },
      { value: 'SEDE 03', label: 'SEDE 03', citas: 78793 },
      { value: 'SEDE 04', label: 'SEDE 04', citas: 22002 },
    ],
  },
  { value: 'CAJICA', label: 'CAJICA', citas: 4200, sedes: [{ value: 'SEDE CAJICA', label: 'SEDE CAJICA', citas: 4200 }] },
  { value: 'CHIA', label: 'CHIA', citas: 3100, sedes: [{ value: 'SEDE CHIA', label: 'SEDE CHIA', citas: 3100 }] },
];

const DEMO_MODALIDADES: FilterOption[] = [
  { value: 'all', label: 'Todas' },
  { value: 'PGP', label: 'PGP' },
  { value: 'CAPITA', label: 'CAPITA' },
  { value: 'EVENTO', label: 'EVENTO' },
];

const DEMO_REGIMENES: FilterOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'CONTRIBUTIVO', label: 'CONTRIBUTIVO' },
  { value: 'SUBSIDIADO', label: 'SUBSIDIADO' },
];

interface AlertRow {
  cohorte: string;
  poblacion: number;
  ejecucion: number;
  desviacion: number;
}

const ALERTS: AlertRow[] = [
  { cohorte: 'Urología', poblacion: 574, ejecucion: 0.2, desviacion: -79.8 },
  { cohorte: 'Medicina Familiar', poblacion: 4152, ejecucion: 11.2, desviacion: -68.8 },
  { cohorte: 'Dermatología', poblacion: 2082, ejecucion: 19.4, desviacion: -60.6 },
  { cohorte: 'Pediatría', poblacion: 7370, ejecucion: 24.8, desviacion: -55.2 },
  { cohorte: 'Psicología', poblacion: 11670, ejecucion: 32.9, desviacion: -47.1 },
];

const alertColumns: ColumnDef<AlertRow>[] = [
  { accessorKey: 'cohorte', header: 'Cohorte / Programa', cell: (i) => <span className="font-bold">{i.getValue() as string}</span> },
  {
    accessorKey: 'poblacion',
    header: () => <span className="block text-right">Población</span>,
    cell: (i) => <span className="block text-right">{formatNumber(i.getValue() as number)}</span>,
  },
  {
    accessorKey: 'ejecucion',
    header: () => <span className="block text-right">Ejec. Real</span>,
    cell: (i) => {
      const v = i.getValue() as number;
      const cls = v < 10 ? 'text-normative-red' : v < 50 ? 'text-normative-amber' : 'text-normative-green';
      return <span className={`block text-right font-bold ${cls}`}>{formatPercent(v)}</span>;
    },
  },
  {
    id: 'nivel',
    header: 'Nivel',
    cell: (i) => <StatusBadge level={riskFromPct(i.row.original.ejecucion)} />,
  },
  {
    accessorKey: 'desviacion',
    header: () => <span className="block text-right">Desviación</span>,
    cell: (i) => (
      <span className="block text-right text-normative-red">{formatPercent(i.getValue() as number)}</span>
    ),
  },
];

export function LibraryDemo() {
  const [periodo, setPeriodo] = useState('ene-may-2026');
  const [convenio, setConvenio] = useState('all');
  const [sedeGrupo, setSedeGrupo] = useState('');
  const [sede, setSede] = useState('');
  const [modalidad, setModalidad] = useState('all');
  const [regimen, setRegimen] = useState('all');
  const [especialidad, setEspecialidad] = useState('all');

  return (
    <PageShell title="Librería de Componentes" badge="DEMO · Ene-May 2026" badgeVariant="info">
      <GlobalFilters
        periodos={PERIODOS}
        sedeJerarquia={DEMO_SEDES_JERARQUIA}
        convenios={DEMO_CONVENIOS}
        modalidades={DEMO_MODALIDADES}
        regimenes={DEMO_REGIMENES}
        especialidades={DEMO_MODALIDADES}
        selectedPeriodo={periodo}
        selectedSedeGrupo={sedeGrupo}
        selectedSede={sede}
        selectedConvenio={convenio}
        selectedModalidad={modalidad}
        selectedRegimen={regimen}
        selectedEspecialidad={especialidad}
        onPeriodoChange={setPeriodo}
        onSedeChange={(g, s) => {
          setSedeGrupo(g);
          setSede(s);
        }}
        onConvenioChange={setConvenio}
        onModalidadChange={setModalidad}
        onRegimenChange={setRegimen}
        onEspecialidadChange={setEspecialidad}
        onRefresh={() => console.log('refresh')}
        onOpenAdvanced={() => console.log('advanced')}
      />

      <BannerInfo
        variant="info"
        title="Librería de artefactos NORDVITAL"
        description="Esta página renderiza todos los componentes reutilizables del frontend. Sirve como referencia visual y de API. Los datos son de muestra."
      />

      <Section title="1. KpiCard" description="Tarjeta KPI con valor, delta opcional y barra de progreso.">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          <KpiCard
            label="Cumplimiento Global"
            value="50.2%"
            progress={50.2}
            accent="turquoise"
            delta={{ value: '+2.1%', trend: 'up', variant: 'success' }}
          />
          <KpiCard
            label="Recuperación Total"
            value="$85.2M"
            caption="Real Ene–May 2026"
            accent="secondary"
            delta={{ value: 'REAL', variant: 'info' }}
          />
          <KpiCard
            label="Convenios en Riesgo"
            value="23"
            caption="Cumplimiento < 70%"
            accent="amber"
            delta={{ value: 'ALERTA', variant: 'warning' }}
          />
          <KpiCard
            label="Oportunidad Prom."
            value="3.4 d"
            caption="Días promedio asignación"
            accent="navy"
            delta={{ value: 'ESTABLE', variant: 'neutral' }}
          />
          <KpiCard
            label="Costo Real"
            value="$3.745M"
            caption="163.260 citas costeadas vs NT"
            accent="green"
            icon={<Activity className="h-4 w-4 text-normative-green" />}
          />
        </div>
      </Section>

      <Section title="2. ProgressList" description="Listado vertical de barras de progreso con labels.">
        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle>Cumplimiento por Convenio (Top 5)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ProgressList
              items={[
                { label: 'COOSALUD CAPITA CONTRIBUTIVO', value: 68.3, tone: 'turquoise' },
                { label: 'FAMISANAR CHIA CAPITA CONTRIB.', value: 67.3, tone: 'turquoise' },
                { label: 'NUEVA EPS PGP CONTRIBUTIVO', value: 40.0, tone: 'amber' },
                { label: 'COMPENSAR CAJICA PGP CONTRIB.', value: 22.2, tone: 'red' },
                { label: 'NORDVITAL IPS SAS (PANA)', value: 3, tone: 'navy', display: 's/d' },
              ]}
            />
          </CardContent>
        </Card>
      </Section>

      <Section title="3. GaugeCard" description="Indicador circular SVG. Para oportunidades, tiempos, %.">
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
          <GaugeCard
            title="Medicina General"
            value="1.9"
            unit="Días"
            fillPct={72}
            tone="secondary"
            footer={<span className="text-on-surface-variant">111.358 citas</span>}
          />
          <GaugeCard
            title="Medicina Interna"
            value="5.2"
            unit="Días"
            fillPct={48}
            tone="error"
            footer={
              <span className="flex items-center gap-1 text-normative-red">
                <TrendingUp className="h-3 w-3" /> +1.1 vs mes ant.
              </span>
            }
          />
          <GaugeCard
            title="Pediatría"
            value="1.2"
            unit="Días"
            fillPct={88}
            tone="green"
            footer={
              <span className="flex items-center gap-1 text-normative-green">
                <TrendingDown className="h-3 w-3" /> -0.5 vs mes ant.
              </span>
            }
          />
          <GaugeCard
            title="Ginecología"
            value="2.4"
            unit="Días"
            fillPct={64}
            tone="primary"
            footer={<span className="text-on-surface-variant">Sin cambios</span>}
          />
        </div>
      </Section>

      <Section title="4. HeatmapCell" description="Celdas de mapa de calor por bucket de cumplimiento.">
        <Card className="p-6">
          <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
            <CardTitle>Convenio × CUPS</CardTitle>
            <HeatmapLegend />
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full border-collapse text-left">
              <thead className="border-b border-outline-variant text-label-md text-on-surface-variant">
                <tr>
                  <th className="p-2">CUPS</th>
                  <th className="p-2 text-center">Famisanar</th>
                  <th className="p-2 text-center">Compensar Cajica</th>
                  <th className="p-2 text-center">Compensar Ubaté</th>
                  <th className="p-2 text-center">Nueva EPS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-outline-variant/30">
                  <td className="p-2 font-bold text-on-surface-variant">890201</td>
                  <td className="p-2 text-center"><HeatmapCell value={33} /></td>
                  <td className="p-2 text-center"><HeatmapCell value={72} /></td>
                  <td className="p-2 text-center"><HeatmapCell value={88} /></td>
                  <td className="p-2 text-center"><HeatmapCell value={10} /></td>
                </tr>
                <tr className="border-b border-outline-variant/30">
                  <td className="p-2 font-bold text-on-surface-variant">890203</td>
                  <td className="p-2 text-center"><HeatmapCell value={55} /></td>
                  <td className="p-2 text-center"><HeatmapCell value={137} /></td>
                  <td className="p-2 text-center"><HeatmapCell value={221} /></td>
                  <td className="p-2 text-center"><HeatmapCell value={15} /></td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-on-surface-variant">102</td>
                  <td className="p-2 text-center"><HeatmapCell value={98} /></td>
                  <td className="p-2 text-center"><HeatmapCell value={118} /></td>
                  <td className="p-2 text-center"><HeatmapCell value={100} /></td>
                  <td className="p-2 text-center"><HeatmapCell value={null} /></td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </Section>

      <Section title="5. StackedBar" description="Barra horizontal segmentada (estado consultas, mix agendas).">
        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle>Estado de Consultas por Sede</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-0">
            {[
              { sede: 'SEDE 07', total: 63972, cump: 66.3, incump: 19.5, canc: 14.3 },
              { sede: 'SEDE CAJICA', total: 48366, cump: 41.5, incump: 17.5, canc: 10 },
              { sede: 'SEDE CHIA', total: 35695, cump: 67.4, incump: 13.3, canc: 19.3 },
            ].map((s) => (
              <div key={s.sede} className="space-y-2">
                <div className="flex justify-between text-label-md text-on-surface-variant">
                  <span className="font-bold">{s.sede}</span>
                  <span>{formatNumber(s.total)} citas · {formatPercent(s.cump)} cumplidas</span>
                </div>
                <StackedBar
                  normalized
                  segments={[
                    { value: s.cump, bgClass: 'bg-secondary', label: 'Cumplida' },
                    { value: s.incump, bgClass: 'bg-secondary-container', label: 'Incumplida' },
                    { value: s.canc, bgClass: 'bg-error-container', label: 'Cancelada' },
                  ]}
                />
              </div>
            ))}
            <div className="flex gap-4 pt-2">
              <Legend color="bg-secondary" label="Cumplida" />
              <Legend color="bg-secondary-container" label="Incumplida" />
              <Legend color="bg-error-container" label="Cancelada" />
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section title="6. Sparkline" description="Mini barras para tendencias mensuales (5-12 puntos).">
        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle>Tendencia mensual Top 5 Convenios</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {[
                { label: 'NORDVITAL SAS', total: 96.5, tone: 'navy' as const, values: [23684, 26694, 26697, 6380, 13070] },
                { label: 'Nueva EPS PGP', total: 43.0, tone: 'secondary' as const, values: [7284, 3226, 3074, 24512, 4907] },
                { label: 'Famisanar Chía', total: 27.4, tone: 'turquoise' as const, values: [6, 7460, 7820, 6318, 5806] },
                { label: 'Compensar Cajica', total: 23.8, tone: 'amber' as const, values: [3517, 4745, 5491, 5275, 4756] },
                { label: 'Coosalud', total: 21.9, tone: 'green' as const, values: [8515, 4368, 3461, 2726, 2864] },
              ].map((it) => (
                <div key={it.label} className="rounded-lg border border-outline-variant p-3">
                  <div className="mb-2 flex items-start justify-between">
                    <span className="text-[10px] font-bold uppercase text-on-surface-variant">
                      {it.label}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">{it.total}k</span>
                  </div>
                  <Sparkline values={it.values} tone={it.tone} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section title="7. MiniTreemap" description="Grilla 6×2 con celdas proporcionales (treemap chico).">
        <MiniTreemap
          title="Volumen por Sede"
          description="Citas registradas Ene–May 2026"
          cells={[
            { label: 'Sede 07', value: 63972, display: '63.972 (37%)', colSpan: 3, rowSpan: 2, bgClass: 'bg-corporate-navy' },
            { label: 'CL 14', value: 50355, display: '50.355 (29%)', colSpan: 3, rowSpan: 1, bgClass: 'bg-corporate-turquoise' },
            { label: 'Cajica', value: 48366, display: '28%', colSpan: 2, rowSpan: 1, bgClass: 'bg-secondary-container', textClass: 'text-on-secondary-container' },
            { label: 'Otras', value: 0, colSpan: 1, rowSpan: 1, bgClass: 'bg-surface-container-highest', textClass: 'text-on-surface' },
          ]}
        />
      </Section>

      <Section title="8. DataTable + StatusBadge" description="Tabla generica TanStack Table con sorting.">
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-outline-variant/30 bg-error-container/10 px-6 py-4">
            <CardTitle>Alertas de Cohortes (Cumplimiento &lt; 80%)</CardTitle>
            <Badge variant="danger">{ALERTS.length} Críticas</Badge>
          </div>
          <DataTable data={ALERTS} columns={alertColumns} alertHeader />
        </Card>
      </Section>

      <Section title="9. BannerInfo" description="Avisos contextuales con 4 variantes.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <BannerInfo variant="info" title="Información" description="Datos cargados correctamente." />
          <BannerInfo variant="success" title="Sincronizado" description="Última carga ETL: hace 2 horas." />
          <BannerInfo
            variant="warning"
            title="Datos parciales"
            description="costo_servicio está mayormente NULL; costos se calculan desde NT."
          />
          <BannerInfo
            variant="danger"
            title="Sin Nota Técnica"
            description="Los 11 convenios sin NT vigente no entran en el cálculo de cumplimiento."
          />
        </div>
      </Section>

      <Section title="10. Button + Badge" description="Variantes shadcn de control y estado.">
        <Card className="p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Default / Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Destructive / Danger</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge variant="neutral">NEUTRAL</Badge>
            <Badge variant="success">+2.1%</Badge>
            <Badge variant="warning">ALERTA</Badge>
            <Badge variant="danger">-5.4%</Badge>
            <Badge variant="info">INFO</Badge>
            <Badge variant="primary">Q4-2026</Badge>
          </div>
        </Card>
      </Section>
    </PageShell>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-headline-md text-corporate-navy">{title}</h2>
        {description && <p className="text-body-md text-on-surface-variant">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      <span className="text-label-md">{label}</span>
    </div>
  );
}
