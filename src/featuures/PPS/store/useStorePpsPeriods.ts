import { create } from "zustand";
import type { AxiosError } from "axios";
import { api } from "@/utils/api-config";
import type { PpsPeriod } from "@/featuures/PPS/models/IPps";

interface CreatePeriodData {
  validityYear: number;
  startDate: string;
  endDate: string;
}

interface UpdatePeriodData {
  startDate?: string;
  endDate?: string;
  cutoffDate?: string | null;
}

interface UseStorePpsPeriods {
  periods: PpsPeriod[];
  error: string | null;
  isLoading: boolean;
  getPeriods: () => Promise<void>;
  createPeriod: (
    data: CreatePeriodData,
    onSuccess?: (period: PpsPeriod) => void
  ) => Promise<void>;
  updatePeriod: (
    id: number,
    data: UpdatePeriodData,
    onSuccess?: () => void
  ) => Promise<void>;
  deletePeriod: (id: number, onSuccess?: () => void) => Promise<void>;
}

export const useStorePpsPeriods = create<UseStorePpsPeriods>((set, get) => ({
  periods: [],
  error: null,
  isLoading: false,

  getPeriods: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.get("/pps/periods");

      if (response.status === 200) {
        set({ periods: response.data });
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      if (err.response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({
          error:
            err.response?.data?.message || "Error al obtener las vigencias.",
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  createPeriod: async (data, onSuccess) => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.post("/pps/periods", data);

      if (response.status === 201) {
        const created = response.data as PpsPeriod;
        set({ periods: [created, ...get().periods] });
        onSuccess?.(created);
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      if (err.response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({
          error:
            err.response?.data?.message || "Error al crear la vigencia.",
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  updatePeriod: async (id, data, onSuccess) => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.put(`/pps/periods/${id}`, data);

      if (response.status === 200) {
        const updated = response.data as PpsPeriod;
        set({
          periods: get().periods.map((period) =>
            period.id === id ? updated : period
          ),
        });
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
            "Error al actualizar la vigencia.",
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  deletePeriod: async (id, onSuccess) => {
    try {
      set({ isLoading: true, error: null });

      await api.delete(`/pps/periods/${id}`);

      set({ periods: get().periods.filter((period) => period.id !== id) });
      onSuccess?.();
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      if (err.response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({
          error:
            err.response?.data?.message || "Error al eliminar la vigencia.",
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
