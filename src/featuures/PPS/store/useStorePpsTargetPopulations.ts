import { create } from "zustand";
import type { AxiosError } from "axios";
import { api } from "@/utils/api-config";
import type { PpsTargetPopulation } from "@/featuures/PPS/models/IPps";

interface UseStorePpsTargetPopulations {
  targetPopulations: PpsTargetPopulation[];
  error: string | null;
  isLoading: boolean;
  getTargetPopulations: () => Promise<void>;
}

export const useStorePpsTargetPopulations = create<UseStorePpsTargetPopulations>(
  (set) => ({
    targetPopulations: [],
    error: null,
    isLoading: false,

    getTargetPopulations: async () => {
      try {
        set({ isLoading: true, error: null });

        const response = await api.get("/pps/target-populations");

        if (response.status === 200) {
          set({ targetPopulations: response.data });
        }
      } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        if (err.response?.status === 500) {
          set({ error: "Error del servidor, por favor intente más tarde." });
        } else {
          set({
            error:
              err.response?.data?.message ||
              "Error al obtener las poblaciones objetivo.",
          });
        }
      } finally {
        set({ isLoading: false });
      }
    },
  })
);
