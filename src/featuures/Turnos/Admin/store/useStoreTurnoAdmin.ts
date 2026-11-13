import { create } from "zustand";
import type {
  ITurnoSedeConfigAdmin,
  ITurnoSedeConfigInput,
  ITurnoModuloAdmin,
  ITurnoModuloInput,
  ITurnoModuloUpdate,
} from "@/models/ITurnoAdmin";
import {
  fetchTurnoSedesConfig,
  getTurnoError,
  saveTurnoSedeConfig,
  fetchTurnoModulos,
  createTurnoModulo,
  updateTurnoModulo,
} from "../services/turnos-admin.service";

interface ITurnoAdminData {
  sedes: ITurnoSedeConfigAdmin[];
  modulosBySede: Record<number, ITurnoModuloAdmin[]>;
}

interface ITurnoAdminResult {
  ok: boolean;
  message: string | null;
}

interface UseStoreTurnoAdmin {
  data: ITurnoAdminData;
  error: string | null;
  isLoading: boolean;
  modulosLoading: boolean;
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
};

export const useStoreTurnoAdmin = create<UseStoreTurnoAdmin>((set, get) => ({
  data: emptyData,
  error: null,
  isLoading: false,
  modulosLoading: false,
  modulosError: null,
  moduloMutationLoading: false,

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
    set({ modulosLoading: true, modulosError: null });
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
      set({ modulosError: getTurnoError(error) });
    } finally {
      set({ modulosLoading: false });
    }
  },

  createModulo: async (input) => {
    set({ moduloMutationLoading: true, modulosError: null });
    try {
      await createTurnoModulo(input);
      return { ok: true, message: null };
    } catch (error: unknown) {
      const message = getTurnoError(error);
      set({ modulosError: message });
      return { ok: false, message };
    } finally {
      set({ moduloMutationLoading: false });
    }
  },

  updateModulo: async (id, input) => {
    set({ moduloMutationLoading: true, modulosError: null });
    try {
      await updateTurnoModulo(id, input);
      return { ok: true, message: null };
    } catch (error: unknown) {
      const message = getTurnoError(error);
      set({ modulosError: message });
      return { ok: false, message };
    } finally {
      set({ moduloMutationLoading: false });
    }
  },

  reset: () =>
    set({
      data: emptyData,
      error: null,
      isLoading: false,
      modulosLoading: false,
      modulosError: null,
      moduloMutationLoading: false,
    }),
}));
