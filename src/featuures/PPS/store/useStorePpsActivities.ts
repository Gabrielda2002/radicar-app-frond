import { create } from "zustand";
import type { AxiosError } from "axios";
import { api } from "@/utils/api-config";
import type { PpsActivity } from "@/featuures/PPS/models/IPps";

interface UseStorePpsActivities {
  activities: PpsActivity[];
  error: string | null;
  isLoading: boolean;
  getActivities: () => Promise<void>;
}

export const useStorePpsActivities = create<UseStorePpsActivities>((set) => ({
  activities: [],
  error: null,
  isLoading: false,

  getActivities: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.get("/pps/activities");

      if (response.status === 200) {
        set({ activities: response.data });
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      if (err.response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({
          error:
            err.response?.data?.message ||
            "Error al obtener las actividades.",
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
