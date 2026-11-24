import { create } from "zustand";
import type { ITurnoServiceAdmin } from "@/models/ITurnoAdmin";
import { fetchTurnoServices } from "../services/turnos-admin.service";

interface TurnoServicesState {
  data: ITurnoServiceAdmin[];
  error: string | null;
  isLoading: boolean;
  loadServices: () => Promise<void>;
}

export const useStoreTurnoServices = create<TurnoServicesState>((set, get) => ({
  data: [],
  error: null,
  isLoading: false,
  loadServices: async () => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });
    try {
      set({ data: await fetchTurnoServices() });
    } catch {
      set({ error: "No se pudieron cargar los servicios de turnos." });
    } finally {
      set({ isLoading: false });
    }
  },
}));
