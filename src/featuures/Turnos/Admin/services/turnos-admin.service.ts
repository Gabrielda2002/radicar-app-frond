import { api } from "@/utils/api-config";
import type {
  ITurnoSedeConfigAdmin,
  ITurnoSedeConfigInput,
  ITurnoModuloAdmin,
  ITurnoModuloInput,
  ITurnoModuloUpdate,
  ITurnoSedeServicios,
  ITurnoServiceAdmin,
} from "@/models/ITurnoAdmin";
import { getTurnoError } from "../../services/turnos.service";

export const TURNO_SERVICE_ENDPOINT = "turnos/admin/servicios";

export const fetchTurnoServices = async (): Promise<ITurnoServiceAdmin[]> => {
  const { data } = await api.get<ITurnoServiceAdmin[]>(`/${TURNO_SERVICE_ENDPOINT}`);
  if (!Array.isArray(data)) {
    throw new Error("No se pudieron cargar los servicios de turnos.");
  }
  return data;
};

export const fetchTurnoSedesConfig = async (): Promise<
  ITurnoSedeConfigAdmin[]
> => {
  const { data } = await api.get<ITurnoSedeConfigAdmin[]>(
    "/turnos/admin/sedes-config",
  );
  if (!Array.isArray(data))
    throw new Error(
      "La información de las sedes no está disponible o tiene un formato incorrecto.",
    );
  return data;
};

export const saveTurnoSedeConfig = async (
  input: ITurnoSedeConfigInput,
): Promise<void> => {
  await api.post("/turnos/admin/sedes-config", input);
};

export const fetchTurnoModulos = async (
  headquarterId: number,
): Promise<ITurnoModuloAdmin[]> => {
  const { data } = await api.get<ITurnoModuloAdmin[]>("/turnos/admin/modulos", {
    params: { headquarterId },
  });
  if (!Array.isArray(data))
    throw new Error(
      "La información de los módulos tiene un formato incorrecto.",
    );
  return data;
};

export const createTurnoModulo = async (
  input: ITurnoModuloInput,
): Promise<void> => {
  await api.post("/turnos/admin/modulos", input);
};

export const updateTurnoModulo = async (
  id: number,
  input: ITurnoModuloUpdate,
): Promise<void> => {
  await api.put(`/turnos/admin/modulos/${id}`, input);
};

export { getTurnoError };

export const fetchTurnoSedeServicios = async (
  headquarterId: number,
): Promise<ITurnoSedeServicios> => {
  const { data } = await api.get<ITurnoSedeServicios>(
    `/turnos/admin/sedes/${headquarterId}/servicios`,
  );
  if (
    data.headquarterId !== headquarterId ||
    !Array.isArray(data.services) ||
    !Array.isArray(data.assignedServiceIds)
  )
    throw new Error(
      "La configuración de servicios tiene un formato incorrecto.",
    );
  return data;
};

export const saveTurnoSedeServicios = async (
  headquarterId: number,
  serviceIds: number[],
): Promise<number[]> => {
  const { data } = await api.put<{
    headquarterId: number;
    serviceIds: number[];
  }>(`/turnos/admin/sedes/${headquarterId}/servicios`, { serviceIds });
  if (data.headquarterId !== headquarterId || !Array.isArray(data.serviceIds))
    throw new Error(
      "No se recibió confirmación de los servicios guardados. Consulta nuevamente la sede.",
    );
  return data.serviceIds;
};
