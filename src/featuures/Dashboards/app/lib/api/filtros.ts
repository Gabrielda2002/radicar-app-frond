import { z } from 'zod';
import { get, StringOrNull, type DashboardFilters } from './client';

// ═══════════════════════════════════════════════════════════════
//  Catalogos para selects de filtros
// ═══════════════════════════════════════════════════════════════

const SedeOption = z.object({
  value: z.string(),
  label: z.string(),
  citas: z.number(),
});
const ConvenioOption = SedeOption.extend({ tieneNT: z.boolean() });
const RangoFechas = z.object({
  desde: StringOrNull,
  hasta: StringOrNull,
  totalCitas: z.number(),
});

export type SedeOption = z.infer<typeof SedeOption>;
export type ConvenioOption = z.infer<typeof ConvenioOption>;
export type RangoFechas = z.infer<typeof RangoFechas>;

const SedeJerarquia = SedeOption.extend({
  sedes: z.array(SedeOption),
});
export type SedeJerarquia = z.infer<typeof SedeJerarquia>;

const ConvenioJerarquia = SedeOption.extend({
  convenios: z.array(SedeOption),
});
export type ConvenioJerarquia = z.infer<typeof ConvenioJerarquia>;

export const filtrosApi = {
  sedes: () => get('/filtros/sedes', z.array(SedeOption)),
  convenios: () => get('/filtros/convenios', z.array(ConvenioOption)),
  rangoFechas: () => get('/filtros/rango-fechas', RangoFechas),
  conveniosGrupo: (f: DashboardFilters = {}, soloNt = false) =>
    get('/filtros/convenios-grupo', z.array(SedeOption), soloNt ? { ...f, soloNt: 'true' } : f),
  sedesGrupo: (f: DashboardFilters = {}, soloNt = false) =>
    get('/filtros/sedes-grupo', z.array(SedeOption), soloNt ? { ...f, soloNt: 'true' } : f),
  sedesJerarquia: (f: DashboardFilters = {}, soloNt = false) =>
    get('/filtros/sedes-jerarquia', z.array(SedeJerarquia), soloNt ? { ...f, soloNt: 'true' } : f),
  conveniosJerarquia: (f: DashboardFilters = {}, soloNt = false) =>
    get('/filtros/convenios-jerarquia', z.array(ConvenioJerarquia), soloNt ? { ...f, soloNt: 'true' } : f),
  modalidades: (f: DashboardFilters = {}, soloNt = false) =>
    get('/filtros/modalidades', z.array(SedeOption), soloNt ? { ...f, soloNt: 'true' } : f),
  regimenes: (f: DashboardFilters = {}, soloNt = false) =>
    get('/filtros/regimenes', z.array(SedeOption), soloNt ? { ...f, soloNt: 'true' } : f),
  gruposEspecialidad: (f: DashboardFilters = {}, soloNt = false) =>
    get('/filtros/grupos-especialidad', z.array(SedeOption), soloNt ? { ...f, soloNt: 'true' } : f),
};
