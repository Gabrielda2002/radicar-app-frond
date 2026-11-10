import { create } from "zustand";
import type {
  ITurnoIdentity,
  ITurnoRequest,
  ITurnoSedeConfig,
  ITurnoVerification,
} from "@/models/ITurnos";
import {
  createTurnoTicket,
  fetchTurnoConfig,
  getTurnoError,
  verifyTurnoPatient,
} from "../services/turnos.service";

interface ITurnoRequestData {
  slug: string;
  config: ITurnoSedeConfig | null;
  verification: ITurnoVerification | null;
}

interface UseStoreTurnoRequest {
  data: ITurnoRequestData;
  error: string | null;
  isLoading: boolean;
  version: number;
  load: (slug: string) => Promise<void>;
  verify: (identity: ITurnoIdentity) => Promise<ITurnoVerification | null>;
  submit: (request: ITurnoRequest) => Promise<string | null>;
  clearVerification: () => void;
  reset: () => void;
}

const emptyData: ITurnoRequestData = {
  slug: "",
  config: null,
  verification: null,
};

export const useStoreTurnoRequest = create<UseStoreTurnoRequest>(
  (set, get) => ({
    data: emptyData,
    error: null,
    isLoading: false,
    version: 0,

    load: async (slug) => {
      const version = get().version + 1;
      set({
        version,
        data: { ...emptyData, slug },
        error: null,
        isLoading: true,
      });
      try {
        const config = await fetchTurnoConfig(slug);
        if (get().version === version) set({ data: { ...get().data, config } });
      } catch (error: unknown) {
        if (get().version === version) set({ error: getTurnoError(error) });
      } finally {
        if (get().version === version) set({ isLoading: false });
      }
    },

    verify: async (identity) => {
      if (get().isLoading) return null;
      const version = get().version + 1;
      set({ version, error: null, isLoading: true });
      try {
        const verification = await verifyTurnoPatient(identity);
        if (get().version !== version) return null;
        set({ data: { ...get().data, verification } });
        return verification;
      } catch (error: unknown) {
        if (get().version === version) set({ error: getTurnoError(error) });
        return null;
      } finally {
        if (get().version === version) set({ isLoading: false });
      }
    },

    submit: async (request) => {
      if (get().isLoading) return null;
      const version = get().version + 1;
      set({ version, error: null, isLoading: true });
      try {
        // Recuperar primero evita repetir una emisión cuya respuesta se haya perdido.
        const current = await verifyTurnoPatient({
          documentNumber: request.documentNumber,
          documentType: request.documentTypeId,
        });
        if (get().version !== version) return null;
        const token =
          current.activeTurn?.ticketToken || (await createTurnoTicket(request));
        return get().version === version ? token : null;
      } catch (error: unknown) {
        if (get().version === version) set({ error: getTurnoError(error) });
        return null;
      } finally {
        if (get().version === version) set({ isLoading: false });
      }
    },

    clearVerification: () =>
      set({
        data: { ...get().data, verification: null },
        error: null,
        version: get().version + 1,
      }),

    reset: () =>
      set({
        data: emptyData,
        error: null,
        isLoading: false,
        version: get().version + 1,
      }),
  }),
);
