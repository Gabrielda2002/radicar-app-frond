import { ILugarRadicacion } from "@/models/ILugarRadicado";
import { api } from "@/utils/api-config";
import { create } from "zustand";

interface HeadquartersState {
    headquarters: ILugarRadicacion[];
    sedes: ILugarRadicacion[];
    isLoading: boolean;
    isLoadingSedes: boolean;
    error: string | null;
    errorSedes: string | null;
    getHeadquarters: (force?: boolean) => Promise<void>;
    getHeadquartersByDepartment: (departmentId: number) => Promise<void>;
    clearSedes: () => void;
}

export const useStoreHeadquarters = create<HeadquartersState>((set, get) => ({
    headquarters: [],
    sedes: [],
    isLoading: false,
    isLoadingSedes: false,
    error: null,
    errorSedes: null,

    getHeadquarters: async (force = false) => {
        if (!force && get().headquarters.length > 0) return;

        set({ isLoading: true, error: null });

        try {
            const response = await api.get("/headquarters");

            if (response.status === 200 || response.status === 201) {
                set({ headquarters: response.data });
            }
        } catch (error: any) {
            if (error.response?.status === 500) {
                set({ error: "Error del servidor. Por favor, inténtelo de nuevo más tarde." });
            } else {
                set({ error: error.response?.data?.message ?? "Ocurrió un error al obtener las sedes." });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    getHeadquartersByDepartment: async (departmentId: number) => {
        if (!departmentId) return;

        set({ isLoadingSedes: true, errorSedes: null });

        try {
            const response = await api.get(`/headquarters/department/${departmentId}`);

            if (response.data.length === 0) {
                set({ sedes: [] });
            } else {
                set({ sedes: response.data });
            }
        } catch (error: any) {
            console.error(error);
            set({ errorSedes: "Ocurrió un error al obtener las sedes.", sedes: [] });
        } finally {
            set({ isLoadingSedes: false });
        }
    },

    clearSedes: () => {
        set({ sedes: [], errorSedes: null });
    },
}));
