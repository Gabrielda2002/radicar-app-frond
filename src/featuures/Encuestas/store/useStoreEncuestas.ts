import { create } from "zustand";
import { api } from "@/utils/api-config";
import {
  IEncuestaFormValues,
  IEncuestaSatisfaccion,
} from "@/models/IEncuestaSatisfaccion";

interface UseStoreEncuestas {
  surveys: IEncuestaSatisfaccion[];
  currentSurvey: IEncuestaSatisfaccion | null;
  error: string | null;
  isLoading: boolean;
  getSurveys: () => Promise<void>;
  getSurveyById: (id: number | string) => Promise<void>;
  createSurvey: (
    data: IEncuestaFormValues,
    onSuccess?: () => void
  ) => Promise<void>;
  updateSurvey: (
    id: number | string,
    data: IEncuestaFormValues,
    onSuccess?: () => void
  ) => Promise<void>;
}

export const useStoreEncuestas = create<UseStoreEncuestas>((set) => ({
  surveys: [],
  currentSurvey: null,
  error: null,
  isLoading: false,

  // Obtener todas las encuestas
  getSurveys: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.get("/surveys/satisfaction");

      if (response.status === 200) {
        set({ surveys: response.data });
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({ error: error.response?.data?.message || "Error al obtener las encuestas." });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  // Obtener una encuesta por ID
  getSurveyById: async (id: number | string) => {
    try {
      set({ isLoading: true, error: null, currentSurvey: null });

      const response = await api.get(`/surveys/satisfaction/${id}`);

      if (response.status === 200) {
        set({ currentSurvey: response.data });
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({ error: error.response?.data?.message || "Encuesta no encontrada." });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  // Crear nueva encuesta
  createSurvey: async (data: IEncuestaFormValues, onSuccess?: () => void) => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.post("/surveys/satisfaction", data);

      if (response.status === 200 || response.status === 201) {
        onSuccess?.();
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({ error: error.response?.data?.message || "Error al guardar la encuesta." });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  // Actualizar encuesta existente
  updateSurvey: async (
    id: number | string,
    data: IEncuestaFormValues,
    onSuccess?: () => void
  ) => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.put(`/surveys/satisfaction/${id}`, data);

      if (response.status === 200) {
        onSuccess?.();
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({ error: error.response?.data?.message || "Error al actualizar la encuesta." });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
