import { create } from "zustand";
import axios from "axios";
import type { ITurnoTicket } from "@/models/ITurnos";
import {
  cancelTurnoTicket,
  fetchTurnoTicket,
  getTurnoError,
  submitTurnoSurvey,
} from "../services/turnos.service";

interface UseStoreTurnoTicket {
  data: ITurnoTicket | null;
  error: string | null;
  isLoading: boolean;
  version: number;
  isCancelling: boolean;
  cancelError: string | null;
  isSubmittingSurvey: boolean;
  surveyError: string | null;
  surveySuccess: boolean;
  isLiveConnected: boolean;
  isOutdated: boolean;
  load: (token: string) => Promise<void>;
  cancel: (token: string, reason?: string) => Promise<boolean>;
  submitSurvey: (
    token: string,
    rating: number,
    comment?: string,
  ) => Promise<boolean>;
  setIsLiveConnected: (connected: boolean) => void;
  setIsOutdated: (outdated: boolean) => void;
  updatePartial: (partial: Partial<ITurnoTicket>) => void;
  reset: () => void;
}

export const useStoreTurnoTicket = create<UseStoreTurnoTicket>((set, get) => ({
  data: null,
  error: null,
  isLoading: false,
  version: 0,
  isCancelling: false,
  cancelError: null,
  isSubmittingSurvey: false,
  surveyError: null,
  surveySuccess: false,
  isLiveConnected: false,
  isOutdated: false,

  load: async (token) => {
    const version = get().version + 1;
    set({
      version,
      error: null,
      isLoading: true,
      data: get().data?.ticketToken === token ? get().data : null,
    });
    try {
      const data = await fetchTurnoTicket(token);
      if (get().version === version) set({ data });
    } catch (error: unknown) {
      if (get().version === version) set({ error: getTurnoError(error) });
    } finally {
      if (get().version === version) set({ isLoading: false });
    }
  },

  cancel: async (token, reason) => {
    if (get().isCancelling) return false;
    set({ isCancelling: true, cancelError: null });
    try {
      const result = await cancelTurnoTicket(token, reason);
      const current = get().data;
      if (current) {
        set({
          data: {
            ...current,
            status: result.status || "CANCELADO",
          },
        });
      }
      return true;
    } catch (error: unknown) {
      set({ cancelError: getTurnoError(error) });
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        await get().load(token);
      }
      return false;
    } finally {
      set({ isCancelling: false });
    }
  },

  submitSurvey: async (token, rating, comment) => {
    if (get().isSubmittingSurvey) return false;
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      set({ surveyError: "La calificación debe ser de 1 a 5 estrellas." });
      return false;
    }
    set({ isSubmittingSurvey: true, surveyError: null });
    try {
      await submitTurnoSurvey(token, {
        rating,
        ...(comment && comment.trim() ? { comment: comment.trim() } : {}),
      });
      const current = get().data;
      if (current) {
        set({
          data: {
            ...current,
            hasSurvey: true,
          },
        });
      }
      set({ surveySuccess: true });
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        const current = get().data;
        if (current) {
          set({
            data: {
              ...current,
              hasSurvey: true,
            },
          });
        }
      }
      set({ surveyError: getTurnoError(error) });
      return false;
    } finally {
      set({ isSubmittingSurvey: false });
    }
  },

  setIsLiveConnected: (isLiveConnected) => set({ isLiveConnected }),

  setIsOutdated: (isOutdated) => set({ isOutdated }),

  updatePartial: (partial) => {
    const current = get().data;
    if (!current) return;

    const updated: ITurnoTicket = {
      ...current,
      ...partial,
      headquarter: partial.headquarter ?? current.headquarter,
      service: partial.service ?? current.service,
      patient: partial.patient ?? current.patient,
      modulo: partial.modulo !== undefined ? partial.modulo : current.modulo,
    };

    (Object.keys(partial) as Array<keyof ITurnoTicket>).forEach((key) => {
      const val = partial[key];
      if (val !== undefined) {
        // @ts-expect-error dynamic assignment
        updated[key] = val;
      }
    });

    set({ data: updated });
  },

  reset: () =>
    set({
      data: null,
      error: null,
      isLoading: false,
      version: get().version + 1,
      isCancelling: false,
      cancelError: null,
      isSubmittingSurvey: false,
      surveyError: null,
      surveySuccess: false,
      isLiveConnected: false,
      isOutdated: false,
    }),
}));
