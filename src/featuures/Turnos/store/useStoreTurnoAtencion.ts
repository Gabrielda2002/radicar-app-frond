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
  optionsLoading: boolean;
  optionsError: string | null;
  isMutating: boolean;
  loadOptions: () => Promise<void>;
  loadState: () => Promise<void>;
  startSession: (
    moduloId: number,
    serviceIds: number[],
  ) => Promise<ITurnoAtencionResult>;
  closeSession: () => Promise<ITurnoAtencionResult>;
  performAction: (
    input: Parameters<typeof executeTurnoAtencionAction>[0],
  ) => Promise<ITurnoAtencionResult>;
  reset: () => void;
}

const emptyOptions: ITurnoAtencionOptions = {
  modules: [],
  services: [],
  servicesByHeadquarter: [],
};

export const useStoreTurnoAtencion = create<UseStoreTurnoAtencion>(
  (set, get) => ({
    data: null,
    options: emptyOptions,
    error: null,
    isLoading: false,
    optionsLoading: false,
    optionsError: null,
    isMutating: false,

    loadOptions: async () => {
      if (get().optionsLoading || get().isMutating) return;
      set({ optionsLoading: true, optionsError: null });
      try {
        const options = await fetchTurnoAtencionOptions();
        set({ options });
      } catch (error: unknown) {
        set({ optionsError: getTurnoError(error) });
      } finally {
        set({ optionsLoading: false });
      }
    },

    loadState: async () => {
      if (get().isLoading || get().isMutating) return;
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
      if (get().isMutating || get().isLoading || get().optionsLoading)
        return { ok: false, message: null };
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
      if (get().isMutating || get().isLoading)
        return { ok: false, message: null };
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
      if (get().isMutating || get().isLoading)
        return { ok: false, message: null };
      set({ isMutating: true, error: null });
      try {
        const response = await executeTurnoAtencionAction(input);
        const data = await fetchTurnoAtencionState();
        set({
          data,
          error:
            input.action === "LLAMAR" && !data.activeTurn
              ? "No hay turnos disponibles para los servicios de esta sesión."
              : null,
        });
        return { ok: true, message: response.message };
      } catch (error: unknown) {
        const message = getTurnoError(error);
        set({ error: message });
        return { ok: false, message };
      } finally {
        set({ isMutating: false });
      }
    },

    reset: () =>
      set({
        data: null,
        options: emptyOptions,
        error: null,
        isLoading: false,
        isMutating: false,
        optionsLoading: false,
        optionsError: null,
      }),
  }),
);
