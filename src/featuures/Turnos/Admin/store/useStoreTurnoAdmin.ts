import { create } from "zustand";
import type {
  ITurnoSedeConfigAdmin,
  ITurnoSedeConfigInput,
  ITurnoModuloAdmin,
  ITurnoModuloInput,
  ITurnoModuloUpdate,
  ITurnoSedeServicios,
} from "@/models/ITurnoAdmin";
import {
  fetchTurnoSedesConfig,
  getTurnoError,
  saveTurnoSedeConfig,
  fetchTurnoModulos,
  createTurnoModulo,
  updateTurnoModulo,
  fetchTurnoSedeServicios,
  saveTurnoSedeServicios,
} from "../services/turnos-admin.service";

interface ITurnoAdminData {
  sedes: ITurnoSedeConfigAdmin[];
  modulosBySede: Record<number, ITurnoModuloAdmin[]>;
  servicesBySede: Record<number, ITurnoSedeServicios>;
}

interface ITurnoAdminResult {
  ok: boolean;
  message: string | null;
}

interface UseStoreTurnoAdmin {
  data: ITurnoAdminData;
  servicesLoading: Record<number, boolean>;
  servicesSaving: Record<number, boolean>;
  servicesError: Record<number, string | null>;
  loadServices: (headquarterId: number) => Promise<void>;
  saveServices: (headquarterId: number, serviceIds: number[]) => Promise<ITurnoAdminResult>;
  error: string | null;
  isLoading: boolean;
  modulosLoading: boolean;
  modulosHeadquarterId: number | null;
  modulosError: string | null;
  moduloMutationLoading: boolean;
  loadSedes: () => Promise<void>;
  saveSede: (input: ITurnoSedeConfigInput) => Promise<ITurnoAdminResult>;
  loadModulos: (headquarterId: number) => Promise<void>;
  createModulo: (input: ITurnoModuloInput) => Promise<ITurnoAdminResult>;
  updateModulo: (
    id: number,
    input: ITurnoModuloUpdate,
  ) => Promise<ITurnoAdminResult>;
  reset: () => void;
}

const emptyData: ITurnoAdminData = {
  sedes: [],
  modulosBySede: {},
  servicesBySede: {},
};

export const useStoreTurnoAdmin = create<UseStoreTurnoAdmin>((set, get) => ({
  data: emptyData,
  servicesLoading: {},
  servicesSaving: {},
  servicesError: {},
  error: null,
  isLoading: false,
  modulosLoading: false,
  modulosHeadquarterId: null,
  modulosError: null,
  moduloMutationLoading: false,

  loadServices: async (id) => {
    if (get().servicesLoading[id] || get().servicesSaving[id]) return;
    set((s) => ({ servicesLoading: { ...s.servicesLoading, [id]: true }, servicesError: { ...s.servicesError, [id]: null } }));
    try {
      const services = await fetchTurnoSedeServicios(id);
      set((s) => ({ data: { ...s.data, servicesBySede: { ...s.data.servicesBySede, [id]: services } } }));
    } catch (error: unknown) {
      set((s) => ({ servicesError: { ...s.servicesError, [id]: getTurnoError(error) } }));
    } finally {
      set((s) => ({ servicesLoading: { ...s.servicesLoading, [id]: false } }));
    }
  },

  saveServices: async (id, serviceIds) => {
    if (get().servicesSaving[id] || get().servicesLoading[id]) return { ok: false, message: null };
    set((s) => ({ servicesSaving: { ...s.servicesSaving, [id]: true }, servicesError: { ...s.servicesError, [id]: null } }));
    try {
      const assignedServiceIds = await saveTurnoSedeServicios(id, serviceIds);
      set((s) => ({
        data: {
          ...s.data, servicesBySede: {
            ...s.data.servicesBySede,
            [id]: {
              ...s.data.servicesBySede[id], assignedServiceIds,
              services: s.data.servicesBySede[id].services.map((service) => ({ ...service, isAssigned: assignedServiceIds.includes(service.id) }))
            },
          }
        }
      }));
      return { ok: true, message: null };
    } catch (error: unknown) {
      const message = getTurnoError(error);
      set((s) => ({ servicesError: { ...s.servicesError, [id]: message } }));
      return { ok: false, message };
    } finally {
      set((s) => ({ servicesSaving: { ...s.servicesSaving, [id]: false } }));
    }
  },

  loadSedes: async () => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });
    try {
      const sedes = await fetchTurnoSedesConfig();
      set((state) => ({ data: { ...state.data, sedes } }));
    } catch (error: unknown) {
      set({ error: getTurnoError(error) });
    } finally {
      set({ isLoading: false });
    }
  },

  saveSede: async (input) => {
    if (get().isLoading) return { ok: false, message: null };
    set({ isLoading: true, error: null });
    try {
      await saveTurnoSedeConfig(input);
      return { ok: true, message: null };
    } catch (error: unknown) {
      const message = getTurnoError(error);
      set({ error: message });
      return { ok: false, message };
    } finally {
      set({ isLoading: false });
    }
  },

  loadModulos: async (headquarterId) => {
    set({ modulosHeadquarterId: headquarterId, modulosLoading: true, modulosError: null });
    try {
      const modulos = await fetchTurnoModulos(headquarterId);
      set((state) => ({
        data: {
          ...state.data,
          modulosBySede: {
            ...state.data.modulosBySede,
            [headquarterId]: modulos,
          },
        },
      }));
    } catch (error: unknown) {
      if (get().modulosHeadquarterId === headquarterId) set({ modulosError: getTurnoError(error) });
    } finally {
      if (get().modulosHeadquarterId === headquarterId) set({ modulosLoading: false });
    }
  },

  createModulo: async (input) => {
    if (get().moduloMutationLoading) return { ok: false, message: null };
    set({ moduloMutationLoading: true, modulosError: null });
    try {
      await createTurnoModulo(input);
      return { ok: true, message: null };
    } catch (error: unknown) {
      const message = getTurnoError(error);
      if (get().modulosHeadquarterId === input.headquarterId) set({ modulosError: message });
      return { ok: false, message };
    } finally {
      set({ moduloMutationLoading: false });
    }
  },

  updateModulo: async (id, input) => {
    if (get().moduloMutationLoading) return { ok: false, message: null };
    const headquarterId = get().modulosHeadquarterId;
    set({ moduloMutationLoading: true, modulosError: null });
    try {
      await updateTurnoModulo(id, input);
      return { ok: true, message: null };
    } catch (error: unknown) {
      const message = getTurnoError(error);
      if (get().modulosHeadquarterId === headquarterId) set({ modulosError: message });
      return { ok: false, message };
    } finally {
      set({ moduloMutationLoading: false });
    }
  },

  reset: () =>
    set({
      data: emptyData,
      servicesLoading: {},
      servicesSaving: {},
      servicesError: {},
      error: null,
      isLoading: false,
      modulosLoading: false,
      modulosHeadquarterId: null,
      modulosError: null,
      moduloMutationLoading: false,
    }),
}));
