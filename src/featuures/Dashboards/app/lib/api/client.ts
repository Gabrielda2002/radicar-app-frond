import { z } from "zod";
import { api } from "@/utils/api-config";

/**
 * Cliente tipado para los endpoints de dashboards/filtros, ahora servidos por
 * Api-nordvital bajo /api/v1. Usa la instancia axios de radicar (que adjunta el
 * JWT y refresca el token automáticamente). Valida la respuesta con Zod.
 * Los params vacíos, undefined o 'all' se omiten.
 */
export async function get<S extends z.ZodTypeAny>(
  path: string,
  schema: S,
  params?: Record<string, string | undefined>,
): Promise<z.output<S>> {
  const cleanParams: Record<string, string> = {};
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== "" && v !== "all") cleanParams[k] = v;
    }
  }
  const res = await api.get(path, { params: cleanParams });
  const parsed = schema.safeParse(res.data);
  if (!parsed.success) {
    console.error("Zod parse failed for", path, parsed.error);
    throw new Error(`Schema invalido en ${path}`);
  }
  return parsed.data;
}

// ═══════════════════════════════════════════════════════════════
//  Schemas/primitivas comunes
// ═══════════════════════════════════════════════════════════════

/** DECIMAL suele llegar como string; coerce a number | null. */
export const NumericOrNull = z
  .union([z.number(), z.string(), z.null()])
  .transform((v): number | null =>
    v == null || v === "" ? null : typeof v === "string" ? Number(v) : v,
  );

/** BIGINT serializado como number, a veces null cuando el filtro no retorna nada. */
export const IntegerOrNull = z
  .union([z.number(), z.null()])
  .transform((v): number => v ?? 0);

export const StringOrNull = z.union([z.string(), z.null()]);

/** Filtros globales compartidos por todos los endpoints de dashboards. */
export interface DashboardFilters {
  [k: string]: string | undefined;
  desde?: string;
  hasta?: string;
  sede?: string;
  convenio?: string;
  convenioDetalle?: string;
  sedeGrupo?: string;
  modalidad?: string;
  regimen?: string;
  especialidad?: string;
  grupoEspecialidad?: string;
}
