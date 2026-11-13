import { create } from "zustand";
import type {
  ITurnoAtencionOptions,
  ITurnoAtencionState,
} from "@/models/ITurnoAtencion";
import {
  closeTurnoAtencionSession,
  executeTurnoAtencionAction,
  fetchTurnoAtencionOptions,
  fetchTurnoAtencionState,
  getTurnoError,
  startTurnoAtencionSession,
} from "../services/turnos.service";

interface ITurnoAtencionResult {
  ok: boolean;
  message: string | null;
}

interface UseStoreTurnoAtencion {
  data: ITurnoAtencionState | null;
  options: ITurnoAtencionOptions;
  error: string | null;
  isLoading: boolean;
  isMutating: boolean;
  loadOptions: () => Promise<void>;
  loadState: () => Promise<void>;
  startSession: (moduloId: number, serviceIds: number[]) => Promise<ITurnoAtencionResult>;
  closeSession: () => Promise<ITurnoAtencionResult>;
  performAction: (input: Parameters<typeof executeTurnoAtencionAction>[0]) => Promise<ITurnoAtencionResult>;
  reset: () => void;
}

const emptyOptions: ITurnoAtencionOptions = { modules: [], services: [] };

export const useStoreTurnoAtencion = create<UseStoreTurnoAtencion>((set) => ({
  data: null,
  options: emptyOptions,
  error: null,
  isLoading: false,
  isMutating: false,

  loadOptions: async () => {
    set({ isLoading: true, error: null });
    try {
      const options = await fetchTurnoAtencionOptions();
      set({ options });
    } catch (error: unknown) {
      set({ error: getTurnoError(error) });
    } finally {
      set({ isLoading: false });
    }
  },

  loadState: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchTurnoAtencionState();
      set({ data });
    } catch (error: unknown) {
      set({ error: getTurnoError(error) });
    } finally {
      set({ isLoading: false });
    }
  },

  startSession: async (moduloId, serviceIds) => {
    set({ isMutating: true, error: null });
    try {
      await startTurnoAtencionSession({ moduloId, serviceIds });
      const data = await fetchTurnoAtencionState();
      set({ data });
      return { ok: true, message: null };
    } catch (error: unknown) {
      const message = getTurnoError(error);
      set({ error: message });
      return { ok: false, message };
    } finally {
      set({ isMutating: false });
    }
  },

  closeSession: async () => {
    set({ isMutating: true, error: null });
    try {
      await closeTurnoAtencionSession();
      const data = await fetchTurnoAtencionState();
      set({ data });
      return { ok: true, message: null };
    } catch (error: unknown) {
      const message = getTurnoError(error);
      set({ error: message });
      return { ok: false, message };
    } finally {
      set({ isMutating: false });
    }
  },

  performAction: async (input) => {
    set({ isMutating: true, error: null });
    try {
      await executeTurnoAtencionAction(input);
      const data = await fetchTurnoAtencionState();
      set({ data });
      return { ok: true, message: null };
    } catch (error: unknown) {
      const message = getTurnoError(error);
      set({ error: message });
      return { ok: false, message };
    } finally {
      set({ isMutating: false });
    }
  },

  reset: () => set({ data: null, options: emptyOptions, error: null, isLoading: false, isMutating: false }),
}));
