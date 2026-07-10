import { z } from 'zod';
import { get, NumericOrNull, IntegerOrNull, StringOrNull, type DashboardFilters } from './client';

// ═══════════════════════════════════════════════════════════════
//  Dashboard 1 - Resumen Gerencial
// ═══════════════════════════════════════════════════════════════

const ResumenSchema = z.object({
  meta: z
    .object({
      total: IntegerOrNull,
      desde: StringOrNull,
      hasta: StringOrNull,
    })
    .nullable(),
  kpis: z.object({
    cumplimiento: z
      .object({
        pct: NumericOrNull,
        cumplidas: IntegerOrNull,
        con_estado: IntegerOrNull,
      })
      .nullable(),
    recuperacionMillones: NumericOrNull,
    conveniosRiesgo: IntegerOrNull,
    oportunidadDias: NumericOrNull,
  }),
  evolucionMensual: z.array(
    z.object({ mes: z.string(), citas: IntegerOrNull, cumplidas: IntegerOrNull }),
  ),
  distribucionServicios: z.array(z.object({ tipo: z.string(), n: IntegerOrNull })),
  cumplimientoTopConvenios: z.array(
    z.object({ convenio_grupo: z.string(), citas: IntegerOrNull, pct: NumericOrNull }),
  ),
  volumenPorSede: z.array(z.object({ sede_grupo: z.string(), citas: IntegerOrNull })),
});

export type ResumenResponse = z.infer<typeof ResumenSchema>;

// ═══════════════════════════════════════════════════════════════
//  Dashboard 2 - Ejecucion vs NT
// ═══════════════════════════════════════════════════════════════

const EjecucionNtSchema = z.object({
  kpiCumplimientoGlobal: z
    .object({
      ejecutado: IntegerOrNull,
      meta_periodo: IntegerOrNull,
      pct: NumericOrNull,
    })
    .nullable(),
  desviaciones: z.array(
    z.object({
      convenio: z.string(),
      cups: z.string(),
      descripcion: StringOrNull,
      meta: IntegerOrNull,
      ejecutado: IntegerOrNull,
      pct: NumericOrNull,
    }),
  ),
  tendenciaCumplimiento: z.array(
    z.object({
      convenio: z.string(),
      mes: z.string(),
      ejecutado: IntegerOrNull,
      meta_mes: IntegerOrNull,
      pct: NumericOrNull,
    }),
  ),
  catalogoNt: z.array(
    z.object({
      cups: z.string(),
      descripcion: StringOrNull,
      meta: IntegerOrNull,
      ejecutado: IntegerOrNull,
      pct: NumericOrNull,
    }),
  ),
  contratadoSinEjecutar: z.array(
    z.object({
      cups: z.string(),
      descripcion: StringOrNull,
      meta: IntegerOrNull,
    }),
  ),
  ejecutadoFueraNt: z.array(
    z.object({
      cups: z.string(),
      descripcion: StringOrNull,
      ejecutado: IntegerOrNull,
    }),
  ),
});

export type EjecucionNtResponse = z.infer<typeof EjecucionNtSchema>;

// ═══════════════════════════════════════════════════════════════
//  Dashboard 3 - Financiero
// ═══════════════════════════════════════════════════════════════

const FinancieroSchema = z.object({
  kpis: z.object({
    costoRealMillones: NumericOrNull,
    citasCosteadas: IntegerOrNull,
    costoEsperadoMillones: NumericOrNull,
    recuperacionMillones: NumericOrNull,
    eficienciaPct: NumericOrNull,
  }),
  paretoCups: z.array(
    z.object({
      cups: z.string(),
      descripcion: StringOrNull,
      n: IntegerOrNull,
      millones: NumericOrNull,
    }),
  ),
  paretoTop20Pct: NumericOrNull,
  costoPorConvenio: z.array(
    z.object({ convenio_grupo: z.string(), citas: IntegerOrNull, millones: NumericOrNull }),
  ),
  recuperacionPorConvenio: z.array(
    z.object({ convenio_grupo: z.string(), millones: NumericOrNull }),
  ),
});

export type FinancieroResponse = z.infer<typeof FinancieroSchema>;

// ═══════════════════════════════════════════════════════════════
//  Dashboard 4 - Calidad y Oportunidad
// ═══════════════════════════════════════════════════════════════

const CalidadSchema = z.object({
  oportunidadEspecialidad: z.array(
    z.object({ especialidad: z.string(), n: IntegerOrNull, dias: NumericOrNull }),
  ),
  estadoPorSede: z.array(
    z.object({
      sede_grupo: z.string(),
      total: IntegerOrNull,
      pct_cump: NumericOrNull,
      pct_incump: NumericOrNull,
      pct_canc: NumericOrNull,
    }),
  ),
  inasistenciaMensual: z.array(
    z.object({
      convenio_grupo: z.string(),
      mes: z.string(),
      pct: NumericOrNull,
    }),
  ),
  mixAgendaPorSede: z.array(
    z.object({ sede_grupo: z.string(), tipo_agenda: z.string(), n: IntegerOrNull }),
  ),
});

export type CalidadResponse = z.infer<typeof CalidadSchema>;

// ═══════════════════════════════════════════════════════════════
//  Dashboard 5 - PyM / RIAS
// ═══════════════════════════════════════════════════════════════

const PymSchema = z.object({
  topProgramas: z.array(
    z.object({ pym: z.string(), n: IntegerOrNull, pct_cump: NumericOrNull }),
  ),
  alertasCohortes: z.array(
    z.object({ cohorte: z.string(), poblacion: IntegerOrNull, pct_cump: NumericOrNull }),
  ),
  _warning: z.string().optional(),
});

export type PymResponse = z.infer<typeof PymSchema>;

// ═══════════════════════════════════════════════════════════════
//  API publica
// ═══════════════════════════════════════════════════════════════

export const dashboardsApi = {
  resumen: (f: DashboardFilters = {}) => get('/dashboards/resumen', ResumenSchema, f),
  ejecucionNt: (f: DashboardFilters = {}) => get('/dashboards/ejecucion-nt', EjecucionNtSchema, f),
  financiero: (f: DashboardFilters = {}) => get('/dashboards/financiero', FinancieroSchema, f),
  calidad: (f: DashboardFilters = {}) => get('/dashboards/calidad', CalidadSchema, f),
  pym: (f: DashboardFilters = {}) => get('/dashboards/pym', PymSchema, f),
};
