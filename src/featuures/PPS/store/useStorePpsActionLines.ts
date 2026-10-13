import { create } from "zustand";
import type { AxiosError } from "axios";
import { api } from "@/utils/api-config";
import type { PpsActionLine } from "@/featuures/PPS/models/IPps";

interface UseStorePpsActionLines {
  actionLines: PpsActionLine[];
  error: string | null;
  isLoading: boolean;
  getActionLines: () => Promise<void>;
}

export const useStorePpsActionLines = create<UseStorePpsActionLines>((set) => ({
  actionLines: [],
  error: null,
  isLoading: false,

  getActionLines: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.get("/pps/action-lines");

      if (response.status === 200) {
        set({ actionLines: response.data });
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      if (err.response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({
          error:
            err.response?.data?.message ||
            "Error al obtener las líneas de acción.",
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
