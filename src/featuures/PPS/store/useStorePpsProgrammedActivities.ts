import { create } from "zustand";
import type { AxiosError } from "axios";
import { api } from "@/utils/api-config";
import type {
  PpsProgrammedActivityInput,
  PpsProgrammedActivityRow,
} from "@/featuures/PPS/models/IPps";

interface UseStorePpsProgrammedActivities {
  programmedActivities: PpsProgrammedActivityRow[];
  periodId: number | null;
  error: string | null;
  isLoading: boolean;
  getByPeriod: (periodId: number) => Promise<void>;
  createProgrammedActivity: (
    periodId: number,
    data: PpsProgrammedActivityInput,
    onSuccess?: () => void
  ) => Promise<void>;
  updateProgrammedActivity: (
    id: number,
    data: PpsProgrammedActivityInput,
    onSuccess?: () => void
  ) => Promise<void>;
  deleteProgrammedActivity: (
    id: number,
    onSuccess?: () => void
  ) => Promise<void>;
  clearError: () => void;
}

export const useStorePpsProgrammedActivities =
  create<UseStorePpsProgrammedActivities>((set, get) => ({
    programmedActivities: [],
    periodId: null,
    error: null,
    isLoading: false,

    getByPeriod: async (periodId) => {
      try {
        set({ isLoading: true, error: null });

        const response = await api.get(
          `/pps/periods/${periodId}/programmed-activities`
        );

        if (response.status === 200) {
          set({ programmedActivities: response.data, periodId });
        }
      } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        if (err.response?.status === 500) {
          set({ error: "Error del servidor, por favor intente más tarde." });
        } else {
          set({
            error:
              err.response?.data?.message ||
              "Error al obtener las actividades programadas.",
          });
        }
      } finally {
        set({ isLoading: false });
      }
    },

    createProgrammedActivity: async (periodId, data, onSuccess) => {
      try {
        set({ isLoading: true, error: null });

        const response = await api.post(
          `/pps/periods/${periodId}/programmed-activities`,
          data
        );

        if (response.status === 201) {
          await get().getByPeriod(periodId);
          onSuccess?.();
        }
      } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        if (err.response?.status === 500) {
          set({ error: "Error del servidor, por favor intente más tarde." });
        } else {
          set({
            error:
              err.response?.data?.message ||
              "Error al crear la actividad programada.",
          });
        }
      } finally {
        set({ isLoading: false });
      }
    },

    updateProgrammedActivity: async (id, data, onSuccess) => {
      try {
        set({ isLoading: true, error: null });

        const response = await api.put(
          `/pps/programmed-activities/${id}`,
          data
        );

        if (response.status === 200) {
          const periodId = get().periodId;
          if (periodId !== null) {
            await get().getByPeriod(periodId);
          }
          onSuccess?.();
        }
      } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        if (err.response?.status === 500) {
          set({ error: "Error del servidor, por favor intente más tarde." });
        } else {
          set({
            error:
              err.response?.data?.message ||
              "Error al actualizar la actividad programada.",
          });
        }
      } finally {
        set({ isLoading: false });
      }
    },

    deleteProgrammedActivity: async (id, onSuccess) => {
      try {
        set({ isLoading: true, error: null });

        await api.delete(`/pps/programmed-activities/${id}`);

        const periodId = get().periodId;
        if (periodId !== null) {
          await get().getByPeriod(periodId);
        }
        onSuccess?.();
      } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        if (err.response?.status === 500) {
          set({ error: "Error del servidor, por favor intente más tarde." });
        } else {
          set({
            error:
              err.response?.data?.message ||
              "Error al eliminar la actividad programada.",
          });
        }
      } finally {
        set({ isLoading: false });
      }
    },

    clearError: () => {
      set({ error: null });
    },
  }));
