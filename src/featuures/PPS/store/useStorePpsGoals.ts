import { create } from "zustand";
import type { AxiosError } from "axios";
import { api } from "@/utils/api-config";
import type { PpsGoal } from "@/featuures/PPS/models/IPps";

interface UseStorePpsGoals {
  goals: PpsGoal[];
  error: string | null;
  isLoading: boolean;
  getGoals: () => Promise<void>;
}

export const useStorePpsGoals = create<UseStorePpsGoals>((set) => ({
  goals: [],
  error: null,
  isLoading: false,

  getGoals: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.get("/pps/goals");

      if (response.status === 200) {
        set({ goals: response.data });
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      if (err.response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({
          error:
            err.response?.data?.message || "Error al obtener las metas.",
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
