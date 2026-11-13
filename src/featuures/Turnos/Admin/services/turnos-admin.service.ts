import { api } from "@/utils/api-config";
import type {
  ITurnoSedeConfigAdmin,
  ITurnoSedeConfigInput,
  ITurnoModuloAdmin,
  ITurnoModuloInput,
  ITurnoModuloUpdate,
} from "@/models/ITurnoAdmin";
import { getTurnoError } from "../../services/turnos.service";

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
