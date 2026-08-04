import { create } from "zustand";
import { api } from "@/utils/api-config";
import { IPqrsdf, IPqrsdfFormValues } from "@/featuures/Pqrsdf/models/IPqrsdf";

interface UseStorePqrsdf {
  pqrsdf: IPqrsdf[];
  currentPqrsdf: IPqrsdf | null;
  error: string | null;
  isLoading: boolean;
  getPqrsdf: () => Promise<void>;
  getPqrsdfById: (id: number | string) => Promise<void>;
  createPqrsdf: (
    data: IPqrsdfFormValues,
    onSuccess?: () => void
  ) => Promise<void>;
  updatePqrsdf: (
    id: number | string,
    data: Partial<IPqrsdfFormValues>,
    onSuccess?: () => void
  ) => Promise<void>;
}

export const useStorePqrsdf = create<UseStorePqrsdf>((set) => ({
  pqrsdf: [],
  currentPqrsdf: null,
  error: null,
  isLoading: false,

  // Obtener todos los PQRSDF
  getPqrsdf: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.get("/pqrsdf");

      if (response.status === 200) {
        set({ pqrsdf: response.data });
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({
          error:
            error.response?.data?.message ||
            "Error al obtener los PQRSDF.",
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  // Obtener un PQRSDF por ID
  getPqrsdfById: async (id: number | string) => {
    try {
      set({ isLoading: true, error: null, currentPqrsdf: null });

      const response = await api.get(`/pqrsdf/${id}`);

      if (response.status === 200) {
        set({ currentPqrsdf: response.data });
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({
          error:
            error.response?.data?.message || "PQRSDF no encontrado.",
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  // Crear nuevo PQRSDF
  createPqrsdf: async (data: IPqrsdfFormValues, onSuccess?: () => void) => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.post("/pqrsdf", data);

      if (response.status === 200 || response.status === 201) {
        onSuccess?.();
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({
          error:
            error.response?.data?.message ||
            "Error al guardar el PQRSDF.",
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  // Actualizar PQRSDF existente
  updatePqrsdf: async (
    id: number | string,
    data: Partial<IPqrsdfFormValues>,
    onSuccess?: () => void
  ) => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.put(`/pqrsdf/${id}`, data);

      if (response.status === 200) {
        onSuccess?.();
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({
          error:
            error.response?.data?.message ||
            "Error al actualizar el PQRSDF.",
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
