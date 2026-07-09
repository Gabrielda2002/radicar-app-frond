import axios from "axios";
import { z } from "zod";
import { api } from "@/utils/api-config";

const dashApi = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND_DASHBOARD,
  headers: {
    "Content-Type": "application/json",
  },
});

dashApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

dashApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await api.post("/refresh");
        const { accessToken } = refreshResponse.data;
        localStorage.setItem("token", accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return dashApi(originalRequest);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        localStorage.removeItem("Municipio");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

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
  const res = await dashApi.get(path, { params: cleanParams });
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
