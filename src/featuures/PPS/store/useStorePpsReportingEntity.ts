import { create } from "zustand";
import type { AxiosError } from "axios";
import { api } from "@/utils/api-config";
import { PpsReportingEntity } from "@/featuures/PPS/models/IPps";

interface UseStorePpsReportingEntity {
  reportingEntity: PpsReportingEntity | null;
  error: string | null;
  isLoading: boolean;
  getReportingEntity: () => Promise<void>;
  updateReportingEntity: (
    data: Object,
    onSuccess?: () => void
  ) => Promise<void>;
}

export const useStorePpsReportingEntity = create<UseStorePpsReportingEntity>(
  (set) => ({
    reportingEntity: null,
    error: null,
    isLoading: false,

    getReportingEntity: async () => {
      try {
        set({ isLoading: true, error: null });

        const response = await api.get("/pps/reporting-entity");

        if (response.status === 200) {
          set({ reportingEntity: response.data });
        }
      } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        if (err.response?.status === 500) {
          set({ error: "Error del servidor, por favor intente más tarde." });
        } else {
          set({
            error:
              err.response?.data?.message ||
              "Error al obtener la entidad reportante.",
          });
        }
      } finally {
        set({ isLoading: false });
      }
    },

    updateReportingEntity: async (data, onSuccess) => {
      try {
        set({ isLoading: true, error: null });

        const response = await api.put("/pps/reporting-entity", data);

        if (response.status === 200) {
          set({ reportingEntity: response.data });
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
              "Error al guardar los datos de la entidad.",
          });
        }
      } finally {
        set({ isLoading: false });
      }
    },
  })
);
