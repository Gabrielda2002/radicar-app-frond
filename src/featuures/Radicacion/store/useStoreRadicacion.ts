import { IRadicados } from "@/models/IRadicados";
import { api } from "@/utils/api-config";
import { create } from "zustand";

interface UseStoreRadicacion {
    radicacion: IRadicados[];
    error: string | null;
    isLoading: boolean;
    getRadicacionByDocument: (documento: string) => Promise<void>;
    createRadicacion: (data: Object, onSuccess?: () => void) => Promise<void>;
}

export const useStoreRadicacion = create<UseStoreRadicacion>((set) => ({
    error: null,
    isLoading: false,
    radicacion: [],

    getRadicacionByDocument: async (documento: string) => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.post("/radicaciones/doc-patient", {
                documento: documento,
            });

            if (response.status === 200) {
                set({ radicacion: response.data });
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error del servidor, por favor intente más tarde." });
            } else {
                set({ error: error.response.data.message });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    createRadicacion: async (data: Object, onSuccess?: () => void) => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.post("/radicaciones", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                onSuccess?.();
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error del servidor, por favor intente más tarde." });
            } else {
                set({ error: error.response.data.message });
            }
        } finally {
            set({ isLoading: false });
        }
    }

}));