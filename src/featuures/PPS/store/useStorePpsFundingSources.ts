import { create } from "zustand";
import type { AxiosError } from "axios";
import { api } from "@/utils/api-config";
import type { PpsFundingSource } from "@/featuures/PPS/models/IPps";

interface UseStorePpsFundingSources {
  fundingSources: PpsFundingSource[];
  error: string | null;
  isLoading: boolean;
  getFundingSources: () => Promise<void>;
}

export const useStorePpsFundingSources = create<UseStorePpsFundingSources>(
  (set) => ({
    fundingSources: [],
    error: null,
    isLoading: false,

    getFundingSources: async () => {
      try {
        set({ isLoading: true, error: null });

        const response = await api.get("/pps/funding-sources");

        if (response.status === 200) {
          set({ fundingSources: response.data });
        }
      } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        if (err.response?.status === 500) {
          set({ error: "Error del servidor, por favor intente más tarde." });
        } else {
          set({
            error:
              err.response?.data?.message ||
              "Error al obtener las fuentes de recursos.",
          });
        }
      } finally {
        set({ isLoading: false });
      }
    },
  })
);
